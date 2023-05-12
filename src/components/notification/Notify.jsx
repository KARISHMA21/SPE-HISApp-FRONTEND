import React from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import get_stats from "../../services/Stats";

import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
function Notify() {


  const {did, name} = useParams();
  let nav=useNavigate()
  let token =localStorage.getItem(did)
  const [stats, setStats] =useState(null);
  const [loading, setLoading] =useState(false);




  // if(token!==""){


  useEffect(() => {
    
  
   setLoading(true)
 
  const fetchStats=async()=>{


   await get_stats.get_stats(token,did)
   .then((response) => {
     console.log(response)
     if (response.status === 200) {
      console.log(response.data)
      setStats(response.data)

      }
    })
    .catch((error) => {
      toast.error("Error logging in!!", {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
     nav('/')
    })
  }

fetchStats()
setLoading(false)

    }, [])

  return (<>
    {!loading &&stats? 
    <div className='container'>
    
    <div>  <CircleNotificationsIcon sx={{marginTop:2.7,width:40,height:40,color:"red"}}/> </div>
    <div style={{marginTop:25,marginLeft:5}}> You have {stats.pendingrequests} Pending requests to be approved </div> 
    </div>:<></>}
     
     </>



   
  )
}

export default Notify