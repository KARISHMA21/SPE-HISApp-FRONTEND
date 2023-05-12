import axios from "axios";

const HIS_API_BASE_URL =process.env.REACT_APP_HOSPITAL_BACKEND_URL_AUTH;
class SignIn {
  
  login (records,token) {
    
    if(token===""){
      const config = {
        headers: { Authorization: `Bearer ${token}` ,'Access-Control-Allow-Origin': '*'}
    };
    config.headers["Access-Control-Allow-Origin"]='*';
    config.headers['Access-Control-Allow-Credentials']= 'true';
      return axios.post(HIS_API_BASE_URL+"/authenticate",  records, config);
  }
  else{
    return axios.post(HIS_API_BASE_URL+"/authenticate",  records);
  }


  }


}
const doctor_login =new SignIn()
export default doctor_login ;