import { z } from 'zod';

export const addTodoSchema = z.object({
    title: z
        .string()
        .min(6, { message: 'Title must be at least 6 characters.' }),
    description: z
        .string()
        .min(10, { message: 'Description must be at least 10 characters.' }),
    startDate: z
        .date({ message: 'Date is required.' }),
    category: z
        .string({ message: 'Category is required.' }),
    endDate: z
        .date({ message: 'End date is required.' })
}).refine((data) => data.endDate >= data.startDate, {
    message: 'End date must be after start date.',
    path: ['endDate']
});


export type AddTodoSchema = z.infer<typeof addTodoSchema>;
