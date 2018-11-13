"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ImageSchema = new mongoose_1.Schema({
    name: String,
    path: String,
});
const Image = mongoose_1.model("Image", ImageSchema);
exports.default = Image;
