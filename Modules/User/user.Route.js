import express from "express";
import { signup, signin} from "./user.controller.js";
import { checkEmail } from "../../Middleware/checkEmail.js";

const userRoute = express.Router();

userRoute.post("/signup",checkEmail, signup);
userRoute.post("/signin", signin);
export default userRoute;