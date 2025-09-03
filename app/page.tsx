import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CalendarCheck, CheckCheck, FileCheck2 } from "lucide-react";
import { ChartStatus } from "./components/chart-status";
import TodoCard from "@/components/shared/TodoCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
	return (
		<div className="flex items-center justify-center h-full">
			<div className="content h-[calc(100vh_-_100px)]">
				<div className="lg:grid grid-cols-2 grid-rows-2 h-full lg:gap-6 md:gap-4 gap-2 space-y-5 lg:space-y-0">
					<Card className="row-span-2">
						<CardHeader>
							<div className="flex gap-2 items-center">
								<CalendarCheck className="text-gray-500" />
								<p className="text-primary font-medium">
									To Dos
								</p>
							</div>
						</CardHeader>
						<CardContent className="overflow-scroll overflow-x-hidden space-y-5 lg:py-5">
							<TodoCard />
							<TodoCard />
							<TodoCard />
							<TodoCard />
							<div className="mx-auto w-fit">
								<Link href={'/todos'}>
									<Button className="cursor-pointer">
										View All
									</Button>
								</Link>
							</div>
						</CardContent>
					</Card>
					<Card>
						<CardHeader>
							<div className="flex gap-2 items-center">
								<FileCheck2 className="text-gray-500" />
								<p className="text-primary font-medium">
									Task Status
								</p>
							</div>
						</CardHeader>
						<CardContent>
							<ChartStatus />
						</CardContent>
					</Card>
					<Card className="">
						<CardHeader>
							<div className="flex gap-2 items-center">
								<CheckCheck className="text-gray-500" />
								<p className="text-primary font-medium">
									Recently Completed Tasks
								</p>
							</div>
						</CardHeader>
						<CardContent>
							<TodoCard />
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
