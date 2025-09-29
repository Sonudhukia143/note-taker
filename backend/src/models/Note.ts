import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    isLive: { type: Boolean, default: true }
});

const NOTE = mongoose.model("NOTE", noteSchema);

export { NOTE };