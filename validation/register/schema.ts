import * as z from "zod";
import { registerFormMessage } from "./message";

export const passwordSchema = z
	.string()
	.min(6, { message: registerFormMessage.password.min })
	.refine(
		(value) => {
			const hasDigit = /\d/.test(value);
			const hasLower = /[a-z]/.test(value);
			const hasUpper = /[A-Z]/.test(value);
			const hasSpecial = /[!.?@#$%^&*()_+\-=]/.test(value);
			return hasDigit && hasLower && hasUpper && hasSpecial;
		},
		{ message: registerFormMessage.password.valid }
	);

export const registerFormSchema = z
	.object({
		firstName: z.string().min(3, { message: registerFormMessage.firstName.min }),
		lastName: z.string().min(3, { message: registerFormMessage.lastName.min }),
		email: z.string().email({ message: registerFormMessage.email.valid }),
		password: passwordSchema,
		rePassword: z
			.string({ required_error: registerFormMessage.rePassword.require })
			.min(1, { message: registerFormMessage.rePassword.require }),
	})
	.superRefine(({ rePassword, password }, ctx) => {
		if (rePassword !== password) {
			ctx.addIssue({
				code: "custom",
				message: registerFormMessage.rePassword.same,
				path: ["rePassword"],
			});
		}
	});
