import { create } from "zustand";

interface ThemeStore {
	mode: "light" | "dark";
	handleThemeChange: () => void;
	setMode: (mode: "light" | "dark") => void;
}

export const useThemeStore = create<ThemeStore>((set) => ({
	mode: "light",
	handleThemeChange: () => {
		if (
			localStorage.theme === "dark" ||
			(!("theme" in localStorage) &&
				window.matchMedia("(prefers-color-scheme:dark)").matches)
		) {
			set({ mode: "dark" });
			document.documentElement.classList.add("dark");
		} else {
			set({ mode: "light" });
			document.documentElement.classList.remove("dark");
		}
	},
	setMode: (mode: "light" | "dark") => {
		set({ mode });
		localStorage.theme = mode;
		document.documentElement.classList.remove("dark");
		document.documentElement.classList.add(mode);
	},
}));
