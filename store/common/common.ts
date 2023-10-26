export interface IError {
	status: number;
	message: string;
}

export interface IReducer {
	loading: boolean;
	error: IError | null;
}
