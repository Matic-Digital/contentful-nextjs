// import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export type Theme = "dark" | "light" | "system";

// Theme atom
export const themeAtom = atomWithStorage<Theme>("app-theme", "dark");
themeAtom.debugLabel = "app-theme";

// // Example counter atom
// export const counterAtom = atom(0);

// // Example text atom
// export const textAtom = atom("Hello Jotai!");

// // Example object atom
// export const userAtom = atom({
//   name: "",
//   email: "",
//   isLoggedIn: false,
// });

// // Example computed atom (derived from other atoms)
// export const doubleCounterAtom = atom((get) => get(counterAtom) * 2);

// // Example writable computed atom
// export const uppercaseTextAtom = atom(
//   (get) => get(textAtom).toUpperCase(),
//   (get, set, newValue: string) => set(textAtom, newValue),
// );
