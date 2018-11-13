import { model, Schema } from "mongoose";

const ImageSchema = new Schema({
    name: String,
    path: String,
});

const Image = model("Image", ImageSchema);

export default Image;
