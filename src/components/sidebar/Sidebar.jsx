import "./sidebar.css";
import AddTaskIcon from '@mui/icons-material/AddTask';
// import HowToRegIcon from '@mui/icons-material/HowToReg';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import HistoryIcon from '@mui/icons-material/History';
import {Link, useParams} from "react-router-dom";
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useState } from "react";
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
export default function Sidebar(props) {
  const did=props.did;
  const name=props.name;
  // const role=props.role;
  // console.log('Role:', role);
  let activetoken=localStorage.getItem(did)
  let loggedInRole=localStorage.getItem(did+"-"+activetoken)
  let roleAdmin=did+"-ADMIN"
  let roleDoctor=did+"-DOCTOR"
  const [active1,setActive1]=useState('active');
  const [active2,setActive2]=useState('');
  const [active3,setActive3]=useState('');
  const [active4,setActive4]=useState('');
  const [active5,setActive5]=useState('');



  const buttonClickHandler = (e) => {
    let elem = document.querySelector('li.active');
    elem.classList.remove('active');
    e.currentTarget.classList.add('active');
    console.log(e.target.id)
     if(e.target.id==="1"){
      setActive1('active')
      setActive2('')
      setActive3('')
      setActive4('')
      setActive5('')

    }
    else if(e.target.id==="2"){
      setActive2('active')
      setActive1('')
      setActive3('')
      setActive4('')
      setActive5('')

    }
    else if(e.target.id==="3"){
      setActive3('active')
      setActive1('')
      setActive2('')
      setActive4('')
      setActive5('')

    }
    else if(e.target.id==="4"){
      setActive4('active')
      setActive1('')
      setActive2('')
      setActive3('')
      setActive5('')

    }
    else if(e.target.id==="5"){
      setActive1('')
      setActive2('')
      setActive3('')
      setActive4('')
      setActive5('active')
    
     

    }
};
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
        {loggedInRole === roleDoctor ?(
          <></>
        ):(<h4 className="sidebarTitle1">Registration Desk</h4>)}
          {/* <h4 className="sidebarTitle1">Doctor Dashboard</h4> */}
          <ul className="sidebarList">
         { loggedInRole === roleDoctor &&(
            <Link to={`/home/${did}/${name}`} className="link">
              <li id="1"  className={`sidebarListItem ${active1}`} onClick={buttonClickHandler} >
                <DashboardIcon className="sidebarIcon" />
                Dashboard
              </li>
            </Link>
         )}
            { loggedInRole=== roleAdmin && (
            <Link to={`/register-patient/${did}/${name}`}  className="link">
              <li className="sidebarListItem"  onClick={buttonClickHandler}>
                <GroupAddIcon className="sidebarIcon" />
                Patient Registration
              </li>
            </Link>
            )}
            { loggedInRole===roleDoctor && (
            <Link to={`/new-consent-request/${did}/${name}`} className="link">
            <li id="2" className={`sidebarListItem ${active2}`} onClick={buttonClickHandler} >
              <AddTaskIcon className="sidebarIcon" />
              Request Consent 
            </li>
            </Link>
            )}
            
            { loggedInRole===roleDoctor && (
            <Link to={`/viewpatients/${did}/${name}`} className="link">
            <li id="4" className={`sidebarListItem ${active4}`}  onClick={buttonClickHandler}>
              <PersonSearchIcon className="sidebarIcon" />
              View Patients
            </li>
            </Link>
            )}
            { loggedInRole===roleDoctor && (
            <Link to={`/generateprescription/${did}/${name}`} className="link">
              <li id="5" className={`sidebarListItem ${active5}`}  onClick={buttonClickHandler}>
                <AssignmentIcon className="sidebarIcon" />
                Generate Prescription

              </li>
            </Link>
          )}
            { loggedInRole===roleDoctor && (
                <Link to={`/emergency-approval/${did}/${name}`}  className="link">
                  <li  id="3" className={`sidebarListItem ${active5}`} onClick={buttonClickHandler}>
                    <ReportGmailerrorredIcon className="sidebarIcon" />
                    Emergency Approval
                  </li>
                </Link>
            )}

            { loggedInRole===roleDoctor && (
                <Link to={`/view-consent-log/${did}/${name}`}  className="link">
                  <li  id="3" className={`sidebarListItem ${active3}`} onClick={buttonClickHandler}>
                    <HistoryIcon className="sidebarIcon" />
                    Consent Logs
                  </li>
                </Link>
            )}
          </ul>
        </div>

      </div>
    </div>
  );
}
