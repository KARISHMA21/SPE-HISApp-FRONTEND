import axios from "axios";

const HIS_API_BASE_URL = process.env.REACT_APP_HOSPITAL_BACKEND_URL;
class EmergencyApproval {
    getPendingRequests (superdid,token) {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        return axios.get(HIS_API_BASE_URL+"/cms/get-emergency-consent-list/"+superdid,config);
    }
    approvePendingRequests (id,token,action) {
        console.log(action)
        console.log(id)
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        console.log(action)
        return axios.post(HIS_API_BASE_URL+"/cms/action-on-emergency-consent/"+id,action,config);
    }
    rejectPendingRequests (id,token,action) {
        console.log(action)
        console.log(id)
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        console.log(action)
        return axios.post(HIS_API_BASE_URL+"/cms/action-on-emergency-consent/"+id,action,config);
    }
}
const approvals=new EmergencyApproval()
export default approvals ;