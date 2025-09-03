"use client";

import * as React from "react";
import { Label, Pie, PieChart, Cell } from "recharts";

import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
	{ status: "completed", tasks: 275 },
	{ status: "pending", tasks: 100 },
];

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

export function ChartStatus() {
	const totalTasks = React.useMemo(() => {
		return chartData.reduce((acc, curr) => acc + curr.tasks, 0);
	}, []);

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
											{totalTasks.toLocaleString()}
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
