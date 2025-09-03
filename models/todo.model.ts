import { Document, model, models, Schema } from 'mongoose';

export interface ITodo extends Document {
    title: string;
    description: string;
    category: string;
    status: string;
    startDate: Date;
    endDate: Date;
}

const TodoSchema: Schema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'completed'],
        default: 'pending',
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    }
}, {
    timestamps: true
});

const Todo = models.Todo || model("Todo", TodoSchema);

export default Todo;