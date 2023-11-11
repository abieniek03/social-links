import * as z from "zod";

import { editMessages } from "../edit/editMessages";

export const editProfileFormSchema = z.object({
	firstName: z.string({ required_error: editMessages.required }).min(3, editMessages.min),
	lastName: z.string({ required_error: editMessages.required }).min(2, editMessages.min),
	profileDescription: z.string(),
});
