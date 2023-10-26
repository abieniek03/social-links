import { FC, ReactNode } from "react";
import { FaHome } from "react-icons/fa";
import SwitchThemeButton from "@/components/SwitchThemeButton";
import Link from "next/link";

const AuthLayout: FC<{ children: ReactNode }> = ({ children }) => {
	return (
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
	);
};

export default AuthLayout;
