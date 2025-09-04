"use client";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

export function DatePicker({
	placeholder,
	date,
	setDate,
	disabled = false,
}: {
	placeholder: string;
	date?: Date;
	setDate?: React.Dispatch<React.SetStateAction<Date>>;
	disabled?: boolean;
}) {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					data-empty={!date}
					className="data-[empty=true]:text-muted-foreground w-full justify-start text-left font-normal"
				>
					<CalendarIcon />
					{date ? format(date, "PPP") : <span>{placeholder}</span>}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0">
				<Calendar
					required
					mode="single"
					selected={date}
					onSelect={setDate}
					disabled={(d) => {
						const today = new Date();
						today.setHours(0, 0, 0, 0);
						const check = new Date(d);
						check.setHours(0, 0, 0, 0);
						return check < today;
					}}
				/>
			</PopoverContent>
		</Popover>
	);
}
