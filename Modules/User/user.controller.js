import { userModel } from "../../Database/Models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const signup = async (req,res)=>{
    let foundUser = await userModel.findOne({email: req.body.email});
    if(foundUser){
        res.status(409).json({message:"user already exists!"})
    }else{
        req.body.password = bcrypt.hashSync(req.body.password, 8);
        const addUser = await userModel.insertMany(req.body);
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


export {
    signup,
    signin
}