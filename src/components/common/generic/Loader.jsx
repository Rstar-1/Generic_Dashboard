import React from "react";

const Loader = React.memo(({ isFading = false }) => {
  return (
    <div
      className="site-loader"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#050505",
        textAlign: "center",
        zIndex: 99999,
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        opacity: isFading ? 0 : 1,
        transition: "opacity 0.35s ease-out",
        pointerEvents: isFading ? "none" : "auto",
      }}
    >
      <div className="loader-container" style={{ position: "relative" }}>
        <div
          style={{
            width: "4rem",
            height: "4rem",
            border: "2px solid rgba(255, 107, 0, 0.15)",
            borderTop: "2px solid var(--primary, #cc5b2b)",
            borderRadius: "50%",
            animation: "spin 0.85s linear infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: "10px",
            fontWeight: "900",
            color: "var(--primary, #cc5b2b)",
            letterSpacing: "0.2em",
          }}
        >
          ASH
        </div>
      </div>
      <p
        style={{
          marginTop: "20px",
          color: "#888",
          fontSize: "12px",
          textTransform: "uppercase",
          letterSpacing: "0.3em",
        }}
      >
        VINYLS
      </p>
    </div>
  );
});

Loader.displayName = "Loader";

export default Loader;
