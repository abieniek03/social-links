import { FC, ReactNode } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const AuthRedirector: FC<{ children: ReactNode }> = ({ children }) => {
	const cookieStore = cookies();

	if (cookieStore.get("auth-token")) {
		redirect("/panel");
	}

	return <>{children}</>;
};

export default AuthRedirector;
