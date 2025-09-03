import TodoCard from "@/components/shared/TodoCard";
import { getAllTodos } from "@/services";
import React from "react";

export default async function Page() {
	const todos = await getAllTodos();

	if (!Array.isArray(todos)) {
		return <div>No todos found.</div>;
	}

	console.log(todos);

	return (
		<div>
			<div className="flex items-center justify-center h-full py-20">
				<div className="content space-y-4">
					{todos.map((todo, idx) => (
						<TodoCard
							key={todo.id ?? idx}
							title={todo.title}
							description={todo.description}
							startDate={todo.startDate}
							endDate={todo.endDate}
							status={todo.status}
							id={todo._id}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
