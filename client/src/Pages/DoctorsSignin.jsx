import { useState } from 'react';
import DoctorsLogo from '../assets/absec.jpg';
import { useDispatch } from 'react-redux';
import { signInFailure, signInStart, signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';


export default function DoctorsSignin() {
  const [formData, setFormData] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //console.log(formData);

  const handleChange = (e) =>{
    setFormData({
      ...formData,
      [e.target.id] : e.target.value
    })
  }

  const handleSubmit = async(e) =>{
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
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/');
    }catch(error){
      dispatch(signInFailure(error.message));
    }
  }

  return (
    <div>
      <div className="max-w-full py-5">
        <h1 className="text-4xl font-semibold text-center my-10 uppercase">Doctors Sign In</h1>
        <div className="lg:flex justify-around">
          <div className="lg:ml-20">
            <img src={DoctorsLogo} alt="login-image" className="shadow-2xl rounded-xl " />
          </div>
          <div className="lg:w-2/5 my-2">
            <form onSubmit={handleSubmit} className='flex flex-col gap-4 my-24'>

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
                Doctor Sign In
            </button>

          </form>
        </div>
      </div>
    </div>
  </div>
  )
}
