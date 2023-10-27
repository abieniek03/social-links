import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

import { generateAuthToken } from "@/utils/generateTokens";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
	try {
		const { email, password } = await request.json();

		const user = await prisma.user.findFirst({
			where: {
				email,
			},
		});

		if (!user) {
			return NextResponse.json({ message: "User does not exist." }, { status: 404 });
		}

		if (!bcrypt.compareSync(password, user.hashedPassword)) {
			return NextResponse.json({ message: "Invalid password." }, { status: 400 });
		}

		const response = NextResponse.json({
			message: "Login successfully.",
			success: true,
		});

		generateAuthToken(response, user.id);

		return response;
	} catch (error: any) {
		return NextResponse.json({ error: error.message, success: false }, { status: 500 });
	}
}
