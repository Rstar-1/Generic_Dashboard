import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../../styles/structure.scss";
import Icon from "../../components/common/Icon";
import Button from "../../components/common/Button";
import dumpData from "./dump.json";
import {
    setIsChat,
    clearChat,
    toggleTts,
    sendMessage,
    checkBackendConnection,
    getAvailableModels,
    setIsPlayingSpeech,
    setIsListening,
    setTranscript,
} from "../../store/slices/botSlice";
import { speechSynth } from "../../services/aiChatService";
import SpeechRecognition from "react-speech-recognition";
import { useVoiceRecognition } from "../../hooks/useVoiceRecognition";
import Fields from "../../components/forms/Fields";
import {
    getSystemOverview,
    getSystemAudio,
    setSystemVolume,
    setSystemMute,
} from "../../services/systemService";

// ==========================================
// 1. CALENDAR & DATE WIDGET
// ==========================================
const DateCalendarWidget = React.memo(({ currentTime }) => {
    const today = useMemo(() => currentTime || new Date(), [currentTime]);
    const dayName = useMemo(() => today.toLocaleDateString("en-US", { weekday: "long" }).toUpperCase(), [today]);
    const dayNumber = useMemo(() => String(today.getDate()).padStart(2, "0"), [today]);

    const calendarDays = useMemo(() => {
        const year = today.getFullYear();
        const month = today.getMonth();
        const firstDayIndex = new Date(year, month, 1).getDay();
        const totalDays = new Date(year, month + 1, 0).getDate();

        const blanks = Array.from({ length: firstDayIndex }, (_, i) => i);
        const dayNumbers = Array.from({ length: totalDays }, (_, i) => i + 1);

        return { blanks, dayNumbers, todayDate: today.getDate() };
    }, [today]);

    return (
        <div className="box flex items-start">
            <div className="w-40">
                <p className="mini-text font-500 text-white mt-5">{dayName}</p>
                <h4 className="largemid-text font-600 text-white text-muted">{dayNumber}</h4>
            </div>
            <div className="grid-cols-7 w-60">
                {dumpData.dayHeaders.map((dh) => (
                    <p key={dh} className="mini-text icon flex items-center justify-center">
                        {dh}
                    </p>
                ))}
                {calendarDays.blanks.map((_, i) => (
                    <p className="mini-text icon flex items-center font-600 justify-center" key={`blank-${i}`} />
                ))}
                {calendarDays.dayNumbers.map((d) => (
                    <p
                        key={`day-${d}`}
                        className={`mini-text icon flex items-center justify-center ${d === calendarDays.todayDate ? "text-white bg-info rounded-5" : ""}`}
                    >
                        {d}
                    </p>
                ))}
            </div>
        </div>
    );
});
DateCalendarWidget.displayName = "DateCalendarWidget";

// ==========================================
// 4. NETWORK CARD
// ==========================================
const NetworkCard = React.memo(() => (
    <div className="box">
        <div className="flex items-center justify-between pb-8 bordb">
            <h3 className="text-white font-500 headmini-text flex items-center gap-8">
                <Icon name="Layers" width="16" height="16" stroke="var(--white)" /> NETWORK
            </h3>
        </div>
        <div className="mt-8">
            {dumpData.networkStats.map((item) => (
                <div key={item.id} className="flex items-center gap-12 bordb py-10">
                    <h6 className="headmini-text font-400 text-white w-25">{item.label}</h6>
                    <div className="bar">
                        <i style={{ width: item.barWidth }} />
                    </div>
                    <p className="mini-text text-white font-300 text-muted w-10 text-right">{item.barWidth}</p>
                </div>
            ))}
        </div>
    </div>
));
NetworkCard.displayName = "NetworkCard";

