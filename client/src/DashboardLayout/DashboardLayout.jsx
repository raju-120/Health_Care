import React from "react";
import { Outlet, Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function DashboardLayout() {
  const { currentUser } = useSelector((state) => state?.user);
  //console.log('User : ', currentUser);
  const menuItems = (
    <React.Fragment>
      {currentUser?.data?.user?.role === "user" && (
        <>
          <li className="mb-2 mt-10 text-lg text-black bg-white rounded-lg hover:opacity-50">
            <Link to="/dashboard/profile">Profile</Link>
          </li>
          <li className="mb-2 mt-10 text-lg text-black bg-white rounded-lg hover:opacity-50">
            <Link to="/dashboard">My Appointment</Link>
          </li>
          <li
            className="mb-2 mt-10 text-lg text-black bg-white rounded-lg hover:opacity-50"
            hidden
          >
            <Link to="/dashboard/Payment/:id">Payment</Link>
          </li>
        </>
      )}
      {currentUser?.data?.user?.role === "doctor" && (
        <>
          <li className="mb-2 mt-10 text-lg text-black bg-white rounded-lg hover:opacity-50">
            <Link to="/dashboard/profile">Profile</Link>
          </li>
          <li className="mb-2 mt-10 text-lg text-black bg-white rounded-lg hover:opacity-50">
            <Link to="/dashboard">My Appointment</Link>
          </li>
          <li className="mb-2 mt-10 text-lg text-black bg-white rounded-lg hover:opacity-50">
            <Link to="/dashboard/docrequest">Appointment Request</Link>
          </li>
        </>
      )}
      {currentUser?.data?.user?.role === "admin" && (
        <>
          <li className="mb-2 mt-10 text-lg text-black bg-white rounded-lg hover:opacity-50">
            <Link to="/dashboard/profile">Profile</Link>
          </li>
          <li className="mb-2 mt-10 text-lg text-black bg-white rounded-lg hover:opacity-50">
            <Link to="/dashboard">My Appointment</Link>
          </li>
          <li className="mb-2 mt-10 text-lg text-black bg-white rounded-lg hover:opacity-50">
            <Link to="/dashboard/users">Users List</Link>
          </li>
          <li className="mb-2 mt-10 text-lg text-black bg-white rounded-lg hover:opacity-50">
            <Link to="/dashboard/doctors">Doctors List</Link>
          </li>
          <li className="mb-2 mt-10 text-lg text-black bg-white rounded-lg hover:opacity-50">
            <Link to="/dashboard/request">All Appointment List</Link>
          </li>
        </>
      )}
      {currentUser?.data?.user?.role === "system-admin" && (
        <>
          <li className="mb-2 mt-8 text-lg text-black bg-white rounded-lg hover:opacity-50">
            <Link to="/dashboard/profile">Profile</Link>
          </li>
          <li className="mb-2 mt-8 text-lg text-black bg-white rounded-lg hover:opacity-50">
            <Link to="/dashboard/request">Request Appointment List</Link>
          </li>
          <li className="mb-2 mt-8 text-lg text-black bg-white rounded-lg hover:opacity-50">
            <Link to="/dashboard/users">users List</Link>
          </li>
          <li className="mb-2 mt-8 text-lg text-black bg-white rounded-lg hover:opacity-50">
            <Link to="/dashboard/doctors">Doctor List</Link>
          </li>
          <li className="mb-2 mt-8 text-lg text-black bg-white rounded-lg hover:opacity-50">
            <Link to="/dashboard/reg-doctors">Add Doctor</Link>
          </li>
          <li className="mb-2 mt-8 text-lg text-black bg-white rounded-lg hover:opacity-50">
            <Link to="/dashboard/adminlist">Admin List</Link>
          </li>
          <li className="mb-2 mt-8 text-lg text-black bg-white rounded-lg hover:opacity-50">
            <Link to="/dashboard/addAdmin">Add Admin</Link>
          </li>
        </>
      )}
    </React.Fragment>
  );

  return (
    <div className="mt-20">
      <div className="drawer lg:drawer-open">
        <input
          id="dashboard-drawer"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="drawer-content flex flex-col justify">
          {/* Breadcrumb */}
          <div className="drawer">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col justify">
              {/* Breadcrumb */}
              <div
                className={`transition-all duration-300 ${document.getElementById("my-drawer-3")?.checked ? "blur-md" : ""}`}
              >
                <div className="navbar bg-base-300 w-full lg:hidden">
                  <div className="flex-none lg:hidden">
                    <label
                      htmlFor="my-drawer-3"
                      aria-label="open sidebar"
                      className="btn btn-square btn-ghost"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="inline-block h-6 w-6 stroke-current"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 6h16M4 12h16M4 18h16"
                        ></path>
                      </svg>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="drawer-side">
              <label
                htmlFor="my-drawer-3"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>
              <ul className="menu bg-base-200 min-h-full mt-20 w-80 p-4 bg-stone-400">
                {menuItems}
              </ul>
            </div>
          </div>

          <Outlet />
        </div>
        <div className="drawer-side">
          <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
          <ul className="menu p-8 w-96 h-full bg-zinc-500 rounded-lg text-base-content">
            {menuItems}
          </ul>
        </div>
      </div>
    </div>
  );
}
