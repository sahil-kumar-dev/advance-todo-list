import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CalendarCheck, CheckCheck, FileCheck2, Plus } from "lucide-react";
import { ChartStatus } from "./components/chart-status";
import TodoCard from "@/components/shared/TodoCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getAllTodos } from "@/services";
import TodoFallback from "./components/TodoFallback";

interface Todo {
	_id: string;
	title: string;
	description: string;
	startDate: Date;
	endDate: Date;
	status: "pending" | "completed";
}

export default async function Page() {
	let todos: Todo[] = [];

	try {
		const todosData = await getAllTodos();
		todos = Array.isArray(todosData) ? todosData : [];
	} catch (error) {
		console.error("Error fetching todos:", error);
	}

	// Process data once for better performance
	const pendingTodos = todos.filter((todo) => todo.status === "pending");
	const completedTodos = todos.filter((todo) => todo.status === "completed");
	const recentPendingTodos = pendingTodos.slice(0, 4);
	const recentCompletedTodos = completedTodos.slice(0, 2);

	// If no todos exist at all
	if (todos.length === 0) {
		return (
			<TodoFallback/>
		);
	}

	return (
		<div className="flex items-center justify-center h-full p-4">
			<div className="content h-[calc(100vh-150px)] w-full max-w-7xl">
				<div className="grid grid-cols-1 lg:grid-cols-2 grid-rows-1 lg:grid-rows-2 h-full gap-4 lg:gap-6">
					{/* To Dos Section */}
					<Card className="lg:row-span-2 flex flex-col">
						<CardHeader className="flex-shrink-0">
							<div className="flex justify-between items-center">
								<div className="flex gap-2 items-center">
									<CalendarCheck className="w-5 h-5 text-muted-foreground" />
									<h2 className="text-primary font-semibold">
										To Dos
									</h2>
									{pendingTodos.length > 0 && (
										<span className="bg-muted text-muted-foreground text-xs px-2 py-1 rounded-full">
											{pendingTodos.length}
										</span>
									)}
								</div>
								<Link href="/add-todo">
									<Button
										size="sm"
										className="cursor-pointer"
									>
										<Plus className="w-4 h-4 mr-2" />
										Add Todo
									</Button>
								</Link>
							</div>
						</CardHeader>
						<CardContent className="flex-1 overflow-hidden">
							<div className="h-full overflow-y-auto overflow-x-hidden space-y-4 pr-2">
								{recentPendingTodos.length > 0 ? (
									<>
										{recentPendingTodos.map((todo) => (
											<TodoCard
												key={todo._id}
												showCta={false}
												title={todo.title}
												description={todo.description}
												startDate={todo.startDate}
												endDate={todo.endDate}
												status={todo.status}
												id={todo._id}
											/>
										))}
										{pendingTodos.length > 4 && (
											<div className="pt-2 border-t">
												<Link href="/todos">
													<Button
														variant="outline"
														className="w-full"
													>
														View all{" "}
														{pendingTodos.length}{" "}
														todos
													</Button>
												</Link>
											</div>
										)}
									</>
								) : (
									<div className="flex flex-col items-center justify-center h-full text-center space-y-4">
										<div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
											<CalendarCheck className="w-8 h-8 text-muted-foreground" />
										</div>
										<div>
											<p className="font-medium">
												No pending todos
											</p>
											<p className="text-sm text-muted-foreground">
												All caught up! Add a new todo to
												get started.
											</p>
										</div>
										<Link href="/add-todo">
											<Button variant="outline">
												<Plus className="w-4 h-4 mr-2" />
												Add Todo
											</Button>
										</Link>
									</div>
								)}
							</div>
						</CardContent>
					</Card>

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
							{recentCompletedTodos.length > 0 ? (
								<div className="space-y-4">
									<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
										{recentCompletedTodos.map((todo) => (
											<TodoCard
												key={todo._id}
												showCta={false}
												title={todo.title}
												description={todo.description}
												startDate={todo.startDate}
												endDate={todo.endDate}
												status={todo.status}
												id={todo._id}
											/>
										))}
									</div>
									{completedTodos.length > 2 && (
										<div className="pt-2 border-t">
											<Link href="/todos?status=completed">
												<Button
													variant="outline"
													size="sm"
													className="w-full"
												>
													View all{" "}
													{completedTodos.length}{" "}
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
				</div>
			</div>
		</div>
	);
}
