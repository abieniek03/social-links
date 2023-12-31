import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";

import jwt from "jsonwebtoken";

import { BiErrorCircle, BiEdit } from "react-icons/bi";

import ProfileLink from "@/components/ProfileLink";
import AddLink from "@/components/AddLink";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface ILink {
	id: string;
	media: string;
	username: string;
}
interface IProfileData {
	avatar: string;
	firstName: string;
	lastName: string;
	profileDescription: string;
	links: ILink[];
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
				links: { select: { id: true, media: true, username: true } },
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
	let isAuthenticated: any;

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
				<div className="relative max-w-md mx-auto">
					<div className="w-full flex flex-col justify-center items-center pb-4 border-b dark:border-dark-hover">
						{isAuthenticated && (
							<Link
								href={`/profil/${profileId}/edytuj`}
								className="absolute top-0 right-0 text-2xl p-2 hover:text-primary"
							>
								<BiEdit />
							</Link>
						)}
						<Image src={profileData.avatar} alt="" height={100} width={100} className="rounded-full mb-2" />
						<h1 className="text-xl font-bold">{`${profileData.firstName} ${profileData.lastName}`}</h1>
						{profileData.profileDescription && <span>{profileData.profileDescription}</span>}
					</div>

					<div className="flex flex-col justify-center items-center gap-2.5 pt-4">
						{profileData.links.map((el, index) => (
							<ProfileLink key={index} isAuth={isAuthenticated} id={el.id} media={el.media} username={el.username} />
						))}

						<hr />
						{isAuthenticated && <AddLink />}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;
