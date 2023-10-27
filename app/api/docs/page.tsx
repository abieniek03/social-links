import { FC } from "react";
import type { Metadata } from "next";

import { getApiDocs } from "@/lib/swagger";
import ReactSwagger from "./react-swagger";

export const metadata: Metadata = {
	title: "SocialLinks - API Docs",
	description: "Dokumentacja API do projektu stworzonego w celach nauki, do portfolio.",
};

const IndexPage: FC = async () => {
	const spec = await getApiDocs();

	return (
		<body className="dark:bg-white">
			<section className="mx-auto">
				<ReactSwagger spec={spec} />
			</section>
		</body>
	);
};

export default IndexPage;
