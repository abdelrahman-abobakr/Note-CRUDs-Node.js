import { noteModel } from "../../Database/Models/note.model.js";

const getNotes = async (req,res)=>{
    if(req.user.role =="admin"){
        const allNotes = await noteModel.find();
        res.status(201).json({message:"all notes",allNotes})
    }else{
        res.status(401).json({message:"not allowed!"});
    }
}

const createNote = async (req,res)=>{
    const userId = req.user.id
    req.body.createdBy = userId
    const addedNote = await noteModel.insertMany(req.body);
    res.status(201).json({message:"all notes",addedNote});
}

const getUserNotes = async(req,res)=>{
    let userId = req.user.id;
    let userNotes = await noteModel.find({createdBy:userId});
    if(userNotes){
        res.status(201).json({message:`notes of ${req.user.name}`, userNotes});
    }else{
        res.json({message:`not found notes for ${req.user.name}` });
    }
}
const getNoteById = async (req,res)=>{
    let noteId = req.params.id;
    let foundNote = await noteModel.findOne({_id: noteId});
    if(foundNote){
        res.status(200).json({message:"found note",foundNote})
    }else{
        res.status(401).json({message: "can't find the note"})
    }
}

const updateNote = async (req,res)=>{
    let noteId = req.params.id;
    let updatedNote = await noteModel.findOne({_id: noteId})

    if(updatedNote.createdBy == req.user.id || req.user.role == 'admin'){
        const updatedNote = await noteModel.findByIdAndUpdate(req.params.id, req.body, {new:true});
        res.json({message:"updated note", updatedNote});
    }else{
        res.json({message:"not allowed update"});
    }
}

const deleteNote = async (req,res)=>{
    let noteId = req.params.id;
    let deletedNote = await noteModel.findOne({_id: noteId})

    if(deletedNote.createdBy == req.user.id || req.user.role == 'admin'){
        deletedNote = await noteModel.findByIdAndDelete(noteId);
        res.json({message:"deleted note", deletedNote});
    }else{
        res.json({message:"not allowed delete"});
    }
}



export{
    getNotes,
    createNote,
    getUserNotes,
    getNoteById,
    updateNote,
    deleteNote
}