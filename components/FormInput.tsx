import { FC } from "react";
import { useFormContext, useController } from "react-hook-form";

interface IFormInput {
	type?: string;
	id: string;
	label: string;
}

const FormInput: FC<IFormInput> = ({ type, id, label }) => {
	const {
		control,
		formState: { errors },
	} = useFormContext();
	const { field } = useController({
		control,
		name: id,
	});

	return (
		<div className="w-full mb-4">
			<label htmlFor={id} className="block mb-1 text-sm font-bold text-secondary">
				{label}
			</label>
			<input
				type={type || "text"}
				id={id}
				className="bg-light-hover border border-light dark:border-gray-600 dark:bg-dark-hover font-bold text-secondary text-sm rounded-lg outline-none ring-2 ring-transparent focus:ring-primary block w-full p-2.5"
				value={field.value}
				onChange={field.onChange}
			/>
			<label className="text-error text-xs font-semibold">{errors[id]?.message?.toString()}</label>
		</div>
	);
};

export default FormInput;
