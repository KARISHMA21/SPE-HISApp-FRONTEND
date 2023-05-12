import RequestConsentService from "../../services/RequestConsentService";
import requestEmergencyConsentService from "../../services/RequestEmergencyConsentService";

export default function ConsentHandle(props) {
    console.log(props)
    if(props.value)
    {
        requestEmergencyConsentService.saveEmergencyConsentRequest()
    }
    else
    {
        RequestConsentService.saveConsentRequest()
    }
}
