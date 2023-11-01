import { FC, ReactNode } from "react";
import Link from "next/link";

import AuthRedirector from "@/hoc/AuthRedirector";

import SwitchThemeButton from "@/components/SwitchThemeButton";
import { FaHome } from "react-icons/fa";

const AuthLayout: FC<{ children: ReactNode }> = ({ children }) => {
	return (
		<AuthRedirector>
			<main className="h-screen flex flex-col justify-center items-center p-5">
				<header className="absolute w-full top-0 px-6 py-3 flex justify-between items-center">
					<Link
						href="/"
						className="hover:text-primary hover:bg-light-hover dark:bg-dark dark:hover:bg-dark-hover p-2.5 rounded-md"
					>
						<FaHome />
					</Link>
					<SwitchThemeButton />
				</header>

				{children}
			</main>
		</AuthRedirector>
	);
};

export default AuthLayout;
