"use client";

import { create } from "zustand";
import {
	getAllTodos,
	deleteTodo,
	updateStatus,
	addTodo,
	updateTodo,
} from "@/services";
import { Itodo } from "@/types";

interface TodoState {
	todos: Itodo[];
	loading: boolean;

	fetchTodos: (params?: {
		search?: string;
		status?: string;
		category?: string;
	}) => Promise<void>;

	addTodoItem: (data: Itodo) => Promise<void>;
	updateTodoItem: (id: string, data: Partial<Itodo>) => Promise<void>;
	completeTodo: (id: string) => Promise<void>;
	deleteTodoItem: (id: string) => Promise<void>;
}

export const useTodoStore = create<TodoState>((set, get) => ({
	todos: [],
	loading: false,

	fetchTodos: async (params) => {
		set({ loading: true });
		try {
			const res = await getAllTodos(params);
			set({ todos: JSON.parse(res) });
		} catch (err) {
			console.error("Error fetching todos", err);
		} finally {
			set({ loading: false });
		}
	},

	addTodoItem: async (data) => {
		try {
			await addTodo(data);
			await get().fetchTodos();
		} catch (err) {
			console.error("Error adding todo", err);
		}
	},

	updateTodoItem: async (id, data) => {
		try {
			await updateTodo(id, data);
			await get().fetchTodos();
		} catch (err) {
			console.error("Error updating todo", err);
		}
	},

	completeTodo: async (id) => {
		try {
			await updateStatus(id);
			await get().fetchTodos();
		} catch (err) {
			console.error("Error completing todo", err);
		}
	},

	deleteTodoItem: async (id) => {
		try {
			await deleteTodo(id);
			await get().fetchTodos();
		} catch (err) {
			console.error("Error deleting todo", err);
		}
	},
}));
