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
    body:   String,
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

export default mongoose.model('Report', reportSchema);
