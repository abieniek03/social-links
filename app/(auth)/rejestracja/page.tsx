"use client";

import { FC, useState } from "react";
import Link from "next/link";

import Alert from "@/components/Alert";
import FormInput from "@/components/FormInput";
import Button from "@/components/Button";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

import { IRegisterForm } from "@/validation/register/types";
import { defaultRegisterForm } from "@/validation/register/default";
import { registerFormSchema } from "@/validation/register/schema";

import axios from "axios";

const RegisterPage: FC = () => {
	const [loading, setLoading] = useState<boolean>(false);
	const [errorAlert, setErrorAlert] = useState<string>("");

	const form = useForm<IRegisterForm>({
		resolver: zodResolver(registerFormSchema),
		defaultValues: defaultRegisterForm,
		mode: "onSubmit",
		reValidateMode: "onChange",
	});

	const handleRegister = async (data: IRegisterForm) => {
		setErrorAlert("");

		try {
			setLoading(true);
			const response = await axios.post("/api/auth/register", data);
			console.log(response);
		} catch (error: any) {
			if (error.response.status === 409) {
				setErrorAlert("Istnieje już użytkownik zarejestrowany na podany adres mailowy.");
			} else {
				setErrorAlert("Rejestracja nie udana.");
			}
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<div className="text-center font-bold mb-8">
				<h1 className="text-primary text-4xl mb-2">Dołącz do naszej społeczności</h1>
				<p>Załóż swoje konto wypełniając formularz.</p>
			</div>
			<div className="w-full max-w-md">
				{errorAlert !== "" && <Alert type="error" info={errorAlert} />}
				<FormProvider {...form}>
					<form className="w-full max-w-md" onSubmit={form.handleSubmit(handleRegister)}>
						<div className="md:flex md:justify-between md:items-center md:gap-3">
							<FormInput type="text" id="firstName" label="Imię" />
							<FormInput type="text" id="lastName" label="Nazwisko" />
						</div>
						<FormInput type="email" id="email" label="Adres mailowy" />
						<FormInput type="password" id="password" label="Hasło" />
						<FormInput type="password" id="rePassword" label="Powtórz hasło" />
						<Button
							variant="primary"
							label="Zarejestruj się"
							loading={loading}
							loadingLabel="Rejestracja..."
							fullWidth={true}
						/>
					</form>
				</FormProvider>
				<hr className="mt-8 mb-6 border-neutral-300" />
				<Link href="/logowanie" className=" block text-center hover:underline">
					Masz już konto? <span className="font-bold">Zaloguj się.</span>
				</Link>
			</div>
		</>
	);
};

export default RegisterPage;
