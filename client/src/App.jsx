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
import DashboardHome from './Pages/DashboardPages/DashboardHome';
import DashboardSet from './Pages/DashboardPages/DashboardSet';  



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
         <Route path='/dashboard/' element={<DashboardHome />} />  
        <Route path='/dashboard/settings' element={<DashboardSet />} /> 
        <Route path='/dashboard/profile' element={<Profile />}/>
      </Route> 

    </Route>

    </Routes>
    <Footer />

    </BrowserRouter>
  )
}
