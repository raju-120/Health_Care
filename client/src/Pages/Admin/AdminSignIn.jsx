import { useState } from "react";
import Admin from '../../assets/admin.jpg';
import { Link,useNavigate  } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import { signInFailure, signInStart, signInSuccess } from "../../redux/user/userSlice";
import toast from "react-hot-toast"; 
export default function AdminSignIn() {

    const [formData, setFormData] = useState({});
    const {error} = useSelector((state)=>state.user)
    const navigate = useNavigate();
    const dispatch = useDispatch(); 
    console.log(formData);

    const handleChange = (e) =>{
        setFormData({
        ...formData,
        [e.target.id] : e.target.value,
        });
    };

    const handleSubmit = async(e) =>{
        e.preventDefault();
        try{
          dispatch(signInStart());
          const res = await fetch('/api/auth/adminsignin',
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
          toast.success("Admin Login Successful");
          navigate('/');
        } catch(error){
          dispatch(signInFailure(error.message))
        }
      }

  return (
    <div>
      <div className="max-w-full py-5">
        <h1 className="text-4xl font-semibold text-center my-10 uppercase">Sign IN as Admin</h1>
        <div className="lg:flex justify-around">
          <div className="lg:ml-20">
            <img src={Admin} alt="login-image" className="shadow-2xl rounded-xl " />
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
            
            </form>

            
            <p className='ml-2 text-lg mt-4 '>
                <span>Log in as </span>
                <Link to="/systemadmin">
                    <span className="text-blue-500 text-xl hover:bg-slate-300 p-2 rounded-lg">System Admin</span>
                </Link>
            </p> 

            
           {error && <p className="text-red-500">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  )
}
