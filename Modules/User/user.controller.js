import { userModel } from "../../Database/Models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendEmail } from "../../Email/email.js";

const signup = async (req,res)=>{
    let foundUser = await userModel.findOne({email: req.body.email});
    if(foundUser){
        res.status(409).json({message:"user already exists!"})
    }else{
        req.body.password = bcrypt.hashSync(req.body.password, 8);
        const addUser = await userModel.insertMany(req.body);
        sendEmail(req.body.email);
        addUser[0].password = undefined;
        res.status(201).json({message:"done", addUser});
    }
}

const signin = async (req,res)=>{
    let foundUser = await userModel.findOne({email:req.body.email});
    if(foundUser && bcrypt.compareSync( req.body.password, foundUser.password)){
        let token = jwt.sign({
            id: foundUser._id,
            name: foundUser.name,
            role: foundUser.role
        },"abdo");
        
        res.status(200).json({message:`welcome ${foundUser.name}`, token});
    }else{
        res.status(401).json({message:"wrong credits"});
    }
}

const verifyEmail =  (req,res)=>{
    const emailToken = req.params.email;
    jwt.verify(emailToken,"emailKey", async (err,decoded)=>{
        if(err){
            return res.json({message:'not verified email'});
        }else{
            const email = decoded;
            await userModel.findOneAndUpdate({email:email}, {isConfirmed:true});
            res.json({message:"email verified"})
        }

    })
}


export {
    signup,
    signin,
    verifyEmail
}