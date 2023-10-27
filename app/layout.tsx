import { FC, ReactNode } from "react";

import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

import { cookies } from "next/headers";

import Authentication from "@/hoc/Authentication";
import ThemeProvider from "../providers/ThemeProvider";
import ReduxProvider from "../providers/ReduxProvider";

const font = Roboto({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
	title: "SocialLinks - Łatwy i szybki dostęp do mediów społecznościowych. ",
	description: "Projekt stworzony w celach nauki, do portfolio.",
};

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => {
	const cookieStore = cookies();
	const token = cookieStore.get("auth-token")?.value;

	return (
		<html lang="pl">
			<body className={`${font.className} bg-white text-dark dark:bg-dark dark:text-white`}>
				<ReduxProvider>
					<ThemeProvider>
						<Authentication token={token}>{children}</Authentication>
					</ThemeProvider>
				</ReduxProvider>
			</body>
		</html>
	);
};

export default RootLayout;
