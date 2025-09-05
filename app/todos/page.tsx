"use client";
import TodoCard from "@/components/shared/TodoCard";
import { Input } from "@/components/ui/input";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { getAllTodos } from "@/services";
import { Search, Calendar, CheckCircle2, Clock, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Todo {
	title: string;
	description: string;
	startDate: Date;
	endDate: Date;
	status: "completed" | "pending";
	_id: string;
}

export default function Page() {
	const [todos, setTodos] = useState<Todo[]>([]);
	const [loading, setLoading] = useState(true);
	const router = useRouter();
	const searchParams = useSearchParams();

	// Get URL parameters
	const query = searchParams.get("search") || "";
	const statusParam = searchParams.get("status") || "";
	const sortParam = searchParams.get("sort") || "closest";

	// Local state for search input
	const [search, setSearch] = useState(query);

	// Parse status parameter to get checked statuses
	const getCheckedStatuses = () => {
		if (!statusParam) return [];
		return statusParam
			.split(",")
			.filter((s) => ["completed", "pending"].includes(s));
	};

	const checkedStatuses = getCheckedStatuses();

	// Fetch todos when URL parameters change
	useEffect(() => {
		const fetchTodos = async () => {
			setLoading(true);
			try {
				const todosData = await getAllTodos({
					search: query,
					sort: sortParam,
					status: statusParam,
				});
				if (Array.isArray(todosData)) {
					setTodos(todosData);
				}
			} catch (error) {
				console.error("Error fetching todos:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchTodos();
	}, [query, sortParam, statusParam]);

	// Debounced search
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

	// Handle status filter changes
	const handleStatusToggle = (status: "completed" | "pending") => {
		const currentStatuses = getCheckedStatuses();
		let newStatuses: string[];

		if (currentStatuses.includes(status)) {
			// Remove status
			newStatuses = currentStatuses.filter((s) => s !== status);
		} else {
			// Add status
			newStatuses = [...currentStatuses, status];
		}

		if (newStatuses.length === 0) {
			// Remove status parameter if no statuses selected
			const newUrl = removeKeysFromQuery({
				params: searchParams.toString(),
				keysToRemove: ["status"],
			});
			router.push(newUrl, { scroll: false });
		} else {
			// Update status parameter
			const newUrl = formUrlQuery({
				params: searchParams.toString(),
				key: "status",
				value: newStatuses.join(","),
			});
			router.push(newUrl, { scroll: false });
		}
	};

	// Handle sort change
	const handleSortChange = (newSort: string) => {
		if (newSort === "closest") {
			// Remove sort parameter for default
			const newUrl = removeKeysFromQuery({
				params: searchParams.toString(),
				keysToRemove: ["sort"],
			});
			router.push(newUrl, { scroll: false });
		} else {
			const newUrl = formUrlQuery({
				params: searchParams.toString(),
				key: "sort",
				value: newSort,
			});
			router.push(newUrl, { scroll: false });
		}
	};

	// Clear search
	const clearSearch = () => {
		setSearch("");
	};

	// Reset all filters
	const resetFilters = () => {
		setSearch("");
		const newUrl = removeKeysFromQuery({
			params: searchParams.toString(),
			keysToRemove: ["search", "status", "sort"],
		});
		router.push(newUrl, { scroll: false });
	};

	// Check if any filters are active
	const hasActiveFilters =
		query || statusParam || (sortParam && sortParam !== "closest");

	return (
		<div className="flex justify-center h-full py-10 md:py-20 px-4">
			<div className="w-full max-w-4xl space-y-6">
				{/* Search and Filter Controls */}
				<div className="bg-white dark:bg-gray-400 rounded-lg border border-gray-200 p-6 shadow-sm">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						{/* Search Input */}
						<div className="relative">
							<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
							<Input
								type="text"
								placeholder="Search todos..."
								value={search}
								onChange={(e) => setSearch(e.target.value)}
								className="w-full pl-10 pr-10 py-2"
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
							<span className="text-sm text-gray-600 whitespace-nowrap">
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

						{/* Sort Order */}
						<div className="relative">
							<Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
							<select
								value={sortParam || "closest"}
								onChange={(e) =>
									handleSortChange(e.target.value)
								}
								className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
							>
								<option value="closest">
									Closest Ending Date
								</option>
								<option value="farthest">
									Farthest Ending Date
								</option>
								<option value="newest">Newest First</option>
								<option value="oldest">Oldest First</option>
							</select>
						</div>
					</div>

					{/* Active Filters Summary */}
					<div className="mt-4 flex flex-wrap items-center gap-2">
						<span className="text-sm text-gray-600">
							Showing {loading ? "..." : todos.length} todos
						</span>
						{hasActiveFilters && (
							<button
								onClick={resetFilters}
								className="text-sm text-blue-600 hover:text-blue-800 underline"
							>
								Reset all filters
							</button>
						)}
					</div>

					{/* Active Filter Tags */}
					{hasActiveFilters && (
						<div className="mt-2 flex flex-wrap gap-2">
							{query && (
								<span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
									<Search className="h-3 w-3" />
									&quot;{query}&quot;
								</span>
							)}
							{checkedStatuses.map((status) => (
								<span
									key={status}
									className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
										status === "completed"
											? "bg-green-100 text-green-800"
											: "bg-yellow-100 text-yellow-800"
									}`}
								>
									{status === "completed" ? (
										<CheckCircle2 className="h-3 w-3" />
									) : (
										<Clock className="h-3 w-3" />
									)}
									{status}
								</span>
							))}
							{sortParam && sortParam !== "closest" && (
								<span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">
									<Calendar className="h-3 w-3" />
									{sortParam === "farthest" &&
										"Farthest First"}
									{sortParam === "newest" && "Newest First"}
									{sortParam === "oldest" && "Oldest First"}
								</span>
							)}
						</div>
					)}
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
									endDate={todo.endDate}
									status={todo.status}
									id={todo._id}
								/>
							))
						)}
					</div>
				)}
			</div>
		</div>
	);
}
