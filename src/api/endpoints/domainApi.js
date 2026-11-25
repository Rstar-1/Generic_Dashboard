import axios from "axios";

const BOOTSTRAP_URL = "https://data.iana.org/rdap/dns.json";

let bootstrapCache = null;
let bootstrapExpiry = 0;

const FALLBACK_SERVICES = [
  [["com", "net"], ["https://rdap.verisign.com/com/v1/"]],
  [["org"], ["https://rdap.publicinterestregistry.org/rdap/"]],
  [["in", "co.in", "net.in", "org.in"], ["https://rdap.registry.in/"]],
  [["io"], ["https://rdap.identitydigital.services/rdap/"]],
  [["ai"], ["https://rdap.whois.ai/"]],
  [["co"], ["https://rdap.identitydigital.services/rdap/"]],
  [["app", "dev"], ["https://rdap.nic.google/"]],
  [["xyz"], ["https://rdap.centralnic.com/xyz/"]],
  [["tech", "online", "store"], ["https://rdap.centralnic.com/"]],
];

/**
 * Retrieve IANA RDAP DNS bootstrap directory with in-memory cache
 */
export async function getBootstrap() {
  if (bootstrapCache && Date.now() < bootstrapExpiry) return bootstrapCache;
  try {
    const { data } = await axios.get(BOOTSTRAP_URL, { timeout: 10000 });
    if (data && Array.isArray(data.services)) {
      bootstrapCache = data;
      bootstrapExpiry = Date.now() + 24 * 60 * 60 * 1000;
      return data;
    }
  } catch {}
  return bootstrapCache || { services: FALLBACK_SERVICES };
}

const extractTld = (domain) => {
  const parts = domain.toLowerCase().split(".");
  if (parts.length <= 1) return "";
  const lastTwo = parts.slice(-2).join(".");
  if (["co.in", "net.in", "org.in", "co.uk", "org.uk", "com.au"].includes(lastTwo)) return lastTwo;
  return parts[parts.length - 1];
};

/**
 * Check single domain registration status via live DNS-over-HTTPS with RDAP fallback
 */
export async function checkDomainApi(domain) {
  if (!domain || typeof domain !== "string") {
    return { domain: domain || "", status: "unsupported", message: "Please enter a valid domain name." };
  }

  const cleanDomain = domain.trim().toLowerCase().replace(/^https?:\/\//, "").replace(/\/.*$/, "");
  const tld = extractTld(cleanDomain);
  if (!tld || !cleanDomain.includes(".")) {
    return { domain: cleanDomain, status: "unsupported", message: "Domain must include a valid extension." };
  }

  // 1. Live DNS-over-HTTPS (Google & Cloudflare DoH)
  const dohUrls = [
    `https://dns.google/resolve?name=${encodeURIComponent(cleanDomain)}&type=SOA`,
    `https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(cleanDomain)}&type=SOA`,
  ];

  for (const url of dohUrls) {
    try {
      const res = await axios.get(url, {
        timeout: 5000,
        headers: { Accept: url.includes("cloudflare") ? "application/dns-json" : "application/json" },
      });
      const data = res?.data;
      if (data && typeof data.Status === "number") {
        if (data.Status === 0) return { domain: cleanDomain, status: "registered", message: "Domain is registered.", details: data };
        if (data.Status === 3) return { domain: cleanDomain, status: "available", message: "Domain is available." };
      }
    } catch {}
  }

  // 2. Tertiary Fallback: RDAP Registry Protocol
  try {
    const bootstrap = await getBootstrap();
    const service = bootstrap?.services?.find(([tlds]) => tlds.map((item) => item.toLowerCase()).includes(tld));
    if (service && service[1]?.[0]) {
      const baseRdapUrl = service[1][0].replace(/\/$/, "");
      const res = await axios.get(`${baseRdapUrl}/domain/${encodeURIComponent(cleanDomain)}`, {
        timeout: 6000,
        validateStatus: () => true,
      });
      if (res?.data?.objectClassName === "domain" || res?.status === 200) {
        return { domain: cleanDomain, status: "registered", message: "Domain is already registered.", details: res?.data };
      }
      if (res?.data?.errorCode === 404 || res?.status === 404) {
        return { domain: cleanDomain, status: "available", message: "Domain is available." };
      }
    }
  } catch {}

  return { domain: cleanDomain, status: "unverified", message: "Registration status could not be confirmed." };
}

/**
 * Check multiple domains in parallel with batch limit
 */
export async function checkMultipleDomainsApi(domains = [], batchSize = 4) {
  const results = {};
  for (let i = 0; i < domains.length; i += batchSize) {
    const chunk = domains.slice(i, i + batchSize);
    const chunkResults = await Promise.all(chunk.map((d) => checkDomainApi(d)));
    chunkResults.forEach((res) => { results[res.domain] = res; });
  }
  return results;
}

export default {
  checkDomain: checkDomainApi,
  checkMultipleDomains: checkMultipleDomainsApi,
  getBootstrap,
};
