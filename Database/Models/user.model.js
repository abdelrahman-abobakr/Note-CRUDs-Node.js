import {Schema, model} from "mongoose";

// const userSchema = Schema({
//     name: String,
//     email: String,
//     password: String,
//     role:{
//         type: String,
//         enum: ["admin","user"],
//         default: "user"
//     },
//     isConfirmed:{
//         type: Boolean,
//         default: false
//     },
   
// }, {
//     timestamps: true,  // lowercase 'timestamps', not 'Timestamp'
//     versionKey: false
// });

const userSchema = Schema({
    name:{
        type:String,
        required:true, 
        minlength:3, 
        maxlength:30
    },
    email:{
        type: String,
        required:true,
        unique:true,
        lowercase:true
    },
    password:{
        type: String,
        maxlength:8,
        required: true
    },
    role:{
        type:String,
        enum:['admin','user'],
        default: 'user'
    },
    isConfirmed:{
        type: Boolean,
        default:false
    }
},{
    timestamps:true,
    versionKey:false
});

export const userModel = model("User", userSchema);