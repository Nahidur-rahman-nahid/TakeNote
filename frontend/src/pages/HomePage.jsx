import React,{useState} from 'react'
import Navbar from  "../components/Navbar.jsx"
import RateLimitedUI from '../components/RateLimitedUI.jsx';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import NoteCard from '../components/NoteCard.jsx';
import api from "../lib/axios.js";
import NoteNotFound from '../components/NoteNotFound.jsx';


const HomePage = () => {
  const [israteLimited,setIsRateLimited] = useState(false);
  const [notes,setNotes] = useState([])
  const [loading,setLoading] = useState(true)
  
useEffect( () => {
        const fetchNotes = async () => {
             try {
                const res = await api.get("/notes");
                const data = res.data;
                console.log(data)
                setNotes(res.data)
                setIsRateLimited(false)
                
             } catch (error) {
                console.log("error fetching notes");
                if(error.response.status === 429){
                      setIsRateLimited(true)
                }else{
                    toast.error("Failed to load notes")
                }
                  
            
             }finally{
                setLoading(false)
             }
        };
        fetchNotes();
},[])

  return (
    <div className='min-h-screen'>
      <Navbar/>
      {israteLimited && <RateLimitedUI/>}
       <div className='max-w-7xl mx-auto p-4 mt-6'>
         {loading && <div className='text-center text-primary py-10'>Loading Notes...</div>}
         {notes.length === 0 && !israteLimited && <NoteNotFound/>}
         {notes.length > 0 && !israteLimited && (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
               {notes.map((note) => (
                  // <div>
                  //     {note.title} | {note.content}
                  // </div>
                  <NoteCard key={note._id} note={note} setNotes={setNotes} />

               ))}


            </div>
         )}
       </div>

    </div>
  )
}

export default HomePage;
