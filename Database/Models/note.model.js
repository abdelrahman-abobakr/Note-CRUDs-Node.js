import mongoose, { Schema, model } from "mongoose";

const noteSchema = Schema({
    title: String,
    description: String,
    createdBy: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
},
    {
        timestamps: true, 
        versionKey: false
    }
);

export const noteModel = model("Note",noteSchema)