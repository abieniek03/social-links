import { FC, ReactNode } from "react";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

import ThemeProvider from "@/providers/ThemeProvider";

const font = Roboto({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
	title: "SocialLinks - Łatwy i szybki dostęp do mediów społecznościowych. ",
	description: "Projekt stworzony w celach nauki, do portfolio.",
};

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => {
	return (
		<html lang="pl">
			<body className={`${font.className} bg-white text-dark dark:bg-dark dark:text-white`}>
				<ThemeProvider>{children}</ThemeProvider>
			</body>
		</html>
	);
};

export default RootLayout;
