/**
 * Service to interact with the Bot_Backend system-service.
 * Communicates with the Gateway (port 8000) with automatic fallback to System Service directly (port 8002).
 */

const GATEWAY_URL = import.meta.env.VITE_GATEWAY_URL || "http://localhost:8000";
const SYSTEM_SERVICE_URL = import.meta.env.VITE_SYSTEM_SERVICE_URL || "http://localhost:8002";

/**
 * Generic fetcher that tries the Gateway proxy first, then falls back to direct service URL.
 */
async function fetchWithFallback(gatewayPath, directPath, options = {}) {
  const endpoints = [
    `${GATEWAY_URL}${gatewayPath}`,
    `${SYSTEM_SERVICE_URL}${directPath}`,
  ];

  let lastError = null;
  for (const url of endpoints) {
    try {
      const res = await fetch(url, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          ...(options.headers || {}),
        },
        signal: AbortSignal.timeout(4000),
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (err) {
      lastError = err;
    }
  }

  throw lastError || new Error(`Failed to fetch from ${gatewayPath}`);
}

/**
 * Fetch master audio volume and mute status from Windows system service.
 */
export async function getSystemAudio() {
  return fetchWithFallback("/api/system/audio", "/api/v1/system/audio");
}

/**
 * Set master audio volume percentage (0-100) on Windows host.
 */
export async function setSystemVolume(volume) {
  return fetchWithFallback("/api/system/audio/volume", "/api/v1/system/audio/volume", {
    method: "POST",
    body: JSON.stringify({ volume: Number(volume) }),
  });
}

/**
 * Set or toggle master audio mute on Windows host.
 */
export async function setSystemMute(muted = null) {
  return fetchWithFallback("/api/system/audio/mute", "/api/v1/system/audio/mute", {
    method: "POST",
    body: JSON.stringify(muted !== null ? { muted: Boolean(muted) } : {}),
  });
}

/**
 * Fetch system performance metrics (CPU, RAM, Disk).
 */
export async function getSystemMetrics() {
  return fetchWithFallback("/api/system/metrics", "/api/v1/system/metrics");
}

/**
 * Fetch system OS, host, architecture, and uptime info.
 */
export async function getSystemInfo() {
  return fetchWithFallback("/api/system/info", "/api/v1/system/info");
}

/**
 * Fetch system service health status.
 */
export async function getSystemHealth() {
  return fetchWithFallback("/api/system/health", "/api/v1/system/health");
}

/**
 * Fetch top running processes on the host.
 */
export async function getSystemProcesses(limit = 5) {
  return fetchWithFallback(`/api/system/processes?limit=${limit}`, `/api/v1/system/processes?limit=${limit}`);
}

/**
 * Fetch consolidated system overview (os, cpu, memory, disk, network, system).
 */
export async function getSystemOverview() {
  return fetchWithFallback("/api/system/overview", "/api/v1/system/overview");
}

/**
 * Consolidated fetcher for all system data in parallel.
 */
export async function getAllSystemData() {
  const [metricsResult, infoResult, healthResult] = await Promise.allSettled([
    getSystemMetrics(),
    getSystemInfo(),
    getSystemHealth(),
  ]);

  return {
    metrics: metricsResult.status === "fulfilled" ? metricsResult.value : null,
    info: infoResult.status === "fulfilled" ? infoResult.value : null,
    health: healthResult.status === "fulfilled" ? healthResult.value : null,
    error: metricsResult.status === "rejected" ? metricsResult.reason?.message : null,
  };
}
