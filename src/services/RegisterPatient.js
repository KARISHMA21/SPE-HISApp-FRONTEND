import axios from "axios";

const HIS_API_BASE_URL = process.env.REACT_APP_HOSPITAL_BACKEND_URL_ADMIN;

class RegisterPatientService {
    // const saveMedicalRecords=(records)=>
    processRegistration(data,token) {

        // getPatients (did,token) {
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };

        config.headers["Access-Control-Allow-Origin"]='*';
        config.headers['Access-Control-Allow-Credentials']= 'true';

        return axios.post(HIS_API_BASE_URL+"/patient-registration", data,config);
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
const reg=new RegisterPatientService()
export default reg ;