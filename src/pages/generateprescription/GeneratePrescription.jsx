import React, { useEffect } from 'react'
import AddRecords from './AddRecords'
import Topbar from '../../components/topbar/Topbar'
import Sidebar from '../../components/sidebar/Sidebar'
import { useNavigate, useParams } from 'react-router-dom';
import Notify from '../../components/notification/Notify';

function GeneratePrescription() {
    const nav=useNavigate();
    const {did, name} = useParams();
    let token=localStorage.getItem(did)
    useEffect(() => {
        if(token===null){
            nav('/');
        }
    }, [])

    return (
        <div>
            <Topbar did={did} name={name} />
            <div className="container">
                <Sidebar did={did} name={name}/>

                <div className="moveright">
                    <h3><i>&nbsp;&nbsp;&nbsp;&nbsp;Generate Prescription</i></h3>
                    <div style={{marginLeft:600,marginTop:-80}}> <Notify/></div>
                    <AddRecords did={did} name={name} token={token}/>
                </div>
            </div>
<br/>
        </div>
    )
}

export default GeneratePrescription