import axios from "axios";

const HIS_API_BASE_URL = process.env.REACT_APP_HOSPITAL_BACKEND_URL_CMS;

class DelegateConsentService {
    senddelegateconsentrequest (token,delegatedata) {
        const config = {
            headers: { Authorization: `Bearer ${token}` ,'Access-Control-Allow-Origin': '*'}
        };
        config.headers["Access-Control-Allow-Origin"]='*';
        config.headers['Access-Control-Allow-Credentials']= 'true';
        console.log(delegatedata)
        return axios.post(HIS_API_BASE_URL+"/delegate-consent", delegatedata,config);
    }


}
const delegateConsent=new DelegateConsentService()
export default delegateConsent ;