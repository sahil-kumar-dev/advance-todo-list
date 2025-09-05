/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import connectDB from "@/config/db.config";
import Todo from "@/models/todo.model";
import { revalidatePath } from "next/cache";

export const addTodo = async (data: {
    title: string,
    description: string,
    startDate: Date,
    category: string,
    endDate: Date
}) => {
    try {
        connectDB()
        const response = await Todo.create(data)
        revalidatePath('/')
        return JSON.stringify(response)
    } catch (error) {
        console.log(error)
    }
}

export const getAllTodos = async (params?: {
    search?: string;
    status?: string;
    category?: string;
}) => {
    try {
        await connectDB();

        // eslint-disable-next-line prefer-const
        let query: any = {};

        if (params?.search && params.search.trim() !== '') {
            query.$or = [
                { title: { $regex: params.search, $options: 'i' } },
                { description: { $regex: params.search, $options: 'i' } }
            ];
        }

        // Status filter - handle multiple statuses
        if (params?.status && params.status.trim() !== '') {
            const statuses = params.status.split(',').filter(s => s.trim() !== '');
            if (statuses.length > 0) {
                query.status = { $in: statuses };
            }
        }

        // Category filter
        if (params?.category && params.category.trim() !== '') {
            const categories = params.category
                .split(',')
                .map((c) => c.trim())
                .filter((c) => c !== '');
            if (categories.length > 0) {
                query.category = { $in: categories };
            }
        }

        const response = await Todo.find(query).sort({ endDate: -1 })
        return JSON.stringify(response);
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const updateStatus = async (id: string) => {
    try {
        connectDB()
        console.log(id)
        await Todo.findByIdAndUpdate(id, { status: "completed", endDate: new Date() }, { new: true })
        revalidatePath('/todos')
    } catch (error) {
        console.log(error)
    }
}

export const deleteTodo = async (id: string) => {
    try {
        connectDB()
        const response = await Todo.findByIdAndDelete(id)
        revalidatePath('todos')
        return JSON.stringify(response)
    } catch (error) {
        console.log(error)
    }
}

export const findTodoById = async (id: string) => {
    try {
        connectDB()
        const response = await Todo.findById(id)
        return JSON.stringify(response)
    } catch (error) {
        console.log(error)
    }
}

export const updateTodo = async (id: string, data: Partial<{
    title: string,
    description: string,
    startDate: Date,
    category: string,
    endDate: Date,
    status: string,
}>) => {
    try {
        connectDB()
        await Todo.findByIdAndUpdate(id, data, { new: true })
        revalidatePath('/todos')
    } catch (error) {
        console.log(error)
    }
}