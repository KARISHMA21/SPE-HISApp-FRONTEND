import axios from "axios";

const HIS_API_BASE_URL = process.env.REACT_APP_HOSPITAL_BACKEND_URL;
class ConsentLogsService {

    getPendingRequests (did,eid,token) {

        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        // const eid='E01';
      return axios.get(HIS_API_BASE_URL+"/cms/"+eid+"/get-pending-requests/"+did,config);
    // return newData;
  }

    getConsentLog(did,eid,token){
        // const eid='E01';
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        return axios.get(HIS_API_BASE_URL+"/cms/"+eid+"/get-consent-logs/"+did,config);
        // return newData;
    }

//   getEmployees() {
//     return axios.get(EMPLOYEE_API_BASE_URL);
//   }

//   deleteEmployee(id) {
//     return axios.delete(EMPLOYEE_API_BASE_URL + "/" + id);
//   }

// getMedicalRecordsId(id) {
//     return axios.get(CMS_API_BASE_URL + "/getMedicalRecords/" + id);
//   }

//   updateEmployee(employee, id) {
//     return axios.put(EMPLOYEE_API_BASE_URL + "/" + id, employee);
//   }
}
const logs=new ConsentLogsService()
export default logs ;