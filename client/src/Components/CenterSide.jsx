/* import MyComponent from "../Pages/Posts/allPosts";
import Posts from "../Pages/Posts/Posts"; */

import React, { useEffect } from 'react';

import '../assets/css/style.css';
import '../assets/css/animate.css';
import '../assets/css/bootstrap.min.css';
import '../assets/css/animated-text.css';
import '../assets/css/fontawesome.min.css';
// import '../assets/css/style.css.map';
import '../assets/css/odometer.css';

import { initializeJQuery } from '../assets/js/animated-text.min';
import '../assets/js/main';


export default function CenterSide() {

  useEffect(() => {
    initializeJQuery();
  }, []);


  return (
    <div >
      {/*  <Posts />
       <MyComponent /> */}
        <div className="cs_preloader cs_accent_color_v1">
          <div className="cs_preloader_in">
            <div className="cs_wave_first">
              <svg enableBackground="new 0 0 300.08 300.08" viewBox="0 0 300.08 300.08" xmlns="http://www.w3.org/2000/svg"><g><path d="m293.26 184.14h-82.877l-12.692-76.138c-.546-3.287-3.396-5.701-6.718-5.701-.034 0-.061 0-.089 0-3.369.027-6.199 2.523-6.677 5.845l-12.507 87.602-14.874-148.69c-.355-3.43-3.205-6.056-6.643-6.138-.048 0-.096 0-.143 0-3.39 0-6.274 2.489-6.752 5.852l-19.621 137.368h-9.405l-12.221-42.782c-.866-3.028-3.812-5.149-6.8-4.944-3.13.109-5.777 2.332-6.431 5.395l-8.941 42.332h-73.049c-3.771 0-6.82 3.049-6.82 6.82 0 3.778 3.049 6.82 6.82 6.82h78.566c3.219 0 6.002-2.251 6.67-5.408l4.406-20.856 6.09 21.313c.839 2.939 3.526 4.951 6.568 4.951h20.46c3.396 0 6.274-2.489 6.752-5.845l12.508-87.596 14.874 148.683c.355 3.437 3.205 6.056 6.643 6.138h.143c3.39 0 6.274-2.489 6.752-5.845l14.227-99.599 6.397 38.362c.546 3.287 3.396 5.702 6.725 5.702h88.66c3.771 0 6.82-3.049 6.82-6.82-.001-3.772-3.05-6.821-6.821-6.821z"></path></g>
              </svg>
            </div>
            <div className="cs_wave_second">
              <svg enableBackground="new 0 0 300.08 300.08" viewBox="0 0 300.08 300.08" xmlns="http://www.w3.org/2000/svg"><g><path d="m293.26 184.14h-82.877l-12.692-76.138c-.546-3.287-3.396-5.701-6.718-5.701-.034 0-.061 0-.089 0-3.369.027-6.199 2.523-6.677 5.845l-12.507 87.602-14.874-148.69c-.355-3.43-3.205-6.056-6.643-6.138-.048 0-.096 0-.143 0-3.39 0-6.274 2.489-6.752 5.852l-19.621 137.368h-9.405l-12.221-42.782c-.866-3.028-3.812-5.149-6.8-4.944-3.13.109-5.777 2.332-6.431 5.395l-8.941 42.332h-73.049c-3.771 0-6.82 3.049-6.82 6.82 0 3.778 3.049 6.82 6.82 6.82h78.566c3.219 0 6.002-2.251 6.67-5.408l4.406-20.856 6.09 21.313c.839 2.939 3.526 4.951 6.568 4.951h20.46c3.396 0 6.274-2.489 6.752-5.845l12.508-87.596 14.874 148.683c.355 3.437 3.205 6.056 6.643 6.138h.143c3.39 0 6.274-2.489 6.752-5.845l14.227-99.599 6.397 38.362c.546 3.287 3.396 5.702 6.725 5.702h88.66c3.771 0 6.82-3.049 6.82-6.82-.001-3.772-3.05-6.821-6.821-6.821z"></path></g>
              </svg>
            </div>
          </div>
        </div>
        <header className="cs_site_header cs_style_1 cs_sticky_header">
         <div className="cs_top_header cs_accent_bg_v1">
      <div className="container">
        <div className="cs_top_header_in">
          <div className="cs_top_header_left">
           <div className="cs_top_nav cs_fs_16 cs_white_color">
              <i className="fa-solid fa-location-dot"></i>5010 Avenue of the Moon New York, NY 10018 US.
            </div>
          </div>
          <div className="cs_top_header_right">
           <ul className="cs_top_nav  cs_mp0">
              <li><a href="#">Live Chat </a></li>
              <li><a href="#">Support</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
            <div className="cs_social_btns cs_style_1">
              <a href="https://www.facebook.com/" target="_blank"> <i className="fa-brands fa-facebook-f"></i></a>
              <a href="https://dribbble.com/" target="_blank"> <i className="fa-brands fa-dribbble"></i></a>
              <a href="https://twitter.com/" target="_blank"><i className="fa-brands fa-twitter"></i></a>
              <a href="https://www.instagram.com/" target="_blank"><i className="fa-brands fa-instagram"></i></a>
            </div>
          </div>
        </div>
      </div>
    </div> 
    <div className="cs_main_header">
      <div className="container">
        <div className="cs_main_header_in">
          <div className="cs_main_header_left">
            <a className="cs_site_branding" href="index.html">
              <img src="assets/images/logo.png" alt="Logo"/>
            </a>
            <div className="cs_nav cs_primary_font">
              <ul className="cs_nav_list cs_fs_18">
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#doctors">Doctors</a></li>
                <li><a href="#gallery">Gallery</a></li>
                <li><a href="#pricing">Pricing</a></li>
                <li className="menu_item_has_children"><a href="#blog">Blog</a>
                  <ul>
                    <li><a href="blog-right-sidebar.html">Blog Right Sidebar</a></li>
                    <li><a href="blog-left-sidebar.html">Blog Left Sidebar</a></li>
                    <li><a href="blog-list.html">Blog List</a></li>
                    <li><a href="blog-grid.html">Blog Grid</a></li>
                    <li><a href="blog-details-right-sidebar.html">Blog Details Right Sidebar</a></li>
                    <li><a href="blog-details-left-sidebar.html">Blog Details Left Sidebar</a></li>
                    <li><a href="blog-details-no-sidebar.html">Blog Details No Sidebar</a></li>
                  </ul>
                </li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="cs_main_header_right cs_accent_color_v1">
            <div className="cs_header_contact">
              <div className="cs_header_contact_icon text-accent">
               <img src="assets/images/icons/phone_icon_3.svg" alt="" />
              </div>
              <div className="cs_header_contact_right">
                <h3 className="cs_fs_14 cs_normal cs_accent_color_v1 mb-0">Need help?</h3>
                <h3 className="cs_fs_14 cs_normal cs_accent_color_v1 mb-0">(+800) 1234 5678 90</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
    </div>
  )
}
