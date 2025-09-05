"use client";

import { useModeAnimation } from "react-theme-switch-animation";
import { SidebarTrigger } from "../ui/sidebar";
import ToggleButton from "./ToggleButton";

export default function Navbar() {
	const { ref, toggleSwitchTheme, isDarkMode } = useModeAnimation();

	return (
		<nav className="fixed top-0 dark:bg-gray-800 bg-white w-full py-1 md:px-4 flex items-center gap-20  ">
			<SidebarTrigger />
			<button ref={ref} className="">
				<ToggleButton
					isDark={isDarkMode}
					invertedIconLogic
					onChange={toggleSwitchTheme}
				/>
			</button>
		</nav>
	);
}
