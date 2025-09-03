import TodoForm from "@/components/shared/TodoForm";

export default function Page() {
	return (
		<div className="flex items-center justify-center h-full">
			<div className="content h-[calc(100vh_-_150px)] space-y-4">
				<TodoForm />
			</div>
		</div>
	);
}
