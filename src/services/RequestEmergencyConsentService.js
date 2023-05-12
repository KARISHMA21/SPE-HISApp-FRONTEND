import axios from "axios";

// const CMS_API_BASE_URL = "http://localhost:8080/cms_end/api";
const HIS_API_BASE_URL = process.env.REACT_APP_HOSPITAL_BACKEND_URL_CMS
class RequestEmergencyConsentService {

    saveEmergencyConsentRequest (consent,token) {
        const config = {
            headers: { Authorization: `Bearer ${token}` ,'Access-Control-Allow-Origin': '*'}
        };
        config.headers["Access-Control-Allow-Origin"]='*';
        config.headers['Access-Control-Allow-Credentials']= 'true';
        // const config = {
        //     headers: {'Authorization': `Bearer ${token}`}
        // }
        console.log(consent)
        return axios.post(HIS_API_BASE_URL+"/create-emergency-consent", consent,config);
    }
}
const requestEmergencyConsentService=new RequestEmergencyConsentService()
export default requestEmergencyConsentService ;