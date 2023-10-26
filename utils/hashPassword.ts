import bcrypt from "bcrypt";

export function hashPassword(password: string) {
	const salt = bcrypt.genSaltSync(10);
	const hashedPassword = bcrypt.hashSync(password, salt);

	return hashedPassword;
}
