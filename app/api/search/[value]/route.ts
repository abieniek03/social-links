import { NextRequest, NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const GET = async (request: NextRequest) => {
	const url = await request.url.split("search/")[1].split("?limit=");
	const searchValue = url[0];
	const profileIdSearchValue = `${searchValue.split("%20")[0]}.${searchValue.split("%20")[1]}`;
	const limitValue = Number(url[1]);

	try {
		if (!searchValue || searchValue === "") {
			return NextResponse.json({ success: false, message: "Users not found." }, { status: 404 });
		}

		const result = await prisma.user.findMany({
			where: {
				OR: [
					{
						profileId: {
							startsWith: profileIdSearchValue.toLowerCase(),
							mode: "insensitive",
						},
					},
					{ firstName: { startsWith: searchValue, mode: "insensitive" } },
					{ lastName: { startsWith: searchValue, mode: "insensitive" } },
				],
			},
			select: {
				firstName: true,
				lastName: true,
				avatar: true,
				profileId: true,
				profileDescription: true,
			},
			take: limitValue || undefined,
		});

		return NextResponse.json({ success: true, searchValue, result });
	} catch {
		return NextResponse.json({ success: false, message: "Internal server error." }, { status: 500 });
	}
};
