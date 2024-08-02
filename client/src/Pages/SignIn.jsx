
import logo from '../assets/sign.avif';
import {useDispatch, useSelector} from 'react-redux';
import { signInFailure, signInStart, signInSuccess } from "../redux/user/userSlice";
//import OAuth from "../Components/OAuth";
import toast from "react-hot-toast"; 
import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

export default function SignIn() {
  
  const [loginType, setLoginType] = useState('user');
  const [formData, setFormData] = useState({});
  const {error} = useSelector((state)=>state?.user)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  console.log(formData);

  const handleChange = (e) =>{
    setFormData({
      ...formData,
      [e.target.id] : e.target.value,
    });
  };

  const handleToggle = (type) => {
    setLoginType(type);
  };


  const handleUserSubmit = async(e) =>{
    e.preventDefault();
    try{
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin',
      {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if(data.success === false){
        dispatch(signInFailure(data.message));
        toast.error("User credential did not matched!")
        return;
      }

      dispatch(signInSuccess(data));
      toast.success("User Login Successful");
      navigate('/');
    } catch(error){
      dispatch(signInFailure(error.message))
    }
  }

  /* Doctor Sign in */
  const handleDoctorSubmit = async(e) =>{
    e.preventDefault();
    try{
      dispatch(signInStart());
      const res = await fetch('/api/auth/doctorssignin',{
        method: 'POST',
        headers:{
          "Content-Type" : 'application/json'
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      //console.log(data);
      if(data.success === false){
        dispatch(signInFailure());
        toast.error("Doctor credential unmatched");
        return;
      }
      dispatch(signInSuccess(data));
      toast.success("Doctor Login Successful");
      navigate('/');
    }catch(error){
      dispatch(signInFailure(error.message));
    }
  }

  /* admin */
  const handleAdminSubmit = async(e) =>{
    e.preventDefault();
    try{
      dispatch(signInStart());
      const res = await fetch('/api/auth/systemadminsignin',
      {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      //console.log(data);
      if(data.success === false){
        dispatch(signInFailure(data.message));
        toast.error("User credential did not matched!")
        return;
      }

      dispatch(signInSuccess(data));
      toast.success("System Admin Login Successful");
      navigate('/');
    } catch(error){
      dispatch(signInFailure(error.message))
    }
  }



  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <div className="flex justify-center mb-4">
          <button
            className={`px-4 py-2 mr-2 rounded ${loginType === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => handleToggle('user')}
          >
            User Login
          </button>
          <button
            className={`px-4 py-2 mr-2 rounded ${loginType === 'doctor' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => handleToggle('doctor')}
          >
            Doctor Login
          </button>
          <button
            className={`px-4 py-2 rounded ${loginType === 'admin' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => handleToggle('system-admin')}
          >
            System Admin
          </button>
        </div>
        
        {loginType === 'user' && (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-center">User Login</h2>
            <form onSubmit={handleUserSubmit}>
              
              <div className="mb-4">
                <label className="block mb-2">Email</label>
                <input 
                  type="email" 
                  id='email' 
                  placeholder='email'
                  className="w-full p-2 border border-gray-300 rounded" 
                  onChange={handleChange}
                  />
              </div>

              <div className="mb-4">
                <label className="block mb-2">Password</label>
                <input 
                  type="password" 
                  id='password' 
                  placeholder='password'
                  className="w-full p-2 border border-gray-300 rounded" 
                  onChange={handleChange}
                  />
              </div>

              <button className="w-full bg-blue-500 text-white py-2 rounded">
                Login
              </button>
              {error && <p className='text-red-500 font-lg mt-2'>{error?.message}</p>}
            </form>
            <p className='mt-2'>Have not registered? Please <span className='text-center text-green-400'> <Link to='/sign-up'> Sign-Up</Link> </span> </p>
          </div>
        )}

        {loginType === 'doctor' && (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-center">Doctor Login</h2>
            <form onSubmit={handleDoctorSubmit}>
              <div className="mb-4">
                <label className="block mb-2">Email</label>
                <input 
                  type="text" 
                  id='email'
                  placeholder='Doctor email'
                  className="w-full p-2 border border-gray-300 rounded" 
                  onChange={handleChange}
                  />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Password</label>
                <input 
                  type="password" 
                  id='password'
                  placeholder='password'
                  className="w-full p-2 border border-gray-300 rounded"
                  onChange={handleChange} 
                  />
              </div>
              <button className="w-full bg-blue-500 text-white py-2 rounded">
                Dotcor Login
              </button>
              {error && <p className='text-red-500 font-lg mt-2'>{error?.message}</p>}
            </form>
          </div>
        )}

        {loginType === 'system-admin' && (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>
            <form onSubmit={handleDoctorSubmit}>
              <div className="mb-4">
                <label className="block mb-2">Email</label>
                <input 
                  type="text" 
                  id='email'
                  placeholder='admin email'
                  className="w-full p-2 border border-gray-300 rounded" 
                  onChange={handleChange}
                  />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Password</label>
                <input type="password" className="w-full p-2 border border-gray-300 rounded" />
              </div>
              <button className="w-full bg-blue-500 text-white py-2 rounded">
                 Login
              </button>
              {error && <p className='text-red-500 font-lg mt-2'>{error?.message}</p>}
            </form>
          </div>
        )}

      </div>
    </div>

    
    
  );
}
{/* <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <div className="flex justify-center mb-4">
          <button
            className={`px-4 py-2 mr-2 rounded ${loginType === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => handleToggle('user')}
          >
            User Login
          </button>
          <button
            className={`px-4 py-2 rounded ${loginType === 'doctor' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => handleToggle('doctor')}
          >
            Doctor Login
          </button>

        </div>
        {loginType === 'user' ? (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-center">User Login</h2>
            <form>
              <div className="mb-4">
                <label className="block mb-2">Email</label>
                <input type="email" className="w-full p-2 border border-gray-300 rounded" />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Password</label>
                <input type="password" className="w-full p-2 border border-gray-300 rounded" />
              </div>
              <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
                Login
              </button>
            </form>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-center">Doctor Login</h2>
            <form>
              <div className="mb-4">
                <label className="block mb-2">BMDC Code</label>
                <input type="text" className="w-full p-2 border border-gray-300 rounded" />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Password</label>
                <input type="password" className="w-full p-2 border border-gray-300 rounded" />
              </div>
              <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
                Login
              </button>
            </form>
          </div>
        )}
      </div>
    </div> */}
    
        {/*<div >
           <div className="cs_preloader cs_accent_color_v1">
       <div className="cs_preloader_in">
         <div className="cs_wave_first">
           <svg enableBackground="new 0 0 300.08 300.08" viewBox="0 0 300.08 300.08" xmlns="http://www.w3.org/2000/svg"><g><path d="m293.26 184.14h-82.877l-12.692-76.138c-.546-3.287-3.396-5.701-6.718-5.701-.034 0-.061 0-.089 0-3.369.027-6.199 2.523-6.677 5.845l-12.507 87.602-14.874-148.69c-.355-3.43-3.205-6.056-6.643-6.138-.048 0-.096 0-.143 0-3.39 0-6.274 2.489-6.752 5.852l-19.621 137.368h-9.405l-12.221-42.782c-.866-3.028-3.812-5.149-6.8-4.944-3.13.109-5.777 2.332-6.431 5.395l-8.941 42.332h-73.049c-3.771 0-6.82 3.049-6.82 6.82 0 3.778 3.049 6.82 6.82 6.82h78.566c3.219 0 6.002-2.251 6.67-5.408l4.406-20.856 6.09 21.313c.839 2.939 3.526 4.951 6.568 4.951h20.46c3.396 0 6.274-2.489 6.752-5.845l12.508-87.596 14.874 148.683c.355 3.437 3.205 6.056 6.643 6.138h.143c3.39 0 6.274-2.489 6.752-5.845l14.227-99.599 6.397 38.362c.546 3.287 3.396 5.702 6.725 5.702h88.66c3.771 0 6.82-3.049 6.82-6.82-.001-3.772-3.05-6.821-6.821-6.821z"></path></g>
           </svg>
         </div>
         <div className="cs_wave_second">
           <svg enableBackground="new 0 0 300.08 300.08" viewBox="0 0 300.08 300.08" xmlns="http://www.w3.org/2000/svg"><g><path d="m293.26 184.14h-82.877l-12.692-76.138c-.546-3.287-3.396-5.701-6.718-5.701-.034 0-.061 0-.089 0-3.369.027-6.199 2.523-6.677 5.845l-12.507 87.602-14.874-148.69c-.355-3.43-3.205-6.056-6.643-6.138-.048 0-.096 0-.143 0-3.39 0-6.274 2.489-6.752 5.852l-19.621 137.368h-9.405l-12.221-42.782c-.866-3.028-3.812-5.149-6.8-4.944-3.13.109-5.777 2.332-6.431 5.395l-8.941 42.332h-73.049c-3.771 0-6.82 3.049-6.82 6.82 0 3.778 3.049 6.82 6.82 6.82h78.566c3.219 0 6.002-2.251 6.67-5.408l4.406-20.856 6.09 21.313c.839 2.939 3.526 4.951 6.568 4.951h20.46c3.396 0 6.274-2.489 6.752-5.845l12.508-87.596 14.874 148.683c.355 3.437 3.205 6.056 6.643 6.138h.143c3.39 0 6.274-2.489 6.752-5.845l14.227-99.599 6.397 38.362c.546 3.287 3.396 5.702 6.725 5.702h88.66c3.771 0 6.82-3.049 6.82-6.82-.001-3.772-3.05-6.821-6.821-6.821z"></path></g>
           </svg>
         </div>
       </div>
     </div> */}
     {/* <section id="services">
        <div className="cs_height_120 cs_height_lg_80"></div>
          <div className="container ">
            <div className="m-10 p-10 ">
            
            <div className="bg-lime-500 rounded-3xl">
              <button className="btn text-center p-3 item-center text-2xl font-semibold uppercase hover:opcaity-65">Login as Users</button>
            </div>
        
            <div>
              <h1>Login as Doctors</h1>
            </div>
            
            <div>
              <h1>Login as Admin</h1>
            </div>

            </div>
          <div className="cs_height_63 cs_height_lg_40"></div>
          </div>
        <div className="cs_height_120 cs_height_lg_80"></div>
      </section>
      
 */}
      {/* <div className="max-w-full py-5">
        <h1 className="text-4xl font-semibold text-center my-10 uppercase">Sign IN</h1>
        <div className="lg:flex justify-around">
          <div className="lg:ml-20">
            <img src={logo} alt="login-image" className="shadow-2xl rounded-xl " />
          </div>
          <div className="lg:w-2/5 my-24">
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>

            <input
              type="email"
              id="email"
              placeholder='email'
              onChange={handleChange}
              className='border p-3 rounded-lg' 
            />

            <input
              type="password"
              id="password"
              placeholder='password'
              onChange={handleChange}
              className='border p-3 rounded-lg'
            />

            <button 
              className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-75 disabled:opacity-65'>
                Sign IN
            </button>
            <OAuth></OAuth>
            </form>

            
            <p className='ml-2 text-lg mt-4 '>
            <Link to="/doctor-signin">
                <span className="text-blue-500 text-xl hover:bg-slate-300 p-2 rounded-lg">Doctors Sign-In</span>
              </Link>
            </p>

            <p className='ml-2 text-lg mt-2'>Have not register? Please
              <span className='text-green-500 ml-2 font-semibold uppercase'>
              <Link to="/sign-up">
                Sign Up
              </Link>
              </span>
            </p>
            


            
           {error && <p className="text-red-500">{error}</p>}
          </div>
        </div>
      </div> 
    </div>
  );
}*/}

