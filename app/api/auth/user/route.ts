import { NextRequest, NextResponse } from "next/server";

import jwt from "jsonwebtoken";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
	const token = request.headers.get("Authorization")?.split(" ")[1];

	if (!token) return NextResponse.json({ message: "Token undefined." }, { status: 400 });
	const verification = jwt.verify(token, process.env.AUTH_TOKEN_SECRET as string, async (error, data) => {
		if (error) NextResponse.json({ verify: false, user: null }, { status: 401 });

		const user = await prisma.user.findFirst({
			where: {
				id: (data as { id: string }).id,
			},
		});
		return NextResponse.json({ verify: true, user: { id: user?.id, email: user?.email } });
	});

	return verification;
}
