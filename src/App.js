
import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import GeneratePrescription from "./pages/generateprescription/GeneratePrescription";
import RequestConsent from "./pages/requestconsent/RequestConsent";
import ViewPatients from "./pages/viewpatients/ViewPatients";
import ViewPatientDetail from "./pages/viewpatients/viewPatientDetails/ViewPatientDetail";
import ViewConsentLog from "./pages/consentlist/ViewConsentLog";
import SignIn from "./pages/signin/SignIn";
import PatientRegistration from "./pages/registerpatient/PatientRegistration";
import EmergencyApproval from "./pages/emergency/EmergencyApproval";

import Unauthorized from "./pages/unauthorized/Unauthorized";
import Toggle from "./components/toggle/Toggle";

// \pages\viewpatients\viewPatientDetails\ViewPatientDetail.jsx

function App() {
  return (
    <Router>

        <Routes>
            <Route exact path="/" element={<SignIn/>}/>

          <Route exact path="/home/:did/:name" element={<Home/>}/>
            <Route exact path="/register-patient/:did/:name"element={<PatientRegistration/>}/>
            <Route exact path="/view-consent-log/:did/:name" element={<ViewConsentLog/>}/>
            <Route exact path="/generateprescription/:did/:name" element={<GeneratePrescription/>}/>
          <Route exact path="/viewpatients/:did/:name" element={<ViewPatients />}/>
          <Route exact path="/:did/viewpatients/viewdetails/:pid/:name" element={<ViewPatientDetail/>}></Route>
          <Route exact path="/new-consent-request/:did/:name" element={<RequestConsent/>}/>
          <Route exact path="/emergency-approval/:did/:name" element={<EmergencyApproval/>}/>

            <Route exact path="/unauthorized" element={<Unauthorized/>}></Route>
          
            export default App;
            {/*<Route path="*" element={<div>Oops.. Page Not Found!!</div>}></Route>*/}
          {/* <Route path="/user/:userId" element={<User />}/>
          <Route path="/newUser" element={<NewUser />}/>
          <Route path="/products" element={ <ProductList />}/>
          <Route path="/product/:productId" element={<Product />}/>
          <Route path="/newproduct" element={<NewProduct />}/>  */}
        </Routes> 

    </Router>
  );
}

export default App;
