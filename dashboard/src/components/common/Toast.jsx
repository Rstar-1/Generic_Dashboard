import React from 'react';
import Icon from "./Icon";
import Button from "./Button";

export const TYPES = {
  success: { color: "var(--success)", title: "Success", icon: "Check" },
  error: { color: "var(--danger)", title: "Error", icon: "Close" },
  info: { color: "var(--info)", title: "Info", icon: "i" },
  warning: { color: "var(--warning)", title: "Warning", icon: "!" },
};

const getType = (type, message = "") => {
  const isDeleteSuccess = typeof message === "string" && (
    message.toLowerCase().includes("moved to trash") ||
    message.toLowerCase().includes("permanently removed") ||
    message.toLowerCase().includes("permanently deleted") ||
    message.toLowerCase().includes("deleted successfully") ||
    message.toLowerCase().includes("removed successfully") ||
    message.toLowerCase().includes("cancelled & archived")
  );
  if (isDeleteSuccess && (type === "danger" || type === "error")) {
    return TYPES.success;
  }
  return TYPES[type] || (type === "danger" ? TYPES.error : TYPES.success);
};

export const Toast = React.memo(
  ({
    type = "success",
    title,
    message,
    onClose,
    className = "",
    style = {},
  }) => {
    const config = getType(type, message);

    const handleClose = React.useCallback(
      (e) => {
        e?.stopPropagation();
        onClose?.();
      },
      [onClose]
    );

    return (
      <div
        className={`toast-in bg-white rounded-5 relative b-shadow mb-8 ${className}`}
        style={{
          minWidth: 350,
          maxWidth: 350,
          borderLeft: `6px solid ${config.color}`,
          ...style,
        }}
      >
        <div className="flex items-center p-14" style={{ gap: '16px' }}>
          <div className='w-10'>
            <div
              className="rounded-5 icon-lg"
              style={{ background: config.color }}
            >
              {["Check", "Close"].includes(config.icon) ? (
                <Icon
                  name={config.icon}
                  width={config.icon === "Check" ? 20 : 21}
                  height={config.icon === "Check" ? 20 : 21}
                  stroke="#fff"
                  strokeWidth="2"
                />
              ) : (
                <p
                  className="font-500 text-white headpara-text"
                >
                  {config.icon}
                </p>
              )}
            </div>
          </div>

          <div className="w-90">
            <h4 className="font-600 headmini-text text-dark line-clamp1 uppercase">
              {title || config.title}
            </h4>

            {message && (
              <p className="text-gray mini-text line-clamp1">
                {message}
              </p>
            )}
          </div>

          {onClose && (
            <Button
              version="icon"
              bg="transparent"
              icon="Close"
              iconWidth="15"
              iconHeight="15"
              iconStrokeWidth="2"
              color="danger"
              onClick={handleClose}
              title="Close"
              className='absolute top-0 right-0 m-2'
            />
          )}
        </div>
      </div>
    );
  }
);

Toast.displayName = "Toast"

export const ToastContainer = () => {
  const [toasts, setToasts] = React.useState([]);

  React.useEffect(() => {
    const handleToast = ({ detail }) => {
      const id = Date.now() + Math.random();

      setToasts((prev) => [...prev, { ...detail, id }]);

      setTimeout(() => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
      }, detail.duration ?? 3200);
    };

    window.addEventListener("toast", handleToast);

    return () => window.removeEventListener("toast", handleToast);
  }, []);

  const removeToast = React.useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <div
      className="fixed z-999"
      style={{
        right: 24,
        bottom: 24,
        maxWidth: "calc(100vw - 32px)",
      }}
    >
      {toasts.map((toast) => (
        <div key={toast.id} className="toast-in">
          <Toast
            {...toast}
            onClose={() => removeToast(toast.id)}
          />
        </div>
      ))}
    </div>
  );
};

export const showToast = (message, type = "success") => {
  if (typeof window === "undefined") return;

  const data =
    typeof message === "object"
      ? message
      : { message, type };

  window.dispatchEvent(
    new CustomEvent("toast", {
      detail: data,
    })
  );
};

export default Toast;