import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './Pages/Home';
import About from './Pages/About';
import Profile from './Pages/Profile';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import Headers from './Components/Headers';
import Services from './Pages/Services';
import PrivateRoute from './Components/PrivateRoute';

export default function App() {
  return (
    <BrowserRouter>
    <Headers />
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/about' element={<About />}/>
      <Route path='/service' element={<Services />}/>
      <Route path='/sign-in' element={<SignIn />}/>
      <Route path='/sign-up' element={<SignUp />}/>
      
      {/* Private Route Section */}
      
      <Route element={<PrivateRoute />}>
        <Route path='/profile' element={<Profile />}/>
      </Route>

    </Routes>
    </BrowserRouter>
  )
}
