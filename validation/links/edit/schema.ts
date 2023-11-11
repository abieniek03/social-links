import * as z from "zod";
import { editMessages } from "../editMessages";

export const editLinkFormSchema = z.object({
	name: z.string({ required_error: editMessages.required }).min(3, editMessages.min),
});
