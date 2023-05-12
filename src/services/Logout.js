import axios from "axios";

const HIS_API_BASE_URL = process.env.REACT_APP_HOSPITAL_BACKEND_URL_AUTH;

class Logout {
  
  logout (token) {
    
    const config = {
        headers: { Authorization: `Bearer ${token}` ,'Access-Control-Allow-Origin': '*'}
    }
    const body ={};

    return axios.post(HIS_API_BASE_URL+"/logout",body,config);
  }


  


}
const user_logout =new Logout()
export default user_logout ;