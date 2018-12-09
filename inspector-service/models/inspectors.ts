import mongoose from "mongoose";
const {Schema} = mongoose;

const inspectorSchema = new Schema({
    name: String,
    email: {
        type: String,
        lowercase: true,
        required: 'Email address is required',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    location: {
        lat: Number,
        lon: Number,
    }
});

export default mongoose.model('Inspector', inspectorSchema);