import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import Doctors from '../Pages/Doctors/Doctors';

export default function LeftSide() {
  const {currentUser} = useSelector(state => state.user);
  return (
    <div className=" text-center">
      <Link to='/profile'>
        <div className='flex p-2 hover:bg-slate-100 box-shadow shadow-[0_10px_50px_-15px_rgba(0,0,0,0.7)] rounded-lg'>
          <div>
            <img src={currentUser?.avatar} alt="user-avatar" className='w-24 h-24 rounded-full ' />
          </div>
          <div>
            <h1 className='text-4xl font-serif font-semibold m-5 '>{currentUser?.username}</h1>
          </div>
        </div>
      </Link>
      <div className='mt-5'>
        <Doctors />
      </div>
    </div>
  )
}
