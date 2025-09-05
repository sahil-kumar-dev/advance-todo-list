import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import qs from 'query-string'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export const renderStartDate = (startDate: Date): string => {
	return new Date(startDate).toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	})
}

export function renderDate(
	dueDate: Date | string,
	status?: string
): string {

	if (status === "completed") {
		return `Completed on ${new Date(dueDate).toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		})
			} `;
	} else {
		return `Due on ${new Date(dueDate).toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		})} `;
	}
}

interface UrlQueryParams {
	params: string;
	key: string;
	value: string | null;
}

export const formUrlQuery = ({ params, key, value }: UrlQueryParams) => {
	const currentUrl = qs.parse(params);

	currentUrl[key] = value;

	return qs.stringifyUrl({
		url: window.location.pathname,
		query: currentUrl,
	},
		{ skipNull: true })
}

interface RemoveUrlQueryParams {
	params: string;
	keysToRemove: string[];
}

export const removeKeysFromQuery = ({ params, keysToRemove }: RemoveUrlQueryParams) => {
	const currentUrl = qs.parse(params);

	keysToRemove.forEach((key) => {
		delete currentUrl[key];
	})

	return qs.stringifyUrl({
		url: window.location.pathname,
		query: currentUrl,
	},
		{ skipNull: true })
}
