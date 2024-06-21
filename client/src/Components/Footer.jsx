import logo from '../assets/logo.jpg';
import {Link} from 'react-router-dom';

export default function Footer() {
  return (
    <div className="bg-stone-500 rounded-sm mt-5">
        <div className="lg:p-16 p-5">
            
            <div className='grid lg:grid-cols-2 md:grid-cols-1'>
                <Link to='/'>
                    <div>
                        <img src={logo} alt="logo" className='w-16 h-16 rounded-full' />
                    </div>
                </Link>
                <div className='lg:flex lg:justify-between text-xl text-white'>
                    <div>
                        <p>Solution</p>
                        <p>Marketing</p>
                        <p>Analytics</p>
                    </div>
                    <div>
                        <p>Support</p>
                        <p>Documentation</p>
                        <p>Guides</p>
                    </div>
                    <div>
                        <p>Company</p>
                        <p>Jobs</p>
                        <p>Press</p>
                    </div>
                    <div>
                        <p>Legal</p>
                        <p>Privacy</p>
                        <p>Terms</p>
                    </div>
                </div>
            </div>
            <div className=' divide-y divide-solid'></div>
            <div className='mt-10'>
                <h1 className='text-center text-lg'>© 2024 Reea Digital Company, Inc. All rights reserved.</h1>
            </div>
        </div>
    </div>
    
  )
}
