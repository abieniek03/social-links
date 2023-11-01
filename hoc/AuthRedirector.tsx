import { FC, ReactNode } from "react";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const AuthRedirector: FC<{ children: ReactNode }> = ({ children }) => {
	const cookieStore = cookies();
	const authToken = cookieStore.get("auth-token")?.value;

	if (authToken) {
		redirect("/");
	}

	return <>{children}</>;
};

export default AuthRedirector;
