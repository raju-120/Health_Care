import { useEffect, useState } from "react";
/* import { useSelector } from "react-redux"; */
import {  Link, Outlet } from "react-router-dom";

export default function DashboardLayout() {
    /* const {currentUser} = useSelector(state=>state?.user);
    console.log('Current User: ' , currentUser?.data?.user?.username) */
    const [doctors, setDoctors] = useState([]);
    useEffect(() =>{
        const fetchDoctors = async () =>{
            try{
                const res = await fetch("/api/auth/doctors");
                const data = await res.json();
                if (Array.isArray(data?.data)) {
                    setDoctors(data?.data);
                } else {
                    console.error("Data is not an array:", data);
                }
            } catch (error) {
              console.error("Error fetching posts:", error);
            }
        }
        fetchDoctors();
    },[])
    /* const menuItems = <React.Fragment>
                            <li className='text-lg bg-white rounded-lg' ><Link to='/dashboard'>Friends Id</Link></li>
                        </React.Fragment> */
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
                            {doctors.length > 0 ? (
                                <div>
                                {doctors.map((doctor) => (
                                    <Link to="/dashboard/messenger" key={doctor?._id}>
                                        <div className="flex items-center mb-5 " key={doctor?._id}>
                                            <div>
                                                <img src={doctor?.avatar} alt="profile picture"  className="lg:h-14 lg:w-14 rounded-full"/>
                                            </div>
                                            <div className="ml-5 mt-2 text-xl">
                                                <h1>{doctor?.username}</h1>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                                </div>
                            ) : (
                                <p>No posts available</p>
                            )}
                        </div>
                </div>
            </div>
        </div>
    </div>
  )
}
