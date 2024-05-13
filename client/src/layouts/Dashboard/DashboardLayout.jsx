import React from "react";
import { Link, Outlet } from "react-router-dom";
import logo from "../../assets/logo.jpg"

export default function DashboardLayout() {
    const menuItems = <React.Fragment>
                            <li className='text-lg bg-white rounded-lg' ><Link to='/dashboard'>Friends Id</Link></li>
                        </React.Fragment>
  return (
    <div>
            <div className="drawer lg:drawer-open">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col justify">
                    <Outlet />
                </div>
                <div className="drawer-side">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label> 
                    <div className="bg-gray-400 w-72 h-full">
                        <h1 className="text-2xl text-center mb-5 font-semibold ">Chat List</h1>
                        <div className="divider bg-gray-50" />
                        <div className="mb-4 bg-gray-300 p-2 rounded-md" >
                            <div className="flex items-center ">
                                <div>
                                    <img src={logo} alt="profile picture"  className="lg:h-14 lg:w-14 rounded-full"/>
                                </div>
                                <div className="ml-5 text-xl">
                                    <h1>Rakib</h1>
                                </div>
                            </div>
                        </div>
                        <ul className=" bg-gray-300 ">
                            {menuItems}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
  )
}
