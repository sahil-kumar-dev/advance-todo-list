"use client";

import React, { useEffect } from "react";
import { SidebarTrigger } from "../ui/sidebar";
import { useThemeStore } from "@/store/use-theme-store";

export default function Navbar() {
	const { handleThemeChange, setMode, mode } = useThemeStore();

	useEffect(() => {
		handleThemeChange();
	}, [setMode]);

	const handleChange = () => {
		setMode(mode === "light" ? "dark" : "light");
	};

	return (
		<nav className="fixed top-0 dark:bg-gray-800 bg-white w-full py-1 md:px-4">
			<SidebarTrigger />
			hello
			<button
				onClick={handleChange}
				className="dark:text-white text-black"
			>
				{mode}
			</button>
		</nav>
	);
}
