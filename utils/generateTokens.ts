import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function generateAuthToken(response: NextResponse, id: string) {
	const authToken = jwt.sign({ id }, process.env.AUTH_TOKEN_SECRET as string, { expiresIn: "30d" });
	response.cookies.set("auth-token", authToken, { httpOnly: true, maxAge: 2500000 });
}
