import logo from '../assets/images/footer_logo.png';
import {Link} from 'react-router-dom';
import { useEffect } from 'react';

import '../assets/css/style.css';
import '../assets/css/animate.css';
import '../assets/css/bootstrap.min.css';
import '../assets/css/animated-text.css';
import '../assets/css/fontawesome.min.css';
// import '../assets/css/style.css.map';
import '../assets/css/odometer.css';

import logo2 from '../assets/images/footer_bg.jpeg'

import { initializeJQuery } from '../assets/js/animated-text.min';
import '../assets/js/main';


export default function Footer() {

    useEffect(() => {
        initializeJQuery();
      }, []);

  return (
    <div className='mt-16'>
        <footer className="cs_footer cs_style_1 cs_bg_filed cs_primary_bg" data-src='../assets/images/footer_bg.jpeg'>
            <div className="container">
            <div className="cs_height_95 cs_height_lg_65"></div>
            <div className="cs_footer_main">
                <div className="row cs_gap_y_30  items-center">
                <div className="col-lg-4">
                    <div className="cs_footer_widget cs_text_widget">
                    <Link to='/'>
                        <img src={logo} alt="Logo"/>
                    </Link>
                    <p className="cs_fs_18 cs_white_color">Get a full control of your health in the digital world with simple knock at our door. Our service at your door to serve you.</p>
                    <h3 className="cs_fs_24 cs_white_color cs_semibold">Follow us on</h3>
                    <div className="cs_social_btns cs_style_1 cs_white_color">
                        <a href="https://www.facebook.com/" target="_blank"><i className="fa-brands fa-facebook-f"></i></a>
                        <a href="linkedin.com" target="_blank"><i className="fa-brands fa-linkedin-in"></i></a>
                        <a href="https://twitter.com/" target="_blank"><i className="fa-brands fa-twitter"></i></a>
                        <a href="https://www.instagram.com/" target="_blank"><i className="fa-brands fa-instagram"></i></a>
                    </div>
                    </div>
                </div>
                    <div className="col-lg-4">
                    <div className="cs_footer_widget cs_menu_widget">
                        <h3 className="cs_footer_widget_title cs_fs_24 cs_semibold cs_white_color">Our Services</h3>
                        <ul className="cs_fs_18 cs_white_color cs_fs_18 cs_medium cs_mp0">
                            <li><a href="#about">About Us</a></li>
                            <li><a href="#contact">Contact Us</a></li>
                            <li><a href="#doctors">Our Team</a></li>
                            <li><a href="#services">Our Services</a></li>
                            <li><a href="#gallery">Our Projects</a></li>
                        </ul>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="cs_footer_widget cs_menu_widget">
                        <h3 className="cs_footer_widget_title cs_fs_24 cs_semibold cs_white_color">Working Hours</h3>
                        <ul className="cs_contact_info cs_fs_18 cs_white_color cs_medium cs_mp0">
                            <li>Monday: 10.00AM - 4.00PM </li>
                            <li>Tuesday: 10.00AM - 4.00PM </li>
                            <li>Wednesday: 10.00AM - 4.00PM</li>
                            <li>Thursday: 10.00AM - 4.00PM </li>
                            <li>Friday: Close</li>
                        </ul>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            <div className="cs_footer_bottom">
            <div className="container">
                <div className="cs_footer_bottom_text">
                <div className="cs-copyright cs_fs_18 cs_white_color text-center">All Right Reserved Copyright &copy; 2024 
                    <a href="https://github.com/raju-120/Health_Care" target="_blank" className="cs_profile_link cs_accent_color_v1">Raju</a>
                </div>
                
                </div>
            </div>
            </div>
        </footer>
    {/* <div className="bg-stone-500 rounded-sm mt-5">
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
    </div> */}
    </div>
    
  )
}
