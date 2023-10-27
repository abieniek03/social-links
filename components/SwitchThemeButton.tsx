"use client";

import { FC, useState, useEffect } from "react";
import { useTheme } from "next-themes";

import { FiSun, FiMoon } from "react-icons/fi";

const SwitchThemeButton: FC = () => {
	const { systemTheme, theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState<boolean>(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null;

	let currentTheme = theme === "system" ? systemTheme : theme;

	const switchTheme = () => {
		currentTheme === "dark" ? setTheme("light") : setTheme("dark");
	};

	return (
		<button
			onClick={switchTheme}
			className="hover:text-primary hover:bg-light-hover dark:bg-dark dark:hover:bg-dark-hover p-2.5 rounded-md"
		>
			{currentTheme === "dark" ? <FiSun /> : <FiMoon />}
		</button>
	);
};

export default SwitchThemeButton;