// ==========================================
// 5. CENTRAL REACTOR / ORB (VOICE ENABLED HUD)
// ==========================================
const CentralOrb = React.memo(() => {
    const circumference = useMemo(() => 2 * Math.PI * 44, []);
    const dispatch = useDispatch();
    const { isListening, isPlayingSpeech } = useSelector((state) => state.bot);

    const handleToggleOrb = useCallback(() => {
        if (isListening) {
            try {
                SpeechRecognition.abortListening();
            } catch (e) { }
            dispatch(setIsListening(false));
            dispatch(setTranscript(""));
        } else {
            dispatch(setTranscript(""));
            dispatch(setIsListening(true));
            try {
                SpeechRecognition.startListening({ continuous: true, language: "en-US" });
            } catch (e) { }
        }
    }, [isListening, dispatch]);

    return (
        <div className="relative w-full">
            <div
                className={`relative w-full ${isListening ? "orb-listening-pulse" : ""} ${isPlayingSpeech ? "orb-speaking-pulse" : ""}`}
                style={{ cursor: "pointer" }}
                onClick={handleToggleOrb}
                title={isListening ? "Click reactor to stop voice input" : "Click reactor to start voice command"}
            >
                <svg viewBox="0 0 520 520">
                    <defs>
                        <radialGradient id="gl" cx="50%" cy="40%">
                            <stop offset="0" stopColor={isListening ? "#ff416c" : isPlayingSpeech ? "#00f0ff" : "#2a8cf0"} />
                            <stop offset=".55" stopColor={isListening ? "#ff4b2b" : isPlayingSpeech ? "#0099ff" : "#0a3f8f"} />
                            <stop offset="1" stopColor="#021a48" />
                        </radialGradient>
                        <filter id="f">
                            <feGaussianBlur stdDeviation="4" result="b" />
                            <feMerge>
                                <feMergeNode in="b" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>

                    {/* Outer Rotating Disc 1 */}
                    <g className={`spin ${isListening || isPlayingSpeech ? "spin-fast" : ""}`} fill="none" stroke="#1b8cff" filter="url(#f)">
                        <circle cx="260" cy="260" r="255" strokeWidth="10" strokeDasharray="1.5 8.4" opacity=".7" />
                        <circle cx="260" cy="260" r="235" strokeWidth="1" opacity=".5" />
                        <circle cx="260" cy="260" r="218" strokeWidth="8" stroke="#39c6ff" strokeDasharray="90 320" strokeLinecap="round" />
                        <circle cx="260" cy="260" r="218" strokeWidth="3" strokeDasharray="4 10" opacity=".5" />
                    </g>

                    {/* Outer Rotating Disc 2 */}
                    <g className={`spin2 ${isListening || isPlayingSpeech ? "spin2-fast" : ""}`} fill="none" filter="url(#f)">
                        <circle cx="260" cy="260" r="200" stroke={isListening ? "#ff4b2b" : "#2aa8ff"} strokeWidth="6" strokeDasharray="130 200 40 240" strokeLinecap="round" />
                        <circle cx="260" cy="260" r="200" stroke="#ff3a3a" strokeWidth="5" strokeDasharray="14 1242" transform="rotate(-140 260 260)" />
                    </g>

                    {/* Glowing Rings */}
                    <circle cx="260" cy="260" r="172" fill="none" stroke={isListening ? "#ff3a6e" : "#5fd6ff"} strokeWidth="5" filter="url(#f)" />
                    <circle cx="260" cy="260" r="165" fill="none" stroke="#0a5fd0" strokeWidth="2" />
                    <circle cx="260" cy="260" r="152" fill="url(#gl)" filter="url(#f)" />

                    <path d="M260 0V40M260 480V520" stroke="#39c6ff" strokeWidth="2" />

                    {/* Reactor Core Icon & Text */}
                    <g transform="translate(240, 240)">
                        {isListening ? (
                            <circle cx="20" cy="20" r="24" fill="rgba(255, 65, 108, 0.4)" stroke="#ff416c" strokeWidth="2" />
                        ) : null}
                    </g>
                </svg>

                {/* 3 Circular HUD Meters */}
                {dumpData.gauges.map((g) => (
                    <div key={g.id} className={`g ${g.cls}`}>
                        <svg viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="47" fill="#031a3d" stroke="#0e4a94" strokeWidth="1" />
                            <circle cx="50" cy="50" r="44" fill="none" stroke="#0a3a75" strokeWidth="5" />
                            <circle
                                cx="50"
                                cy="50"
                                r="44"
                                fill="none"
                                stroke={isListening ? "#ff416c" : "#3cc8ff"}
                                strokeWidth="5"
                                strokeLinecap="round"
                                strokeDasharray={`${(circumference * g.val) / 100} ${circumference}`}
                                transform="rotate(-90 50 50)"
                                style={{ filter: isListening ? "drop-shadow(0 0 6px #ff416c)" : "drop-shadow(0 0 4px #19b6ff)" }}
                            />
                        </svg>
                        <div>
                            <span>{g.label}</span>
                            <b>{g.val}%</b>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
});
CentralOrb.displayName = "CentralOrb";

// ==========================================
// 6. QUICK LAUNCH
// ==========================================
const QuickLaunch = React.memo(() => (
    <div className="box mt-15">
        <div className="flex items-center justify-between gap-12">
            {dumpData.quickLaunchApps.map((app) => (
                <div key={app.id}>
                    <i
                        className="ap"
                        style={{
                            background: "linear-gradient(#ffd34d,#f0a500)",
                            borderRadius: "4px",
                            width: "40px",
                            height: "32px",
                        }}
                    />
                    <p className="mini-text text-white text-center font-300 mt-6">{app.name}</p>
                </div>
            ))}
        </div>
    </div>
));
QuickLaunch.displayName = "QuickLaunch";

// ==========================================
// 7. WEATHER WIDGET
// ==========================================
const WeatherWidget = React.memo(() => (
    <div className="box">
        <div className="flex items-center bordb pb-8">
            <div className="w-70">
                <h5 className="text-white font-600 large-text">16<sup>°c</sup></h5>
                <p className="text-white font-400 mini-text flex items-center gap-5">
                    <Icon name="Globe" width="11" height="11" stroke="var(--white)" /> Mumbai, IN
                </p>
            </div>
            <h5 className="w-30 largemid-text">🌙</h5>
        </div>
        <div className="grid-cols-6 gap-8 pt-12">
            {dumpData.weatherDays.map((d) => (
                <div key={d.day} className="text-center">
                    <p className="mini-text font-400 text-white uppercase text-muted">{d.day}</p>
                    <i className="para-text font-400 text-white">{d.icon}</i>
                </div>
            ))}
        </div>
    </div>
));
WeatherWidget.displayName = "WeatherWidget";

// ==========================================
// 8. QUICK SHORTCUTS / SYSTEM SERVICE TELEMETRY
// ==========================================
const QuickShortcuts = React.memo(() => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const fetchData = useCallback(async (isManual = false) => {
        if (isManual) setRefreshing(true);
        try {
            const overview = await getSystemOverview();
            if (overview) {
                setData(overview);
            }
        } catch {
            // ignore
        } finally {
            setLoading(false);
            if (isManual) setRefreshing(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
        const interval = setInterval(() => {
            fetchData();
        }, 4000);
        return () => clearInterval(interval);
    }, [fetchData]);

    const formatUptime = (seconds) => {
        if (!seconds && seconds !== 0) return "--";
        const days = Math.floor(seconds / 86400);
        const hours = Math.floor((seconds % 86400) / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        if (days > 0) return `${days}d ${hours}h ${mins}m`;
        if (hours > 0) return `${hours}h ${mins}m`;
        return `${Math.floor(seconds)}s`;
    };

    if (!data) {
        return (
            <div className="box">
                <div className="flex items-center justify-between pb-8 bordb">
                    <h3 className="text-white font-500 headmini-text flex items-center gap-8">
                        <Icon name="Server" width="14" height="14" stroke="var(--white)" /> SYSTEM INFO
                    </h3>
                    <Icon name="Loading" width="14" height="14" stroke="var(--white)" className="spin-fast" />
                </div>
                <div className="py-20 text-center">
                    <p className="mini-text text-white text-muted">
                        {loading ? "Fetching system data from backend..." : "System service offline"}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="box">
            <div className="flex items-center justify-between pb-8 bordb">
                <h3 className="text-white font-500 headmini-text flex items-center gap-8">
                    <Icon name="Server" width="14" height="14" stroke="var(--white)" /> SYSTEM INFO
                </h3>
                <Icon
                    name="Refresh"
                    width="12"
                    height="12"
                    stroke="var(--white)"
                    className={`cursor-pointer ${refreshing ? "spin-fast" : ""}`}
                    onClick={() => fetchData(true)}
                />
            </div>

            <div className="pt-6">
                <div className="py-10 bordb">
                    <div className="flex items-center justify-between mb-4">
                        <p className="mini-text text-white font-400 flex items-center gap-6">
                            <Icon name="AI" width="12" height="12" stroke="var(--info)" /> CPU ({data.cpu.name})
                        </p>
                        <p className="mini-text font-500 text-info">
                            {data.cpu.usage}%
                        </p>
                    </div>
                    <div className="bar">
                        <i style={{
                            width: `${Math.min(100, data.cpu.usage)}%`,
                            background: data.cpu.usage > 80 ? 'linear-gradient(90deg, #ff416c, #ff4b2b)' : undefined,
                        }} />
                    </div>
                    <div className="flex items-center justify-between mt-3">
                        <p className="mini-text text-white text-muted font-300" style={{ fontSize: '10px' }}>
                            {data.cpu.cores} Cores / {data.cpu.threads} Threads
                        </p>
                    </div>
                </div>

                <div className="py-10 bordb">
                    <div className="flex items-center justify-between mb-4">
                        <p className="mini-text text-white font-400 flex items-center gap-6">
                            <Icon name="Layers" width="12" height="12" stroke="var(--info)" /> Memory (RAM)
                        </p>
                        <p className="mini-text font-500 text-info">
                            {data.memory.usage}%
                        </p>
                    </div>
                    <div className="bar">
                        <i style={{
                            width: `${Math.min(100, data.memory.usage)}%`,
                            background: data.memory.usage > 85 ? 'linear-gradient(90deg, #ff416c, #ff4b2b)' : undefined,
                        }} />
                    </div>
                    <div className="flex items-center justify-between mt-3">
                        <p className="mini-text text-white text-muted font-300" style={{ fontSize: '10px' }}>
                            {(data.memory.used / 1024).toFixed(1)} GB / {(data.memory.total / 1024).toFixed(1)} GB
                        </p>
                        <p className="mini-text text-white text-muted font-300" style={{ fontSize: '10px' }}>
                            {(data.memory.free / 1024).toFixed(1)} GB free
                        </p>
                    </div>
                </div>

                {(data.disks && data.disks.length > 0
                    ? data.disks
                    : data.disk ? [data.disk] : []
                ).map((diskItem, idx) => (
                    <div key={diskItem.drive || idx} className="py-10 bordb">
                        <div className="flex items-center justify-between mb-4">
                            <p className="mini-text text-white font-400 flex items-center gap-6">
                                <Icon name="Box" width="12" height="12" stroke="var(--info)" /> {diskItem.name || `Disk Storage (${diskItem.drive || `Drive ${idx + 1}`})`}
                            </p>
                            <p className="mini-text font-500 text-info">
                                {diskItem.usage}%
                            </p>
                        </div>
                        <div className="bar">
                            <i style={{
                                width: `${Math.min(100, diskItem.usage || 0)}%`,
                                background: diskItem.usage > 85 ? 'linear-gradient(90deg, #ff416c, #ff4b2b)' : undefined,
                            }} />
                        </div>
                        <div className="flex items-center justify-between mt-3">
                            <p className="mini-text text-white text-muted font-300" style={{ fontSize: '10px' }}>
                                {Math.round((diskItem.used || 0) / 1024)} GB / {Math.round((diskItem.total || 0) / 1024)} GB
                            </p>
                            <p className="mini-text text-white text-muted font-300" style={{ fontSize: '10px' }}>
                                {Math.round((diskItem.free || 0) / 1024)} GB free
                            </p>
                        </div>
                    </div>
                ))}

                <div className="py-10 bordb">
                    <div className="flex items-center justify-between mb-4">
                        <p className="mini-text text-white font-400 flex items-center gap-6">
                            <Icon name="Globe" width="12" height="12" stroke="var(--info)" /> Network ({data.network.ip})
                        </p>
                        <p className="mini-text font-500 text-info" style={{ fontSize: '11px' }}>
                            ↓ {(data.network.download / 1000000).toFixed(0)} Mbps
                        </p>
                    </div>
                    <div className="bar">
                        <i style={{ width: '65%' }} />
                    </div>
                    <div className="flex items-center justify-between mt-3">
                        <p className="mini-text text-white text-muted font-300" style={{ fontSize: '10px' }}>
                            Upload: {(data.network.upload / 1000000).toFixed(0)} Mbps
                        </p>
                        <p className="mini-text text-white text-muted font-300" style={{ fontSize: '10px' }}>
                            IP: {data.network.ip}
                        </p>
                    </div>
                </div>

                <div className="grid-cols-2 gap-12 pt-12">
                    <div className="bordb pb-9">
                        <p className="mini-text text-white text-muted font-300" style={{ fontSize: '10px' }}>HOSTNAME</p>
                        <p className="mini-text text-white font-500 truncate" title={data.system.hostname}>
                            {data.system.hostname}
                        </p>
                    </div>
                    <div className="bordb pb-9">
                        <p className="mini-text text-white text-muted font-300" style={{ fontSize: '10px' }}>OS / ARCH</p>
                        <p className="mini-text text-white font-500 truncate" title={`${data.os.name} ${data.os.version} (${data.os.architecture})`}>
                            {data.os.name} {data.os.version} ({data.os.architecture})
                        </p>
                    </div>
                    <div className="pb-5">
                        <p className="mini-text text-white text-muted font-300" style={{ fontSize: '10px' }}>UPTIME</p>
                        <p className="mini-text text-white font-500">
                            {formatUptime(data.system.uptime)}
                        </p>
                    </div>
                    <div className="pb-5">
                        <p className="mini-text text-white text-muted font-300" style={{ fontSize: '10px' }}>IP ADDRESS</p>
                        <p className="mini-text text-white font-500 truncate" title={data.network.ip}>
                            {data.network.ip}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
});
QuickShortcuts.displayName = "QuickShortcuts";

// ==========================================
// 9. NOTIFICATIONS
// ==========================================
const NotificationsWidget = React.memo(() => (
    <div className="box">
        <div className="flex items-center justify-between pb-8 bordb">
            <h3 className="text-white font-500 headmini-text flex items-center gap-8">
                <Icon name="Mail" width="16" height="16" stroke="var(--white)" /> NOTIFICATIONS
            </h3>
            <p className="cursor-pointer text-white text-muted font-300 mini-text">
                View All
            </p>
        </div>
        <div className="grid-cols-1 gap-12 mt-12">
            {dumpData.notifications.map((item) => (
                <div key={item.id} className="flex items-center gap-5 bordb pb-10">
                    <div className="w-15">
                        <div className="icon-lg rounded-5 bg-info">
                            <Icon name={item.icon} width="18" height="18" stroke="var(--white)" />
                        </div>
                    </div>
                    <div className="w-85">
                        <h5 className="text-white font-500 headmini-text">{item.title}</h5>
                        <p className="text-white text-muted font-300 mini-text">{item.subtitle}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
));
NotificationsWidget.displayName = "NotificationsWidget";

// ==========================================
// 10. AGENTS (INTERACTIVE GROK LINK)
// ==========================================
const Agents = React.memo(() => {
    const dispatch = useDispatch();

    const handleSelectAgent = (agentName) => {
        dispatch(setIsChat(true));
        dispatch(
            sendMessage({
                content: `Commander requesting protocol link with sub-agent ${agentName}. Report sub-agent operational readiness.`,
            })
        );
    };

    return (
        <div className="box">
            <div className="flex items-center justify-between pb-8 bordb">
                <h3 className="text-white font-500 headmini-text flex items-center gap-8">
                    <Icon name="Globe" width="16" height="16" stroke="var(--white)" /> AGENTS
                </h3>
            </div>
            <div className="mt-5">
                {dumpData.agents.map((sc) => (
                    <div
                        key={sc.id}
                        className="flex items-center justify-between bordb py-12 px-5 cursor-pointer agent-item"
                        onClick={() => handleSelectAgent(sc.label)}
                        title={`Click to connect with agent ${sc.label}`}
                    >
                        <div className="flex items-center gap-8">
                            <Icon name={sc.icon} width="14" height="14" stroke="var(--info)" />
                            <div>
                                <p className="text-white font-500 mini-text">{sc.label}</p>
                            </div>
                        </div>
                        <p className="text-white font-400 mini-text">{sc.kbd}</p>
                    </div>
                ))}
            </div>
        </div>
    );
});
Agents.displayName = "Agents";

// ==========================================
// 11. CHAT UI WIDGET (POWERED BY GROK AI & REACT-SPEECH-RECOGNITION)
// ==========================================
const ChatWidget = React.memo(() => {
    const dispatch = useDispatch();
    const [speakingMsgId, setSpeakingMsgId] = useState(null);
    const [inputText, setInputText] = useState("");
    const messagesEndRef = useRef(null);

    const {
        messages,
        loading,
        currentModel,
        availableModels,
        backendStatus,
        ttsEnabled,
        isListening: listening,
        transcript,
    } = useSelector((state) => state.bot);

    const handleStopListening = useCallback(() => {
        try {
            SpeechRecognition.abortListening();
        } catch (e) { }
        dispatch(setIsListening(false));
        dispatch(setTranscript(""));
    }, [dispatch]);

    const handleSendText = useCallback(() => {
        const query = inputText.trim();
        if (!query || loading) return;
        dispatch(sendMessage({ content: query }));
        setInputText("");
    }, [inputText, loading, dispatch]);

    const scrollToBottom = useCallback(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages, loading, scrollToBottom]);

    const handleSpeakMessage = useCallback(
        (msgId, content) => {
            if (speakingMsgId === msgId) {
                speechSynth.stop();
                setSpeakingMsgId(null);
                dispatch(setIsPlayingSpeech(false));
                return;
            }

            setSpeakingMsgId(msgId);
            dispatch(setIsPlayingSpeech(true));
            speechSynth.speak(content, {
                onEnd: () => {
                    setSpeakingMsgId(null);
                    dispatch(setIsPlayingSpeech(false));
                },
                onError: () => {
                    setSpeakingMsgId(null);
                    dispatch(setIsPlayingSpeech(false));
                },
            });
        },
        [speakingMsgId, dispatch]
    );

    const highlightJson = useCallback((code) => {
        return code.replace(
            /("(?:[^"\\]|\\.)*")\s*(:)|(\'(?:[^\'\\]|\\.)*\')\s*(:)|("(?:[^"\\]|\\.)*")|(-?\d+\.?\d*(?:[eE][+-]?\d+)?)|\b(true|false|null)\b/g,
            (match, keyDQ, colonDQ, keySQ, colonSQ, strVal, numVal, boolVal) => {
                if (keyDQ && colonDQ) return `<span style="color:#39c6ff">${keyDQ}</span>${colonDQ}`;
                if (keySQ && colonSQ) return `<span style="color:#39c6ff">${keySQ}</span>${colonSQ}`;
                if (strVal) return `<span style="color:#a5d6a7">${strVal}</span>`;
                if (numVal) return `<span style="color:#ffab40">${numVal}</span>`;
                if (boolVal) return `<span style="color:#ff8a65">${boolVal}</span>`;
                return match;
            }
        );
    }, []);

    const renderMessageContent = useCallback((content) => {
        const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
        const segments = [];
        let lastIndex = 0;
        let match;

        while ((match = codeBlockRegex.exec(content)) !== null) {
            if (match.index > lastIndex) {
                segments.push({ type: "text", content: content.slice(lastIndex, match.index) });
            }
            segments.push({ type: "code", lang: match[1] || "text", content: match[2] });
            lastIndex = match.index + match[0].length;
        }
        if (lastIndex < content.length) {
            segments.push({ type: "text", content: content.slice(lastIndex) });
        }

        return segments.map((seg, idx) => {
            if (seg.type === "code") {
                const isJson = seg.lang === "json" || seg.lang === "jsonc";
                const highlighted = isJson ? highlightJson(seg.content) : seg.content;
                return (
                    <div key={idx} className="rounded-5 mt-8 mb-8" style={{
                        background: "rgba(2, 12, 36, 0.85)",
                        border: "1px solid rgba(27, 140, 255, 0.3)",
                        overflow: "hidden",
                    }}>
                        <div className="flex items-center justify-between px-12 py-6" style={{
                            background: "rgba(27, 140, 255, 0.1)",
                            borderBottom: "1px solid rgba(27, 140, 255, 0.2)",
                        }}>
                            <p className="mini-text font-500 text-info">{seg.lang.toUpperCase()}</p>
                            <p
                                className="mini-text font-400 cursor-pointer text-white text-muted"
                                onClick={() => navigator.clipboard?.writeText(seg.content)}
                            >COPY</p>
                        </div>
                        <pre className="px-12 py-10 overflow-auto text-white mini-text" style={{
                            margin: 0,
                            maxHeight: "300px",
                        }}>
                            <code dangerouslySetInnerHTML={{ __html: highlighted }} />
                        </pre>
                    </div>
                );
            }
            return seg.content.split("\n").map((line, lineIdx) => (
                <p key={`${idx}-${lineIdx}`} className="small-text font-300 mb-4" style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
                    {line}
                </p>
            ));
        });
    }, [highlightJson]);

    return (
        <div className="box" style={{ height: "556px" }}>
            <div className="flex items-center justify-between pb-10 bordb">
                <div className="flex items-center gap-10">
                    <div className="p-4 rounded-5 center-div bg-info">
                        <Icon name="Bot" width="30" height="30" stroke="var(--white)" />
                    </div>
                    <div>
                        <h4 className="font-500 text-white headmini-text">
                            BARASINGHA AI TERMINAL
                        </h4>
                        <div className="flex items-center gap-6 mt-2">
                            <p className="mini-text text-white text-muted">
                                {backendStatus === "healthy"
                                    ? "⚡AI CONNECTED"
                                    : backendStatus === "checking"
                                        ? "CONNECTING BACKEND..."
                                        : "BACKEND OFFLINE"}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-8">
                    <Button
                        icon={ttsEnabled ? "Volume" : "VolumeX"}
                        version="icon"
                        bg="transparent"
                        variant='outline'
                        border="white"
                        className='font-400'
                        onClick={() => dispatch(toggleTts())}
                        title={ttsEnabled ? "Text-to-Speech: ENABLED (Click to mute)" : "Text-to-Speech: MUTED (Click to enable)"}
                    />
                    <Button
                        icon="Trash"
                        version="icon"
                        bg="transparent"
                        variant='outline'
                        border="white"
                        className='font-400'
                        onClick={() => dispatch(clearChat())}
                        title="Clear conversation history"
                    />
                    <Button
                        icon="Layers"
                        version="icon"
                        bg="transparent"
                        variant='outline'
                        border="white"
                        className='font-400'
                        onClick={() => dispatch(setIsChat(false))}
                        title="Return to Reactor Orb view"
                    />
                </div>
            </div>

            <div className="py-12 pr-6 overflow-auto" style={{ height: "400px" }}>
                {messages.map((msg) => {
                    const isAssistant = msg.role === "assistant";
                    const isError = msg.isError;

                    return (
                        <div
                            key={msg.id}
                            className={`mb-20 flex flex-column ${isAssistant ? "items-start" : "items-end"}`}
                        >
                            <p
                                className={`mini-text font-600 uppercase ${isAssistant ? "text-white" : "text-info"}`}
                            >
                                {isAssistant ? `BOT (BARASINGHA)` : "(USER)"} <span className="mini-text font-300">{msg.timestamp}</span>
                            </p>

                            <div
                                className={`box mt-6 ${isAssistant ? "w-80" : "w-50"}`}
                            >
                                {renderMessageContent(msg.content)}

                                {isAssistant && !isError ? (
                                    <div className="flex items-center">
                                        <Button
                                            icon={speakingMsgId === msg.id ? "VolumeX" : "Volume"}
                                            version="none"
                                            bg="transparent"
                                            color={speakingMsgId === msg.id ? "danger" : "white"}
                                            border="none"
                                            iconWidth='20'
                                            iconHeight='20'
                                            iconStrokeWidth='1.5'
                                            onClick={() => handleSpeakMessage(msg.id, msg.content)}
                                            className='w-auto font-200'
                                            title="Read aloud via Speech Synthesis"
                                        />
                                        <Button
                                            icon="CopyLink"
                                            version="none"
                                            iconWidth='15'
                                            iconHeight='15'
                                            iconStrokeWidth='1.5'
                                            bg="transparent"
                                            border="none"
                                            onClick={() => navigator.clipboard?.writeText(msg.content)}
                                            className='w-auto font-200'
                                            title="Copy message text"
                                        />
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    );
                })}

                {loading ? (
                    <div className="box flex items-center gap-8">
                        <div className="typing-scanner" />
                        <p className="mini-text text-info font-400">
                            Computing Response Via Network ({currentModel})...
                        </p>
                    </div>
                ) : null}

                <div ref={messagesEndRef} />
            </div>

            {listening ? (
                <div className="bg-light-danger box mt-2">
                    <p className="mini-text text-white font-400 line-clamp2">
                        <span className="text-danger font-600">VOICE ACTIVE:</span> {transcript || "Speak clearly into your microphone..."}
                    </p>
                    <Button
                        text="STOP LISTENING"
                        version="v0"
                        bg="danger"
                        color="white"
                        border="none"
                        className='mt-11'
                        onClick={handleStopListening}
                    />
                </div>
            ) : <div className="box rounded-5 flex items-center gap-8 mt-12">
                <Fields
                    type="text"
                    placeholder="Type a message..."
                    version="v1"
                    value={inputText}
                    onChange={(val) => setInputText(val)}
                    onKeyDown={(e) => { if (e.key === "Enter") handleSendText(); }}
                    className='bg-glass border-0 rounded-5'
                    style={{ color: '#fff' }}
                />
                <Button
                    version="icon"
                    icon="Bot"
                    iconStrokeWidth='1.5'
                    iconWidth='21'
                    iconHeight='21'
                    bg="transparent"
                    color="white"
                    border="white"
                    className='font-500'
                    onClick={handleSendText}
                />
            </div>}
        </div>
    );
});
ChatWidget.displayName = "ChatWidget";

// ==========================================
// 12. VOICE AGENT
// ==========================================
const Voice = React.memo(() => {
    const dispatch = useDispatch();
    const { transcript, listening, stopListening, abortListening, toggleListening, resetTranscript, isSupported } = useVoiceRecognition();

    const handleSendVoiceCommand = useCallback(() => {
        const query = (transcript || "").trim();
        if (!query) return;

        if (abortListening) {
            abortListening();
        } else {
            stopListening();
        }
        resetTranscript();
        dispatch(setIsListening(false));
        dispatch(setTranscript(""));
        dispatch(sendMessage({ content: query }));
        dispatch(setIsChat(true));
    }, [transcript, abortListening, stopListening, resetTranscript, dispatch]);

    return (
        <div className="box" style={{ height: '160px' }}>
            <div className="flex items-center justify-between pb-8 bordb">
                <h3 className="text-white font-500 headmini-text flex items-center gap-8">
                    <Icon name="Globe" width="16" height="16" stroke="var(--white)" /> VOICE CMD
                </h3>
            </div>
            <div className="flex items-center gap-8 mt-12">
                <Button
                    text={listening ? "MUTE MIC" : "VOICE CMD"}
                    icon={listening ? "MicOff" : "Mic"}
                    iconWidth="13"
                    iconHeight="13"
                    version="v2"
                    bg={listening ? "danger" : "info"}
                    color="white"
                    onClick={toggleListening}
                    title="Toggle microphone voice command"
                    className='w-full'
                />
                <Button
                    text="TERMINAL"
                    icon="Bot"
                    iconWidth="13"
                    iconHeight="13"
                    version="v2"
                    bg="glass"
                    border="none"
                    color="white"
                    onClick={() => dispatch(setIsChat(true))}
                    title="Open full interactive Grok chat terminal"
                    className='w-full'
                />
            </div>

            {listening || transcript ? (
                <div className="mt-10">
                    <p className="mini-text text-white font-400 flex items-center line-clamp3">
                        <span className="text-info font-500 mr-4">INPUT:</span>
                        {transcript || "Listening... Speak your command..."}
                    </p>
                    {transcript ? (
                        <Button
                            text="SEND"
                            icon="Send"
                            iconWidth="11"
                            iconHeight="11"
                            version="v0"
                            bg="success"
                            color="white"
                            className="mt-8"
                            onClick={handleSendVoiceCommand}
                            title="Send voice query to Grok"
                        />
                    ) : null}
                </div>
            ) : null}

            {!isSupported ? (
                <p className="mini-text text-warning mt-8">
                    ⚠️ Speech recognition not supported in this browser.
                </p>
            ) : null}
        </div>
    );
});
Voice.displayName = "Voice";

// ==========================================
// 12. SOUND SYSTEM (WINDOWS AUDIO API)
// ==========================================
const Soundsystem = React.memo(() => {
    const [volume, setVolume] = useState(65);
    const [isMuted, setIsMuted] = useState(false);
    const debounceTimerRef = useRef(null);

    const fetchAudio = useCallback(async () => {
        try {
            const data = await getSystemAudio();
            if (data && typeof data.volume === "number") {
                setVolume(data.volume);
                setIsMuted(Boolean(data.muted));
            }
        } catch {
            // Ignore backend offline fallback
        }
    }, []);

    useEffect(() => {
        fetchAudio();
        const interval = setInterval(fetchAudio, 3500);
        return () => clearInterval(interval);
    }, [fetchAudio]);

    const handleVolumeChange = useCallback((e) => {
        const val = Number(e.target.value);
        setVolume(val);
        if (isMuted && val > 0) {
            setIsMuted(false);
        }

        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
        }
        debounceTimerRef.current = setTimeout(async () => {
            try {
                const res = await setSystemVolume(val);
                if (res && typeof res.volume === "number") {
                    setVolume(res.volume);
                    setIsMuted(Boolean(res.muted));
                }
            } catch {
                // Ignore failure
            }
        }, 60);
    }, [isMuted]);

    const handleToggleMute = useCallback(async () => {
        const nextMute = !isMuted;
        setIsMuted(nextMute);
        try {
            const res = await setSystemMute(nextMute);
            if (res && typeof res.volume === "number") {
                setVolume(res.volume);
                setIsMuted(Boolean(res.muted));
            }
        } catch {
            // Ignore failure
        }
    }, [isMuted]);

    const currentDisplayVal = isMuted ? 0 : volume;

    return (
        <div className="box">
            <div className="flex items-center justify-between pb-8 bordb">
                <h3 className="text-white font-500 headmini-text flex items-center gap-8">
                    <span
                        onClick={handleToggleMute}
                        className="cursor-pointer"
                        title={isMuted ? "Click to unmute Windows sound" : "Click to mute Windows sound"}
                        style={{ fontSize: "14px" }}
                    >
                        {isMuted || currentDisplayVal === 0 ? "🔇" : currentDisplayVal < 40 ? "🔉" : "🔊"}
                    </span>
                    SOUND SYSTEM
                </h3>
                <span
                    onClick={handleToggleMute}
                    className={`mini-text font-600 cursor-pointer ${isMuted ? "text-danger" : "text-info"}`}
                    title="Click to toggle Windows mute"
                >
                    {isMuted ? "MUTED" : `${currentDisplayVal}%`}
                </span>
            </div>
            <div className="relative flex items-center mt-20">
                <div
                    className="w-full rounded-5"
                    style={{
                        height: "6px",
                        background: "rgba(255, 255, 255, 0.08)",
                        position: "relative",
                        overflow: "hidden",
                    }}
                >
                    <div
                        style={{
                            width: `${currentDisplayVal}%`,
                            height: "100%",
                            background: isMuted
                                ? "rgba(255, 65, 108, 0.6)"
                                : "linear-gradient(90deg, #1b8cff, #00f0ff)",
                            transition: "width 0.15s ease",
                            boxShadow: isMuted ? "none" : "0 0 10px rgba(0, 240, 255, 0.5)",
                        }}
                    />
                </div>

                <input
                    type="range"
                    min="0"
                    max="100"
                    value={currentDisplayVal}
                    onChange={handleVolumeChange}
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        opacity: 0,
                        cursor: "pointer",
                        margin: 0,
                    }}
                    title={`Windows Volume: ${currentDisplayVal}%`}
                />

                {/* Custom visual thumb indicator */}
                <div
                    style={{
                        position: "absolute",
                        left: `calc(${currentDisplayVal}% - 7px)`,
                        width: "14px",
                        height: "14px",
                        borderRadius: "50%",
                        background: isMuted ? "#ff416c" : "#00f0ff",
                        border: "2px solid #ffffff",
                        boxShadow: isMuted
                            ? "0 0 8px rgba(255, 65, 108, 0.8)"
                            : "0 0 10px rgba(0, 240, 255, 0.9)",
                        pointerEvents: "none",
                        transition: "left 0.15s ease, background 0.2s ease",
                    }}
                />
            </div>
        </div>
    );
});
Soundsystem.displayName = "Soundsystem";

// ==========================================
// 13. MAIN CONVERTED JARVIS DASHBOARD PAGE
// ==========================================
const Bot = () => {
    const dispatch = useDispatch();
    const { isChat } = useSelector((state) => state.bot);

    // Initial backend check and models fetch on mount
    useEffect(() => {
        dispatch(checkBackendConnection());
        dispatch(getAvailableModels());

        // Periodic health check every 25 seconds
        const healthInterval = setInterval(() => {
            dispatch(checkBackendConnection());
        }, 25000);

        return () => clearInterval(healthInterval);
    }, [dispatch]);

    return (
        <div className="w-full">
            <style>{`
        .box {
          position: relative;
          background: linear-gradient(160deg, rgba(7, 36, 78, 0.82), rgba(2, 14, 36, 0.92));
          border: 1px solid rgba(27, 140, 255, 0.75);
          box-shadow: 0 0 14px rgba(25, 182, 255, 0.2), inset 0 0 18px rgba(25, 182, 255, 0.17);
          border-radius: 5px;
          padding: 16px;
        }

        .box:before, .box:after {
          content: ""; position: absolute; width: 14px; height: 14px;
          border: 2px solid #4fd0ff; filter: drop-shadow(0 0 4px #19b6ff); pointer-events: none;
        }
        .box:before { left: -1px; top: -1px; border-style: solid none none solid; border-radius: 5px 0 0; }
        .box:after { right: -1px; bottom: -1px; border-style: none solid solid none; border-radius: 0 0 5px; }

        .bar { flex: 1; height: 5px; background: #0a2a52; border-radius: 3px; overflow: hidden; }
        .bar i { display: block; height: 100%; background: linear-gradient(90deg, #0a7cff, #3cd0ff); box-shadow: 0 0 8px var(--g); }
        .spin, .spin2 { transform-origin: 260px 260px; animation: sp 60s linear infinite; }
        .spin2 { animation: sp 18s linear infinite reverse; }
        .spin-fast { animation-duration: 16s !important; }
        .spin2-fast { animation-duration: 6s !important; }
        @keyframes sp { to { transform: rotate(360deg); } }
        @media (prefers-reduced-motion: reduce) { .spin, .spin2 { animation: none; } }

        .g { position: absolute; width: 21%; aspect-ratio: 1; }
        .g svg { width: 100%; height: 100%; }
        .g div { position: absolute; inset: 0; display: grid; place-content: center; text-align: center; font-family: 'Orbitron', sans-serif; }
        .g b { font-size: clamp(15px, 2.6vw, 25px); }
        .g span { font-size: 13px; color: #cfeaff; }
        .g1 { left: -9%; top: 36%; }
        .g2 { left: 1%; bottom: -2%; }
        .g3 { right: 1%; bottom: -2%; }
        .ap { display: grid; place-items: center; width: 48px; height: 48px; margin: 0 auto 4px; font-family: 'Rajdhani', sans-serif; font-weight: 800; font-size: 20px; cursor: pointer; }
        @media (max-width: 1100px) { .g { width: 24%; } }

        .orb-listening-pulse {
          filter: drop-shadow(0 0 25px rgba(255, 65, 108, 0.65));
        }
        .orb-speaking-pulse {
          filter: drop-shadow(0 0 25px rgba(0, 240, 255, 0.65));
        }

        .typing-scanner {
          width: 14px;
          height: 14px;
          border: 2px solid #3cc8ff;
          border-top-color: transparent;
          border-radius: 50%;
          animation: sp 0.8s linear infinite;
        }

        .agent-item {
          transition: all 0.2s ease;
          border-radius: 4px;
        }
        .agent-item:hover {
          background: rgba(27, 140, 255, 0.15);
          padding-left: 8px !important;
        }
      `}</style>

            <div className="w-full py-10">
                <div className="flex items-start gap-12">
                    <div className="w-25 grid-cols-1 gap-12">
                        <DateCalendarWidget />
                        <Soundsystem />
                        <Agents />
                        <Voice />
                    </div>

                    <div className="w-50">
                        <div className="w-full">
                            {isChat ? (
                                <div>
                                    <ChatWidget />
                                </div>
                            ) : (
                                <div className="w-80 mx-auto flex items-center relative" style={{ height: "590px" }}>
                                    <CentralOrb />
                                </div>
                            )}

                            <QuickLaunch />
                        </div>
                    </div>

                    <div className="w-25 grid-cols-1 gap-12">
                        <WeatherWidget />
                        <QuickShortcuts />
                        {/* <NotificationsWidget />
                        <NetworkCard /> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default React.memo(Bot);
