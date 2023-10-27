import { FC } from "react";

import Logo from "./Logo";
import AccountButton from "./AccountButton";
import SwitchThemeButton from "./SwitchThemeButton";

const Navbar: FC = () => {
	return (
		<nav className="border-b border-light-hover dark:border-dark-hover">
			<div className="max-w-screen-xl mx-auto p-3 flex justify-between items-center">
				<Logo />
				<div className="flex items-center gap-4">
					<AccountButton />
					<SwitchThemeButton />
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
