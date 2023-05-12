import axios from "axios";

const HIS_API_BASE_URL = process.env.REACT_APP_HOSPITAL_BACKEND_URL_CMS;

class OnedayConsent {
   saveOneDayConsent (token,records) {
    const config = {
        headers: { Authorization: `Bearer ${token}` ,'Access-Control-Allow-Origin': '*'}
    };
    config.headers["Access-Control-Allow-Origin"]='*';
    config.headers['Access-Control-Allow-Credentials']= 'true';

      return axios.post(HIS_API_BASE_URL+"/save-oneday-consent", records,config);
  }


}
const add_one_day_consent=new OnedayConsent()
export default add_one_day_consent ;