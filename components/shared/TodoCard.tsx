"use client";

import React from "react";
import { Badge } from "../ui/badge";
import { renderDate } from "@/lib/utils";
import { Button } from "../ui/button";
import { CheckCheck, Pencil, Trash } from "lucide-react";
import { deleteTodo, updateStatus } from "@/services";
import Link from "next/link";
import { toast } from "sonner";

export default function TodoCard({
	title,
	description,
	startDate,
	endDate,
	status,
	id,
	showCta = true,
}: {
	title: string;
	description: string;
	startDate: Date;
	endDate: Date;
	status: "default" | "pending" | "completed";
	id: string;
	showCta?: boolean;
}) {
	const handleDeleteTodo = (id: string) => {
		deleteTodo(id);
		toast.success("Todo deleted successfully");
	};

	const handleUpdateTodo = (id: string) => {
		updateStatus(id);
	};

	return (
		<div className="border-2 rounded-lg lg:p-4 md:p-3 p-2 space-y-2 shadow-lg">
			<div className="flex items-center justify-between">
				<h4 className="font-bold lg:text-2xl md:text-xl text-lg">
					{title}
				</h4>
				{/* CTAs For Desktop */}
				{showCta && (
					<div className=" gap-1 md:gap-2 lg:gap-4 hidden lg:flex">
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
			<p className="text-gray-500">{description}</p>
			<div className="flex justify-between items-center">
				<Badge variant={status} />
				<p className="text-sm text-gray-400">
					{renderDate(endDate, status)}
				</p>
			</div>
		</div>
	);
}
