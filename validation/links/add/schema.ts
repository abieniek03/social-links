import * as z from "zod";
import { editMessages } from "../editMessages";

export const addLinkFormSchema = z.object({
	media: z.string().refine((value) => value !== "", {
		message: "Wybierz social media.",
	}),
	username: z.string({ required_error: editMessages.required }).min(3, editMessages.min),
});
