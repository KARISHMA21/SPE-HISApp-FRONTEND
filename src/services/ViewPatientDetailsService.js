import axios from "axios";

const HIS_API_BASE_URL = process.env.REACT_APP_HOSPITAL_BACKEND_URL;

class ViewPatientDetailsService {

  // const saveMedicalRecords=(records)=>
  getPatientDetails (did,pid,token,eid) {
    const config = {
      headers: { Authorization: `Bearer ${token}` ,'Access-Control-Allow-Origin': '*'}
  };
  config.headers["Access-Control-Allow-Origin"]='*';
  config.headers['Access-Control-Allow-Credentials']= 'true';
  
    
      return axios.get(HIS_API_BASE_URL+"/admin/"+eid+"/"+did+"/get-patient-details/"+pid,config);
    // return newData;
  }

  getPatientMedData(did,pid,token ,eid) {
    
    const config = {
      headers: { Authorization: `Bearer ${token}` ,'Access-Control-Allow-Origin': '*'}
  };
  config.headers["Access-Control-Allow-Origin"]='*';
  config.headers['Access-Control-Allow-Credentials']= 'true';
    // /E01/D01/getConsentedMedData/PAT01
      return axios.get(HIS_API_BASE_URL+"/cms/"+eid+"/"+did+"/get-consented-meddata/"+pid,config);
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
const patientData=new ViewPatientDetailsService()
export default patientData ;