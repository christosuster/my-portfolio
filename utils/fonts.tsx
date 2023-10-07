import {
  Montserrat,
  Poiret_One,
  Comfortaa,
  Zen_Loop,
  Alumni_Sans_Pinstripe,
} from "next/font/google";

export const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600"],
});

export const zen = Zen_Loop({
  subsets: ["latin"],
  weight: ["400"],
});

export const alumni = Alumni_Sans_Pinstripe({
  subsets: ["latin"],
  weight: ["400"],
});

export const poiret = Poiret_One({
  subsets: ["latin-ext"],
  weight: "400",
});

export const comfortaa = Comfortaa({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});
