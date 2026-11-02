import React from 'react';

const Cursor = () => {
    const [isHovered, setIsHovered] = React.useState(false);
    const [isVisible, setIsVisible] = React.useState(false);

    const ringRef = React.useRef(null);
    const dotRef = React.useRef(null);
    const mouseRef = React.useRef({ x: -100, y: -100 });
    const ringPosRef = React.useRef({ x: -100, y: -100 });
    const isHoveredRef = React.useRef(false);

    React.useEffect(() => {
        const checkMobile = () => typeof window !== 'undefined' && (
            window.matchMedia('(hover: none), (pointer: coarse)').matches || window.innerWidth <= 1024
        );

        if (checkMobile()) return;

        const isExcluded = (target) => {
            if (!target) return false;
            return !!target.closest(
                'input, textarea, select, [contenteditable="true"], [data-no-cursor]'
            );
        };

        let rafId = null;
        let isLooping = false;

        const animate = () => {
            const dx = mouseRef.current.x - ringPosRef.current.x;
            const dy = mouseRef.current.y - ringPosRef.current.y;

            ringPosRef.current.x += dx * 0.18;
            ringPosRef.current.y += dy * 0.18;

            const scaleRing = isHoveredRef.current ? 1.5 : 1;
            const scaleDot = isHoveredRef.current ? 0.6 : 1;

            if (ringRef.current) {
                ringRef.current.style.transform = `translate3d(${ringPosRef.current.x}px, ${ringPosRef.current.y}px, 0) translate(-50%, -50%) scale(${scaleRing})`;
            }
            if (dotRef.current) {
                dotRef.current.style.transform = `translate3d(${mouseRef.current.x}px, ${mouseRef.current.y}px, 0) translate(-50%, -50%) scale(${scaleDot})`;
            }

            if (Math.abs(dx) > 0.15 || Math.abs(dy) > 0.15) {
                rafId = requestAnimationFrame(animate);
            } else {
                isLooping = false;
            }
        };

        const startAnimate = () => {
            if (!isLooping) {
                isLooping = true;
                rafId = requestAnimationFrame(animate);
            }
        };

        const onMouseMove = (e) => {
            if (isExcluded(e.target)) {
                if (isVisible) setIsVisible(false);
                return;
            }
            mouseRef.current = { x: e.clientX, y: e.clientY };
            if (!isVisible) setIsVisible(true);
            startAnimate();
        };

        const onMouseOver = (e) => {
            const target = e.target;
            if (!target || isExcluded(target)) {
                setIsVisible(false);
                return;
            }
            const isInteractive = !!target.closest(
                'a, button, label, summary, [role="button"], [role="tab"], .interactive, [class*="cursor-pointer"]'
            );
            if (isHoveredRef.current !== isInteractive) {
                isHoveredRef.current = isInteractive;
                setIsHovered(isInteractive);
            }
        };

        const onKeyDown = () => {
            const active = document.activeElement;
            if (active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA' || active.isContentEditable)) {
                setIsVisible(false);
            }
        };

        const onMouseLeave = () => setIsVisible(false);
        const onMouseEnter = () => !checkMobile() && setIsVisible(true);

        window.addEventListener('mousemove', onMouseMove, { passive: true });
        window.addEventListener('mouseover', onMouseOver, { passive: true });
        window.addEventListener('keydown', onKeyDown, { passive: true });
        document.addEventListener('mouseleave', onMouseLeave);
        document.addEventListener('mouseenter', onMouseEnter);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseover', onMouseOver);
            window.removeEventListener('keydown', onKeyDown);
            document.removeEventListener('mouseleave', onMouseLeave);
            document.removeEventListener('mouseenter', onMouseEnter);
            if (rafId) cancelAnimationFrame(rafId);
        };
    }, [isVisible]);

    if (!isVisible) return null;

    return (
        <div
            className="sm-hidden md-hidden"
            style={{
                pointerEvents: 'none',
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: 999999,
                overflow: 'hidden'
            }}
        >
            <div
                ref={ringRef}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '44px',
                    height: '44px',
                    backgroundColor: isHovered ? 'rgba(73, 186, 166, 0.25)' : 'rgba(73, 186, 166, 0.12)',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    zIndex: 999999,
                    willChange: 'transform',
                    transition: 'background-color 0.3s ease, border-color 0.3s ease'
                }}
            />

            <div
                ref={dotRef}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '12px',
                    height: '12px',
                    backgroundColor: 'var(--primary)',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    zIndex: 1000000,
                    willChange: 'transform',
                    transition: 'background-color 0.3s ease'
                }}
            />
        </div>
    );
};

export default Cursor;
