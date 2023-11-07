import { NextRequest, NextResponse } from "next/server";

import { verifyAuthToken } from "@/utils/jwt";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const GET = async (request: NextRequest) => {
	const authToken = request.headers.get("Authorization")?.split(" ")[1];

	if (!authToken) return NextResponse.json({ verify: false, user: null, message: "Token undefined." }, { status: 400 });

	const verification: any = await verifyAuthToken(authToken);

	const user = await prisma.user.findFirst({
		where: {
			id: verification.payloadData.id,
		},
		select: {
			firstName: true,
			lastName: true,
			profileDescription: true,
		},
	});

	return NextResponse.json(user);
};

export const PUT = async (request: NextRequest) => {
	const authToken = request.headers.get("Authorization")?.split(" ")[1];
	const updateData = await request.json();

	if (!authToken) return NextResponse.json({ verify: false, user: null, message: "Token undefined." }, { status: 400 });

	const verification: any = await verifyAuthToken(authToken);

	const user = await prisma.user.update({
		where: {
			id: verification.payloadData.id,
		},
		data: updateData,
	});

	return NextResponse.json(user);
};
