export const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const DAY_NAMES_MON = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
export const DAY_NAMES_SUN = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const pad = (n) => String(n).padStart(2, "0");

export const getOptLabel = (opt) =>
  opt && typeof opt === "object" ? opt.label : opt;

export const getOptValue = (opt) =>
  opt && typeof opt === "object" ? opt.value : opt;

export const normalizeVersion = (version) => {
  if (version === 2 || version === "2" || version === "v2") return "v2";
  if (version === 3 || version === "3" || version === "v3") return "v3";
  if (version === 4 || version === "4" || version === "v4") return "v4";
  return "v1";
};

export const getInputStyle = (
  version = "v1",
  { error, isFocused, outline = true, border = false } = {},
) => {
  const normVer = normalizeVersion(version);

  const baseStyle = {
    height: "40px",
    padding: "0px",
    fontSize: "13px",
    outline: "none",
    textIndent: "14px",
    width: "100%",
  };

  if (normVer === "v2") {
    return {
      ...baseStyle,
      borderRadius: "30px",
      border: `1px solid ${
        error
          ? "var(--danger)"
          : isFocused
            ? "var(--primary)"
            : border
              ? typeof border === "string"
                ? border
                : "var(--border, #e2e8f0)"
              : outline
                ? "var(--border, #e2e8f0)"
                : "transparent"
      }`,
      backgroundColor: isFocused ? "var(--white)" : "var(--forth)",
      color: "var(--dark)",
      transition: "all 0.2s ease",
    };
  }

  if (normVer === "v3") {
    return {
      ...baseStyle,
      borderRadius: "5px",
      border: `1px solid ${
        error ? "var(--danger)" : isFocused ? "var(--primary)" : "transparent"
      }`,
      backgroundColor: isFocused ? "var(--white)" : "var(--forth)",
      color: "var(--gray)",
      transition: "all 0.2s ease",
    };
  }

  if (normVer === "v4") {
    return {
      ...baseStyle,
      borderRadius: "0px",
      border: "none",
      borderBottom: `1px solid ${
        error
          ? "var(--danger)"
          : isFocused
            ? "var(--primary)"
            : outline
              ? "#d1d5db"
              : "var(--forth)"
      }`,
      backgroundColor: "transparent",
      color: "var(--dark)",
      transition: "border-color 0.2s ease, box-shadow 0.2s ease",
    };
  }

  return {
    ...baseStyle,
    borderRadius: "8px",
    border: `1px solid ${
      error
        ? "var(--danger)"
        : isFocused
          ? "var(--secondary)"
          : outline
            ? "#ececec"
            : "var(--forth)"
    }`,
    backgroundColor: "var(--white)",
    color: "var(--gray)",
    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
  };
};

export const getBoxStyle = (
  version = "v1",
  { error, isFocused, isOpen, outline = true, border = false } = {},
) => {
  const normVer = normalizeVersion(version);
  const active = Boolean(isFocused || isOpen);

  const baseStyle = {
    height: "40px",
    position: "relative",
    width: "100%",
    outline: "none",
    transition: "all 0.2s ease",
  };

  if (normVer === "v2") {
    return {
      ...baseStyle,
      borderRadius: "30px",
      border: `1px solid ${
        error
          ? "var(--danger)"
          : active
            ? "var(--primary)"
            : border
              ? typeof border === "string"
                ? border
                : "var(--border, #e2e8f0)"
              : outline
                ? "var(--border, #e2e8f0)"
                : "transparent"
      }`,
      backgroundColor: active ? "var(--white)" : "var(--forth)",
    };
  }

  if (normVer === "v3") {
    return {
      ...baseStyle,
      borderRadius: "5px",
      border: `1px solid ${
        error ? "var(--danger)" : active ? "var(--primary)" : "transparent"
      }`,
      backgroundColor: active ? "var(--white)" : "var(--forth)",
    };
  }

  if (normVer === "v4") {
    return {
      ...baseStyle,
      borderRadius: "0px",
      border: "none",
      borderBottom: `1px solid ${
        error
          ? "var(--danger)"
          : active
            ? "var(--primary)"
            : outline
              ? "#d1d5db"
              : "var(--forth)"
      }`,
      backgroundColor: "transparent",
    };
  }

  return {
    ...baseStyle,
    borderRadius: "8px",
    border: `1px solid ${
      error
        ? "var(--danger)"
        : active
          ? "var(--secondary)"
          : outline
            ? "var(--tertiary)"
            : "var(--tertiary)"
    }`,
    backgroundColor: "var(--white)",
  };
};

export const getDragDropStyle = (isDragging) => ({
  border: isDragging
    ? "1px solid var(--primary)"
    : "1px dashed var(--secondary)",
  backgroundColor: isDragging ? "#eef2ff" : "#f5f7ff",
  borderRadius: "12px",
  padding: "30px 20px",
  color: "var(--primary)",
  fontWeight: "500",
  textAlign: "center",
  cursor: "pointer",
  userSelect: "none",
  transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
  transform: isDragging ? "scale(1.01)" : "scale(1)",
  boxShadow: isDragging ? "0 4px 14px rgba(79, 70, 229, 0.18)" : "none",
});

export const getOtpBoxStyle = (isFocused) => ({
  width: "42px",
  height: "42px",
  outline: "none",
  textAlign: "center",
  fontWeight: "600",
  borderRadius: "6px",
  border: `1px solid ${isFocused ? "var(--primary)" : "var(--forth)"}`,
  backgroundColor: "var(--white)",
  color: "var(--gray)",
  transition: "all 0.15s ease",
});

export const SLIDER_STYLES = `
  .custom-slider-input {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 6px;
    border-radius: 9999px;
    outline: none;
    transition: background 0.1s ease;
  }
  .custom-slider-input::-webkit-slider-runnable-track {
    width: 100%;
    height: 6px;
    cursor: pointer;
    border-radius: 9999px;
    background: transparent;
  }
  .custom-slider-input::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: var(--primary, #1e40af);
    border: 2.5px solid #ffffff;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    margin-top: -6px;
    transition: transform 0.15s ease, background-color 0.15s ease;
  }
  .custom-slider-input::-webkit-slider-thumb:hover {
    transform: scale(1.15);
  }
  .custom-slider-input::-webkit-slider-thumb:active {
    transform: scale(0.95);
  }
  .custom-slider-input::-moz-range-track {
    width: 100%;
    height: 6px;
    cursor: pointer;
    border-radius: 9999px;
    background: transparent;
  }
  .custom-slider-input::-moz-range-thumb {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: var(--primary, #1e40af);
    border: 2.5px solid #ffffff;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    transition: transform 0.15s ease;
  }
  .custom-slider-input::-moz-range-thumb:hover {
    transform: scale(1.15);
  }
`;
