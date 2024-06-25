import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function DashboardLayout() {
    const {currentUser} = useSelector(state => state?.user);
    //console.log('User : ', currentUser);
    const menuItems = 
                        <React.Fragment>
                            <li className='mb-2 mt-10 text-lg text-black bg-white rounded-lg hover:opacity-50' ><Link to='/dashboard/profile'>Profile</Link></li>
                            <li className='mb-2 mt-10 text-lg text-black bg-white rounded-lg hover:opacity-50' ><Link to='/dashboard'>My Appointment</Link></li>
                            <li className='mb-2 mt-10 text-lg text-black bg-white rounded-lg hover:opacity-50' hidden><Link to='/dashboard/Payment/:id'>Payment</Link></li>
                            {
                                currentUser?.data?.user?.role=== "system-admin" &&
                                (
                                    <>
                                        <li className='mb-2 mt-10 text-lg text-black bg-white rounded-lg hover:opacity-50' ><Link to='/dashboard/request'>All Appointment List</Link></li>
                                        <li className='mb-2 mt-10 text-lg text-black bg-white rounded-lg hover:opacity-50' ><Link to='/dashboard/adminlist'>Admin List</Link></li>
                                        <li className='mb-2 mt-10 text-lg text-black bg-white rounded-lg hover:opacity-50' ><Link to='/dashboard/addAdmin'>Add Admin</Link></li>
                                    </>
                                )
                            }
                        </React.Fragment>
        

  return (
    <div>
        <div className="drawer lg:drawer-open">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col justify">
                    <Outlet></Outlet>
                </div> 
                <div className="drawer-side">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label> 
                    <ul className="menu p-8 w-72 h-full bg-zinc-500 rounded-lg text-base-content">
                        {menuItems}
                        
                    </ul>
                
                </div>
            </div>
    </div>
  );
}
