"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/ui/date-picker";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { todosCategories } from "@/constants";
import { Button } from "@/components/ui/button";
import { Controller, useForm } from "react-hook-form";
import { AddTodoSchema, addTodoSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

export default function Page() {
	const {
		handleSubmit,
		control,
		register,
		formState: { errors, isSubmitting },
	} = useForm<AddTodoSchema>({
		defaultValues: {
			title: "",
			description: "",
			category: "",
			startDate: new Date(),
		},
		resolver: zodResolver(addTodoSchema),
	});

	const onSubmit = (data: AddTodoSchema) => {
		console.log(errors);
		console.log(data);
	};

	return (
		<div className="flex items-center justify-center h-full">
			<div className="content h-[calc(100vh_-_150px)] space-y-4">
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
													{ message?: string }
												>
											)[key]?.message
										}
									</li>
								))}
							</ul>
						</AlertDescription>
					</Alert>
				)}
				<Card>
					<CardHeader>
						<h1 className="text-center font-bold text-primary text-xl md:text-2xl lg:text-4xl">
							Add new todo
						</h1>
					</CardHeader>
					<CardContent>
						<form
							onSubmit={handleSubmit(onSubmit)}
							className="flex gap-4 flex-col"
						>
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
									<Select onValueChange={field.onChange}>
										<SelectTrigger
											aria-invalid={
												!!errors.category?.message
											}
											className="w-full"
											defaultValue={field.value}
										>
											<SelectValue placeholder="Todo Category" />
										</SelectTrigger>
										<SelectContent>
											{todosCategories.map(
												({ label, value }) => (
													<SelectItem
														key={value}
														value={value}
													>
														{label}
													</SelectItem>
												)
											)}
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
									<span>
										Adding...
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									</span>
								) : (
									"Add Todo"
								)}
							</Button>
						</form>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
