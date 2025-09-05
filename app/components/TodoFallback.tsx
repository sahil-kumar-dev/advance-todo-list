import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarCheck, Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function TodoFallback() {
	return (
		<div className="flex items-center justify-center h-full">
			<Card className="p-8 max-w-md">
				<CardContent className="text-center space-y-4">
					<div className="mx-auto w-12 h-12 bg-muted rounded-full flex items-center justify-center">
						<CalendarCheck className="w-6 h-6 text-muted-foreground" />
					</div>
					<div>
						<h3 className="font-semibold text-lg">
							No todos found
						</h3>
						<p className="text-muted-foreground text-sm">
							Get started by creating your first todo
						</p>
					</div>
					<Link href="/add-todo">
						<Button className="w-full">
							<Plus className="w-4 h-4 mr-2" />
							Add your first todo
						</Button>
					</Link>
				</CardContent>
			</Card>
		</div>
	);
}
