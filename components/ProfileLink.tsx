"use client";

import { FC, useState } from "react";

import EditInput from "./EditInput";

import { IoMdTrash } from "react-icons/io";
import { MdModeEdit, MdDone, MdOutlineClose } from "react-icons/md";

import { zodResolver } from "@hookform/resolvers/zod";

import { FormProvider, useForm, Controller } from "react-hook-form";
import { IEditLinkForm } from "@/validation/links/edit/types";
import { editLinkFormSchema } from "@/validation/links/edit/schema";

import { useAppSelector } from "@/store/store";
import { IUser } from "@/store/user/types";

import axios from "axios";

interface IProfileLink {
	isAuth: boolean | undefined;
	id: string;
	media: string;
	username: string;
}

const ProfileLink: FC<IProfileLink> = ({ isAuth, id, media, username }) => {
	const user: IUser | null = useAppSelector((store) => store.user.details);

	const authToken = user?.authToken;

	const [isEdit, setIsEdit] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);
	const [errorCommunicate, setErrorCommunicate] = useState<string>("");

	const form = useForm<IEditLinkForm>({
		resolver: zodResolver(editLinkFormSchema),
		mode: "onSubmit",
		reValidateMode: "onChange",
	});

	const saveChanges = (data: { username: string }) => {
		setLoading(true);
		axios
			.patch(
				`/api/link/${id}`,
				{ username: data.username },
				{
					headers: {
						Authorization: `Bearer ${authToken}`,
					},
				}
			)
			.then(() => window.location.reload())
			.catch(() => {
				setLoading(true);
				setErrorCommunicate("Nie udało się wprowadzić zmian.");
			});
	};

	const deleteLink = () => {
		const accept: boolean = confirm("Czy na pewno chcesz usunąć ten link?");

		if (accept) {
			axios
				.delete(`/api/link/${id}`, {
					headers: {
						Authorization: `Bearer ${authToken}`,
					},
				})
				.then(() => window.location.reload())
				.catch(() => alert("Nie udało się usunąć linku."));
		}
	};

	if (isAuth) {
		return (
			<div className="w-full pb-7">
				<FormProvider {...form}>
					<form className="w-full mr-5 flex justify-between items-start" onSubmit={form.handleSubmit(saveChanges)}>
						{isEdit ? (
							<>
								{loading ? (
									<p>
										<svg
											aria-hidden="true"
											role="status"
											className="inline w-4 h-4 mr-3 text-white animate-spin"
											viewBox="0 0 100 101"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
												fill="#E5E7EB"
											/>
											<path
												d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
												fill="currentColor"
											/>
										</svg>
										<span className="text-sm">Wprowadzanie zmian</span>
									</p>
								) : (
									<div className="w-full">
										<Controller
											name="username"
											control={form.control}
											render={({ field }) => (
												<EditInput {...field} id="username" placeholder="Podaj nazwę" username={username} />
											)}
										/>
									</div>
								)}
								{errorCommunicate !== "" && <span>{errorCommunicate}</span>}
							</>
						) : (
							<span className="text-xl font-bold">{media}</span>
						)}

						<div className="text-2xl flex gap-2 ml-5 mt-1">
							{isEdit ? (
								!loading && (
									<>
										<button type="submit">
											<MdDone className="text-primary" />
										</button>
										<button
											type="button"
											onClick={() => {
												setIsEdit(false);
											}}
										>
											<MdOutlineClose className="text-error" />
										</button>
									</>
								)
							) : (
								<>
									<button
										onClick={() => {
											setIsEdit(true);
										}}
									>
										<MdModeEdit className={`text-lg ${isEdit ? "text-primary" : "text-white"}`} />
									</button>
									<button onClick={deleteLink}>
										<IoMdTrash className="text-lg text-error" />
									</button>
								</>
							)}
						</div>
					</form>
				</FormProvider>
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-3">
			<a href={`https://${media.toLocaleLowerCase()}.com`} target="_blank" className="font-bold text-xl">
				<span>{media}</span>
			</a>
		</div>
	);
};

export default ProfileLink;
