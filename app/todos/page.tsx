"use client";
import TodoCard from "@/components/shared/TodoCard";
import { Input } from "@/components/ui/input";
import { todosCategories } from "@/constants";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { useTodoStore } from "@/store/use-todo-store";
import { Search, Calendar, CheckCircle2, Clock, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
	const { todos, fetchTodos, loading } = useTodoStore();
	const router = useRouter();
	const searchParams = useSearchParams();

	// Get URL parameters
	const query = searchParams.get("search");
	const statusParam = searchParams.get("status");
	const categoryParam = searchParams.get("category");

	// Local state for search input
	const [search, setSearch] = useState<string>(query ?? "");

	const getCheckedStatuses = () => {
		if (!statusParam) return [];
		return ["completed", "pending"].includes(statusParam)
			? [statusParam]
			: [];
	};

	const checkedStatuses = getCheckedStatuses();

	// Fetch todos
	useEffect(() => {
		fetchTodos({
			search: query ?? undefined,
			status: statusParam ?? undefined,
			category: categoryParam ?? undefined,
		});
	}, [query, categoryParam, statusParam, fetchTodos]);

	useEffect(() => {
		const delayDebounceFn = setTimeout(() => {
			if (search.trim()) {
				const newUrl = formUrlQuery({
					params: searchParams.toString(),
					key: "search",
					value: search.trim(),
				});
				router.push(newUrl, { scroll: false });
			} else if (query) {
				// Remove search if input is empty
				const newUrl = removeKeysFromQuery({
					params: searchParams.toString(),
					keysToRemove: ["search"],
				});
				router.push(newUrl, { scroll: false });
			}
		}, 300);

		return () => clearTimeout(delayDebounceFn);
	}, [search, query, router, searchParams]);

	const handleStatusToggle = (status: "completed" | "pending") => {
		const current = getCheckedStatuses();

		if (current[0] === status) {
			const newUrl = removeKeysFromQuery({
				params: searchParams.toString(),
				keysToRemove: ["status"],
			});
			router.push(newUrl, { scroll: false });
			return;
		}
		// Otherwise set the status to the clicked one
		const newUrl = formUrlQuery({
			params: searchParams.toString(),
			key: "status",
			value: status,
		});
		router.push(newUrl, { scroll: false });
	};

	const handleCategoryToggle = (category: string) => {
		const current = (categoryParam ?? "")
			.split(",")
			.map((c) => c.trim())
			.filter((c) => c !== "");

		let next: string[];
		if (current.includes(category)) {
			next = current.filter((c) => c !== category);
		} else {
			next = [...current, category];
		}

		if (next.length === 0) {
			const newUrl = removeKeysFromQuery({
				params: searchParams.toString(),
				keysToRemove: ["category"],
			});
			router.push(newUrl, { scroll: false });
			return;
		}

		const newUrl = formUrlQuery({
			params: searchParams.toString(),
			key: "category",
			value: next.join(","),
		});
		router.push(newUrl, { scroll: false });
	};

	const clearSearch = () => {
		setSearch("");
	};

	// Reset all filters
	const resetFilters = () => {
		setSearch("");
		const newUrl = removeKeysFromQuery({
			params: searchParams.toString(),
			keysToRemove: ["search", "status", "sort", "category"],
		});
		router.push(newUrl, { scroll: false });
	};

	// Check if any filters are active
	const hasActiveFilters =
		query || statusParam || (categoryParam && categoryParam !== "");

	return (
		<div className="flex justify-center h-full py-10 md:py-20 px-4">
			<div className="w-full max-w-4xl space-y-6">
				{/* Search and Filter Controls */}
				<div className="bg-white dark:bg-gray-400 rounded-lg border border-gray-200 p-6 shadow-sm">
					<div className=" flex flex-col gap-5">
						{/* Search Input */}
						<div className="relative h-fit">
							<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-white h-4 w-4" />
							<Input
								type="text"
								placeholder="Search todos..."
								value={search}
								onChange={(e) => setSearch(e.target.value)}
								className="w-full pl-10 pr-10 py-2 dark:placeholder:text-white"
							/>
							{search && (
								<button
									onClick={clearSearch}
									className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
								>
									<X className="h-4 w-4" />
								</button>
							)}
						</div>

						{/* Status Filter - Badge Style */}
						<div className="flex items-center gap-2">
							<span className="text-sm text-gray-600 dark:text-white whitespace-nowrap">
								Status:
							</span>
							<div className="flex gap-2">
								<button
									onClick={() =>
										handleStatusToggle("pending")
									}
									className={`inline-flex cursor-pointer items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition-colors ${
										checkedStatuses.includes("pending")
											? "bg-yellow-100 text-yellow-800 border-2 border-yellow-300"
											: "bg-gray-100 text-gray-600 border-2 border-transparent hover:bg-gray-200"
									}`}
								>
									<Clock className="h-3 w-3" />
									Pending
									{checkedStatuses.includes("pending") && (
										<div className="w-2 h-2 bg-yellow-600 rounded-full" />
									)}
								</button>
								<button
									onClick={() =>
										handleStatusToggle("completed")
									}
									className={`inline-flex cursor-pointer items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition-colors ${
										checkedStatuses.includes("completed")
											? "bg-green-100 text-green-800 border-2 border-green-300"
											: "bg-gray-100 text-gray-600 border-2 border-transparent hover:bg-gray-200"
									}`}
								>
									<CheckCircle2 className="h-3 w-3" />
									Completed
									{checkedStatuses.includes("completed") && (
										<div className="w-2 h-2 bg-green-600 rounded-full" />
									)}
								</button>
							</div>
						</div>

						{/* Category Multi-Select Badges */}
						<div className="flex gap-2 flex-col">
							<span className="text-sm text-gray-600 dark:text-white whitespace-nowrap">
								Category:
							</span>
							<div className="flex gap-2 flex-wrap">
								{todosCategories.map(({ label, value }) => {
									const isActive = (categoryParam ?? "")
										.split(",")
										.map((c) => c.trim())
										.includes(value);
									return (
										<button
											key={value}
											onClick={() =>
												handleCategoryToggle(value)
											}
											className={`inline-flex cursor-pointer items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition-colors ${
												isActive
													? "bg-blue-100 text-blue-800 border-2 border-blue-300"
													: "bg-gray-100 text-gray-600 border-2 border-transparent hover:bg-gray-200"
											}`}
										>
											{label}
										</button>
									);
								})}
								{(categoryParam ?? "") && (
									<button
										onClick={() => handleCategoryToggle("")}
										className="inline-flex cursor-pointer items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition-colors bg-gray-200 text-gray-700 hover:bg-gray-300"
									>
										Clear
									</button>
								)}
							</div>
						</div>
					</div>
				</div>

				{/* Loading State */}
				{loading ? (
					<div className="text-center py-12">
						<div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
						<div className="text-gray-500 mt-2">
							Loading todos...
						</div>
					</div>
				) : (
					<div className="space-y-4">
						{todos.length === 0 ? (
							<div className="text-center py-12">
								<div className="text-gray-500 mb-2">
									{hasActiveFilters
										? "No todos match your current filters"
										: "No todos found"}
								</div>
								{hasActiveFilters && (
									<button
										onClick={resetFilters}
										className="text-blue-600 hover:text-blue-800 underline text-sm"
									>
										Clear all filters
									</button>
								)}
							</div>
						) : (
							todos.map((todo, idx) => (
								<TodoCard
									key={todo._id ?? idx}
									title={todo.title}
									description={todo.description}
									startDate={todo.startDate}
									category={todo.category}
									endDate={todo.endDate}
									status={todo.status}
									id={todo._id ?? ""}
								/>
							))
						)}
					</div>
				)}
			</div>
		</div>
	);
}
