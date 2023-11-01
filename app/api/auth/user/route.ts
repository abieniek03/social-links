import { NextRequest, NextResponse } from "next/server";

import { verifyAuthToken } from "@/utils/jwt";

export async function GET(request: NextRequest) {
	const authToken = request.headers.get("Authorization")?.split(" ")[1];

	if (!authToken) return NextResponse.json({ verify: false, user: null, message: "Token undefined." }, { status: 400 });

	const verification = verifyAuthToken(authToken);

	return verification;
}
