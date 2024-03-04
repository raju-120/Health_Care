import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from '../assets/sign.avif';
import OAuth from "../Components/OAuth";


export default function SignUp() {

  const [formData, setFormData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>{
    setFormData({
      ...formData,
      [e.target.id] : e.target.value,
    })
  };

  const handleSubmit = async(e) =>{
    e.preventDefault();
    try{
      setLoading(true);
      const res = await fetch('/api/auth/signup',
      {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if(data.success === false){
        setLoading(false);
        setError(data.message);
        return data;
      }
      setLoading(false);
      setError(null);
      navigate('/sign-in');
    } catch(error){
      setLoading(false);
      setError(error.message);
    }
  }

  return (
    <div>
      <div className="max-w-full py-5">
        <h1 className="text-4xl font-semibold text-center my-10 uppercase">Sign UP</h1>
        <div className="flex justify-around">
          <div className="ml-20">
            <img src={logo} alt="login-image" className="shadow-2xl rounded-xl " />
          </div>
          <div className="w-2/5 my-24">
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>

            <input 
              type="text" 
              id="username" 
              placeholder='username' 
              onChange={handleChange}
              className='border p-4 rounded-lg' 
            />

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
              disabled={loading}
              className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-75 disabled:opacity-65'>
                {loading ? 'Loading...' : 'Sign Up'}
            </button>
            <OAuth/>
            </form>
            <p className='text-lg mt-2'>already register? Please
              <span className='text-green-500 ml-2 font-semibold uppercase'>
              <Link to="/sign-in">
                Log In
              </Link>
              </span>
            </p>
            {error && <p className="text-red-500">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  )
}
