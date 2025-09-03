import React from "react";
import { Badge } from "../ui/badge";

export default function TodoCard() {
	return (
		<div className="border-2 rounded-lg lg:p-4 md:p-3 p-2 space-y-2 shadow-lg">
			<h4 className="font-bold lg:text-2xl md:text-xl text-lg">
				This is a todo
			</h4>
			<p className="text-gray-500">
				Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est,
				illum.
			</p>
			<div className="flex justify-between items-center">
				<Badge variant="completed" />
				<p className="text-sm text-gray-400">Completed 2 days ago</p>
			</div>
		</div>
	);
}
