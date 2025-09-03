import React from "react";
import { Card, CardContent } from "../ui/card";
import { CheckCheck } from "lucide-react";

export default function CardLayout() {
	return (
		<Card>
			<CardContent>
				<div className="flex gap-2 items-center">
					<CheckCheck className="text-gray-500" />
					<p className="text-primary font-medium">Task Status</p>
				</div>
			</CardContent>
		</Card>
	);
}
