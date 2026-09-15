// Create stylesheet dynamically for toast animations if not already present
if (typeof document !== 'undefined') {
    const styleId = 'toast-animation-styles';
    if (!document.getElementById(styleId)) {
        const styleElement = document.createElement('style');
        styleElement.id = styleId;
        styleElement.innerHTML = `
      @keyframes toastSlideIn {
        from {
          transform: translateX(50px);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      @keyframes toastFadeOut {
        from {
          transform: translateX(0);
          opacity: 1;
        }
        to {
          transform: translateX(50px);
          opacity: 0;
        }
      }
      .toast-notification {
        animation: toastSlideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      }
      .toast-notification.hiding {
        animation: toastFadeOut 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      }
    `;
        document.head.appendChild(styleElement);
    }
}

export const showToast = (message, type = 'success') => {
    if (typeof document === 'undefined') return;

    // Ensure toast container exists
    let container = document.getElementById('global-toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'global-toast-container';
        // Position it at the bottom right
        Object.assign(container.style, {
            position: 'fixed',
            bottom: '30px',
            right: '30px',
            zIndex: '999999',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            pointerEvents: 'none',
            width: 'max-content',
            maxWidth: '90vw'
        });
        document.body.appendChild(container);
    }

    // Create toast element
    const toast = document.createElement('div');
    toast.className = 'toast-notification';

    // Style according to type
    const isSuccess = type === 'success';
    const borderVal = isSuccess ? 'var(--primary)' : 'var(--danger)';
    const strokeColor = isSuccess ? 'var(--primary)' : 'var(--danger)';

    Object.assign(toast.style, {
        backgroundColor: 'var(--dark)', // Dark premium background from theme.scss
        color: 'var(--white)', // White text from theme.scss
        padding: '12px 24px',
        borderRadius: '8px',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        fontSize: '0.95rem',
        fontWeight: '500',
        fontFamily: 'Ubuntu, Poppins, sans-serif', // Font stack from theme.scss
        pointerEvents: 'auto',
        borderLeft: `4px solid ${borderVal}`
    });

    // Success/Error Icon SVG using CSS variable for stroke
    const iconSvg = isSuccess
        ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="${strokeColor}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`
        : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="${strokeColor}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;

    toast.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: center;">
      ${iconSvg}
    </div>
    <span style="letter-spacing: -0.01em;">${message}</span>
  `;

    // Append to container
    container.appendChild(toast);

    // Auto remove after 3 seconds
    const removeToast = () => {
        toast.classList.add('hiding');
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
            // If container is empty, remove it as well
            if (container && container.childNodes.length === 0 && container.parentNode) {
                container.parentNode.removeChild(container);
            }
        }, 300);
    };

    const timeoutId = setTimeout(removeToast, 2700);

    // Allow clicking the toast to close it instantly
    toast.onclick = () => {
        clearTimeout(timeoutId);
        removeToast();
    };
};

export default showToast;
