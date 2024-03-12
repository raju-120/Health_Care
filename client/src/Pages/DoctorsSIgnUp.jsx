import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DoctorsLogo from '../assets/absec.jpg';


export default function DoctorsSIgnUp() {

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
        <h1 className="text-4xl font-semibold text-center my-10 uppercase">Doctors Sign UP</h1>
        <div className="lg:flex justify-around">
          <div className="lg:ml-20">
            <img src={DoctorsLogo} alt="login-image" className="shadow-2xl rounded-xl " />
          </div>
          <div className="lg:w-2/5 my-2">
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>

            <input 
              type="text" 
              id="username"
              placeholder='username' 
              onChange={handleChange}
              className='border p-4 rounded-lg' 
            />

            <input 
              type="text" 
              id="specialty" 
              placeholder='Specialty' 
              onChange={handleChange}
              className='border p-3 rounded-lg' 
            />

            <input 
              type="text" 
              id="qualifications" 
              placeholder='Qualification' 
              onChange={handleChange}
              className='border p-3 rounded-lg' 
            />

            <input 
              type="text" 
              id="designation" 
              placeholder='Designation' 
              onChange={handleChange}
              className='border p-3 rounded-lg' 
            />

            <input 
              type="text" 
              id="institute" 
              placeholder='Institute-Name' 
              onChange={handleChange}
              className='border p-3 rounded-lg' 
            />

            <input 
              type="text" 
              id="department" 
              placeholder='Department' 
              onChange={handleChange}
              className='border p-3 rounded-lg' 
            />

            <input 
              type="number" 
              id="phone" 
              placeholder='Personal Number' 
              onChange={handleChange}
              className='border p-3 rounded-lg' 
            />

            <input 
              type="number" 
              id="appointment" 
              placeholder='Appointment Number' 
              onChange={handleChange}
              className='border p-3 rounded-lg' 
            />

            <input 
              type="text" 
              id="address" 
              placeholder='Address' 
              onChange={handleChange}
              className='border p-3 rounded-lg' 
            />

            <input 
              type="file" 
              id="image" 
              placeholder='Address' 
              onChange={handleChange}
              className='border p-3 rounded-lg' 
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
            
            </form>
            
            
            <p className='text-lg mt-2'> Already register as a Doctor? Please 
                <Link to='/doctors-sign-up'>
                  <span className='text-blue-500 ml-2 font-semibold uppercase'>Log-In</span>
                </Link>
            </p>
            
            {error && <p className="text-red-500">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  )
}
