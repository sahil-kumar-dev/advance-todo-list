import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function renderDate(
	dueDate: Date | string,
	status?: string
): string {
	// Parse dates if they are strings
	const due = typeof dueDate === "string" ? new Date(dueDate) : dueDate;
	const today = new Date();
	today.setHours(0, 0, 0, 0);
	const dueDay = new Date(due);
	dueDay.setHours(0, 0, 0, 0);


	const msPerDay = 1000 * 60 * 60 * 24;
	const diffDays = Math.floor((today.getTime() - dueDay.getTime()) / msPerDay);
	// return 'hello'
	if (status === "completed") {
		const diffMs = Math.abs(today.getTime() - dueDay.getTime());
		const seconds = Math.floor(diffMs / 1000);
		const minutes = Math.floor(diffMs / (1000 * 60));
		const hours = Math.floor(diffMs / (1000 * 60 * 60));
		const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

		if (minutes < 60) {
			return `Completed ${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
		} else if (hours < 24) {
			return `Completed ${hours} hour${hours !== 1 ? "s" : ""} ago`;
		} else {
			return `Completed ${days} day${days !== 1 ? "s" : ""} ago`;
		}
	} else {
		if (diffDays < 0) {
			return `Due in ${Math.abs(diffDays)} day${Math.abs(diffDays) !== 1 ? "s" : ""}`;
		} else {
			return `Due ${Math.abs(diffDays)} day${Math.abs(diffDays) !== 1 ? "s" : ""} ago`;
		}
	}
}
