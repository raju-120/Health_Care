import { useEffect } from "react";

import "../assets/css/style.css";
import "../assets/css/animate.css";
import "../assets/css/bootstrap.min.css";
import "../assets/css/animated-text.css";
import "../assets/css/fontawesome.min.css";
// import '../assets/css/style.css.map';
import "../assets/css/odometer.css";

import "../assets/js/main";

import { /* Fragment, */ useState } from "react";
import logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
// import { FaTimes } from "react-icons/fa";
// import { CiMenuFries } from "react-icons/ci";
// import { BsMessenger } from "react-icons/bs";
// import { initializeJQuery } from "../assets/js/animated-text.min";

// import Image from "../assets/images/icons/phone_icon_3.svg";

export default function Headers() {
  const { currentUser } = useSelector((state) => state?.user);
  console.log("User", currentUser);
  const [click, setClick] = useState(false);
  const handleClick = () => {
    setClick(!click);
  };

  return (
    <div>
      {/*  //<!-- Start Preloader --> */}
      <div className="cs_preloader cs_accent_color_v1">
        <div className="cs_preloader_in">
          <div className="cs_wave_first">
            <svg
              enableBackground="new 0 0 300.08 300.08"
              viewBox="0 0 300.08 300.08"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g>
                <path d="m293.26 184.14h-82.877l-12.692-76.138c-.546-3.287-3.396-5.701-6.718-5.701-.034 0-.061 0-.089 0-3.369.027-6.199 2.523-6.677 5.845l-12.507 87.602-14.874-148.69c-.355-3.43-3.205-6.056-6.643-6.138-.048 0-.096 0-.143 0-3.39 0-6.274 2.489-6.752 5.852l-19.621 137.368h-9.405l-12.221-42.782c-.866-3.028-3.812-5.149-6.8-4.944-3.13.109-5.777 2.332-6.431 5.395l-8.941 42.332h-73.049c-3.771 0-6.82 3.049-6.82 6.82 0 3.778 3.049 6.82 6.82 6.82h78.566c3.219 0 6.002-2.251 6.67-5.408l4.406-20.856 6.09 21.313c.839 2.939 3.526 4.951 6.568 4.951h20.46c3.396 0 6.274-2.489 6.752-5.845l12.508-87.596 14.874 148.683c.355 3.437 3.205 6.056 6.643 6.138h.143c3.39 0 6.274-2.489 6.752-5.845l14.227-99.599 6.397 38.362c.546 3.287 3.396 5.702 6.725 5.702h88.66c3.771 0 6.82-3.049 6.82-6.82-.001-3.772-3.05-6.821-6.821-6.821z"></path>
              </g>
            </svg>
          </div>
          <div className="cs_wave_second">
            <svg
              enableBackground="new 0 0 300.08 300.08"
              viewBox="0 0 300.08 300.08"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g>
                <path d="m293.26 184.14h-82.877l-12.692-76.138c-.546-3.287-3.396-5.701-6.718-5.701-.034 0-.061 0-.089 0-3.369.027-6.199 2.523-6.677 5.845l-12.507 87.602-14.874-148.69c-.355-3.43-3.205-6.056-6.643-6.138-.048 0-.096 0-.143 0-3.39 0-6.274 2.489-6.752 5.852l-19.621 137.368h-9.405l-12.221-42.782c-.866-3.028-3.812-5.149-6.8-4.944-3.13.109-5.777 2.332-6.431 5.395l-8.941 42.332h-73.049c-3.771 0-6.82 3.049-6.82 6.82 0 3.778 3.049 6.82 6.82 6.82h78.566c3.219 0 6.002-2.251 6.67-5.408l4.406-20.856 6.09 21.313c.839 2.939 3.526 4.951 6.568 4.951h20.46c3.396 0 6.274-2.489 6.752-5.845l12.508-87.596 14.874 148.683c.355 3.437 3.205 6.056 6.643 6.138h.143c3.39 0 6.274-2.489 6.752-5.845l14.227-99.599 6.397 38.362c.546 3.287 3.396 5.702 6.725 5.702h88.66c3.771 0 6.82-3.049 6.82-6.82-.001-3.772-3.05-6.821-6.821-6.821z"></path>
              </g>
            </svg>
          </div>
        </div>
      </div>
      {/* <!-- End Preloader --> */}
      <header
        className="cs_site_header cs_style_1 cs_sticky_header lg:max-w-[1900px]"
        style={{ padding: "5px" }}
      >
        <div className="cs_main_header">
          <div className="container">
            <div className="cs_main_header_in">
              <div className="cs_main_header_left">
                <Link to="/" className="cs_site_branding">
                  <img src={logo} />
                </Link>
                <div className="cs_nav cs_primary_font">
                  <ul className="cs_nav_list cs_fs_28">
                    <li>
                      <Link to="/">
                        <>Home</>
                      </Link>
                    </li>
                    <li>
                      <Link to="/about">
                        <>About</>
                      </Link>
                    </li>
                    <li>
                      <Link to="/appointment">
                        <>Appointment</>
                      </Link>
                    </li>
                    <li>
                      <Link to="/doctorlists">
                        <>Doctors</>
                      </Link>
                    </li>
                    <li>
                      <Link to="/service">
                        <>Services</>
                      </Link>
                    </li>
                    <li>
                      <Link to="/donner">
                        <>Blood</>
                      </Link>
                    </li>
                    <li className="lg:hidden">
                      <Link to="/dashboard/profile">
                        <>Profile</>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="cs_main_header_right cs_accent_color_v1">
                <div className="cs_header_contact">
                  <div className="cs_header_contact_right">
                    {currentUser ? (
                      <div className="dropdown dropdown-end">
                        <div
                          tabIndex={0}
                          role="button"
                          className="rounded-btn mt-2"
                        >
                          <Link to="/dashboard/profile">
                            <img
                              src={currentUser?.data?.user?.avatar}
                              className="w-16 h-16 rounded-full"
                              alt="profile"
                            />
                          </Link>
                        </div>
                        {/* <ul
                        tabIndex={0}
                        className="text-center text-xl menu dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-3 shadow">
                        <Link to="/dashboard">
                          <h1 className='mb-2'>Dashboard</h1>
                        </Link>
                        <button className='btn btn-warning text-centet text-lg btn-md'>Signout</button>
                      </ul> */}
                      </div>
                    ) : (
                      <ul className="flex gap-8 item-center  uppercase text-xl">
                        <button className="text-2xl font-semibold hover:opacity-50">
                          Sign In
                        </button>
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* <header className='bg-slate-600'>
        <div className='h-30 flex justify-between z-80 text-white lg:py-2 lg:px-20 px-5  py-5'>
          <div className='flex flex-col items-center '>
            
            <img src={logo} alt="logo" className='lg:h-16 lg:w-16 h-14 w-14 lg:ml-20 mr-20 rounded-lg'/>
            <h1>
              <span className='text-lime-600 text-lg'>Personal </span>
              <span className='text-green-500 text-lg'>HealthCare</span>
            </h1>

          </div>
          <div className='lg:flex md:flex lg:flex-1  items-center justify-center font-normal hidden mr-16'>
           
            <ul className='flex gap-8 item-center text-zinc-200 uppercase text-lg'>
              <Link to='/'>
                <li className='hover:text-gray-300'>Home</li>
              </Link>

              <Link to='/tips'>
                <li className='hover:text-gray-300'>Tips</li>
              </Link>

              
              <Link to='/appointment'>
                <li className='hover:text-gray-300'>Appointment</li>
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

            <Link className='mr-8 text-2xl text-blue-400' to="/chat">
              <BsMessenger />
            </Link>

            <Link to='/dashboard'>
              {
                currentUser ? (
                  <img src={currentUser?.data?.user?.avatar} className='w-16 h-16 rounded-full' alt='profile'/>
                ) : (
                  <ul className='flex gap-8 item-center text-zinc-200 uppercase text-xl'>
                    <li className='hover:text-gray-700 uppercase'>Sign In</li>
                  </ul>
                )
              }
            </Link>
          </div>
          
          <div>
            {click && menu }
          </div>
          <button className='block sm:hidden translate-x-50' onClick={handleClick}>
            {click ? <FaTimes /> : <CiMenuFries/>}
          </button>
        </div>
    </header> */}
    </div>
  );
}
