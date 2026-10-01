import { Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";
import BotHeader from "./BotHeader";
import Loader from "../common/generic/Loader";

const BotLayout = () => {
    const location = useLocation();

    return (
        <div className="bot-wrapper">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700;900&family=Rajdhani:wght@500;600;700&display=swap');

                .bot-wrapper {
                  --bg: #010817; --line: #1b8cff; --g: #19b6ff; --t: #e8f5ff; --m: #8db3d8; --ok: #2be36b;
                  box-sizing: border-box;
                  background: radial-gradient(ellipse at 50% 45%, #06336e 0%, #021230 45%, var(--bg) 80%);
                  color: var(--t);
                  min-height: 100vh;
                  height: 100vh;
                  overflow: hidden;
                }
            `}</style>
            <BotHeader />
            <div key={location.key} className="w-full">
                <Suspense fallback={<Loader />}>
                    <Outlet />
                </Suspense>
            </div>
        </div>
    );
};

export default BotLayout;