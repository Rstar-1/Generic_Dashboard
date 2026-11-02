const VITE_IMAGE =
  (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_IMAGE) ||
  (typeof process !== "undefined" && process.env && process.env.VITE_IMAGE) ||
  "https://raw.githubusercontent.com/Rstar-1/generic_images/refs/heads/main/ashmita/";

export const resolveImagePath = (path) => {
  if (!path) return "";
  if (typeof path !== "string") return path;

  const trimmed = path.trim();
  if (!trimmed) return "";

  if (
    trimmed.startsWith("http://") ||
    trimmed.startsWith("https://") ||
    trimmed.startsWith("data:") ||
    trimmed.startsWith("blob:") ||
    trimmed.startsWith("//")
  ) {
    return trimmed;
  }

  const base = VITE_IMAGE.replace(/\/+$/, "");
  const cleanPath = trimmed
    .replace(/^(\.\.\/|\.\/)+assets\//, "")
    .replace(/^\/?(src\/)?assets\//, "")
    .replace(/^\/+/, "");

  return base ? `${base}/${cleanPath}` : `/${cleanPath}`;
};

export default resolveImagePath;
