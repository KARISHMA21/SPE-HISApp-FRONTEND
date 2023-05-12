import React, { useEffect } from 'react'
import Topbar from '../../components/topbar/Topbar'
import Sidebar from '../../components/sidebar/Sidebar'
import { useNavigate, useParams } from 'react-router-dom';
import Demographics from "./Demographics";

function PatientRegistration() {
    const nav=useNavigate();
    const { did, name} = useParams();
console.log(did,name)
    let token=localStorage.getItem(did)
    // let loggedInRole=localStorage.getItem(did+"role")
    // let activetoken=localStorage.getItem(did)
    let loggedInRole=localStorage.getItem(did+"-"+token)
    let roleAdmin=did+"-ADMIN"
    let roleDoctor=did+"-DOCTOR"

    useEffect(() => {
        if(token==null || loggedInRole !== roleAdmin
        ){
            console.log("loggedInRole"+loggedInRole
                // , "Role"+role
            );
            localStorage.removeItem(did);
            localStorage.removeItem(did+"-"+token);
            nav('/unauthorized');
        }
    }, [])

    return (
        <div>
            <Topbar did={did} name={name} />
            <div className="container">
                <Sidebar  did={did} name={name} />

                <div className="moveright">
                    <h3><i>Patient Registration</i></h3>
                    <Demographics did={did} name={name} token={token}/>
                </div>
            </div>

        </div>
    )
}

export default PatientRegistration;