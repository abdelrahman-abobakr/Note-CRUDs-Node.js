import express from "express";
import { signup, signin, verifyEmail} from "./user.controller.js";
import { checkEmail } from "../../Middleware/checkEmail.js";

const userRoute = express.Router();

userRoute.post("/signup",checkEmail, signup);
userRoute.post("/signin", signin);
userRoute.get("/verify/:email", verifyEmail)
export default userRoute;