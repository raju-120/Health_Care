import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './Pages/Home';
import About from './Pages/About';
import Profile from './Pages/Profile';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import Headers from './Components/Headers';
import Services from './Pages/Services';
import PrivateRoute from './Components/PrivateRoute';
import Tips from './Pages/Tips';
import Footer from './Components/Footer';
import CreateAdvertising from './Pages/Advertising/CreateAdvertising';
import DoctorsSIgnUp from './Pages/DoctorsSIgnUp';
import DoctorsSignin from './Pages/DoctorsSignin';
import Doctors from './Pages/Doctors/Doctors';
//import ChatDashboard from './Pages/ChatDashboard/ChatDashboaard';
import Messenger from './Pages/Messenger/Messenger';
import Hospital from './Pages/Hospital/Hospital';
import ServiceDetails from './Pages/ServiceDetails';
import TipsDetails from './Pages/TipsDetails';
import Appointments from './Pages/Appointments/Appointments';
import DashboardLayout from './DashboardLayout/DashboardLayout';
import AdminSignIn from './Pages/Admin/AdminSignIn';
import SystemAdminSignIn from './Pages/Admin/SystemAdminSignIn';
import AdminList from './Pages/DashboardPages/AdminList';
import AddAdmin from './Pages/DashboardPages/AddAdmin';
import MyAppointment from './Pages/DashboardPages/MyAppointment';
import RequestAdmin from './Pages/DashboardPages/RequestAdmin';
import Payment from './Pages/DashboardPages/Payment/Payment';
import UserList from './Pages/DashboardPages/UserList';
import DoctorList from './Pages/DashboardPages/DoctorList';
/* import { paymentLoader } from './Pages/DashboardPages/Payment/paymentLoader'; */



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
      <Route path='/tips' element={<Tips />}/>
      
      <Route path='/appointment' element={<Appointments />}/>
      <Route path='/create-advertising' element={ <CreateAdvertising /> }/>
      <Route path='/doctorlists' element={<Doctors />} />
      <Route path='/hospitallists' element={<Hospital />} />
      <Route path='/service/:id' element={<ServiceDetails />} />
      <Route path='/solution/:id' element={<TipsDetails />} />
      {/* <Route path='/service/:id' element={<ServiceDetails />} /> */}
      

      {/* Messenger options */}
      <Route path='/chat' element={ < Messenger /> } />

      <Route path='/dashboard' element={<DashboardLayout /> }>
        <Route path='/dashboard' element={<MyAppointment />}/>
        <Route path='/dashboard/profile' element={<Profile />}/>
        <Route path='/dashboard/users' element={<UserList />}/>
        <Route path='/dashboard/doctors' element={<DoctorList />}/>
        <Route path='/dashboard/adminlist' element={<AdminList />} /> 
        <Route path='/dashboard/addAdmin' element={<AddAdmin />} />  
        <Route path='/dashboard/request' element={<RequestAdmin />} />  
        <Route path='/dashboard/Payment/:id' element={<Payment />}/>
      </Route> 

    </Route>

    </Routes>
    <Footer />

    </BrowserRouter>
  )
}
