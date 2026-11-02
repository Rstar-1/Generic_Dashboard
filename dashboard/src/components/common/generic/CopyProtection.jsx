import React from 'react';

const CopyProtection = () => {
    const isPrivacy =
        String(import.meta.env.PRIVACY ?? import.meta.env.VITE_PRIVACY).toLowerCase() === 'true';

    React.useEffect(() => {
        if (!isPrivacy) return;

        const setPrivate = (e) => {
            if (e?.preventDefault) e.preventDefault();
            if (e?.clipboardData) {
                e.clipboardData.clearData();
                e.clipboardData.setData('text/plain', 'Its Private');
            } else {
                navigator.clipboard?.writeText('Its Private').catch(() => {});
            }
        };

        const onKeyDown = (e) => {
            const k = (e.key || '').toLowerCase();
            const mod = e.ctrlKey || e.metaKey;
            // Block F12, Ctrl+Shift+I/J/C, Ctrl+U (source), Ctrl+S (save)
            if (
                k === 'f12' ||
                (mod && e.shiftKey && ['i', 'j', 'c'].includes(k)) ||
                (mod && ['u', 's'].includes(k))
            ) {
                setPrivate(e);
            }
        };

        document.body.classList.add('privacy-protected');
        ['copy', 'cut', 'contextmenu', 'dragstart'].forEach((evt) =>
            document.addEventListener(evt, setPrivate, true)
        );
        window.addEventListener('keydown', onKeyDown, true);

        return () => {
            document.body.classList.remove('privacy-protected');
            ['copy', 'cut', 'contextmenu', 'dragstart'].forEach((evt) =>
                document.removeEventListener(evt, setPrivate, true)
            );
            window.removeEventListener('keydown', onKeyDown, true);
        };
    }, [isPrivacy]);

    return null;
};

export default CopyProtection;
