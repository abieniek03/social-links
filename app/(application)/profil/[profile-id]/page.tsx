import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";

import jwt from "jsonwebtoken";
import { BiErrorCircle, BiEdit } from "react-icons/bi";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface IProfileData {
	avatar: string;
	firstName: string;
	lastName: string;
	profileDescription: string;
}

const getProfileData = async (profileId: string) => {
	try {
		const profileData = await prisma.user.findFirst({
			where: {
				profileId,
			},
			select: {
				avatar: true,
				firstName: true,
				lastName: true,
				profileDescription: true,
			},
		});

		return profileData;
	} catch {
		return null;
	}
};

const Profile = async (request: any) => {
	const cookieStore = cookies();
	const profileId = request.params["profile-id"];
	let isAuthenticated;

	const profileData: IProfileData | null = await getProfileData(profileId);

	const authToken = cookieStore.get("auth-token")?.value;

	if (authToken) {
		jwt.verify(authToken, process.env.AUTH_TOKEN_SECRET as string, async (_, payloadData: any) => {
			isAuthenticated = payloadData.profileId === profileId;
		});
	}

	if (!profileData) {
		return (
			<div className="mt-20 text-primary flex flex-col justify-center items-center">
				<BiErrorCircle className="text-4xl md:text-5xl" />
				<p className="font-medium text-xl md:text-2xl">Użytkownik nie istnieje</p>
			</div>
		);
	}

	return (
		<div>
			<div className="p-10">
				<div className="relative max-w-md mx-auto flex flex-col justify-center items-center pb-4 border-b dark:border-dark-hover">
					{isAuthenticated && (
						<Link
							href={`/profil/${profileId}/edytuj`}
							className="absolute top-0 right-0 text-2xl p-2 hover:text-primary"
						>
							<BiEdit />
						</Link>
					)}
					<Image src={profileData.avatar} alt="" height={100} width={100} className="rounded-full mb-2" />
					<span className="text-xl font-bold">{`${profileData.firstName} ${profileData.lastName}`}</span>
					{profileData.profileDescription && <span>{profileData.profileDescription}</span>}
				</div>
			</div>
		</div>
	);
};

export default Profile;
