"use client";

import * as React from "react";
import { Label, Pie, PieChart, Cell } from "recharts";

import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig: ChartConfig = {
	completed: {
		label: "Completed",
		color: "#05a301",
	},
	pending: {
		label: "pending",
		color: "#ff0000",
	},
} as ChartConfig;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ChartStatus({ todos }: any) {
	if (!Array.isArray(todos)) {
		return <div>No todos found.</div>;
	}

	const chartData = [
		{
			status: "completed",
			tasks: todos.filter((todo) => todo.status === "completed").length,
		},
		{
			status: "pending",
			tasks: todos.filter((todo) => todo.status === "pending").length,
		},
	];

	return (
		<ChartContainer
			config={chartConfig}
			className="mx-auto aspect-square max-h-[200px]"
		>
			<PieChart>
				<ChartTooltip
					cursor={false}
					content={<ChartTooltipContent />}
				/>
				<Pie
					data={chartData}
					dataKey="tasks"
					nameKey="status"
					innerRadius={50}
					strokeWidth={5}
				>
					<Cell
						key={`cell-1`}
						fill={"#05a301"}
					/>
					<Cell
						key={`cell-2`}
						fill={"#ff0000"}
					/>
					<Label
						content={({ viewBox }) => {
							if (viewBox && "cx" in viewBox && "cy" in viewBox) {
								return (
									<text
										x={viewBox.cx}
										y={viewBox.cy}
										textAnchor="middle"
										dominantBaseline="middle"
									>
										<tspan
											x={viewBox.cx}
											y={viewBox.cy}
											className="fill-foreground text-3xl font-bold"
										>
											{todos?.length.toLocaleString()}
										</tspan>
										<tspan
											x={viewBox.cx}
											y={(viewBox.cy || 0) + 24}
											className="fill-muted-foreground"
										>
											Tasks
										</tspan>
									</text>
								);
							}
						}}
					/>
				</Pie>
			</PieChart>
		</ChartContainer>
	);
}
