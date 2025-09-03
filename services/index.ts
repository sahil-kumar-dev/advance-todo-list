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

export const getAllTodos = async () => {
    try {
        connectDB()
        const response = await Todo.find()
        return response
    } catch (error) {
        console.log(error)
    }
}

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