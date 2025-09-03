import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/ui/date-picker";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { todosCategories } from "@/constants";
import { Button } from "@/components/ui/button";

export default function Page() {
	return (
		<div className="flex items-center justify-center h-full">
			<div className="content h-[calc(100vh_-_150px)]">
				<Card>
					<CardHeader>
						<h1 className="text-center font-bold text-primary text-xl md:text-2xl lg:text-4xl">
							Add new todo
						</h1>
					</CardHeader>
					<CardContent>
						<form className="flex gap-4 flex-col">
							<Input placeholder="Todo Title" />
							<Textarea placeholder="Todo Description" />
							<div className="grid md:grid-cols-2 gap-4 justify-between">
								<DatePicker
									disabled={true}
									date={new Date()}
									placeholder="Todo Start Date"
								/>
								<DatePicker
									disabled={false}
									placeholder="Todo End Date"
								/>
							</div>
							<Select>
								<SelectTrigger className="w-full">
									<SelectValue placeholder="Todo Category" />
								</SelectTrigger>
								<SelectContent>
									{todosCategories.map(({ label, value }) => (
										<SelectItem
											key={value}
											value={value}
										>
											{label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<Button className="font-bold">Add Todo</Button>
						</form>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
