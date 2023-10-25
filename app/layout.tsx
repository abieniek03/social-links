import { FC, ReactNode } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Social links",
	description: "Projekt stworzony w celach nauki, do portfolio.",
};

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => {
	return (
		<html lang="pl">
			<body className={inter.className}>{children}</body>
		</html>
	);
};

export default RootLayout;
