import { Fragment, useState } from 'react';
import logo from '../assets/logo.jpg';
import { Link } from 'react-router-dom';
import { FaTimes } from "react-icons/fa";
import { CiMenuFries } from "react-icons/ci";

export default function Headers() {
  const menu =<Fragment>
    <div className='top-28 w-full left-0 right-0 bg-slate-900 lg:hidden block absolute'>
      
      <ul className='text-center text-lg p-10 flex flex-col gap-2 text-white uppercase'>
        <Link to='/'>
          <li className=' border-b border-slate-800 hover:text-green-300 hover:underline'>Home</li>
        </Link>
        <Link to='/service'>
          <li className=' border-b border-slate-800 hover:text-green-300 hover:underline'>Profile</li>
        </Link>
        <Link to='/about'>
          <li className=' border-b border-slate-800 hover:text-green-300 hover:underline'>About</li>
        </Link>
        
      </ul>
    </div>
  </Fragment>

  const anotherMenu = <Fragment>
          <ul className='flex gap-8 item-center text-white'>
            <Link to='/sign-in'>
                <li className='hover:text-gray-300 uppercase'>Sign In</li>
              </Link>
          </ul>
  </Fragment>

  const [click,setClick] = useState(false);
  const handleClick = () =>{
    setClick(!click);
  }

  return (
    <header className='bg-slate-600'>
        <div className='h-30 flex justify-between z-50 text-white lg:py-2 lg:px-20 px-5  py-5'>
          <div className='flex flex-col items-center '>
            <img src={logo} alt="" className='lg:h-16 lg:w-16 h-14 w-14 rounded-lg'/>
            <h1>
              <span className='text-lime-600 text-lg'>Personal </span>
              <span className='text-green-500 text-lg'>HealthCare</span>
            </h1>
          </div>
          <div className='lg:flex md:flex lg:flex-1  items-center justify-center font-normal hidden'>
            <ul className='flex gap-8 item-center text-white uppercase'>
              <Link to='/'>
                <li className='hover:text-gray-300'>Home</li>
              </Link>
              <Link to='/service'>
                <li className='hover:text-gray-300'>Service</li>
              </Link>
              <Link to='/about'>
                <li className='hover:text-gray-300'>About</li>
              </Link>
            </ul>
          </div>
          <div className='lg:flex md:flex font-normal items-center hidden'>
            {anotherMenu}
          </div>
          
          <div>
            {click && menu }
          </div>
          <button className='block sm:hidden translate-x-50' onClick={handleClick}>
            {click ? <FaTimes /> : <CiMenuFries/>}
          </button>
        </div>
    </header>
  )
}
