import React,{useState} from 'react'
import Navbar from  "../components/Navbar.jsx"
import RateLimitedUI from '../components/RateLimitedUI.jsx';
import { useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';



const HomePage = () => {
  const [israteLimited,setIsRateLimited] = useState(false);
  const [notes,setNotes] = useState([])
  const [loading,setLoading] = useState(true)
  
useEffect( () => {
        const fetchNotes = async () => {
             try {
                const res = await axios.get("http://localhost:5001/api/notes");
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
    </div>
  )
}

export default HomePage;
