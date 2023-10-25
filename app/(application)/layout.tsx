import { FC, ReactNode } from "react";
import Navbar from "@/components/Navbar";

const ApplicationLayout: FC<{ children: ReactNode }> = ({ children }) => {
	return (
		<>
			<Navbar />
			<main className="max-w-screen-xl mx-auto p-3">{children}</main>
		</>
	);
};

export default ApplicationLayout;
