import { z } from 'zod'

export const addTodoSchema = z.object({
    title: z.string().min(1, { message: 'Title is required.' }),
    description: z.string().min(1, { message: 'Description is required.' }),
    date: z.preprocess(
        (arg) => (typeof arg === 'string' || arg instanceof Date ? new Date(arg) : arg),
        z.date().refine(
            (date) => date > new Date(),
            { message: 'Date must be in the future.' }
        )
    ),
    category: z.string().min(1, { message: 'Category is required.' }),
})

export type AddTodoSchema = z.infer<typeof addTodoSchema>