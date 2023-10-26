"use client";

import { FC } from "react";
import { useAppDispatch } from "@/store/store";
import { getUserData } from "@/store/user/thunks";

interface IAuthentication {
	children: React.ReactNode;
	token: String | undefined;
}

const Authentication: FC<IAuthentication> = ({ children, token }) => {
	const dispatch = useAppDispatch();

	if (token) {
		dispatch(getUserData(token.toString()));
	}
	return <>{children}</>;
};

export default Authentication;
