import { FC } from "react";

const Home: FC = () => {
	return (
		<>
			<header className="my-24 font-bold text-center uppercase">
				<h1 className="text-4xl md:text-5xl lg:text-6xl">
					Łatwy i szybki <span className="text-primary">dostęp</span>
				</h1>
				<p className="text-2xl">do&nbsp;mediów społecznościowych.</p>
			</header>

			<footer className="absolute w-full bottom-0 left-0 text-neutral-300 dark:text-slate-500">
				<div className="max-w-screen-xl mx-auto border-t dark:border-dark-hover py-4 flex flex-col lg:flex-row justify-between items-center">
					<span>
						Projekt do portfolio stworzony przez:{" "}
						<a href="https://www.abieniek.dev/" className="underline">
							a.bieniek.dev
						</a>{" "}
					</span>
					<span>Listopad 2023</span>
				</div>
			</footer>
		</>
	);
};

export default Home;
