import axios from "axios";

const HIS_API_BASE_URL = process.env.REACT_APP_HOSPITAL_BACKEND_URL_CMS
class RequestConsentService {
    saveConsentRequest (consent,token) {
        {console.log(consent)}
        const config = {
            headers: { Authorization: `Bearer ${token}` ,'Access-Control-Allow-Origin': '*'}
        };
        config.headers["Access-Control-Allow-Origin"]='*';
        config.headers['Access-Control-Allow-Credentials']= 'true';
        // const config = {
        //     headers: {'Authorization': `Bearer ${token}`}
        // }
        {console.log(consent)}
        return axios.post(HIS_API_BASE_URL+"/new-consent-request", consent,config);
    }
}
const requestConsentService=new RequestConsentService()
export default requestConsentService ;