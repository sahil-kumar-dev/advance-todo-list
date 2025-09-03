import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
	return (
		<main className="bg-[#F5F8FF] min-h-screen flex items-center justify-center">
			<Card className="content h-[calc(100vh_-_100px)] border">
				<CardContent className="grid grid-cols-2 grid-rows-2 h-full lg:gap-6 md:gap-4 gap-2">
					<Card className="row-span-2"></Card>
					<Card className="">
						<CardContent className="">
							<div className="">
								<p className="text-primary">Task Status</p>
							</div>
						</CardContent>
					</Card>
					<Card className="">hello3</Card>
				</CardContent>
			</Card>
		</main>
	);
}
