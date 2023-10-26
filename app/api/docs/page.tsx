import { FC } from "react";

import { getApiDocs } from "@/lib/swagger";
import ReactSwagger from "./react-swagger";

const IndexPage: FC = async () => {
	const spec = await getApiDocs();
	return (
		<section className="mx-auto">
			<ReactSwagger spec={spec} />
		</section>
	);
};

export default IndexPage;
