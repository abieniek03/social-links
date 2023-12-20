import { FC } from "react";
import Image from "next/image";
import headerImage from "@/assets/images/header.jpg";

const Home: FC = () => {
	return (
		<>
			<header className="relative my-24 font-bold flex flex-col justify-center items-center gap-3 md:flex-row md:justify-between">
				<div className="relative mb-6 md:mb-0 before:absolute before:bg-primary before:h-2 before:w-full before:rounded-lg before:-bottom-5  ">
					<h1 className="mb-1 text-center text-4xl md:text-left md:text-5xl lg:text-6xl">
						Łatwy i szybki <span className="text-primary">dostęp</span>
					</h1>
					<p className="text-2xl">do&nbsp;mediów społecznościowych.</p>
				</div>

				<Image src={headerImage} alt="" width={350} className="rounded-lg" />
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
