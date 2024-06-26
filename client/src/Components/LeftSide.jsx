import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import { Fragment, useState } from 'react';
import { FaTimes } from "react-icons/fa";
import { CiMenuFries } from "react-icons/ci";

export default function LeftSide() {
  const {currentUser} = useSelector(state => state?.user);

  const menu =<Fragment>
    <div className='top-30 w-3/5 h-36 left-14 right-0 bg-zinc-400 lg:hidden block absolute rounded'>
      <Link to='/profile'>
        <div className='flex  box-shadow  rounded-lg mb-2 hover:bg-slate-200'>
          <div>
            <img src={currentUser?.data?.user?.avatar} alt="user-avatar" className='lg:w-24 lg:h-24 ml-1 mt-1 rounded-full w-10 h-10 ' />
          </div>
          <div>
            <h1 className='font-serif p-2 font-semibold'>{currentUser?.data?.user?.username}</h1>
          </div>
        </div>
      </Link>
      <Link to='/doctorlists'>
        <h1 className='text-lg mb-3 font-semibold ml-1'>Doctors List</h1>
      </Link>
      <Link to='/hospitallists'>
        <h1 className='text-lg mb-3 font-semibold ml-1'>Hospitals List</h1>
      </Link>
    </div>
  </Fragment>

  const [click, setClick] = useState(false);
  const handleClick = () =>{
    setClick(!click)
  }


  return (
    <div className='p-2'>
      <div className='h-auto flex-col justify-between  text-white '>
        
        <div className='lg:flex-col md:flex font-normal items-center hidden'>
          
          <Link to='/profile'>
                <div className='flex p-2 hover:bg-slate-400 box-shadow shadow-[0_10px_50px_-15px_rgba(0,0,0,0.7)] rounded-lg'>
                  <div>
                    <img src={currentUser?.data?.user?.avatar} alt="user-avatar" className='lg:w-16 lg:h-16 rounded-full ' />
                  </div>
                  <div>
                    <h1 className='text-xl font-serif font-semibold m-2 mt-5'>{currentUser?.data?.user?.username}</h1>
                  </div>
                </div>
          </Link>

          <Link to='/doctorlists'>
            <div className="hover:bg-slate-400 lg:p-5 mt-2 rounded">
              <h1 className="text-xl font-serif font-semibold ">Doctors List</h1>
            </div>
          </Link>

          <Link to='/hospitallists'>
            <div className="hover:bg-slate-400 lg:p-5 mt-2 rounded">
              <h1 className="text-xl font-serif font-semibold ">Hospital List</h1>
            </div>
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
