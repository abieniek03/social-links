"use client";

import { FC, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import FormInput from "@/components/FormInput";
import Button from "@/components/Button";
import Loading from "@/components/Loading";

import { BiArrowBack } from "react-icons/bi";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm, Controller } from "react-hook-form";

import { IEditProfileForm } from "@/validation/edit-profile/types";
import { editProfileFormSchema } from "@/validation/edit-profile/schema";

import { useAppSelector } from "@/store/store";
import { IUser } from "@/store/user/types";

import axios from "axios";

const EditProfilePage: FC = () => {
	const router = useRouter();
	const user: IUser | null = useAppSelector((store) => store.user.details);

	const authToken = user?.authToken;

	const [loading, setLoading] = useState<boolean>(false);
	const [userData, setUserData] = useState<IEditProfileForm>({
		firstName: "",
		lastName: "",
		profileDescription: "",
	});

	const form = useForm<IEditProfileForm>({
		resolver: zodResolver(editProfileFormSchema),
	});

	useEffect(() => {
		if (authToken) {
			axios
				.get("/api/profile", {
					headers: {
						Authorization: `Bearer ${authToken}`,
					},
				})
				.then((res) => {
					setUserData(res.data);
					form.reset(res.data);
				})
				.catch((error) => console.error(error));
		}
	}, [authToken, form]);

	const saveChanges = async (data: IEditProfileForm) => {
		try {
			setLoading(true);
			await axios.put("/api/profile", data, {
				headers: {
					Authorization: `Bearer ${authToken}`,
				},
			});
			window.location.href = `/profil/${user?.user?.profileId}`;
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	if (userData.firstName === "") {
		return <Loading />;
	}

	return (
		<div className="relative max-w-md mx-auto my-4">
			<button
				className="absolute top-0 -left-10 hover:text-primary text-xl font-bold p-2"
				onClick={() => router.back()}
			>
				<BiArrowBack />
			</button>
			<h1 className="mb-4 font-bold text-2xl text-primary">Edycja profilu</h1>
			<FormProvider {...form}>
				<form onSubmit={form.handleSubmit(saveChanges)}>
					<Controller
						name="firstName"
						control={form.control}
						render={({ field }) => <FormInput {...field} id="firstName" label="Imię" />}
					/>
					<Controller
						name="lastName"
						control={form.control}
						render={({ field }) => <FormInput {...field} id="lastName" label="Nazwisko" />}
					/>
					<Controller
						name="profileDescription"
						control={form.control}
						render={({ field }) => <FormInput {...field} type="textarea" id="profileDescription" label="Opis" />}
					/>
					<Button variant="primary" label="Zapisz" fullWidth={true} loading={loading} loadingLabel="Zapisywanie..." />
				</form>
			</FormProvider>
		</div>
	);
};

export default EditProfilePage;
