import * as z from "zod";
import { editMessages } from "../editMessages";

export const addLinkFormSchema = z.object({
	name: z.string({ required_error: editMessages.required }).min(3, editMessages.min),
	media: z.string({ required_error: "Wybierz social media." }),
});
