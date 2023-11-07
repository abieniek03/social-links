import { IReducer } from "@/store/common/common";

interface IUserData {
	id: string;
	avatar: string;
	firstName: string;
	lastName: string;
	profileId: string;
}

export interface IUser {
	verify: boolean;
	authToken: string | null;
	user: IUserData | null;
}

export interface IUserReducer extends IReducer {
	details: IUser | null;
}
