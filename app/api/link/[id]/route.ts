import { NextRequest, NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";
import { verifyAuthToken } from "@/utils/jwt";

const prisma = new PrismaClient();

export const PATCH = async (request: NextRequest) => {
	const id = await request.url.split("link/")[1];
	const authToken = request.headers.get("Authorization")?.split(" ")[1];
	const { username } = await request.json();

	if (!authToken) {
		return NextResponse.json({ success: false, message: "User unauthorized." }, { status: 401 });
	}

	const verify: any = await verifyAuthToken(authToken);

	if (verify.verify) {
		try {
			await prisma.link.update({
				where: {
					id,
				},
				data: {
					username,
				},
			});

			return NextResponse.json({ success: true, message: `Link with ${id} has been updated.` });
		} catch {
			return NextResponse.json({ success: false, message: `Link with ${id} not found.` }, { status: 404 });
		}
	} else {
		return NextResponse.json({ success: false, message: "User unauthorized." }, { status: 401 });
	}
};

export const DELETE = async (request: NextRequest) => {
	const id = await request.url.split("link/")[1];
	const authToken = request.headers.get("Authorization")?.split(" ")[1];

	if (!authToken) {
		return NextResponse.json({ message: "User unauthorized." }, { status: 401 });
	}

	const verify: any = await verifyAuthToken(authToken);

	if (verify.verify) {
		try {
			await prisma.link.delete({
				where: {
					id,
				},
			});

			return NextResponse.json({ success: true, message: `Link with ${id} has been deleted.` });
		} catch {
			return NextResponse.json({ success: false, message: `Link with ${id} not found.` });
		}
	} else {
		return NextResponse.json({ message: "User unauthorized." }, { status: 401 });
	}
};
