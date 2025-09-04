/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import connectDB from "@/config/db.config";
import Todo from "@/models/todo.model";
import { revalidatePath } from "next/cache";
import queryString from "query-string";

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
    sort?: string;
}) => {
    try {
        await connectDB();

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

        let todosQuery = Todo.find(query);

        // Sort functionality
        const sortOption = params?.sort || 'closest';
        switch (sortOption) {
            case 'closest':
                // Sort by endDate ascending (closest first)
                todosQuery = todosQuery.sort({ endDate: 1 });
                break;
            case 'farthest':
                // Sort by endDate descending (farthest first)
                todosQuery = todosQuery.sort({ endDate: -1 });
                break;
            case 'newest':
                // Sort by creation date descending (assuming you have createdAt field)
                todosQuery = todosQuery.sort({ createdAt: -1 });
                break;
            case 'oldest':
                // Sort by creation date ascending (assuming you have createdAt field)
                todosQuery = todosQuery.sort({ createdAt: 1 });
                break;
            default:
                todosQuery = todosQuery.sort({ endDate: 1 });
        }

        const response = await todosQuery;
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const updateStatus = async (id: string) => {
    try {
        connectDB()
        console.log(id)
        const response = await Todo.findByIdAndUpdate(id, { status: "completed", endDate: new Date() }, { new: true })
        revalidatePath('/todos')
        return response
    } catch (error) {
        console.log(error)
    }
}

export const deleteTodo = async (id: string) => {
    try {
        connectDB()
        const response = await Todo.findByIdAndDelete(id)
        revalidatePath('/todos')
        return response
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

export const updateTodo = async (id: string, data: {
    title: string,
    description: string,
    startDate: Date,
    category: string,
    endDate: Date
}) => {
    try {
        connectDB()
        await Todo.findByIdAndUpdate(id, data, { new: true })
        revalidatePath('/todos')
    } catch (error) {
        console.log(error)
    }
}