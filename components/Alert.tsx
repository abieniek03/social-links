interface IAlert {
	type: string;
	info: string;
}

const stylesError = "text-red-800 border-red-300 bg-red-50 dark:bg-red-950 dark:border-red-800 dark:text-red-400";
const stylesInfo =
	"text-blue-800 border border-blue-300 bg-blue-50 dark:bg-sky-950 dark:border-sky-800 dark:text-sky-400";
const stylesSuccess =
	"text-green-800 border border-green-300 bg-green-50 dark:bg-green-950 dark:border-green-800 dark:text-green-400";

export default function Alert({ type, info }: IAlert) {
	return (
		<div
			className={`flex items-center p-4 mb-4 text-sm border rounded-lg ${type === "error" && stylesError} 
      ${type === "info" && stylesInfo}
      ${type === "success" && stylesSuccess}
      `}
			role="alert"
		>
			<svg
				className="flex-shrink-0 inline w-4 h-4 mr-3"
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
				fill="currentColor"
				viewBox="0 0 20 20"
			>
				<path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
			</svg>

			<p className="font-medium">{info}</p>
		</div>
	);
}
