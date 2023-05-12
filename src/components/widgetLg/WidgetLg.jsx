import "./widgetLg.css";
import img from './home.avif'
import Calendar from 'react-calendar';
import { useState } from "react";

import './Calendar.css';
import {useParams} from "react-router-dom";
export default function WidgetLg() {
  const [value, onChange] = useState(new Date());
  const {did,name}=useParams();
  console.log(did)
    let activetoken=localStorage.getItem(did)

    let loggedInRole=localStorage.getItem(did+"-"+activetoken)
    let roleAdmin=did+"-ADMIN"
    let roleDoctor=did+"-DOCTOR"
  return (
   <div className="container">  
   
 
   <div className="widgetLg-1">
       {loggedInRole === roleDoctor ?(
           <div><b>Doctor Dashboard</b></div>
       ):(<></>)}

       <img className="img" src={img}></img> 
     </div>
    <span className="widgetLg-2"> <Calendar className="cal" value={value} /></span>
   
    </div>
  );
}
