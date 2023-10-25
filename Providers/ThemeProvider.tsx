"use client";
import { FC, ReactNode } from "react";
import { ThemeProvider as NextThemeProvider } from "next-themes";

const ThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {
	return (
		<NextThemeProvider enableSystem={true} attribute="class">
			{children}
		</NextThemeProvider>
	);
};

export default ThemeProvider;
