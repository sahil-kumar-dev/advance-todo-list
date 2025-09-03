"use client";

import * as React from "react";
import { Label, Pie, PieChart, Cell } from "recharts";

import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";

// Define a color palette to use for dynamic data
const COLOR_PALETTE = [
	"#05a301", // green
	"#0225ff", // blue
	"#fbbf24", // yellow
	"#ff0000", // pink
	"#a78bfa", // purple
	"#f87171", // red
	"#34d399", // teal
	"#facc15", // amber
];

const chartData = [
	{ status: "completed", tasks: 275 },
	{ status: "inProgress", tasks: 200 },
	{ status: "notStarted", tasks: 287 },
    { status: "overdue", tasks: 100 }
];


const statusToColor: Record<string, string> = {};
chartData.forEach((entry, idx) => {
	statusToColor[entry.status] = COLOR_PALETTE[idx % COLOR_PALETTE.length];
});

const chartConfig: ChartConfig = chartData.reduce((acc, entry) => {
	acc[entry.status] = {
		label: entry.status
			.replace(/([A-Z])/g, " $1")
			.replace(/^./, (str) => str.toUpperCase()),
		color: statusToColor[entry.status],
	};
	return acc;
}, {} as ChartConfig);

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
					content={<ChartTooltipContent  />}
				/>
				<Pie
					data={chartData}
					dataKey="tasks"
					nameKey="status"
					innerRadius={50}
					strokeWidth={5}
				>
					{chartData.map((entry, index) => (
						<Cell
							key={`cell-${index}`}
							fill={statusToColor[entry.status]}
						/>
					))}
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
