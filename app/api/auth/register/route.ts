import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { hashPassword } from "@/utils/hashPassword";
import { generateAuthToken } from "@/utils/generateTokens";
import generateProfileId from "@/utils/generateProfileId";

const prisma = new PrismaClient();

export const POST = async (request: NextRequest) => {
	const { firstName, lastName, email, password } = await request.json();

	const hashedPassword = hashPassword(password);

	try {
		const createdUser = await prisma.user.create({
			data: {
				firstName,
				lastName,
				email,
				hashedPassword,
				profileId: await generateProfileId(firstName, lastName),
			},
		});

		const response = NextResponse.json(
			{ message: "User has been created.", success: true, createdUser },
			{ status: 201 }
		);

		generateAuthToken(response, createdUser.id, createdUser.profileId);

		return response;
	} catch (error: any) {
		if (error.meta.target.includes("email")) {
			return NextResponse.json(
				{ message: `User with email: ${email} already exists.`, success: false },
				{ status: 409 }
			);
		}
		return NextResponse.json({ error: error.message, success: false }, { status: 500 });
	}
};
