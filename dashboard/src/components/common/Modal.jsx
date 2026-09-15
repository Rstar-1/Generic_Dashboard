import React, { useState, useCallback, useMemo } from "react";
import FormBuilder from "../forms/FormBuilder";
import Button from "./Button";
import Icon from "./Icon";

const MODAL_WIDTHS = {
  sm: "30%",
  md: "40%",
  lg: "50%",
  xl: "60%",
  full: "80%",
};

const Modal = React.memo(
  ({
    isOpen: controlledIsOpen,
    onClose: controlledOnClose,
    trigger,
    title,
    children,
    footer,
    size = "sm",
    closeOnOverlayClick = true,
    type = "modal",
    placement = "left",
    bodyHeight,
  }) => {
    const [localIsOpen, setLocalIsOpen] = useState(false);

    const isControlled = controlledIsOpen !== undefined;
    const isOpen = isControlled ? controlledIsOpen : localIsOpen;

    const handleClose = useCallback(() => {
      if (isControlled) {
        controlledOnClose?.();
      } else {
        setLocalIsOpen(false);
      }
    }, [isControlled, controlledOnClose]);

    const handleOpen = useCallback(() => {
      if (!isControlled) {
        setLocalIsOpen(true);
      }
    }, [isControlled]);

    const isSidebar = type === "sidebar";

    const wrapperClass = isSidebar
      ? "flex fixed top-0 left-0 w-full h-100 z-99"
      : "flex items-center justify-center fixed top-0 left-0 w-full h-100 z-99 overflow-hidden";

    const wrapperStyle = useMemo(
      () =>
        isSidebar
          ? {
            justifyContent: placement === "right" ? "flex-end" : "flex-start",
            alignItems: "stretch",
          }
          : {},
      [isSidebar, placement]
    );

    const cardClass = isSidebar
      ? `bg-white relative z-999 b-shadow border-ec p-0 overflow-auto h-100 sm-w-full ${placement === "right"
        ? "animate-sidebar-right"
        : "animate-sidebar-left"
      }`
      : "bg-white relative z-999 rounded-10 b-shadow border-ec p-0 overflow-auto animate-modal-scale sm-w-full";

    const sizeStyle = useMemo(
      () => ({
        width: MODAL_WIDTHS[size] || "30%",
        maxWidth: "100%",
      }),
      [size, isSidebar]
    );

    return (
      <>
        <style>{`
          @keyframes modalFadeIn { from { opacity: 0; } to { opacity: 1; } }
          @keyframes modalSlideInLeft { from { transform: translateX(-100%); } to { transform: translateX(0); } }
          @keyframes modalSlideInRight { from { transform: translateX(100%); } to { transform: translateX(0); } }
          @keyframes modalScaleIn { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
          .animate-backdrop { animation: modalFadeIn 0.25s ease-out forwards; }
          .animate-modal-scale { animation: modalScaleIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
          .animate-sidebar-left { animation: modalSlideInLeft 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
          .animate-sidebar-right { animation: modalSlideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        `}</style>

        {trigger &&
          React.cloneElement(trigger, {
            onClick: (e) => {
              trigger.props.onClick?.(e);
              handleOpen();
            },
          })}

        {isOpen && (
          <div className={wrapperClass} style={wrapperStyle}>
            <div
              onClick={closeOnOverlayClick ? handleClose : undefined}
              style={{
                backgroundColor: "rgba(15, 22, 35, 0.55)",
                backdropFilter: "blur(6px)",
                WebkitBackdropFilter: "blur(6px)",
              }}
              className="absolute top-0 left-0 w-full h-full animate-backdrop"
            />

            <div className={cardClass} style={sizeStyle}>
              {/* Modal Header */}
              <div className="flex items-center justify-between bordb px-14 py-10 sticky top-0 left-0 bg-white z-99">
                <h3 className="mid-text font-500 text-dark">
                  {title || "Modal Title"}
                </h3>
                <Button
                  onClick={handleClose}
                  version="icon"
                  bg="light-danger"
                  color="danger"
                  className="center-div cursor-pointer border-0"
                  aria-label="Close modal"
                >
                  <Icon name="Close" width="20" height="20" />
                </Button>
              </div>

              {/* Modal Body */}
              <div
                className="overflow-auto w-full"
                style={
                  isSidebar
                    ? { height: "calc(100vh - 60px)" }
                    : {
                      height: bodyHeight || "auto",
                      maxHeight: bodyHeight ? undefined : "400px",
                    }
                }
              >
                <div className="px-20 py-10">{children}</div>

                {/* Modal Footer */}
                {footer !== null && (
                  <div className="flex items-center justify-center gap-4 bordh p-14">
                    {footer && footer !== true ? (
                      footer
                    ) : (
                      <Button
                        onClick={handleClose}
                        bg="secondary"
                        color="white"
                        version="v0"
                      >
                        Close
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
);

Modal.displayName = "Modal";

export const CrudModal = React.memo(
  ({ title, fields, onSubmit, children, size, col, ...props }) => (
    <Modal title={title} footer={null} size={size} {...props}>
      {children || (
        <FormBuilder fields={fields} onSubmit={onSubmit} col={col} />
      )}
    </Modal>
  )
);

CrudModal.displayName = "CrudModal";

export const DeleteModal = React.memo(
  ({
    isOpen,
    onClose,
    onDelete,
    title = "Delete Confirmation",
    message = "Are you sure you want to delete this item? This action cannot be undone.",
    ...props
  }) => {
    const [loading, setLoading] = useState(false);

    const handleDelete = useCallback(async () => {
      if (!onDelete) return;
      setLoading(true);
      try {
        await onDelete();
        onClose?.();
      } catch (error) {
        console.error("Delete failed:", error);
      } finally {
        setLoading(false);
      }
    }, [onDelete, onClose]);

    return (
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={title}
        size="sm"
        footer={null}
        {...props}
      >
        <div className="text-center gap-12 py-16">
          <div
            className="flex items-center justify-center rounded-full bg-light-danger text-danger mb-12 mx-auto"
            style={{ width: "65px", height: "65px" }}
          >
            <Icon name="Delete" width="30" height="30" strokeWidth="2" />
          </div>
          <h4 className="title-text font-bold text-dark">{title}</h4>
          <p className="mini-text text-gray mt-12">{message}</p>
          <div className="flex items-center gap-12 w-full mt-20 justify-center">
            <Button
              onClick={onClose}
              disabled={loading}
              bg="secondary"
              color="white"
              version="v1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleDelete}
              disabled={loading}
              bg="danger"
              color="white"
              version="v1"
              className="flex items-center justify-center gap-6"
            >
              {loading ? (
                <span className="flex items-center gap-4">
                  <svg
                    className="animate-spin"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    style={{ animation: "spin 1s linear infinite" }}
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="rgba(255,255,255,0.3)"
                    />
                    <path d="M12 2a10 10 0 0 1 10 10" stroke="white" />
                  </svg>
                  Deleting...
                </span>
              ) : (
                "Delete"
              )}
            </Button>
          </div>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </Modal>
    );
  }
);

DeleteModal.displayName = "DeleteModal";

export default Modal;