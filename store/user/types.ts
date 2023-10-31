import { IReducer } from "@/store/common/common";

interface IUserData {
	id: string;
	avatar: string;
	fullName: string;
	profileId: string;
}

export interface IUser {
	verify: boolean;
	user: IUserData | null;
}

export interface IUserReducer extends IReducer {
	details: IUser | null;
}
