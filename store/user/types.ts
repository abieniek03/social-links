import { IReducer } from "@/store/common/common";

interface IUserData {
	id: number | null;
	email: string | null;
}

export interface IUser {
	verify: boolean;
	user: IUserData | null;
}

export interface IUserReducer extends IReducer {
	details: IUser | null;
}
