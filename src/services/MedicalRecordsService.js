import axios from "axios";

const HIS_API_BASE_URL = process.env.REACT_APP_HOSPITAL_BACKEND_URL_HIS;

class MedicalRecordsService {
    saveMedicalRecords (records,token) {
        const config = {
            headers: { Authorization: `Bearer ${token}` ,'Access-Control-Allow-Origin': '*'}
        };
        config.headers["Access-Control-Allow-Origin"]='*';
        config.headers['Access-Control-Allow-Credentials']= 'true';

        return axios.post(HIS_API_BASE_URL+"/save-medical-records", records,config);
        // return newData;
    }


}
const medical_record=new MedicalRecordsService()
export default medical_record ;