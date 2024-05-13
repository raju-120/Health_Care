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
import DashboardLayout from './layouts/Dashboard/DashboardLayout';
import Messenger from './Pages/Messenger/Messenger';


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
      <Route path='/profile' element={<Profile />}/>
      <Route path='/create-advertising' element={ <CreateAdvertising /> }/>
      <Route path='/doctorlists' element={<Doctors />} />
      

      {/* Messenger options */}
      <Route path='/dashboard' element={<DashboardLayout />} />
      <Route path='/dashboard/messenger' element={<Messenger />} />

    </Route>

    </Routes>
    <Footer />

    </BrowserRouter>
  )
}
