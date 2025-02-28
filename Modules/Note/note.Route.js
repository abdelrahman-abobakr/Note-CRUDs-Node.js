import express from "express";
import { getNotes, createNote, getUserNotes, getNoteById, updateNote, deleteNote } from "./note.Controller.js";
import { verifyToken } from "../../Middleware/verifyToken.js";
const noteRoute = express.Router();
noteRoute.use(verifyToken);

noteRoute.get("/all",getNotes);
noteRoute.post("/create",createNote);
noteRoute.get("/user",getUserNotes);
noteRoute.get("/note/:id", getNoteById);
noteRoute.put("/update/:id", updateNote);
noteRoute.delete("/delete/:id", deleteNote)
export default noteRoute;



// export const postsRoute  = express.Router()
// postsRoute.use(verifyToken)
// postsRoutes.post("/create",verifyToken, createPost)
// postsRoutes.get("/all", getAllPosts) // 
// postsRoutes.get("/user", getUserPosts) // 
// postsRoutes.get("/post/:id", getPostById) // 
// postsRoutes.put("/update/:id", updatePost) // admin or the user who create

// postsRoute.delete("/delete/:id", deletePost) // admin or the user who create