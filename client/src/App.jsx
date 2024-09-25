import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './Pages/Home';
import About from './Pages/About';
import Profile from './Pages/Profile';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import Headers from './Components/Headers';
import Services from './Pages/Services';
import PrivateRoute from './Components/PrivateRoute';

import Footer from './Components/Footer';

import DoctorsSIgnUp from './Pages/DoctorsSIgnUp';
import DoctorsSignin from './Pages/DoctorsSignin';
import Doctors from './Pages/Doctors/Doctors';

import Messenger from './Pages/Messenger/Messenger';

import Appointments from './Pages/Appointments/Appointments';
import DashboardLayout from './DashboardLayout/DashboardLayout';
import AdminSignIn from './Pages/Admin/AdminSignIn';
import SystemAdminSignIn from './Pages/Admin/SystemAdminSignIn';
import AdminList from './Pages/DashboardPages/AdminList';
import AddAdmin from './Pages/DashboardPages/AddAdmin';
import MyAppointment from './Pages/DashboardPages/MyAppointment';
import Payment from './Pages/DashboardPages/Payment/Payment';
import UserList from './Pages/DashboardPages/UserList';
import DoctorList from './Pages/DashboardPages/DoctorList';
import BloodDonner from './Pages/BloodDonner';
import AddDoctor from './Pages/DashboardPages/AddDoctor';
import PaymentInvoice from './Pages/DashboardPages/Payment/PaymentInvoice';
import AppointmentRequestDoctor from './Pages/DashboardPages/AppointmentRequestDoctor';
import RequestAppointmentToAdmin from './Pages/DashboardPages/RequestAppointmentToAdmin';
import PatientRegistrationForm from './Pages/Patient Registration Form/PatientRegistrationForm';


/* import { paymentLoader } from './Pages/DashboardPages/Payment/paymentLoader'; 
import Map from './Pages/Map';
import RequestAdmin from './Pages/DashboardPages/RequestAdmin';
import Hospital from './Pages/Hospital/Hospital';
import ServiceDetails from './Pages/ServiceDetails';
import TipsDetails from './Pages/TipsDetails';
import CreateAdvertising from './Pages/Advertising/CreateAdvertising';
import Tips from './Pages/Tips';*/
//import ChatDashboard from './Pages/ChatDashboard/ChatDashboaard';


export default function App() {
  return (
    <BrowserRouter>
    <Headers />
    <Routes>

      {/* Sign In & Sign Up Sections */}

    <Route path='/sign-in' element={<SignIn />}/>
    <Route path='/sign-up' element={<SignUp />}/>
    <Route path='/doctors-sign-up' element={<DoctorsSIgnUp />}/>
    <Route path='/doctor-signin' element={ <DoctorsSignin /> } />

    {/* Admin & System Admin Panel Login  */}

    <Route path='/admin' element={ <AdminSignIn /> } />
    <Route path='/systemadmin' element={ <SystemAdminSignIn /> } />

    {/* Private Route Section */}
    <Route element={<PrivateRoute />}>
      <Route path='/' element={<Home />}/>
      <Route path='/about' element={<About />}/>
      <Route path='/service' element={<Services />}/>
      <Route path='/appointment' element={<Appointments />}/>
      <Route path='/donner' element={<BloodDonner />}/>
      {/* <Route path='/map' element={<Map />}/> */}
      
      
      <Route path='/doctorlists' element={<Doctors />} />
      <Route path='/doctorlists/:id' element={<DoctorList />} />
      <Route path='/patientinfo' element={<PatientRegistrationForm />}/>
      
      {/* <Route path='/tips' element={<Tips />}/>
      <Route path='/create-advertising' element={ <CreateAdvertising /> }/>
      <Route path='/hospitallists' element={<Hospital />} />
      <Route path='/service/:id' element={<ServiceDetails />} />
      <Route path='/solution/:id' element={<TipsDetails />} /> */}
      {/* <Route path='/service/:id' element={<ServiceDetails />} /> */}
      
      {/* Messenger options */}
      <Route path='/chat' element={ < Messenger /> } />

      <Route path='/dashboard' element={<DashboardLayout /> }>
        <Route path='/dashboard' element={<MyAppointment />}/>
        <Route path='/dashboard/profile' element={<Profile />}/>
        <Route path='/dashboard/users' element={<UserList />}/>
        <Route path='/dashboard/doctors' element={<DoctorList />}/>
        <Route path='/dashboard/reg-doctors' element={<AddDoctor />}/>
        <Route path='/dashboard/adminlist' element={<AdminList />} /> 
        <Route path='/dashboard/addAdmin' element={<AddAdmin />} />  
        <Route path='/dashboard/request' element={<RequestAppointmentToAdmin />} />  
        <Route path='/dashboard/docrequest' element={<AppointmentRequestDoctor />} />  
        <Route path='/dashboard/Payment/:id' element={<Payment />}/>
        <Route path='/dashboard/invoice/:id' element={<PaymentInvoice />}/>
      </Route> 

    </Route>

    </Routes>
    <Footer />

    </BrowserRouter>
  )
}
