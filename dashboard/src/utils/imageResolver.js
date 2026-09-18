import hero from "../assets/hero.png";
import soboLogo from "../assets/sobo_logo.webp";
import soboWhite from "../assets/sobo_white.png";
import dashImg from "../assets/dashimg.png";

// Section showcase image assets
import CROSY from "../assets/CROSY.png";
import DSBKO from "../assets/DSBKO.png";
import SPLEDO from "../assets/SPLEDO.png";
import ENGIN from "../assets/ENGIN.png";
import NEXTG from "../assets/NEXTG.png";
import GOLDN from "../assets/GOLDN.png";
import MEDOX from "../assets/MEDOX.png";
import SPRIT from "../assets/SPRIT.png";
import LUMIN from "../assets/LUMIN.png";
import MANIS from "../assets/MANIS.png";
import GAPMS from "../assets/GAPMS.png";
import IMSALE from "../assets/IMSALE.png";
import KAIOM from "../assets/KAIOM.png";
import MASKY from "../assets/MASKY.png";
import VINYLS from "../assets/VINYLS.png";
import TOFFE from "../assets/TOFFE.png";

const assetMap = {
  // Hero & Brand assets
  "/src/assets/hero.png": hero,
  "/hero.png": hero,
  "hero.png": hero,
  "hero": hero,

  "/src/assets/sobo_logo.webp": soboLogo,
  "/sobo_logo.webp": soboLogo,
  "sobo_logo.webp": soboLogo,
  "sobo": soboLogo,

  "/src/assets/sobo_white.png": soboWhite,
  "/sobo_white.png": soboWhite,
  "/sobos.png": soboWhite,
  "sobo_white.png": soboWhite,

  "/src/assets/dashimg.png": dashImg,
  "/dashimg.png": dashImg,
  "dashimg.png": dashImg,
  "dash": dashImg,

  // Section showcase assets
  "/src/assets/CROSY.png": CROSY,
  "/CROSY.png": CROSY,
  "CROSY.png": CROSY,
  "CROSY": CROSY,

  "/src/assets/DSBKO.png": DSBKO,
  "/DSBKO.png": DSBKO,
  "DSBKO.png": DSBKO,
  "DSBKO": DSBKO,

  "/src/assets/SPLEDO.png": SPLEDO,
  "/SPLEDO.png": SPLEDO,
  "SPLEDO.png": SPLEDO,
  "SPLEDO": SPLEDO,

  "/src/assets/ENGIN.png": ENGIN,
  "/ENGIN.png": ENGIN,
  "ENGIN.png": ENGIN,
  "ENGIN": ENGIN,

  "/src/assets/NEXTG.png": NEXTG,
  "/NEXTG.png": NEXTG,
  "NEXTG.png": NEXTG,
  "NEXTG": NEXTG,

  "/src/assets/GOLDN.png": GOLDN,
  "/GOLDN.png": GOLDN,
  "GOLDN.png": GOLDN,
  "GOLDN": GOLDN,

  "/src/assets/MEDOX.png": MEDOX,
  "/MEDOX.png": MEDOX,
  "MEDOX.png": MEDOX,
  "MEDOX": MEDOX,

  "/src/assets/SPRIT.png": SPRIT,
  "/SPRIT.png": SPRIT,
  "SPRIT.png": SPRIT,
  "SPRIT": SPRIT,

  "/src/assets/LUMIN.png": LUMIN,
  "/LUMIN.png": LUMIN,
  "LUMIN.png": LUMIN,
  "LUMIN": LUMIN,

  "/src/assets/MANIS.png": MANIS,
  "/MANIS.png": MANIS,
  "MANIS.png": MANIS,
  "MANIS": MANIS,

  "/src/assets/GAPMS.png": GAPMS,
  "/GAPMS.png": GAPMS,
  "GAPMS.png": GAPMS,
  "GAPMS": GAPMS,

  "/src/assets/IMSALE.png": IMSALE,
  "/IMSALE.png": IMSALE,
  "IMSALE.png": IMSALE,
  "IMSALE": IMSALE,

  "/src/assets/KAIOM.png": KAIOM,
  "/KAIOM.png": KAIOM,
  "KAIOM.png": KAIOM,
  "KAIOM": KAIOM,

  "/src/assets/MASKY.png": MASKY,
  "/MASKY.png": MASKY,
  "MASKY.png": MASKY,
  "MASKY": MASKY,

  "/src/assets/VINYLS.png": VINYLS,
  "/VINYLS.png": VINYLS,
  "VINYLS.png": VINYLS,
  "VINYLS": VINYLS,

  "/src/assets/TOFFE.png": TOFFE,
  "/TOFFE.png": TOFFE,
  "TOFFE.png": TOFFE,
  "TOFFE": TOFFE,
};

export const resolveImagePath = (path) => {
  if (!path) return "";
  if (typeof path === "string") {
    return assetMap[path] || assetMap[path.trim()] || path;
  }
  return path;
};

export {
  hero,
  soboLogo,
  soboWhite,
  dashImg,
  CROSY,
  DSBKO,
  SPLEDO,
  ENGIN,
  NEXTG,
  GOLDN,
  MEDOX,
  SPRIT,
  LUMIN,
  MANIS,
  GAPMS,
  IMSALE,
  KAIOM,
  MASKY,
  VINYLS,
  TOFFE,
};

export default resolveImagePath;
