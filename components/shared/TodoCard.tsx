"use client";

import React from "react";
import { Badge } from "../ui/badge";
import { renderDate, renderStartDate } from "@/lib/utils";
import { Button } from "../ui/button";
import { CheckCheck, Dot, Pencil, Trash } from "lucide-react";
import { useTodoStore } from "@/store/use-todo-store";
import Link from "next/link";
import { toast } from "sonner";

export default function TodoCard({
	title,
	description,
	startDate,
	category,
	endDate,
	status,
	id,
	showCta = true,
}: {
	title: string;
	description: string;
	startDate: Date;
	endDate: Date;
	status: "pending" | "completed";
	id: string;
	showCta?: boolean;
	category: string;
}) {
	const { deleteTodoItem, completeTodo } = useTodoStore();

	const handleDeleteTodo = async (id: string) => {
		await deleteTodoItem(id);
		toast.success("Todo deleted successfully");
	};

	const handleUpdateTodo = async (id: string) => {
		await completeTodo(id);
		toast.success("Todo marked as completed");
	};

	return (
		<div className="border-2 rounded-lg lg:p-4 md:p-3 p-2 space-y-2 shadow-lg">
			<div className="flex items-start justify-between gap-2">
				<div className="min-w-0">
					<h4 className="font-bold lg:text-2xl md:text-xl text-lg break-words">
						{title}
					</h4>
					{/* Category badge */}
					{category && (
						<span className="inline-flex uppercase mt-1 items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200">
							{category}
						</span>
					)}
				</div>
				{/* CTAs For Desktop */}
				{showCta && (
					<div className="gap-1 md:gap-2 lg:gap-4 hidden lg:flex flex-shrink-0">
						<Button
							onClick={() => {
								handleUpdateTodo(id);
							}}
							className="bg-success hover:bg-success/70 disabled:cursor-not-allowed"
							disabled={status === "completed"}
						>
							Mark as completed
							<CheckCheck />
						</Button>
						<Link
							href={"/edit-todo/" + id}
							className={""}
						>
							<Button className="bg-progress hover:bg-progress/70">
								Edit
								<Pencil />
							</Button>
						</Link>
						<Button
							onClick={() => handleDeleteTodo(id)}
							className="bg-error hover:bg-error/70"
						>
							Delete
							<Trash />
						</Button>
					</div>
				)}
			</div>
			<p className="text-gray-500 break-words">{description}</p>
			<div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
				<Badge variant={status} />
				<p className="text-sm text-gray-400 flex items-center flex-wrap gap-1">
					{showCta && (
						<>
							<span>Start Date {renderStartDate(startDate)}</span>
							<Dot />
						</>
					)}
					<span>{renderDate(endDate, status)}</span>
				</p>
			</div>

			{/* CTAs For Mobile/Tablet */}
			{showCta && (
				<div className="flex lg:hidden gap-2 pt-2">
					<Button
						onClick={() => {
							handleUpdateTodo(id);
						}}
						className="bg-success hover:bg-success/70 disabled:cursor-not-allowed px-3 py-1 text-sm"
						disabled={status === "completed"}
					>
						<CheckCheck className="w-4 h-4" />
					</Button>
					<Link
						href={"/edit-todo/" + id}
						className={""}
					>
						<Button className="bg-progress hover:bg-progress/70 px-3 py-1 text-sm">
							<Pencil className="w-4 h-4" />
						</Button>
					</Link>
					<Button
						onClick={() => handleDeleteTodo(id)}
						className="bg-error hover:bg-error/70 px-3 py-1 text-sm"
					>
						<Trash className="w-4 h-4" />
					</Button>
				</div>
			)}
		</div>
	);
}
