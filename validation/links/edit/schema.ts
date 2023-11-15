import * as z from "zod";
import { editMessages } from "../editMessages";

export const editLinkFormSchema = z.object({
	username: z.string({ required_error: editMessages.required }).min(3, editMessages.min),
});
