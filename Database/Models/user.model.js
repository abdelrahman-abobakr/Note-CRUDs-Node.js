import {Schema, model} from "mongoose";

const userSchema = Schema({
    name: String,
    email: String,
    password: String,
    role:{
        type: String,
        enum: ["admin","user"],
        default: "user"
    },
    isConfirmed:{
        type: Boolean,
        default: false
    },
   
}, {
    timestamps: true,  // lowercase 'timestamps', not 'Timestamp'
    versionKey: false
});

export const userModel = model("User", userSchema);