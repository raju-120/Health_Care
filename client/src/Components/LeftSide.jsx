import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import Doctors from '../Pages/Doctors/Doctors';
import { Fragment, useState } from 'react';
import { FaTimes } from "react-icons/fa";
import { CiMenuFries } from "react-icons/ci";

export default function LeftSide() {
  const {currentUser} = useSelector(state => state.user);

  const menu =<Fragment>
    <div className='top-30 w-3/5 left-14 right-0 bg-zinc-400 lg:hidden block absolute rounded'>
      <Link to='/profile'>
        <div className='flex  box-shadow  rounded-lg mb-2 hover:bg-slate-200'>
          <div>
            <img src={currentUser?.avatar} alt="user-avatar" className='lg:w-24 lg:h-24 rounded-full w-10 h-10 ' />
          </div>
          <div>
            <h1 className='font-serif font-semibold'>{currentUser?.username}</h1>
          </div>
        </div>
      </Link>
      <Link to='#'>
        <h1 className='text-xl font-semibold ml-1'>Doctors List</h1>
      </Link>
    </div>
  </Fragment>

  const [click, setClick] = useState(false);
  const handleClick = () =>{
    setClick(!click)
  }


  return (
    <div className=''>
    <div className='h-auto flex-col justify-between  text-white '>
      
      <div className='lg:flex-col md:flex font-normal items-center hidden'>
        
        <Link to='/profile'>
              <div className='flex p-2 hover:bg-slate-100 box-shadow shadow-[0_10px_50px_-15px_rgba(0,0,0,0.7)] rounded-lg'>
                <div>
                  <img src={currentUser?.avatar} alt="user-avatar" className='w-20 h-20 rounded-full ' />
                </div>
                <div>
                  <h1 className='text-xl font-serif font-semibold m-5 '>{currentUser?.username}</h1>
                </div>
              </div>
        </Link>
        <Link>
          <h1>Doctor</h1>
        </Link>

      </div>
        

      <div>
        {click && menu }
      </div>
      <button className='ml-5 block  w-10 h-10 sm:hidden text-2xl translate-x-50' onClick={handleClick}>
        {click ? <FaTimes /> : <CiMenuFries/>}
      </button>
    </div>
</div>

  )
}
