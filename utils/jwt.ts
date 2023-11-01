import { NextResponse } from "next/server";

import jwt from "jsonwebtoken";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const generateAuthToken = (response: NextResponse, id: string, profileId: string) => {
	const authToken = jwt.sign({ id, profileId }, process.env.AUTH_TOKEN_SECRET as string, { expiresIn: "30d" });
	response.cookies.set("auth-token", authToken, { httpOnly: true, maxAge: 2500000 });
};

export const verifyAuthToken = (authToken: string) => {
	const verification = jwt.verify(authToken, process.env.AUTH_TOKEN_SECRET as string, async (error, payloadData) => {
		if (error) NextResponse.json({ verify: false, user: null }, { status: 401 });

		const user = await prisma.user.findFirst({
			where: {
				id: (payloadData as { id: string }).id,
			},
			select: {
				profileId: true,
				avatar: true,
				firstName: true,
				lastName: true,
			},
		});

		return NextResponse.json({
			verify: true,
			user,
		});
	});

	return verification;
};
