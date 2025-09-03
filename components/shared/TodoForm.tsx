"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { todosCategories } from "@/constants";
import { AddTodoSchema, addTodoSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { Card, CardContent, CardHeader } from "../ui/card";
import { addTodo, findTodoById, updateTodo } from "@/services";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useEffect } from "react";

export default function TodoForm({
	isEdit = false,
	id,
}: {
	isEdit?: boolean;
	id?: string;
}) {
	const router = useRouter();

	const {
		handleSubmit,
		control,
		register,
		reset,
		setValue,
		formState: { errors, isSubmitting },
	} = useForm<AddTodoSchema>({
		defaultValues: {
			startDate: new Date(),
		},
		resolver: zodResolver(addTodoSchema),
	});

	const onSubmit = async (data: AddTodoSchema) => {
		if (isEdit) {
			await updateTodo(id, data);
			toast.info("Todo updated successfully");
			router.push("/todos");
			return;
		} else {
			await addTodo(data);
			toast.success("Todo added successfully");
			router.push("/todos");
		}
	};

	useEffect(() => {
		(async () => {
			if (isEdit) {
				const todo = await findTodoById(id);
				const parsedTodo = JSON.parse(todo);
				console.log(parsedTodo);
				setValue("title", parsedTodo.title);
				setValue("description", parsedTodo.description);
				setValue("startDate", new Date(parsedTodo.startDate));
				setValue("category", parsedTodo.category);
				setValue("endDate", new Date(parsedTodo.endDate));
			}
		})();
	}, [id, isEdit, reset, setValue]);

	return (
		<Card>
			<CardHeader>
				<h1 className="text-center font-bold text-primary text-xl md:text-2xl lg:text-4xl">
					{isEdit ? "Edit Todo" : "Add Todo"}
				</h1>
			</CardHeader>
			<CardContent>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="flex gap-4 flex-col"
				>
					{Object.keys(errors).length > 0 && (
						<Alert variant="destructive">
							<AlertTitle>Heads up!</AlertTitle>
							<AlertDescription>
								<ul className="list-inside">
									{Object.keys(errors).map((key) => (
										<li
											className="list-disc"
											key={key as keyof typeof errors}
										>
											{
												(
													errors as Record<
														string,
														{
															message?: string;
														}
													>
												)[key]?.message
											}
										</li>
									))}
								</ul>
							</AlertDescription>
						</Alert>
					)}
					<Input
						aria-invalid={!!errors.title?.message}
						type="text"
						{...register("title")}
						placeholder="Todo Title"
						className="first-letter:uppercase"
					/>
					<Textarea
						aria-invalid={!!errors.description?.message}
						{...register("description")}
						rows={4}
						placeholder="Todo Description"
					/>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full justify-between">
						<Controller
							name="startDate"
							control={control}
							render={({ field }) => (
								<DatePicker
									disabled={true}
									date={field.value}
									setDate={field.onChange}
									placeholder="Todo Start Date"
								/>
							)}
						/>
						<Controller
							name="endDate"
							control={control}
							render={({ field }) => (
								<DatePicker
									disabled={false}
									date={field.value}
									setDate={field.onChange}
									placeholder="Todo End Date"
								/>
							)}
						/>
					</div>
					<Controller
						name="category"
						control={control}
						render={({ field }) => (
							<Select
								onValueChange={field.onChange}
								value={field.value}
							>
								<SelectTrigger
									aria-invalid={!!errors.category?.message}
									className="w-full"
									defaultValue={field.value}
								>
									<SelectValue placeholder="Todo Category" />
								</SelectTrigger>
								<SelectContent>
									{todosCategories.map(({ label, value }) => (
										<SelectItem
											key={value}
											value={value}
										>
											{label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						)}
					/>
					<Button
						type="submit"
						disabled={isSubmitting}
						className="cursor-pointer"
					>
						{isSubmitting ? (
							<>
								{isEdit ? "Editing Todo..." : "Adding Todo..."}
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
							</>
						) : (
							<span>{isEdit ? "Edit Todo" : "Add Todo"}</span>
						)}
					</Button>
				</form>
			</CardContent>
		</Card>
	);
}
