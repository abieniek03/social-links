import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const generateProfileId = async (firstName: string, lastName: string) => {
	let profileId = `${firstName.toLowerCase()}.${lastName.toLowerCase()}`;

	const idNumber = (
		await prisma.user.findMany({
			where: {
				profileId: {
					contains: profileId,
				},
			},
		})
	).length;

	return idNumber > 2 ? (profileId += `.${idNumber + 1}`) : profileId;
};
