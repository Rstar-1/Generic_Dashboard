import React, { useState, useCallback, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../../components/common/Container";
import Badge from "../../components/common/Badge";
import Icon from "../../components/common/Icon";
import Button from "../../components/common/Button";
import Fields from "../../components/forms/Fields";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { canAccessPage, useCurrentUser } from "../../utils";

/* ==========================================================================
   STATIC MOCK DATA
   ========================================================================== */

const CAMPAIGN_DATA = [
  {
    id: "whatsapp",
    title: "WhatsApp Campaign",
    channel: "whatsapp",
    totalSent: "28,450",
    deliveredValue: 98.8,
    metrics: [
      { label: "Delivered", val: "98.8%" },
      { label: "Read Rate", val: "89.2%" },
      { label: "Response", val: "34.8%" },
    ],
  },
  {
    id: "gmail",
    title: "Gmail Campaign",
    channel: "gmail",
    totalSent: "19,820",
    deliveredValue: 99.4,
    metrics: [
      { label: "Delivered", val: "99.4%" },
      { label: "Open Rate", val: "44.6%" },
      { label: "CTR", val: "18.2%" },
    ],
  },
  {
    id: "sms",
    title: "SMS Campaign",
    channel: "sms",
    totalSent: "12,340",
    deliveredValue: 99.1,
    metrics: [
      { label: "Delivered", val: "99.1%" },
      { label: "Click Rate", val: "22.4%" },
      { label: "Segments", val: "1.2 / msg" },
    ],
  },
];

const TOP_5_STATES = [
  {
    id: "maharashtra",
    name: "Maharashtra",
    hub: "Mumbai",
    subtitle: "Hub: Mumbai • 8 Top Cities",
    displayIndex: 1,
    lat: 19.7515,
    lng: 75.7139,
  },
  {
    id: "gujarat",
    name: "Gujarat",
    hub: "Ahmedabad",
    subtitle: "Hub: Ahmedabad • 8 Top Cities",
    displayIndex: 2,
    lat: 22.2587,
    lng: 71.1924,
  },
  {
    id: "karnataka",
    name: "Karnataka",
    hub: "Bengaluru",
    subtitle: "Hub: Bengaluru • 8 Top Cities",
    displayIndex: 3,
    lat: 15.3173,
    lng: 75.7139,
  },
  {
    id: "andhra-pradesh",
    name: "Andhra Pradesh",
    hub: "Visakhapatnam",
    subtitle: "Hub: Visakhapatnam • 8 Top...",
    displayIndex: 4,
    lat: 15.9129,
    lng: 79.74,
  },
  {
    id: "west-bengal",
    name: "West Bengal",
    hub: "Kolkata",
    subtitle: "Hub: Kolkata • 8 Top Cities",
    displayIndex: 5,
    lat: 22.9868,
    lng: 87.855,
  },
];

/* ==========================================================================
   ANIMATED ORBITAL RADAR (ENLARGED & ROTATING)
   ========================================================================== */

const OrbitalRadar = React.memo(() => (
  <div
    className="relative flex items-center justify-center"
    style={{ width: "100%", maxWidth: 500, height: 500 }}
  >
    <style>{`
      @keyframes orbitCW { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      @keyframes orbitCCW { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
      @keyframes radarSweep { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      @keyframes radarPulse { 0%, 100% { box-shadow: 0 0 16px rgba(99,102,241,0.3); } 50% { box-shadow: 0 0 32px rgba(99,102,241,0.7); } }
    `}</style>

    <svg
      width="100%"
      height="100%"
      viewBox="0 0 500 500"
      fill="none"
      className="overflow-visible"
    >
      <defs>
        <radialGradient
          id="radarSweepGlow"
          cx="250"
          cy="250"
          r="236"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#6366f1" stopOpacity="0.35" />
          <stop offset="65%" stopColor="#38bdf8" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#0d111a" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Axis Lines */}
      <line x1="250" y1="10" x2="250" y2="490" stroke="#1e293b" strokeDasharray="3 4" strokeWidth="1.2" opacity="0.75" />
      <line x1="10" y1="250" x2="490" y2="250" stroke="#1e293b" strokeDasharray="3 4" strokeWidth="1.2" opacity="0.75" />

      {/* Static Concentric Circles */}
      <circle cx="250" cy="250" r="236" stroke="#334155" strokeDasharray="3 4" strokeWidth="1.4" opacity="0.65" />
      <circle cx="250" cy="250" r="165" stroke="#334155" strokeDasharray="3 4" strokeWidth="1.4" opacity="0.75" />
      <circle cx="250" cy="250" r="105" stroke="#475569" strokeDasharray="3 4" strokeWidth="1.4" opacity="0.85" />

      {/* Tier Labels */}
      <text x="250" y="14" fill="#94a3b8" fontSize="11" fontWeight="700" textAnchor="middle" letterSpacing="1">TIER 3</text>
      <text x="250" y="80" fill="#94a3b8" fontSize="11" fontWeight="700" textAnchor="middle" letterSpacing="1">TIER 2</text>
      <text x="250" y="140" fill="#94a3b8" fontSize="11" fontWeight="700" textAnchor="middle" letterSpacing="1">TIER 1</text>

      {/* Continuous Radar Sweep Beam */}
      <g style={{ transformOrigin: "250px 250px", animation: "radarSweep 12s linear infinite" }}>
        <path d="M 250 250 L 486 250 A 236 236 0 0 0 417 83 Z" fill="url(#radarSweepGlow)" opacity="0.65" />
        <line x1="250" y1="250" x2="486" y2="250" stroke="#818cf8" strokeWidth="2" opacity="0.85" />
      </g>

      {/* Solid Ray from Center to Bottom-Left Ring on Tier 3 */}
      <line x1="250" y1="250" x2="75" y2="412" stroke="#818cf8" strokeWidth="2" opacity="0.85" />

      {/* Rotating Tier 3 Nodes (CW 48s) */}
      <g style={{ transformOrigin: "250px 250px", animation: "orbitCW 48s linear infinite" }}>
        <circle cx="250" cy="14" r="4.5" fill="#ef4444" />
        <circle cx="431" cy="98" r="4" fill="#ef4444" />
        <circle cx="486" cy="250" r="6" fill="none" stroke="#94a3b8" strokeWidth="1.8" />
        <circle cx="454" cy="368" r="4.5" fill="#f59e0b" />
        <circle cx="311" cy="478" r="4.5" fill="#ef4444" />
        <circle cx="75" cy="412" r="6" fill="none" stroke="#94a3b8" strokeWidth="1.8" />
        <circle cx="22" cy="311" r="4.5" fill="#f97316" />
        <circle cx="57" cy="115" r="4.5" fill="#f97316" />
      </g>

      {/* Rotating Tier 2 Nodes (CCW 38s) */}
      <g style={{ transformOrigin: "250px 250px", animation: "orbitCCW 38s linear infinite" }}>
        <circle cx="264" cy="86" r="4" fill="#f97316" />
        <circle cx="367" cy="133" r="6" fill="none" stroke="#94a3b8" strokeWidth="1.8" />
        <circle cx="413" cy="221" r="4.5" fill="#ef4444" />
        <circle cx="405" cy="306" r="4.5" fill="#f97316" />
        <circle cx="356" cy="376" r="4" fill="#f59e0b" />
        <circle cx="168" cy="393" r="4.5" fill="#ef4444" />
        <circle cx="91" cy="293" r="4.5" fill="#f97316" />
        <circle cx="100" cy="180" r="4" fill="#f59e0b" />
      </g>

      {/* Rotating Tier 1 Nodes (CW 28s) */}
      <g style={{ transformOrigin: "250px 250px", animation: "orbitCW 28s linear infinite" }}>
        <circle cx="324" cy="176" r="4.5" fill="#ef4444" />
        <circle cx="351" cy="277" r="4.5" fill="#f97316" />
        <circle cx="176" cy="324" r="4" fill="#ef4444" />
        <circle cx="147" cy="232" r="4.5" fill="#f97316" />
        <circle cx="183" cy="170" r="4" fill="#f59e0b" />
      </g>

      {/* Dashed Leader Lines to Badges */}
      <line x1="70" y1="160" x2="160" y2="160" stroke="#cbd5e1" strokeWidth="1.3" strokeDasharray="3 3" opacity="0.85" />
      <line x1="65" y1="315" x2="155" y2="315" stroke="#cbd5e1" strokeWidth="1.3" strokeDasharray="3 3" opacity="0.85" />
    </svg>

    {/* CloudMind Badge */}
    <div
      className="absolute bg-white rounded-20 px-12 py-6 flex items-center gap-9 d-shadow cursor-pointer select-none"
      style={{ top: "26%", left: "0%", zIndex: 12 }}
    >
      <span className="font-600 text-dark small-text">CloudMind</span>
      <span className="font-700 text-danger small-text">81</span>
    </div>

    {/* Acme AI Badge */}
    <div
      className="absolute bg-white rounded-20 px-12 py-6 flex items-center gap-9 d-shadow cursor-pointer select-none"
      style={{ top: "58%", left: "-2%", zIndex: 12 }}
    >
      <span className="font-600 text-dark small-text">Acme AI</span>
      <span className="font-700 text-warning small-text">64</span>
    </div>

    {/* Center Core: 412 vendors */}
    <div
      className="absolute rounded-full flex flex-column items-center justify-center bg-dark cursor-pointer select-none"
      style={{
        width: 96,
        height: 96,
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 14,
        animation: "radarPulse 3s ease-in-out infinite",
        boxShadow: "0 0 28px rgba(99,102,241,0.5)",
      }}
      title="Total 412 active vendors"
    >
      <span className="font-700 text-white leading-tight" style={{ fontSize: "22px" }}>412</span>
      <span className="text-white mini-text text-muted font-400 mt-2">vendors</span>
    </div>
  </div>
));
OrbitalRadar.displayName = "OrbitalRadar";

/* ==========================================================================
   CAMPAIGN ANALYTICS (WHATSAPP, GMAIL, SMS)
   ========================================================================== */

const CampaignAnalyticsSection = React.memo(({ onNavigateChannel }) => {
  const { user: currentUser, role: userRole } = useCurrentUser();
  const visibleCampaigns = React.useMemo(() => {
    return CAMPAIGN_DATA.filter((camp) => canAccessPage(currentUser || userRole, camp.title, "Campaign"));
  }, [currentUser, userRole]);

  return (
    <div className={`grid-cols-${Math.max(1, Math.min(visibleCampaigns.length, 3))} gap-9`}>
      {visibleCampaigns.map((camp) => (
        <div
          key={camp.id}
          onClick={() => onNavigateChannel(camp.channel)}
          className="rounded-5 p-13 bg-white cursor-pointer"
        >
          <div>
            <Badge text="active" variant="dot" size="sm" className="font-500 capitalize" />
            <h4 className="mid-text font-600 text-dark capitalize mt-2">{camp.title}</h4>
            <p className="mini-text text-gray mt-2">Total messages delivered this cycle</p>
          </div>

          <div className="bg-forth p-10 rounded-5 mt-8">
            <h5 className="title-text font-600 text-dark">{camp.totalSent}</h5>

            <div className="w-full bg-forth my-6 overflow-hidden" style={{ height: "6px" }}>
              <div
                className="rounded-5 bg-success"
                style={{ width: `${camp.deliveredValue}%`, height: "100%" }}
              />
            </div>

            <div className="grid-cols-3 gap-9 bordh mt-10 pt-8">
              {camp.metrics.map((m) => (
                <div key={m.label}>
                  <p className="text-gray font-500 mini-text">{m.label}</p>
                  <p className="font-600 text-dark small-text mt-1">{m.val}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
});
CampaignAnalyticsSection.displayName = "CampaignAnalyticsSection";

/* ==========================================================================
   MAP SECTION (LEAFLET MAP - TOP 5 STATES MATCHING LOCATION.JSX)
   ========================================================================== */

const createLocationMarkerIcon = (item, isSelected) =>
  L.divIcon({
    className: "custom-journey-marker-container",
    html: `
      <div style="position: relative; display: flex; flex-direction: column; align-items: center; cursor: pointer; pointer-events: auto;">
        <div style="
          background: #ffffff;
          padding: 4px 10px;
          border-radius: 6px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.15);
          border: 1px solid ${isSelected ? "#2563eb" : "#e2e8f0"};
          text-align: center;
          white-space: nowrap;
          margin-bottom: 5px;
          transition: all 0.2s ease;
          transform: ${isSelected ? "scale(1.05)" : "scale(1)"};
        ">
          <div style="font-weight: 700; font-size: 11px; color: #0f172a; line-height: 13px;">${item.name}</div>
          <div style="font-size: 8.5px; color: #64748b; line-height: 11px;">Hub: ${item.hub}</div>
        </div>
        <div style="
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: ${isSelected ? "#2563eb" : "#db5e1f"};
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 11px;
          border: 2px solid #ffffff;
          box-shadow: 0 0 0 ${isSelected ? "3px #2563eb" : "2px rgba(0,0,0,0.18)"};
          transition: all 0.2s ease;
        ">
          ${item.displayIndex}
        </div>
      </div>
    `,
    iconSize: [120, 56],
    iconAnchor: [60, 56],
  });

const DashboardLocationCard = React.memo(({ item, isSelected, onSelect }) => (
  <div
    onClick={() => onSelect(item)}
    className={`p-10 cursor-pointer  rounded-5 ${isSelected ? "bg-primary rounded-5" : "bg-forth bordb"
      }`}
  >
    <div className="flex items-center gap-9 overflow-hidden">
      <div className="w-15">
        <div
          className={`rounded-5 flex items-center justify-center ${isSelected ? "bg-white" : "bg-tertiary"
            }`}
          style={{ height: '50px', width: '50px' }}
        >
          <p className={`font-500 para-text ${isSelected ? "text-dark" : "text-dark"}`}>
            {item.displayIndex}
          </p>
        </div>
      </div>

      <div className="w-85">
        <h6 className={`font-500 headmini-text line-clamp1 ${isSelected ? "text-white" : "text-dark"}`}>
          {item.name}
        </h6>
        <p className={`font-400 mini-text line-clamp1 mt-2 ${isSelected ? "text-white opacity-80" : "text-gray"}`}>
          {item.subtitle}
        </p>
      </div>

      <div className="flex items-center pr-4">
        <Icon
          name="ChevronRight"
          width="17"
          height="17"
          stroke={isSelected ? "var(--white)" : "var(--gray)"}
        />
      </div>
    </div>
  </div>
));
DashboardLocationCard.displayName = "DashboardLocationCard";

const MapSection = React.memo(() => {
  const [selectedStateId, setSelectedStateId] = useState("maharashtra");
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);
  const polylinesRef = useRef([]);

  // Initialize Leaflet Map focused directly on Maharashtra on first view
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const initialTarget = TOP_5_STATES[0]; // Maharashtra
    const map = L.map(mapContainerRef.current, {
      center: [initialTarget.lat, initialTarget.lng],
      zoom: 6,
      minZoom: 4,
      maxZoom: 10,
      zoomControl: false,
      attributionControl: false,
      scrollWheelZoom: false,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
    }).addTo(map);

    mapInstanceRef.current = map;

    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 200);

    return () => {
      clearTimeout(timer);
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Sync Markers and Route Lines when selectedStateId changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear previous markers & polylines
    markersRef.current.forEach((m) => map.removeLayer(m));
    markersRef.current = [];
    polylinesRef.current.forEach((p) => map.removeLayer(p));
    polylinesRef.current = [];

    // Render journey route lines
    if (TOP_5_STATES.length >= 2) {
      const latLngs = TOP_5_STATES.map((s) => [s.lat, s.lng]);

      const outerLine = L.polyline(latLngs, {
        color: "#bfdbfe",
        weight: 5,
        opacity: 0.65,
        lineCap: "round",
        lineJoin: "round",
      }).addTo(map);

      const coreLine = L.polyline(latLngs, {
        color: "#2563eb",
        weight: 2,
        dashArray: "5, 7",
        opacity: 0.95,
      }).addTo(map);

      polylinesRef.current = [outerLine, coreLine];
    }

    // Render custom markers with selected state on top
    TOP_5_STATES.forEach((item) => {
      const isSelected = item.id === selectedStateId;
      const customIcon = createLocationMarkerIcon(item, isSelected);
      const marker = L.marker([item.lat, item.lng], {
        icon: customIcon,
        zIndexOffset: isSelected ? 1000 : 0,
      }).addTo(map);

      marker.on("click", (e) => {
        L.DomEvent.stopPropagation(e);
        setSelectedStateId(item.id);
        map.flyTo([item.lat, item.lng], 6, { duration: 0.8 });
      });

      markersRef.current.push(marker);
    });
  }, [selectedStateId]);

  const handleSelectState = useCallback((state) => {
    setSelectedStateId(state.id);
    const map = mapInstanceRef.current;
    if (map) {
      map.flyTo([state.lat, state.lng], 6, { duration: 0.8 });
    }
  }, []);

  return (
    <div
      className="relative bg-white p-10 rounded-5 gap-9 overflow-hidden"
    >
      <div className="pb-10 pt-5 rounded-5">
        <h4 className="font-500 text-dark mid-text capitalize">
          Geologically Your Business
        </h4>
      </div>
      <div className="grid-cols-2 gap-9 bordh pt-10">
        <div className="overflow-hidden h-350 z-10 border-white rounded-5">
          <div ref={mapContainerRef} style={{ width: "100%", height: "100%" }} />
        </div>

        <div className="grid-cols-1">
          {TOP_5_STATES.map((state) => (
            <DashboardLocationCard
              key={state.id}
              item={state}
              isSelected={selectedStateId === state.id}
              onSelect={handleSelectState}
            />
          ))}
        </div>
      </div>
    </div>
  );
});
MapSection.displayName = "MapSection";

/* ==========================================================================
   AI CHAT ASSISTANT CARD (LOOPAI, GPT CHAT, DEEP SEEK)
   ========================================================================== */

const AI_MODELS = [
  { id: "loopai", name: "LoopAI", icon: "Link" },
  { id: "gpt", name: "GPT Chat", icon: "AI" },
  { id: "deepseek", name: "Deep Seek", icon: "Sparkles" },
];

const AI_ACTIONS = [
  {
    id: "text",
    title: "Text Assistance",
    prompt: "Help me write a professional follow-up email...",
    iconName: "Clipboard",
    iconBg: "#10b981",
  },
  {
    id: "process",
    title: "Process Automation",
    prompt: "Automate delivery status tracking for new orders...",
    iconName: "Bot",
    iconBg: "#fb7185",
  },
  {
    id: "schedule",
    title: "Schedule Optimization",
    prompt: "Optimize supplier pickup schedules for this week...",
    iconName: "Clock",
    iconBg: "#f59e0b",
  },
  {
    id: "smart",
    title: "Smart Response",
    prompt: "Generate an automated smart reply for vendor inquiries...",
    iconName: "Support",
    iconBg: "#ec4899",
  },
];

const AiChatAssistantCard = React.memo(() => {
  const [activeModel, setActiveModel] = useState("loopai");
  const [prompt, setPrompt] = useState("");

  const handleSelectAction = useCallback((action) => {
    setPrompt(action.prompt);
  }, []);

  const handleSubmit = useCallback((e) => {
    e?.preventDefault?.();
    if (!prompt.trim()) return;
    setPrompt("");
  }, [prompt]);

  return (
    <div
      className="p-16 rounded-10 transition-all"
      style={{
        background: "linear-gradient(180deg, #eff4ff 0%, #edf2fe 50%, #f1f5fe 100%)",
        border: "1px solid #dbeafe",
        boxShadow: "0 2px 10px rgba(99, 102, 241, 0.05)",
      }}
    >
      {/* Header Greeting */}
      <div className="text-center mb-12">
        <p className="small-text font-500 text-gray flex items-center justify-center gap-4">
          Hi, Adam <span>👋</span>
        </p>
        <h3
          className="font-700 text-dark mt-4"
          style={{ fontSize: "20px", letterSpacing: "-0.4px" }}
        >
          How can I help you?
        </h3>
      </div>

      {/* Model Selector Tabs with Icon */}
      <div className="flex items-center justify-between gap-9 mb-12">
        {AI_MODELS.map((model) => {
          const isActive = activeModel === model.id;
          return (
            <button
              key={model.id}
              type="button"
              onClick={() => setActiveModel(model.id)}
              className="flex items-center gap-9 cursor-pointer border-0 transition-all select-none"
              style={{
                padding: "6px 12px",
                borderRadius: "20px",
                background: isActive ? "#ffffff" : "transparent",
                color: isActive ? "#1e293b" : "#64748b",
                fontWeight: isActive ? 600 : 500,
                fontSize: "12px",
                boxShadow: isActive ? "0 2px 6px rgba(0,0,0,0.06)" : "none",
              }}
            >
              <Icon
                name={model.icon}
                width="13"
                height="13"
                stroke={isActive ? "#4f46e5" : "currentColor"}
              />
              <span>{model.name}</span>
            </button>
          );
        })}
      </div>

      {/* 2x2 Feature Action Cards with Icon */}
      <div className="grid-cols-2 gap-9 mb-12">
        {AI_ACTIONS.map((action) => (
          <div
            key={action.id}
            onClick={() => handleSelectAction(action)}
            className="bg-white rounded-10 p-12 cursor-pointer transition-all hover:d-shadow select-none"
            style={{
              minHeight: "76px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              border: "1px solid rgba(226, 232, 240, 0.8)",
            }}
          >
            <div
              className="flex items-center justify-center text-white"
              style={{
                width: 22,
                height: 22,
                borderRadius: 6,
                background: action.iconBg,
              }}
            >
              <Icon name={action.iconName} width="13" height="13" stroke="#ffffff" />
            </div>
            <p
              className="font-600 text-dark leading-tight mt-8"
              style={{ fontSize: "12px" }}
            >
              {action.title}
            </p>
          </div>
        ))}
      </div>

      {/* Ask Something Input Bar with Fields */}
      <form onSubmit={handleSubmit} className="w-full">
        <Fields
          type="text"
          value={prompt}
          onChange={(val) => setPrompt(val)}
          placeholder="Ask something..."
          icon="Sparkles"
          iconPosition="right"
          border={false}
          outline={false}
          className="w-full text-dark mini-text"
          style={{
            height: "40px",
            borderRadius: "24px",
            border: "1px solid #e2e8f0",
            backgroundColor: "#ffffff",
            paddingLeft: "16px",
            paddingRight: "40px",
            boxShadow: "0 1px 4px rgba(0,0,0,0.03)",
          }}
        />
      </form>
    </div>
  );
});
AiChatAssistantCard.displayName = "AiChatAssistantCard";

/* ==========================================================================
   AI MODEL CARDS (WHATSAPP OUTREACH, EMAIL DISPATCH, REGIONAL ROUTING)
   ========================================================================== */

const AI_MODEL_CARDS = [
  {
    id: "whatsapp-campaign",
    title: "WhatsApp Outreach Engine",
    provider: "Meta Business API",
    description:
      "Automated WhatsApp catalog broadcasts, instant curtain quotations, and 24/7 lead inquiries with interactive menus.",
    capabilities: [
      { id: "tools", label: "Tools", icon: "tools" },
      { id: "reasoning", label: "Broadcast", icon: "reasoning" },
      { id: "image", label: "Media Support", icon: "image" },
    ],
    credits: "98",
    stats: [
      { label: "Delivered", value: "99.4%" },
      { label: "Open Rate", value: "96.8%" },
      { label: "Response", value: "44.2%" },
    ],
    avatar: (
      <div
        className="flex items-center justify-center flex-shrink-0"
        style={{
          width: 38,
          height: 38,
          borderRadius: 8,
          background: "rgba(34, 197, 94, 0.12)",
          border: "1px solid rgba(34, 197, 94, 0.25)",
        }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="#22c55e">
          <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm5.8 14.12c-.24.68-1.39 1.3-1.92 1.38-.5.08-1.14.12-3.69-.93-3.26-1.34-5.35-4.66-5.51-4.88-.16-.22-1.32-1.76-1.32-3.36 0-1.6.84-2.39 1.14-2.72.3-.33.66-.41.88-.41.22 0 .44 0 .64.01.21.01.49-.08.77.58.28.68.96 2.34 1.04 2.51.08.17.14.37.03.59-.11.22-.17.36-.33.55-.16.19-.34.42-.49.56-.16.16-.33.33-.14.66.19.33.84 1.39 1.8 2.25 1.24 1.1 2.28 1.44 2.61 1.6.33.16.52.14.71-.08.19-.22.82-.96 1.04-1.29.22-.33.44-.28.74-.17.3.11 1.9.9 2.23 1.06.33.16.55.25.63.38.08.14.08.8-.16 1.48z" />
        </svg>
      </div>
    ),
  },
  {
    id: "gmail-outreach",
    title: "Email & Quote Dispatcher",
    provider: "Google Workspace CRM",
    description:
      "B2B industrial sequences, cold storage quotation follow-ups, and commercial client outreach with delivery telemetry.",
    capabilities: [
      { id: "tools", label: "Tools", icon: "tools" },
      { id: "reasoning", label: "Sequencing", icon: "reasoning" },
    ],
    credits: "85",
    stats: [
      { label: "Delivered", value: "98.9%" },
      { label: "Open Rate", value: "54.6%" },
      { label: "Click Rate", value: "26.8%" },
    ],
    avatar: (
      <div
        className="flex items-center justify-center flex-shrink-0"
        style={{
          width: 38,
          height: 38,
          borderRadius: 8,
          background: "rgba(239, 68, 68, 0.12)",
          border: "1px solid rgba(239, 68, 68, 0.25)",
        }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="#ef4444">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
        </svg>
      </div>
    ),
  },
  {
    id: "regional-dispatch",
    title: "Regional Hub Lead Router",
    provider: "Ashmita CRM Intelligence",
    description:
      "Location-based lead routing dispatching buyer inquiries directly to state distribution hubs in Maharashtra and Gujarat.",
    capabilities: [
      { id: "tools", label: "Tools", icon: "tools" },
      { id: "reasoning", label: "Geo-Routing", icon: "reasoning" },
    ],
    credits: "92",
    stats: [
      { label: "Dispatched", value: "99.2%" },
      { label: "Avg Speed", value: "< 2 min" },
      { label: "Conversion", value: "38.4%" },
    ],
    avatar: (
      <div
        className="flex items-center justify-center flex-shrink-0"
        style={{
          width: 38,
          height: 38,
          borderRadius: 8,
          background: "rgba(99, 102, 241, 0.12)",
          border: "1px solid rgba(99, 102, 241, 0.25)",
        }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="#6366f1">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
        </svg>
      </div>
    ),
  },
];

const AiModelCardsSection = React.memo(() => {

  return (
    <div
      className="relative bg-white p-10 rounded-5 gap-9 overflow-hidden"
    >
      <div className="pb-10 pt-5 rounded-5">
        <h4 className="font-500 text-dark mid-text capitalize">
          Geologically Your Business
        </h4>
      </div>
      <div className="grid-cols-3 gap-9 bordh pt-8">
        {AI_MODEL_CARDS.map((model) => {
          return (
            <div
              key={model.id}
              className="rounded-5 bg-forth p-14"
              style={{
                minHeight: "160px",
              }}
            >
              <div>
                <div className="flex items-center gap-9">
                  {model.avatar}
                  <div className="">
                    <h5 className="font-500 text-primary headmini-text capitalize line-clamp1">
                      {model.title}
                    </h5>
                    <p className="mini-text text-gray font-400">
                      {model.provider}
                    </p>
                  </div>
                </div>

                <p
                  className="mt-15 text-gray font-400 mini-text"
                >
                  {model.description}
                </p>

                {/* <div className="mt-8">
                <p className="text-dark font-500 mini-text">
                  Capabilities
                </p>
                <div className="flex items-center gap-9 flex-wrap">
                  {model.capabilities.map(renderCapabilityBadge)}
                </div>
              </div> */}

                <div className="grid-cols-3 gap-9 bordh mt-10 pt-8">
                  {(model.stats || [
                    { label: "Delivered", value: "98%" },
                    { label: "Open Rate", value: "98%" },
                    { label: "Conversion", value: "38%" },
                  ]).map((stat, sIdx) => (
                    <div key={sIdx}>
                      <p className="text-gray font-500 mini-text">{stat.label}</p>
                      <p className="font-600 text-dark small-text mt-1">{stat.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});
AiModelCardsSection.displayName = "AiModelCardsSection";

/* ==========================================================================
   YOUR BUSINESS SECTION (WEBSITE DOMAINS & MANAGEMENT)
   ========================================================================== */

const BUSINESS_SITES = [
  {
    id: "ashmitavinyls",
    domain: "ashmitavinyls.com",
    url: "https://www.ashmitavinyls.com",
    category: "Website",
  }
];

const YourBusinessSection = React.memo(() => (
  <div
    className="rounded-5 p-10 bg-white"
  >
    <div className="pb-10 pt-5 rounded-5">
      <h4 className="font-500 text-dark headmini-text capitalize">
        Your business
      </h4>
    </div>

    <div className="grid-cols-1">
      {BUSINESS_SITES.map((site) => (
        <a
          key={site.id}
          href={site.url || (site.domain?.startsWith("http") ? site.domain : `https://${site.domain}`)}
          target="_blank"
          rel="noopener noreferrer"
          className="py-12 px-8 bordh block hover:bg-forth transition-all cursor-pointer"
          style={{ textDecoration: "none" }}
        >
          <div className="flex items-center gap-9">
            <div
              className="icon-lg bg-primary rounded-5"
            >
              <Icon name="Globe" width="20" height="20" stroke="var(--white)" />
            </div>
            <div>
              <h4 className="font-500 headmini-text text-secondary flex items-center gap-9">
                {site.domain}
                <Icon name="ExternalLink" width="13" height="13" stroke="var(--gray)" />
              </h4>
              <p className="text-gray mini-text font-400">
                {site.category}
              </p>
            </div>
          </div>
        </a>
      ))}
    </div>
  </div>
));
YourBusinessSection.displayName = "YourBusinessSection";


/* ==========================================================================
   Social SECTION (WEBSITE DOMAINS & MANAGEMENT)
   ========================================================================== */

const SOCIAL_SITES = [
  {
    id: "instagram",
    icon: "Instagram",
    domain: "ashmitaenterprises.co.in",
    bg: "insta",
    category: "Instagram",
    url: import.meta.env.VITE_SOCIAL_INSTAGRAM || "https://instagram.com/pvc_strip_curtain_imported?xtok=MW5reWJ6YmEyYXprNw%3D%3D",
  },
  {
    id: "facebook",
    icon: "Facebook",
    domain: "ashmitaenterprises.co.in",
    bg: "info",
    category: "Facebook",
    url: import.meta.env.VITE_SOCIAL_FACEBOOK || "https://www.facebook.com/share/p/19dg9izjJb/",
  },
  {
    id: "youtube",
    icon: "YouTube",
    domain: "ashmitaenterprises.co.in",
    bg: "danger",
    category: "Youtube",
    url: import.meta.env.VITE_SOCIAL_YOUTUBE || "https://youtube.com/@ashmita.enterprises?si=6z-X5-JAhbEv5qxE",
  },
  // {
  //   id: "twitter",
  //   icon: "Twitter",
  //   domain: "ashmitaenterprises.co.in",
  //   bg: "primary",
  //   category: "Twitter",
  //   url: import.meta.env.VITE_SOCIAL_TWITTER || "https://x.com/share?url=https://www.ashmitaenterprises.co.in/&text=Ashmita%20Enterprises",
  // },
  {
    id: "whatsapp",
    icon: "WhatsApp",
    domain: "ashmitaenterprises.co.in",
    bg: "success",
    category: "WhatsApp",
    url: import.meta.env.VITE_SOCIAL_WHATSAPP || "https://wa.me/918422969523",
  },
  // {
  //   id: "linkedin",
  //   icon: "LinkedIn",
  //   domain: "ashmitaenterprises.co.in",
  //   bg: "primary",
  //   category: "LinkedIn",
  //   url: import.meta.env.VITE_SOCIAL_LINKEDIN || "https://www.linkedin.com/cws/share?url=https://www.ashmitaenterprises.co.in/",
  // },
];

const SocialSection = React.memo(() => (
  <div
    className="rounded-5 p-10 bg-white"
  >
    <div className="pb-10 pt-5 rounded-5">
      <h4 className="font-500 text-dark headmini-text capitalize">
        Social Handles
      </h4>
    </div>

    <div className="grid-cols-1">
      {SOCIAL_SITES.map((site) => (
        <a
          key={site.id}
          href={site.url}
          target="_blank"
          rel="noopener noreferrer"
          className="py-12 px-8 bordh block cursor-pointer text-inherit"
          style={{ textDecoration: "none" }}
        >
          <div className="flex items-center gap-9">
            <div
              className={`icon-lg bg-${site.bg} rounded-5`}
            >
              <Button
                version="icon"
                bg={site?.bg}
                icon={site?.icon}
                iconWidth="20"
                iconHeight="20"
                iconFill="var(--white)"
                className="rounded-5 flex"
              />
            </div>
            <div className="">
              <h4 className="font-500 headmini-text text-secondary  flex items-center gap-4">
                {site.domain}
                <Icon name="ExternalLink" width="13" height="13" stroke="var(--gray)" />
              </h4>
              <p className="text-gray mini-text font-400">
                {site.category}
              </p>
            </div>
          </div>
        </a>
      ))}
    </div>
  </div>
));
SocialSection.displayName = "SocialSection";

/* ==========================================================================
   UPDATES SECTION (RECENT UPDATES)
   ========================================================================== */

const RECENT_UPDATES = [
  {
    id: "campaign-broadcast",
    icon: "Send",
    time: "Yesterday",
    title: "Multi-Channel Outreach Campaign",
    description: "Dispatched 28,450 WhatsApp & SMS campaigns with 98.8% delivery and 34.8% response rate.",
  },
  {
    id: "catalog-inventory",
    icon: "Curtain",
    time: "3 days ago",
    title: "PVC Strip Curtains Catalog",
    description: "Synchronized 50+ industrial curtain specs, polar grade strips, and tier stock for warehouse hubs.",
  },
  {
    id: "regional-leads-dispatch",
    icon: "MapPin",
    time: "1 week ago",
    title: "State Hub Lead Routing",
    description: "Automated routing of 142 inquiries across top regional hubs: Mumbai, Ahmedabad, and Bengaluru.",
  },
  {
    id: "domain-dns-sync",
    icon: "Globe",
    time: "2 weeks ago",
    title: "Business Domain & DNS Status",
    description: "Verified DNS TXT, CNAME, and SSL records for ashmitavinyls.com and connected business portals.",
  },
  {
    id: "seo-indexing-update",
    icon: "Trending",
    time: "last month",
    title: "SEO Meta & Schema Indexing",
    description: "Updated sitemaps, structured schemas, and meta tags for industrial strip rolls and blogs.",
  },
];

const RecentUpdatesSection = React.memo(() => (
  <div className="py-5 px-4">
    <h4 className="font-500 text-dark headmini-text capitalize">
      Updates
    </h4>

    <div className="grid-cols-1 mt-12">
      {RECENT_UPDATES.map((item) => (
        <div
          key={item.id}
          className="flex items-start gap-12 py-14 bordh"
        >
          <div
            className="icon-lg bg-tertiary rounded-5"
          >
            <Icon name={item.icon} width="20" height="20" style={{ color: 'var(--secondary)' }} />
          </div>

          <div className="w-80">
            <p
              className="text-gray font-400 mini-text"
            >
              {item.time}
            </p>
            <h5
              className="font-600 text-dark headmini-text mt-2"
            >
              {item.title}
            </h5>
            <p
              className="text-gray mini-text font-400 mt-2"
            >
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
));
RecentUpdatesSection.displayName = "RecentUpdatesSection";

/* ==========================================================================
   MAIN DASHBOARD COMPONENT
   ========================================================================== */

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <Container
      version="v0"
      className="w-full overflow-auto bg-forth"
      style={{
        height: "calc(100vh - 60px)"
      }}
    >
      <div className="flex items-start gap-9 p-10">
        <div className="w-70 grid-cols-1 gap-9">
          <div
            className="rounded-5 bg-secondary relative overflow-hidden"
            style={{
              height: "400px",
              background: "radial-gradient(circle at 85% 30%, rgba(99, 102, 241, 0.15) 0%, transparent 60%), #090e18",
            }}
          >
            <div className="flex items-center justify-between px-30">
              <div className="w-45">
                <h2 className="head-text font-500 text-white uppercase">
                  Hello , <br /> Good morning
                </h2>

                <p className="text-white text-muted font-300 para-text mt-10">
                  CloudMind has had no valid SOC 2 since 30 Sep addendum.
                </p>

                <Button
                  version='v1'
                  text='Explore Now'
                  icon='ChevronRight'
                  iconPosition='right'
                  variant='outline'
                  bg='white'
                  color='white'
                  className='mt-28'
                  onClick={() => navigate('/management/location')}
                />
              </div>
              <div className="w-55 relative" style={{ top: 12, left: 40 }}>
                <OrbitalRadar />
              </div>
            </div>
          </div>
          <AiModelCardsSection />
          <MapSection />
        </div>

        <div className="w-30 grid-cols-1 gap-9">
          <YourBusinessSection />
          <SocialSection />
          {/* <AiChatAssistantCard /> */}
          <RecentUpdatesSection />
        </div>
      </div>
    </Container>
  );
};

export default React.memo(Dashboard);
