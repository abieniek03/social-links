import { FC } from "react";
import Link from "next/link";

import { FaLink } from "react-icons/fa";

const Logo: FC = () => {
	return (
		<Link href="/" className="text-lg flex items-center gap-1">
			<FaLink className="text-primary" />
			<div className="font-bold ">
				Social<span className="text-primary">Links</span>
			</div>
		</Link>
	);
};

export default Logo;
