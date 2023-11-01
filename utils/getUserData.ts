import jwt from "jsonwebtoken";

const getUserData = (authToken: string) => {
	jwt.verify(authToken, process.env.AUTH_TOKEN_SECRET as string, async (_, payloadData: any) => {
		console.log(payloadData);
	});
};
export default getUserData;
