import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export enum Statuses {
    CREATED = "Created",
    READY_FOR_PROCESS = "Ready for process",
    IN_PROCESS = "In process",
    CANCELED = "Canceled",
    DONE = "Done",
}

const reportSchema = new Schema({
    userId: String,
    description: String,
    location: {
       lat: Number,
       lon: Number,
    },
    photoIds: [String],
    status: {
        type: String,
        enum: Object.values(Statuses),
        default: Statuses.CREATED,
    },
    comments: [{
        body: String,
        date: Date,
    }],
},
{
    timestamps: true
});

export interface ILocation {
    lat: number,
    lon: number,
}

export interface IComment {
    body: string,
    date: Date,
}

export interface IReport {
    userId?: string,
    description?: string,
    location: ILocation,
    photoIds?: string[],
    status?: Statuses,
    comments?: IComment[],
}

export default mongoose.model('Report', reportSchema);
