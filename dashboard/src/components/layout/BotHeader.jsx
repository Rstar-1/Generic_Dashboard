import React, { useState, useEffect, useCallback, useMemo } from "react";
import { NavLink } from "react-router-dom";
import Icon from "../common/Icon";
import dumpData from "../../pages/bot/dump.json";

const SoundWave = React.memo(({ isPlaying = true, onClick }) => {
    const bars = useMemo(() => {
        const list = [];
        for (let i = 0; i < 70; i++) {
            const envelope = Math.exp(-Math.pow((i - 35) / 20, 2));
            const wave = Math.abs(Math.sin(i * 0.38) * Math.cos(i * 0.12));
            const height = Math.max(4, Math.round(4 + wave * 38 * envelope + envelope * 6));
            const duration = (0.55 + ((i * 7) % 9) * 0.08).toFixed(2);
            const delay = (-((i * 13) % 21) * 0.05).toFixed(2);
            const animIndex = (i % 3) + 1;

            list.push({
                height,
                duration: `${duration}s`,
                delay: `${delay}s`,
                animName: `voiceWave${animIndex}`,
            });
        }
        return list;
    }, []);

    return (
        <div
            className="wave flex items-center justify-center gap-2 cursor-pointer"
            onClick={onClick}
            title={isPlaying ? "Voice Active (Click to mute)" : "Voice Muted (Click to activate)"}
        >
            {bars.map((bar, idx) => (
                <b
                    key={idx}
                    style={{
                        height: `${bar.height}px`,
                        animationName: isPlaying ? bar.animName : "none",
                        animationDuration: bar.duration,
                        animationDelay: bar.delay,
                        animationIterationCount: "infinite",
                        animationTimingFunction: "ease-in-out",
                        transform: isPlaying ? undefined : "scaleY(0.18)",
                        opacity: isPlaying ? undefined : 0.4,
                        transition: isPlaying ? undefined : "transform 0.3s ease, opacity 0.3s ease",
                    }}
                />
            ))}
        </div>
    );
});
SoundWave.displayName = "SoundWave";

const BotHeader = ({
    activeNav: propActiveNav,
    onNavChange: propOnNavChange,
    currentTime: propCurrentTime,
    isPlaying: propIsPlaying,
    onTogglePlay: propOnTogglePlay,
}) => {
    const [internalActiveNav, setInternalActiveNav] = useState("home");
    const [internalTime, setInternalTime] = useState(() => new Date());
    const [internalPlaying, setInternalPlaying] = useState(true);

    const activeNav = propActiveNav !== undefined ? propActiveNav : internalActiveNav;
    const currentTime = propCurrentTime || internalTime;
    const isPlaying = propIsPlaying !== undefined ? propIsPlaying : internalPlaying;

    useEffect(() => {
        if (propCurrentTime) return;
        const timer = setInterval(() => {
            setInternalTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, [propCurrentTime]);

    const handleNavChange = useCallback(
        (id) => {
            if (propOnNavChange) propOnNavChange(id);
            else setInternalActiveNav(id);
        },
        [propOnNavChange]
    );

    const handleTogglePlay = useCallback(() => {
        if (propOnTogglePlay) propOnTogglePlay();
        else setInternalPlaying((prev) => !prev);
    }, [propOnTogglePlay]);

    const pad = useCallback((n) => String(n).padStart(2, "0"), []);

    const timeString = useMemo(
        () => `${pad(currentTime.getHours())}:${pad(currentTime.getMinutes())}:${pad(currentTime.getSeconds())}`,
        [currentTime, pad]
    );

    const dateString = useMemo(
        () =>
            currentTime
                .toLocaleDateString("en-GB", {
                    weekday: "short",
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                })
                .replace(/^(\w+)/, "$1,"),
        [currentTime]
    );

    return (
        <header className="head-box flex items-center">
            <style>{`
                .head-box {
                    position: relative;
                    background: linear-gradient(160deg, rgba(7, 36, 78, 0.82), rgba(2, 14, 36, 0.92));
                    border: 1px solid rgba(27, 140, 255, 0.75);
                    box-shadow: 0 0 14px rgba(25, 182, 255, 0.2), inset 0 0 18px rgba(25, 182, 255, 0.17);
                    padding: 10px 16px;
                    border-radius: 0;
                    color: #e8f5ff;
                }
                .head-box:before, .head-box:after {
                    content: ""; position: absolute; width: 14px; height: 14px;
                    border: 2px solid #4fd0ff; filter: drop-shadow(0 0 4px #19b6ff); pointer-events: none;
                }
                .head-box:before { left: -1px; top: -1px; border-style: solid none none solid; border-radius: 5px 0 0; }
                .head-box:after { right: -1px; bottom: -1px; border-style: none solid solid none; border-radius: 0 0 5px; }

                .wave { height: 48px; }
                .wave b {
                    width: 2px; background: #19b6ff; box-shadow: 0 0 6px #19b6ff;
                    border-radius: 2px; display: inline-block; transform-origin: center; will-change: transform;
                }
                @keyframes voiceWave1 { 0%, 100% { transform: scaleY(.18); opacity: .5; } 35% { transform: scaleY(1); opacity: 1; filter: drop-shadow(0 0 4px #19b6ff); } 70% { transform: scaleY(.38); opacity: .7; } }
                @keyframes voiceWave2 { 0%, 100% { transform: scaleY(.25); opacity: .55; } 50% { transform: scaleY(.95); opacity: 1; filter: drop-shadow(0 0 4px #19b6ff); } 80% { transform: scaleY(.2); opacity: .5; } }
                @keyframes voiceWave3 { 0%, 100% { transform: scaleY(.15); opacity: .45; } 28% { transform: scaleY(.55); opacity: .8; } 70% { transform: scaleY(1); opacity: 1; filter: drop-shadow(0 0 4px #19b6ff); } }
            `}</style>

            <div className="text-left w-10">
                <h4 className="font-600 title-text text-white">BARA</h4>
                <p className="font-400 mini-text text-white">BARASINGHA BOT V1</p>
            </div>

            <div className="w-25">
                <SoundWave isPlaying={isPlaying} onClick={handleTogglePlay} />
            </div>

            <nav className="flex items-center w-30 justify-center bg-dark rounded-30 overflow-hidden py-5" style={{ gap: "21px" }}>
                {(dumpData?.navItems || []).map((item, idx) => (
                    <NavLink
                        key={`${item.id}-${idx}`}
                        to={`#${item.id}`}
                        className={`${activeNav === item.id ? "bg-info rounded-30" : ""} flex items-center justify-center`}
                        style={{ height: "38px", width: "38px" }}
                        onClick={(e) => {
                            e.preventDefault();
                            handleNavChange(item.id);
                        }}
                    >
                        <Icon name={item.icon} width="18" height="18" stroke="var(--white)" strokeWidth="1.5" className="mx-auto" />
                    </NavLink>
                ))}
            </nav>

            <div className="w-25">
                <SoundWave isPlaying={isPlaying} onClick={handleTogglePlay} />
            </div>

            <div className="text-right w-10">
                <h4 className="font-600 title-text text-white">{timeString}</h4>
                <p className="font-400 mini-text text-white">{dateString}</p>
            </div>
        </header>
    );
};

export default React.memo(BotHeader);