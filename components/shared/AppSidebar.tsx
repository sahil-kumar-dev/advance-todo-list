"use client";

import { ChartBarStacked, ClipboardList, Home, Plus } from "lucide-react";

import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
	{
		title: "Home",
		url: "/",
		icon: Home,
	},
	{
		title: "Todos",
		url: "/todos",
		icon: ClipboardList,
	},
	{
		title: "Add Todo",
		url: "/add-todo",
		icon: Plus,
	},
];

export function AppSidebar() {
	const pathname = usePathname();

	return (
		<Sidebar>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel asChild>
						<Image
							src={"/logo.svg"}
							width={200}
							height={50}
							className="w-full"
							alt="Let's remember"
						/>
					</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu className="gap-3 mt-10">
							{items.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton
										asChild
										className={`text-white bg-white/20 font-medium ${
											pathname === item.url
												? "bg-white text-black"
												: ""
										}`}
									>
										<Link href={item.url}>
											<item.icon />
											<span>{item.title}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	);
}
