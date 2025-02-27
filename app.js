import express from "express";
import { myConnection } from "./Database/dbConnection.js";
import userRoute  from "./Modules/User/user.Route.js";
import noteRoute from "./Modules/Note/note.Route.js";
import { sendEmail } from "./Email/email.js";
const app = express();
app.use(express.json());
app.use(userRoute);
app.use(noteRoute);

myConnection;
// userModel
app.listen(3000, function(){
    console.log("server is running on port 3000");
})