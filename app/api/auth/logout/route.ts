import { NextResponse } from "next/server";

export async function GET() {
	const response = NextResponse.json({ message: "User logged out." });
	response.cookies.delete("auth-token");

	return response;
}
