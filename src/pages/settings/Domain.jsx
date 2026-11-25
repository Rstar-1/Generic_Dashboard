import React, { useState, useCallback, useMemo, useEffect, useRef } from "react";
import { Navigate } from "react-router-dom";
import Icon from "../../components/common/Icon";
import Button from "../../components/common/Button";
import Container from "../../components/common/Container";
import { showToast } from "../../components/common/Toast";
import { useDomain } from "../../feature/domainSlice";
import { ROLE_ACCESS_CONFIG } from "../../utils/apiData";
import { useCurrentUser, canAccessPage, hasPermission, getFirstAllowedRoute } from "../../utils";

export { ROLE_ACCESS_CONFIG };

const EXTENSION_LEFT = [".in", ".io", ".co", ".org", ".dev", ".tech", ".store"];
const EXTENSION_RIGHT = [".co.in", ".ai", ".net", ".app", ".xyz", ".online"];
const IDEA_PREFIX_LEFT = ["get", "use", "my"];
const IDEA_PREFIX_RIGHT = ["try", "go", "join"];

const StatusBadge = React.memo(({ status, isLoading, onCheck }) => {
  if (isLoading) {
    return (
      <span className="mini-text inline-flex items-center gap-4 text-gray select-none">
        <span
          className="inline-block"
          style={{
            width: "10px",
            height: "10px",
            border: "2px solid #cbd5e1",
            borderTopColor: "#2563eb",
            borderRadius: "50%",
            animation: "spin 0.8s linear infinite",
          }}
        />
        Checking...
      </span>
    );
  }
  if (status === "available") {
    return (
      <span className="mini-text font-600 inline-flex items-center gap-4 select-none" style={{ color: "#10b981" }}>
        <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#10b981" }} />
        Available
      </span>
    );
  }
  if (status === "registered") {
    return (
      <span className="mini-text font-500 inline-flex items-center gap-4 select-none" style={{ color: "#ef4444" }}>
        <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#ef4444" }} />
        Registered
      </span>
    );
  }
  if (status === "unsupported") {
    return <span className="mini-text text-gray select-none" title="RDAP not available for this TLD">Unsupported</span>;
  }
  return (
    <button
      type="button"
      onClick={onCheck}
      className="mini-text text-gray bg-transparent border-0 cursor-pointer p-0 hover:text-dark transition-colors"
      title="Click to check live registration status via RDAP"
    >
      Unverified
    </button>
  );
});
StatusBadge.displayName = "StatusBadge";

const DomainRow = React.memo(({ domain, result, isLoading, isStarred, isCopied, onToggleStar, onCopy, onCheck }) => (
  <div
    className="bg-white rounded-8 px-16 py-12 flex items-center justify-between mb-8 transition-all hover:border-gray"
    style={{ border: "1px solid #eef2f6", boxShadow: "0 1px 2px rgba(15, 23, 42, 0.02)" }}
  >
    <span className="font-600 text-dark small-text select-text">{domain}</span>
    <div className="flex items-center gap-12">
      <StatusBadge status={result?.status} isLoading={isLoading} onCheck={() => onCheck(domain)} />
      <button
        type="button"
        onClick={() => onToggleStar(domain)}
        className="flex items-center justify-center p-2 border-0 bg-transparent cursor-pointer transition-transform active:scale-90"
        title={isStarred ? "Remove from favorites" : "Save to favorites"}
      >
        <Icon name="Star" width="14" height="14" stroke={isStarred ? "#f59e0b" : "#cbd5e1"} fill={isStarred ? "#f59e0b" : "none"} />
      </button>
      <button
        type="button"
        onClick={() => onCopy(domain)}
        className="flex items-center justify-center p-2 border-0 bg-transparent cursor-pointer transition-transform active:scale-90"
        title="Copy domain name"
      >
        <Icon name={isCopied ? "Check" : "CopyLink"} width="14" height="14" stroke={isCopied ? "#10b981" : "#94a3b8"} />
      </button>
    </div>
  </div>
));
DomainRow.displayName = "DomainRow";

