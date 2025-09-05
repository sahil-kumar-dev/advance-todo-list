"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useTodoStore } from "@/store/use-todo-store";
import { FileCheck2 } from "lucide-react";
import { ChartStatus } from "./components/chart-status";
import PendingTodos from "./components/PendingTodos";
import RecentlyCompletedTodos from "./components/RecentlyCompletedTodos";
import TodoFallback from "./components/TodoFallback";
import { useEffect } from "react";

export default function Page() {
	const { todos, fetchTodos } = useTodoStore();

	const pendingTodos = todos.filter((todo) => todo.status === "pending");
	const completedTodos = todos.filter((todo) => todo.status === "completed");
	const recentPendingTodos = pendingTodos.slice(0, 4);
	const recentCompletedTodos = completedTodos.slice(0, 1);

	useEffect(() => {
		fetchTodos();
	}, [fetchTodos]);

	// If no todos exist at all
	if (todos.length === 0) {
		return <TodoFallback />;
	}

	return (
		<div className="flex items-center justify-center h-full p-4">
			<div className="content h-[calc(100vh-150px)] w-full max-w-7xl">
				<div className="grid grid-cols-1 lg:grid-cols-2 grid-rows-1 lg:grid-rows-2 h-full gap-4 lg:gap-6">
					{/* To Dos Section */}
					<PendingTodos
						pendingTodos={pendingTodos}
						recentPendingTodos={recentPendingTodos}
					/>

					{/* Task Status Chart */}
					<Card className="flex flex-col">
						<CardHeader className="flex-shrink-0">
							<div className="flex gap-2 items-center">
								<FileCheck2 className="w-5 h-5 text-muted-foreground" />
								<h2 className="text-primary font-semibold">
									Task Status
								</h2>
							</div>
						</CardHeader>
						<CardContent className="flex-1">
							<ChartStatus todos={todos} />
						</CardContent>
					</Card>

					{/* Recently Completed Tasks */}
					<RecentlyCompletedTodos
						recentCompletedTodos={recentCompletedTodos}
						completedTodos={completedTodos}
					/>
				</div>
			</div>
		</div>
	);
}
