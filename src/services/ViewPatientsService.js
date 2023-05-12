import axios from "axios";

const HIS_API_BASE_URL = process.env.REACT_APP_HOSPITAL_BACKEND_URL;

class ViewPatientsService {
  // const saveMedicalRecords=(records)=>
   getPatients (did,token) {
    const config = {
      headers: { Authorization: `Bearer ${token}` }
  };
  config.headers["Access-Control-Allow-Origin"]='*';
  config.headers['Access-Control-Allow-Credentials']= 'true';

      let resp= axios.get(HIS_API_BASE_URL+"/his/"+did+"/view-patients-list",config);
      
      return resp
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
const patientsList=new ViewPatientsService()
export default patientsList ;