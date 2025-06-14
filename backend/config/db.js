import mongoose from "mongoose"
export const connectDB = async () => {
    try {
       await mongoose.connect("mongodb+srv://bsse1429:WIcuIDt1t2LYBuxA@cluster0.ktgaehg.mongodb.net/notes_db?retryWrites=true&w=majority&appName=Cluster0")
       console.log("mongodb connected successfully");
    } catch (error) {
        console.error("error connecting to MONGODB",error);
    }
}