import { useState } from 'react';
import SignInLogo from '../assets/sign.avif';

export default function SignIn() {

  const [formData, setFormData] = useState({});
  console.log(formData);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };


  const handleSubmit = () =>{}

  return (
    <div className="p-2 ">
      <h1 className="text-2xl font-semibold my-7 text-center uppercase">Sign In </h1>
      <div className='flex justify-around'>
        <div className=''>
            <img className='w-4/5' src={SignInLogo} alt="" />
        </div>
        <div className='lg:py-28 w-96 items-center '>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <input 
                id="email" 
                type="email" 
                placeholder="email" 
                className="border border-green-500 p-3 rounded-lg"
                onChange={handleChange} 
              />
              <input 
                id="password" 
                type="password" 
                placeholder="password" 
                className="border border-green-500 p-3 rounded-lg"
                onChange={handleChange} 
              />
              <button 
                className="bg-orange-500 text-white p-3 rounded-lg 
                          uppercase hover:opacity-95 disabled: opacity-50"

                >Sign in
              </button>
            </form>
        </div>
      </div>
       
    </div>
  )
}
