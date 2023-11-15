import { NextRequest, NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";
import { verifyAuthToken } from "@/utils/jwt";

const prisma = new PrismaClient();

export const POST = async (request: NextRequest) => {
	const { media, username } = await request.json();
	const authToken = request.headers.get("Authorization")?.split(" ")[1];

	const selectUrl = (media: string) => {
		switch (media) {
			case "Instagram":
				return "https://www.instagram.com/";
				break;
			case "LinkedIn":
				return "https://www.linkedin.com/";
				break;
			case "X":
				return "https://twitter.com/";
				break;
			default:
				return "https://www.tiktok.com/@";
		}
	};

	if (!authToken) {
		return NextResponse.json({ message: "Auth token is required." }, { status: 401 });
	}

	const verify: any = await verifyAuthToken(authToken);

	const { profileId } = verify.payloadData;

	const validation = await prisma.link.findFirst({
		where: {
			media,
			profileId,
		},
	});

	if (validation)
		return NextResponse.json({ message: "Selected link has been added to your profile." }, { status: 409 });

	const newLink = await prisma.link.create({ data: { media, username, profileId, url: selectUrl(media) } });

	return NextResponse.json(newLink, { status: 201 });
};


