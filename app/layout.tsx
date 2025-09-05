import { AppSidebar } from "@/components/shared/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "sonner";
import Navbar from "@/components/shared/Navbar";

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
		<html lang="en" suppressHydrationWarning>
			<body className={` ${inter.className} antialiased transition-all duration-700`}>
				<SidebarProvider>
					<NextTopLoader
						color="#ff6767"
						height={3}
						showSpinner={false}
					/>
					<Toaster
						richColors
						position="top-center"
					/>
					<AppSidebar />
					<main className="w-full relative bg-[#F5F8FF] dark:bg-gray-800 py-10 ">
						<Navbar />
						{children}
					</main>
				</SidebarProvider>
			</body>
		</html>
	);
}
