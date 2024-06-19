// DashboardLayout/DashboardLayout.js
import React from 'react';
import { Outlet, Link } from 'react-router-dom';

export default function DashboardLayout() {
    const menuItems = 
                        <React.Fragment>
                            <li className='mb-2 mt-10 text-lg text-black bg-white rounded-lg hover:opacity-50' ><Link to='/dashboard/profile'>Profile</Link></li>
                            <li className='mb-2 mt-10 text-lg text-black bg-white rounded-lg hover:opacity-50' ><Link to='/dashboard'>My Appointment</Link></li>
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