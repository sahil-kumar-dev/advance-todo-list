"use client";

import TodoForm from "@/components/shared/TodoForm";
import { useParams } from "next/navigation";

export default function Page() {
	const params = useParams();
	return (
		<div className="flex items-center justify-center h-full">
			<div className="content h-[calc(100vh_-_150px)] space-y-4">
				<TodoForm
					isEdit={true}
					id={params.id as string}
				/>
			</div>
		</div>
	);
}
