import { AppSidebar } from "@/components/shared/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
	variable: "--font-inter",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Let's Remember",
	description: "Advance todo app for your daily needs",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={` ${inter.className} antialiased`}>
				<SidebarProvider>
					<AppSidebar />
					<main className="w-full relative bg-[#F5F8FF] dark:bg-gray-800 ">
						<div className="fixed top-0 bg-white w-full py-1 md:px-4">
							<SidebarTrigger />
						</div>
						{children}
					</main>
				</SidebarProvider>
			</body>
		</html>
	);
}
