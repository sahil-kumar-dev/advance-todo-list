import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CalendarCheck, CheckCheck, FileCheck2 } from "lucide-react";
import { ChartStatus } from "./components/chart-status";
import TodoCard from "@/components/shared/TodoCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getAllTodos } from "@/services";

export default async function Page() {
	const todos = await getAllTodos();

	if (!Array.isArray(todos)) {
		return <div>No todos found.</div>;
	}


	/**
	 * TODO: Add pagination to the todos
	 * TODO: Add filters to the todos
	 * TODO: Add search to the todos
	 * TODO: Add sorting to the todos
	 * TODO: FIX THEME SWITCH
	 * TODO: MAP DATA PROPERLY IN HOMEPAGE
	 * TODO: SOLVE FORM VALIDATIONS
	 * TODO: WRITE TEST CASES
	 */

	return (
		<div className="flex items-center justify-center h-full">
			<div className="content h-[calc(100vh_-_150px)]">
				<div className="lg:grid grid-cols-2 grid-rows-2 h-full lg:gap-6 md:gap-4 gap-2 space-y-5 lg:space-y-0">
					<Card className="row-span-2">
						<CardHeader className="flex justify-between items-center">
							<div className="flex gap-2 items-center">
								<CalendarCheck className="text-gray-500" />
								<p className="text-primary font-medium">
									To Dos
								</p>
							</div>
							<Link href={"/add-todo"}>
								<Button className="cursor-pointer">
									Add Todo
								</Button>
							</Link>
						</CardHeader>
						<CardContent className="overflow-scroll overflow-x-hidden space-y-5 lg:py-5">
							{todos
								.filter((todo) => todo.status === "pending")
								.splice(0, 4)
								.map((todo) => (
									<TodoCard
										showCta={false}
										key={todo._id}
										title={todo.title}
										description={todo.description}
										startDate={todo.startDate}
										endDate={todo.endDate}
										status={todo.status}
										id={todo._id}
									/>
								))}
							<div className="mx-auto w-fit">
								<Link href={"/todos"}>
									<Button className="cursor-pointer">
										View All
									</Button>
								</Link>
							</div>
						</CardContent>
					</Card>
					<Card>
						<CardHeader>
							<div className="flex gap-2 items-center">
								<FileCheck2 className="text-gray-500" />
								<p className="text-primary font-medium">
									Task Status
								</p>
							</div>
						</CardHeader>
						<CardContent>
							<ChartStatus todos={todos} />
						</CardContent>
					</Card>
					<Card className="">
						<CardHeader>
							<div className="flex gap-2 items-center">
								<CheckCheck className="text-gray-500" />
								<p className="text-primary font-medium">
									Recently Completed Tasks
								</p>
							</div>
						</CardHeader>
						<CardContent className="grid lg:grid-cols-2 gap-4">
							{todos
								.filter((todo) => todo.status === "completed")
								.splice(0, 2)
								.map((todo) => (
									<TodoCard
										showCta={false}
										key={todo._id}
										title={todo.title}
										description={todo.description}
										startDate={todo.startDate}
										endDate={todo.endDate}
										status={todo.status}
										id={todo._id}
									/>
								))}
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
