import "./featuredInfo.css";
import img1 from './patients.png'
import img3 from './approval.png'
import img2 from './pending.png'
import img4 from './reject.png'
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import get_stats from "../../services/Stats";
export default function FeaturedInfo() {

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
  
  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Total Patients Visited</span>
        <div className="featuredMoneyContainer">
        <img className="img1" src={img1} ></img>
          {/* <span className="featuredMoney" >{stats.totalconsent}</span> */}
          {!loading &&stats? <span className="featuredMoney">{stats.totalpatients}</span> :<></>} 

        </div>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Pending Consent Requests</span>
        <div className="featuredMoneyContainer">
        <img className="img2" src={img2} width={"100px"} ></img>
        {/* <span className="featuredMoney" >{stats.activeconsent}</span> */}

          {!loading &&stats? <span className="featuredMoney">{stats.pendingrequests}</span> :<></>}
          
        </div>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Total Approved Consents</span>
        <div className="featuredMoneyContainer">
        <img className="img3" src={img3}  ></img>
        {!loading &&stats? <span className="featuredMoney">{stats.activeconsent}</span> :<></>}

          {/* <span className="featuredMoney">{stats.revokedconsent}</span> */}
          
        </div>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Total Rejected Consents</span>
        <div className="featuredMoneyContainer">
        <img className="img4" src={img4} ></img>
        {!loading &&stats? <span className="featuredMoney">{stats.rejectedconsent}</span> :<></>}

          {/* <span className="featuredMoney ">{stats.pendingrequests}</span> */}
         
        </div>
      </div>
    </div>
  );
}
