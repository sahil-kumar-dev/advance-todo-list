import TodoCard from "@/components/shared/TodoCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Itodo } from "@/types";
import { CalendarCheck, Plus, Link } from "lucide-react";
import React from "react";

export default function PendingTodos({
	pendingTodos,
    recentPendingTodos
}: {
	recentPendingTodos: Itodo[];
	pendingTodos: Itodo[];
}) {
	return (
		<Card className="lg:row-span-2 flex flex-col">
			<CardHeader className="flex-shrink-0">
				<div className="flex justify-between items-center">
					<div className="flex gap-2 items-center">
						<CalendarCheck className="w-5 h-5 text-muted-foreground" />
						<h2 className="text-primary font-semibold">To Dos</h2>
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
									title={todo.title!}
									description={todo.description!}
									startDate={todo.startDate!}
									endDate={todo.endDate!}
									status={todo.status!}
									id={todo._id!}
                                    category={todo.category!}
								/>
							))}
							{pendingTodos.length > 4 && (
								<div className="pt-2 border-t">
									<Link href="/todos">
										<Button
											variant="outline"
											className="w-full"
										>
											View all {pendingTodos.length} todos
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
								<p className="font-medium">No pending todos</p>
								<p className="text-sm text-muted-foreground">
									All caught up! Add a new todo to get
									started.
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
	);
}
