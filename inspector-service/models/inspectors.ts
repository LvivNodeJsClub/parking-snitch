import mongoose, {Document, Model} from "mongoose";

const {Schema} = mongoose;

interface Location {
    lat: number
    lon: number
}

export interface InspectorModel extends Document {
    location: Location
    _id: string
    name: string
    email: string
}

const inspectorSchema = new Schema({
    name: Schema.Types.String,
    email: {
        type: Schema.Types.String,
        lowercase: true,
        required: 'Email address is required',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    location: {
        lat: Schema.Types.Number,
        lon: Schema.Types.Number
    },
    deleted: {
        type: Schema.Types.Boolean,
        default: false
    }
}, {
    timestamps: true
});

export const Inspector: Model<InspectorModel> = mongoose.model<InspectorModel>('Inspector', inspectorSchema);