import * as z from "zod";

export const editProfileFormSchema = z.object({
	firstName: z.string(),
	lastName: z.string(),
	description: z.string(),
});
