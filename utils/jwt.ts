import { NextResponse } from "next/server";

import jwt from "jsonwebtoken";

export const generateAuthToken = (response: NextResponse, id: string, profileId: string) => {
	const authToken = jwt.sign({ id, profileId }, process.env.AUTH_TOKEN_SECRET as string, { expiresIn: "30d" });
	response.cookies.set("auth-token", authToken, { httpOnly: true, maxAge: 2500000 });
};

export const verifyAuthToken = (authToken: string) => {
	const verification = jwt.verify(authToken, process.env.AUTH_TOKEN_SECRET as string, async (error, payloadData) => {
		if (error) NextResponse.json({ verify: false, payloadData: null }, { status: 401 });

		const tokenData = {
			verify: true,
			payloadData,
		};

		return tokenData;
	});

	return verification;
};