const Domain = () => {
  const { user, role } = useCurrentUser();
  const isAuthorized = canAccessPage(user || role, "Domain") || hasPermission(user || role, "view_domain");

  const {
    searchQuery,
    domainResults,
    loadingDomains,
    starredDomains,
    checkDomain,
    checkBatchDomains,
    setSearchQuery,
    toggleStarDomain,
  } = useDomain();

  const [copiedDomain, setCopiedDomain] = useState("");
  const [shareCopied, setShareCopied] = useState(false);
  const [filterMode, setFilterMode] = useState("all");
  const inputRef = useRef(null);

  const cleanQuery = useMemo(() => {
    return (searchQuery || "").trim().toLowerCase().replace(/[^a-z0-9-]/g, "");
  }, [searchQuery]);

  const primaryDomain = cleanQuery ? `${cleanQuery}.com` : "";

  const extensionsLeft = useMemo(() => (!cleanQuery ? [] : EXTENSION_LEFT.map((ext) => `${cleanQuery}${ext}`)), [cleanQuery]);
  const extensionsRight = useMemo(() => (!cleanQuery ? [] : EXTENSION_RIGHT.map((ext) => `${cleanQuery}${ext}`)), [cleanQuery]);
  const ideasLeft = useMemo(() => (!cleanQuery ? [] : IDEA_PREFIX_LEFT.map((pre) => `${pre}${cleanQuery}.com`)), [cleanQuery]);
  const ideasRight = useMemo(() => (!cleanQuery ? [] : IDEA_PREFIX_RIGHT.map((pre) => `${pre}${cleanQuery}.com`)), [cleanQuery]);

  const handleCheckAll = useCallback(() => {
    if (!cleanQuery || !primaryDomain) {
      showToast("Please enter a domain name to check availability", "info");
      return;
    }
    checkBatchDomains([primaryDomain, ...extensionsLeft, ...extensionsRight, ...ideasLeft, ...ideasRight]);
    showToast("Checking live RDAP status for domains...", "info");
  }, [cleanQuery, primaryDomain, extensionsLeft, extensionsRight, ideasLeft, ideasRight, checkBatchDomains]);

  useEffect(() => {
    if (!cleanQuery || !primaryDomain) return;
    const timer = setTimeout(() => {
      if (cleanQuery && primaryDomain && !domainResults[primaryDomain]) {
        checkDomain(primaryDomain);
      }
    }, 600);
    return () => clearTimeout(timer);
  }, [cleanQuery, primaryDomain, domainResults, checkDomain]);

  const handleCopy = useCallback((domain) => {
    if (navigator?.clipboard) navigator.clipboard.writeText(domain);
    setCopiedDomain(domain);
    showToast(`Copied ${domain} to clipboard!`, "success");
    setTimeout(() => setCopiedDomain((curr) => (curr === domain ? "" : curr)), 2000);
  }, []);

  const handleShare = useCallback(() => {
    if (navigator?.clipboard) navigator.clipboard.writeText(window.location.href);
    setShareCopied(true);
    showToast("Search link copied to clipboard!", "success");
    setTimeout(() => setShareCopied(false), 2000);
  }, []);

  const handleFilter = useCallback(() => {
    setFilterMode((prev) => {
      const modes = ["all", "available", "registered", "starred"];
      const next = modes[(modes.indexOf(prev) + 1) % modes.length];
      showToast(`Filter: ${next.charAt(0).toUpperCase() + next.slice(1)} only`, "info");
      return next;
    });
  }, []);

  const matchesFilter = useCallback((d) => {
    if (filterMode === "all") return true;
    if (filterMode === "starred") return starredDomains.includes(d);
    const res = domainResults[d];
    return filterMode === "available" ? res?.status === "available" : res?.status === "registered";
  }, [filterMode, starredDomains, domainResults]);

  const filteredExtLeft = useMemo(() => extensionsLeft.filter(matchesFilter), [extensionsLeft, matchesFilter]);
  const filteredExtRight = useMemo(() => extensionsRight.filter(matchesFilter), [extensionsRight, matchesFilter]);
  const filteredIdeasLeft = useMemo(() => ideasLeft.filter(matchesFilter), [ideasLeft, matchesFilter]);
  const filteredIdeasRight = useMemo(() => ideasRight.filter(matchesFilter), [ideasRight, matchesFilter]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const isInputFocused = document.activeElement?.tagName === "INPUT";
      if (e.key === "/" && !isInputFocused) {
        e.preventDefault();
        inputRef.current?.focus();
      } else if (e.key === "Enter" && isInputFocused && primaryDomain) {
        handleCopy(primaryDomain);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [primaryDomain, handleCopy]);

  if (!isAuthorized) {
    return <Navigate to={getFirstAllowedRoute(user || role)} replace />;
  }

  return (
    <Container version="v4" className="w-full" style={{ height: "calc(100vh - 60px)" }}>
      <div className="p-15">
        <div className="w-90">
          <h2 className="mid-text text-primary font-500">Domain Checker</h2>

          <div className="mb-18 mt-8 flex items-center justify-between">
            <div className="inline-flex items-center gap-6 rounded-20 px-12 py-4" style={{ backgroundColor: "#f0f5ff", border: "1px solid #dbeafe" }}>
              <span style={{ color: "#2563eb", fontSize: "12px", lineHeight: 1 }}>✦</span>
              <span className="mini-text font-500" style={{ color: "#2563eb", fontSize: "11.5px" }}>
                Real-time results powered by live ICANN/RDAP data
              </span>
            </div>
            <button
              type="button"
              onClick={handleCheckAll}
              className="mini-text font-500 text-primary cursor-pointer border-0 bg-transparent hover:underline"
              title="Check registration status for all listed extensions"
            >
              Check All Live
            </button>
          </div>

          <div className="relative w-full mb-8">
            <div
              className="flex items-center w-full bg-white rounded-8"
              style={{ border: "1px solid #cbd5e1", boxShadow: "0 1px 2px rgba(15, 23, 42, 0.04)", height: "46px" }}
            >
              <div className="flex items-center justify-center pl-14 pr-6 pointer-events-none text-gray">
                <Icon name="Search" width="18" height="18" stroke="#64748b" />
              </div>
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search domain name (e.g. ashmita, mybrand)..."
                autoFocus
                spellCheck={false}
                className="w-full bg-transparent text-dark font-500"
                style={{ height: "100%", fontSize: "14px", border: "none", outline: "none", padding: "0 40px 0 6px" }}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => { setSearchQuery(""); inputRef.current?.focus(); }}
                  title="Clear search"
                  className="cursor-pointer border-0 flex items-center justify-center p-0"
                  style={{
                    position: "absolute",
                    right: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "#f1f5f9",
                    borderRadius: "50%",
                    width: "22px",
                    height: "22px",
                  }}
                >
                  <Icon name="Close" width="12" height="12" stroke="#475569" strokeWidth="2.5" />
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center gap-14 mb-18 text-gray mini-text">
            <div className="flex items-center gap-4">
              <kbd className="border rounded-4 font-600 mini-text text-gray px-6 py-2" style={{ backgroundColor: "#f8fafc" }}>/</kbd>
              <span style={{ fontSize: "11.5px" }}>to focus</span>
            </div>
            <div className="flex items-center gap-4">
              <kbd className="border rounded-4 font-600 mini-text text-gray px-6 py-2" style={{ backgroundColor: "#f8fafc" }}>↵</kbd>
              <span style={{ fontSize: "11.5px" }}>to copy top available</span>
            </div>
          </div>

          {!cleanQuery ? (
            <div className="bg-white rounded-10 py-50 px-20 text-center mt-14" style={{ border: "1px solid #e2e8f0" }}>
              <p className="head-text text-gray" style={{ fontSize: "36px", marginBottom: "8px" }}>🔍</p>
              <p className="text-gray small-text font-500 m-0">No data found .</p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-12">
                <div className="small-text font-400 text-gray" style={{ fontSize: "13px" }}>
                  Availability for <span className="font-700 text-dark">{cleanQuery}</span>
                  {filterMode !== "all" && (
                    <span className="ml-8 px-6 py-2 rounded-4 mini-text font-500" style={{ backgroundColor: "#f1f5f9", color: "#475569" }}>
                      Filtered: {filterMode}
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={handleShare}
                  className="flex items-center gap-6 border-0 bg-transparent cursor-pointer mini-text font-500"
                  style={{ color: shareCopied ? "#10b981" : "#64748b" }}
                >
                  <Icon name={shareCopied ? "Check" : "ExternalLink"} width="12" height="12" stroke={shareCopied ? "#10b981" : "#64748b"} />
                  <span>{shareCopied ? "Copied" : "Share"}</span>
                </button>
              </div>

              {/* Primary Hero Card */}
              <div
                className="bg-white rounded-10 p-20 mb-14 flex items-center justify-between"
                style={{ border: "1px solid #e2e8f0", boxShadow: "0 2px 4px rgba(15, 23, 42, 0.03)" }}
              >
                <div>
                  <h3 className="headpara-text font-700 text-dark m-0" style={{ fontSize: "20px", lineHeight: 1.2 }}>{primaryDomain}</h3>
                  <div className="mt-4">
                    <StatusBadge
                      status={domainResults[primaryDomain]?.status}
                      isLoading={Boolean(loadingDomains[primaryDomain])}
                      onCheck={() => checkDomain(primaryDomain)}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-8">
                  <Button version="icon" variant="outline" bg="transparent" color="gray" onClick={handleFilter} title="Filter domains">
                    <Icon name="Filter" width="13" height="13" stroke="#64748b" />
                  </Button>
                  <Button version="icon" variant="outline" bg="transparent" color="gray" onClick={() => handleCopy(primaryDomain)} title="Copy primary domain">
                    <Icon name={copiedDomain === primaryDomain ? "Check" : "CopyLink"} width="13" height="13" stroke={copiedDomain === primaryDomain ? "#10b981" : "#64748b"} />
                  </Button>
                  <Button version="icon" variant="outline" bg="transparent" color="gray" onClick={() => toggleStarDomain(primaryDomain)} title="Favorite primary domain">
                    <Icon name="Star" width="13" height="13" stroke={starredDomains.includes(primaryDomain) ? "#f59e0b" : "#64748b"} fill={starredDomains.includes(primaryDomain) ? "#f59e0b" : "none"} />
                  </Button>
                </div>
              </div>

              {/* Extensions Grid */}
              <div className="grid grid-cols-2 gap-12 sm-grid-cols-1 mb-20">
                <div>
                  {filteredExtLeft.map((d) => (
                    <DomainRow
                      key={d}
                      domain={d}
                      result={domainResults[d]}
                      isLoading={Boolean(loadingDomains[d])}
                      isStarred={starredDomains.includes(d)}
                      isCopied={copiedDomain === d}
                      onToggleStar={toggleStarDomain}
                      onCopy={handleCopy}
                      onCheck={checkDomain}
                    />
                  ))}
                </div>
                <div>
                  {filteredExtRight.map((d) => (
                    <DomainRow
                      key={d}
                      domain={d}
                      result={domainResults[d]}
                      isLoading={Boolean(loadingDomains[d])}
                      isStarred={starredDomains.includes(d)}
                      isCopied={copiedDomain === d}
                      onToggleStar={toggleStarDomain}
                      onCopy={handleCopy}
                      onCheck={checkDomain}
                    />
                  ))}
                </div>
              </div>

              {/* Ideas Section */}
              <div className="mt-20">
                <div className="flex items-center gap-6 mb-12">
                  <span style={{ color: "#f59e0b", fontSize: "14px", lineHeight: 1 }}>⚡</span>
                  <h4 className="small-text font-600 text-dark m-0" style={{ color: "#334155" }}>More ideas you might like</h4>
                </div>
                <div className="grid grid-cols-2 gap-12 sm-grid-cols-1">
                  <div>
                    {filteredIdeasLeft.map((d) => (
                      <DomainRow
                        key={d}
                        domain={d}
                        result={domainResults[d]}
                        isLoading={Boolean(loadingDomains[d])}
                        isStarred={starredDomains.includes(d)}
                        isCopied={copiedDomain === d}
                        onToggleStar={toggleStarDomain}
                        onCopy={handleCopy}
                        onCheck={checkDomain}
                      />
                    ))}
                  </div>
                  <div>
                    {filteredIdeasRight.map((d) => (
                      <DomainRow
                        key={d}
                        domain={d}
                        result={domainResults[d]}
                        isLoading={Boolean(loadingDomains[d])}
                        isStarred={starredDomains.includes(d)}
                        isCopied={copiedDomain === d}
                        onToggleStar={toggleStarDomain}
                        onCopy={handleCopy}
                        onCheck={checkDomain}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </Container>
  );
};

export default React.memo(Domain);
