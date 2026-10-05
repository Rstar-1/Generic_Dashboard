/**
 * API service for communicating with Bot Backend (Gateway & AI Service)
 * Supports Grok chat completions, model discovery, health checks, and Web Speech TTS.
 */

const GATEWAY_URL = import.meta.env.VITE_GATEWAY_URL || "http://localhost:8000";
const AI_SERVICE_URL = import.meta.env.VITE_AI_SERVICE_URL || "http://localhost:8001";

/**
 * Send chat request to backend with automatic fallback from Gateway to AI Service.
 */
export const sendChatMessage = async ({ messages, model = "gemini-2.5-flash", temperature = 0.7, maxTokens = 8192, systemPrompt }) => {
  const payload = {
    messages: messages.map((m) => ({
      role: m.role,
      content: m.content,
    })),
    model,
    temperature,
    max_tokens: maxTokens,
    system_prompt: systemPrompt || "You are Barasingha AI, an advanced, highly intelligent command assistant powered by Google Gemini. Always provide complete, thorough, comprehensive, and unabridged responses. Never truncate lists, JSON, code, or data unless explicitly requested to summarize.",
  };

  // Try Gateway proxy first, then direct AI service
  const endpoints = [
    `${GATEWAY_URL}/api/ai/chat`,
    `${AI_SERVICE_URL}/api/v1/ai/chat`,
  ];

  let lastError = null;

  for (const endpoint of endpoints) {
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || errorData.error || `HTTP ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (err) {
      lastError = err;
      // continue to next endpoint
    }
  }

  throw lastError || new Error("Failed to reach Bot Backend AI Service.");
};

/**
 * Fetch available models from backend.
 */
export const fetchAIModels = async () => {
  const endpoints = [
    `${GATEWAY_URL}/api/ai/models`,
    `${AI_SERVICE_URL}/api/v1/ai/models`,
  ];

  for (const endpoint of endpoints) {
    try {
      const response = await fetch(endpoint);
      if (response.ok) {
        return await response.json();
      }
    } catch {
      // try next
    }
  }

  return [
    { id: "gemini-2.5-flash", name: "Gemini 2.5 Flash (Google)", provider: "gemini" },
    { id: "gemini-3.5-flash", name: "Gemini 3.5 Flash (Google)", provider: "gemini" },
    { id: "gemini-3.8-flash", name: "Gemini 3.8 Flash (Google)", provider: "gemini" },
    { id: "grok-beta", name: "Grok Beta (xAI)", provider: "xai" },
    { id: "grok-2-latest", name: "Grok 2 Latest (xAI)", provider: "xai" },
  ];
};

/**
 * Check backend health status.
 */
export const checkHealth = async () => {
  try {
    const res = await fetch(`${GATEWAY_URL}/api/health`, { signal: AbortSignal.timeout(3000) });
    if (res.ok) {
      const data = await res.json();
      return { connected: true, status: data.overall_status || "healthy", via: "gateway" };
    }
  } catch {
    // try ai service directly
  }

  try {
    const res = await fetch(`${AI_SERVICE_URL}/api/v1/ai/health`, { signal: AbortSignal.timeout(3000) });
    if (res.ok) {
      return { connected: true, status: "healthy", via: "ai-service" };
    }
  } catch {
    // failed
  }

  return { connected: false, status: "offline", via: null };
};

/**
 * Text-to-Speech synthesizer using Web Speech API
 */
export const speechSynth = {
  isSupported: typeof window !== "undefined" && "speechSynthesis" in window,

  speak(text, { onStart, onEnd, onError } = {}) {
    if (!this.isSupported || !text) return;

    this.stop();

    // Clean markdown/special characters for speech
    const cleanText = text
      .replace(/\[.*?\]/g, "")
      .replace(/[`*_~#]/g, "")
      .replace(/https?:\/\/\S+/g, "link")
      .trim();

    if (!cleanText) return;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.05;
    utterance.pitch = 0.95;

    // Pick an English voice if available
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find((v) => v.lang.startsWith("en") && (v.name.includes("Google") || v.name.includes("Natural") || v.name.includes("David") || v.name.includes("Alex")));
    if (preferredVoice) utterance.voice = preferredVoice;

    if (onStart) utterance.onstart = onStart;
    if (onEnd) utterance.onend = onEnd;
    if (onError) utterance.onerror = onError;

    window.speechSynthesis.speak(utterance);
  },

  stop() {
    if (this.isSupported) {
      window.speechSynthesis.cancel();
    }
  },
};
