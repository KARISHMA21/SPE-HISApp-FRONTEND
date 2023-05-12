import axios from "axios";

const HIS_API_BASE_URL = process.env.REACT_APP_HOSPITAL_BACKEND_URL_CMS;
const eid=process.env.REACT_APP_HOSPITAL_ID;
class GetStats {
    get_stats(token,did) {
    
        const config = {
            headers: { Authorization: `Bearer ${token}` ,'Access-Control-Allow-Origin': '*'}
        }
       
        return axios.get(HIS_API_BASE_URL+"/get-doctor-stats/"+did+"/"+eid,config);
      }
}


const get_stats =new GetStats()
export default get_stats ;