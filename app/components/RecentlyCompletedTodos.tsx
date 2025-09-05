import TodoCard from "@/components/shared/TodoCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Itodo } from "@/types";
import { CheckCheck } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function RecentlyCompletedTodos({
	recentCompletedTodos,
	completedTodos,
}: {
	recentCompletedTodos: Itodo[];
	completedTodos: Itodo[];
}) {
	return (
		<Card className="flex flex-col">
			<CardHeader className="flex-shrink-0">
				<div className="flex gap-2 items-center">
					<CheckCheck className="w-5 h-5 text-muted-foreground" />
					<h2 className="text-primary font-semibold">
						Recently Completed
					</h2>
					{completedTodos.length > 0 && (
						<span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
							{completedTodos.length}
						</span>
					)}
				</div>
			</CardHeader>
			<CardContent className="flex-1">
				{recentCompletedTodos && recentCompletedTodos.length > 0 ? (
					<div className="space-y-4">
						<div className="">
							{recentCompletedTodos.map((todo) => (
								<TodoCard
									key={todo._id}
									showCta={false}
									title={todo.title!}
									description={todo.description!}
									startDate={todo.startDate!}
									endDate={todo.endDate!}
									status={todo.status!}
									id={todo._id!}
									category={todo.category!}
								/>
							))}
						</div>
						{completedTodos.length > 1 && (
							<div className="pt-2 border-t">
								<Link href="/todos?status=completed">
									<Button
										size="sm"
										className="w-full"
									>
										View all {completedTodos.length}{" "}
										completed todos
									</Button>
								</Link>
							</div>
						)}
					</div>
				) : (
					<div className="flex flex-col items-center justify-center h-full text-center space-y-3">
						<div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
							<CheckCheck className="w-6 h-6 text-muted-foreground" />
						</div>
						<div>
							<p className="font-medium text-sm">
								No completed tasks yet
							</p>
							<p className="text-xs text-muted-foreground">
								Complete some todos to see them here
							</p>
						</div>
					</div>
				)}
			</CardContent>
		</Card>
	);
}
