import { FC } from "react";
import Link from "next/link";

interface IButton {
	path?: string;
	onClick?: () => void;
	variant: string;
	label: string;
	loading?: boolean;
	loadingLabel?: string;
	fullWidth?: boolean;
	size?: string;
}

const Button: FC<IButton> = ({ path, onClick, variant, label, loading, loadingLabel, fullWidth, size }) => {
	const buttonStyles = `px-4 py-2 rounded-md font-bold text-center ${size ? "text-" + size : ""} ${
		fullWidth ? "w-full" : ""
	}`;
	const primaryColors = "text-white bg-primary hover:bg-primary-hover";
	const secondaryColors =
		"text-primary border border-primary hover:bg-light-hover dark:bg-dark dark:hover:bg-dark-hover";

	const variantStyles = variant === "primary" ? primaryColors : secondaryColors;

	if (path) {
		return (
			<Link href={path} className={`${buttonStyles} ${variantStyles}`}>
				{label}
			</Link>
		);
	}

	return (
		<button
			onClick={onClick}
			className={`${buttonStyles} ${variantStyles} ${loading && "opacity-50"}`}
			disabled={loading}
		>
			{loading ? loadingLabel : label}
		</button>
	);
};

export default Button;
