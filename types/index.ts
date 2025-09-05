export interface Itodo {
    title: string,
    description: string,
    startDate: Date,
    category: string,
    endDate: Date
    status: 'completed' | 'pending'
    _id?: string
}