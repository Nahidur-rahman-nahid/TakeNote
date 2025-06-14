import Note from "../models/Note.js";

export async function getAllNotes(_,res) {
    try {
        const notes = await Note.find()
        res.status(200).json(notes)
    } catch (error) {
         console.error("error in getAllNotes ",error)
        res.status(500).json({message: "internal server error"})
    }
}

export async function getNoteById(req,res) {
    try {
        const note = await Note.findById(req.params.id)
        if(!note) return res.status(404).json({message:"note not found"})       
        res.status(200).json(note)
    } catch (error) {
         console.error("error in getNoteById ",error)
        res.status(500).json({message: "internal server error"})
    }
}

export async function createNote(req,res) {
    try{
        const {title,content} = req.body
        const newNote = new Note({title,content})
        await newNote.save()
        res.status(201).json(updateNote)
    }catch(error){
        console.log("error",error);

    }
}
export async function updateNote(req,res) {
    try{
        const {title,content} = req.body
        const updateNote = await Note.findByIdAndUpdate(req.params.id,{title,content},
            {
                new: true,
            }
        )
        if(!updateNote)return res.status(404).json({message:"note not found"})
        res.status(200).json({message:"note updated succcessfully"})
    }catch(error){
        console.log("error in updateNote controller",error);

    }
}

export async function deleteNote(req,res) {
    try {

    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if(!deletedNote)return res.status(404).json({message:"note not found"})
        res.status(200).json({message:"note deleted succcessfully"})
    } catch (error) {
        console.error("error in deleteNote controller",error);
    }
    
}