/* import MyComponent from "../Pages/Posts/allPosts";
import Posts from "../Pages/Posts/Posts"; */

import { useEffect } from 'react';

import '../assets/css/style.css';
import '../assets/css/animate.css';
import '../assets/css/bootstrap.min.css';
import '../assets/css/animated-text.css';
import '../assets/css/fontawesome.min.css';
// import '../assets/css/style.css.map';
import '../assets/css/odometer.css';


/* JS Part */
import { initializeJQuery } from '../assets/js/animated-text.min';
import '../assets/js/main.js';
import '../assets/js/odometer.js';
import '../assets/js/animated-text.min.js'
// import '../assets/js/light_gallery.min.js'
// import '../assets/js/ripple.min.js'
// import '../assets/js/select2.min.js'

// import '../assets/js/isotope.pkg.min.js'
// import '../assets/js/light_gallery.min.js'


/* import leftImag from '../assets/images/about_left.png';
import author from '../assets/images/avatar_1.jpeg'; */
import aboutThumb from '../assets/images/about_left_2.png'
import dataSrc from '../assets/images/counter_bg.jpeg';
import Icons from '../assets/images/icons/funfact_icon_1.png';
import Icons2 from '../assets/images/icons/funfact_icon_2.png';
import Icon3 from '../assets/images/icons/funfact_icon_3.png';
import Icon4 from '../assets/images/icons/funfact_icon_4.png';

import Icons5 from '../assets/images/icons/envelop_icon.png';

import Icon6 from '../assets/images/avatar_2.png';
import Icon7 from '../assets/images/avatar_3.png';
import Icon8 from '../assets/images/avatar_7.png';
import Icon9 from '../assets/images/avatar_4.png';
import Icon10 from '../assets/images/avatar_5.png';
import Icon11 from '../assets/images/avatar_6.png';
import Icon12 from '../assets/images/avatar_8.png';

import Avatar9 from '../assets/images/avatar_9.png';
import Avatar3 from '../assets/images/avatar_3.png';
import Avatar7 from '../assets/images/avatar_7.png';
import Avatar4 from '../assets/images/avatar_4.png';
import Avatar5 from '../assets/images/avatar_5.png';
import Avatar6 from '../assets/images/avatar_6.png';
import Avatar8 from '../assets/images/avatar_8.png';
import { Link } from 'react-router-dom';
//import Avatar from '../';


export default function CenterSide() {

  useEffect(() => {
    initializeJQuery();
  }, []);


  return (
    
    <div className='' >
    {/*  //<!-- Start Preloader --> */}
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
       
      <section className="cs_hero cs_style_5 position-relative" id="home">
        <div className="cs_hero_top cs_bg_filled cs_primary_bg cs_bg_filed" data-src="assets/images/hero_bg_11.jpeg">
        <div className="container">
          <div className="cs_hero_text text-center">
            <h1 className="cs_hero_title cs_headline clip cs_fs_60 cs_semibold cs_white_color">Take Best Quality <br/> Treatment for
                <span className="cs_words_wrapper ">
                  <b className="is-visible">Crutches.</b>
                  <b>Laboratory.</b>
                  <b>Cardiology.</b>
                  <b>Dentist.</b>
                  <b>Neurology.</b>
                </span>
              </h1>
            <p className="cs_hero_subtitle cs_fs_18 cs_white_color">Lorem ipsum dolor sit amet consectetuer adipiscing Phasellus <br/> hendrerit lorem dolor sit nibh nec urna. In nisi</p>
            <Link to='/appointment'> 
              <button className="cs_btn cs_style_1 cs_fs_18 cs_semibold cs_accent_bg_v1 cs_white_color pointer">Appointment</button>
            </Link>
          </div>
            <div className="cs_hero_bubble1 position-absolute"></div>
            <div className="cs_hero_bubble2 position-absolute"></div>
            <div className="cs_hero_bubble3 position-absolute"></div>
          </div>
        <div className="cs_height_120 cs_height_lg_80"></div>
        </div>
      </section>

      {/* A Hospital Is A Health */}

      <section className="cs_about cs_style_1" id="about">
        <div className="cs_height_120 cs_height_lg_80"></div>
        <div className="container">
          <div className="row cs_gap_y_40 align-items-center">
            <div className="col-lg-6">
              <div className="cs_about_thumb wow fadeInLeft">
                <img src={aboutThumb} alt="About Thumb"/>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="cs_pl_30">
                <div className="cs_section_heading cs_style_1">
                  <h3 className="cs_section_title_up cs_accent_color_v2 cs_medium cs_fs_20">Welcome to Evencare</h3>
                  <h2 className="cs_section_title cs_semibold cs_fs_40 mb-0">Evencare is a Modern Hospital Clinic that Meets Your Highest</h2>
                </div>
                <div className="cs_height_17 cs_height_lg_10"></div>
                <p className="cs_about_text cs_type_2">Quisque dignissim enim diam, eget pulvinar ex viverra id. Nulla a lobortis lectus, id volutpat magna. Morbi consequat porttitor fermentum. Nulla vestibulum tincidunt viverra. Vestibulum accumsan molestie lorem, non laoreet massa.</p>
                <p className="cs_about_text cs_type_2">Quisque dignissim enim diam, eget pulvinar ex viverra id. Nulla a lobortis lectus, id volutpat magna. Morbi consequat porttitor fermentum. Nulla vestibulum tincidunt viverra. Vestibulum accumsan molestie lorem, non laoreet massa.</p>
                
              </div>
            </div>
          </div>
        </div>
        <div className="cs_height_120 cs_height_lg_80"></div>
      </section>

      {/* Qalifier success rate + Count down section should be added. */}

      <section className="cs_counting cs_bg_filed cs_primary_bg" data-src={dataSrc}>
        <div className="cs_height_133 cs_height_lg_80"></div>
        <div className="container-fluid">
          <div className="row cs_gap_y_40 align-items-center justify-content-between">
            <div className="col-xl-3 col-md-6">
              <div className="cs_funfact cs_style_1">
                <div className="cs_funfact_icon cs_center">
                  <img src={Icons} alt="Icon"/>
                </div>
                <div className="cs_funfact_text">
                  <h2 className="cs_counter_number cs_fs_65 cs_white_color d-flex align-items-center cs_semibold"><span
                      data-count-to="230" className="odometer"></span>+</h2>
                  <p className="cs_counter_title cs_fs_24 cs_semibold cs_white_color mb-0">Specialised Support</p>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-6">
              <div className="cs_funfact cs_style_1">
                <div className="cs_funfact_icon cs_center">
                  <img src={Icons2} alt="Icon2"/>
                </div>
                <div className="cs_funfact_text">
                  <h2 className="cs_counter_number cs_fs_65 cs_white_color d-flex align-items-center cs_semibold"><span data-count-to="2" className="odometer"></span>K+</h2>
                  <p className="cs_counter_title cs_fs_24 cs_semibold cs_white_color mb-0">Happy Patients</p>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-6">
              <div className="cs_funfact cs_style_1">
                <div className="cs_funfact_icon cs_center">
                  <img src={Icon3} alt="Icon3"/>
                </div>
                <div className="cs_funfact_text">
                  <h2 className="cs_counter_number cs_fs_65 cs_white_color d-flex align-items-center cs_semibold"><span
                      data-count-to="99" className="odometer"></span>+</h2>
                  <p className="cs_counter_title cs_fs_24 cs_semibold cs_white_color mb-0">Qualified Doctors</p>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-6">
              <div className="cs_funfact cs_style_1">
                <div className="cs_funfact_icon cs_center">
                  <img src={Icon4} alt="Icon4"/>
                </div>
                <div className="cs_funfact_text">
                  <h2 className="cs_counter_number cs_fs_65 cs_white_color d-flex align-items-center cs_semibold"><span
                      data-count-to="125" className="odometer"></span>+</h2>
                  <p className="cs_counter_title cs_fs_24 cs_semibold cs_white_color mb-0">Hospital Rooms</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="cs_height_133 cs_height_lg_80"></div>
      </section>


      
    {/* <!-- Start Testimonial Section --> */}
    <section>
      <div className="cs_height_120 cs_height_lg_80"></div>
        <div className="container">
            <div className="cs_section_heading cs_style_1 text-center">
              <h3 className="cs_section_title_up cs_accent_color_v1 cs_semibold cs_fs_24">What Client is Say</h3>
              <h2 className="cs_section_title cs_semibold cs_fs_45 wow fadeInUp mb-0">Valueable Words From Customers</h2>
            </div>
            <div className="cs_tabs position-relative">
              <ul className="cs_tab_links cs_style_2 cs_mp0">
                <li className="active"><a href="#tab_1"><img src={Icon6} alt="Icon6"/></a></li>
                <li><a href="#tab_2"> <img src={Icon7} alt="Icon7"/></a></li>
                <li><a href="#tab_3"><img src={Icon8} alt="Icon8"/></a></li>
                <li><a href="#tab_4"><img src={Icon9} alt="Icon9"/></a></li>
                <li><a href="#tab_5"><img src={Icon10} alt="Icon10"/></a></li>
                <li><a href="#tab_6"><img src={Icon11} alt="Icon11"/></a></li>
                <li><a href="#tab_7"><img src={Icon12} alt="Icon12"/></a></li>
              </ul>
              <div className="cs_height_50 cs_height_lg_30"></div>
              <div className="tab-content">
                <div id="tab_1" className="cs_tab active">
                <div className="cs_testimonial cs_style_1">
                  <div className="cs_testimonial_thumb cs_center">
                    <img src={Avatar9} alt="Avatar"/>
                  </div>
                  <div className="cs_testimonial_info cs_accent_bg_v1 cs_white_color cs_radius_5 text-center">
                    <blockquote>We are very pleased with the way Besnik handled our purchase of a lake home. He was prompt, friendly, and very knowledgeable. He followed up on any and all concerns.</blockquote>
                    <h3 className="cs_testimonial_title cs_fs_24 cs_medium cs_white_color">Becky Nelson</h3>
                    <div className="cs_rating_container">
                      <div className="cs_rating" data-rating="5">
                        <div className="cs_rating_percentage"></div>
                      </div>
                    </div>
                  </div>
                </div>
                </div>
                <div id="tab_2" className="cs_tab">
                <div className="cs_testimonial cs_style_1">
                  <div className="cs_testimonial_thumb cs_center">
                    <img src={Avatar3} alt="Avatar"/>
                  </div>
                  <div className="cs_testimonial_info cs_accent_bg_v1 cs_white_color cs_radius_5 text-center">
                    <blockquote>"We are very pleased with the way Besnik handled our purchase of a lake home. He was prompt, friendly, and very knowledgeable. He followed up on any and all concerns.</blockquote>
                    <h3 className="cs_testimonial_title cs_fs_24 cs_medium cs_white_color">Becky Nelson</h3>
                    <div className="cs_rating_container">
                      <div className="cs_rating" data-rating="4">
                        <div className="cs_rating_percentage"></div>
                      </div>
                    </div>
                  </div>
                </div>
                </div>
                <div id="tab_3" className="cs_tab">
                <div className="cs_testimonial cs_style_1">
                  <div className="cs_testimonial_thumb cs_center">
                    <img src={Avatar7} alt="Avatar"/>
                  </div>
                  <div className="cs_testimonial_info cs_accent_bg_v1 cs_white_color cs_radius_5 text-center">
                    <blockquote>We are very pleased with the way Besnik handled our purchase of a lake home. He was prompt, friendly, and very knowledgeable. He followed up on any and all concerns.</blockquote>
                    <h3 className="cs_testimonial_title cs_fs_24 cs_medium cs_white_color">Becky Nelson</h3>
                    <div className="cs_rating_container">
                      <div className="cs_rating" data-rating="5">
                        <div className="cs_rating_percentage"></div>
                      </div>
                    </div>
                  </div>
                </div>
                </div>
                <div id="tab_4" className="cs_tab">
                <div className="cs_testimonial cs_style_1">
                  <div className="cs_testimonial_thumb cs_center">
                    <img src={Avatar4} alt="Avatar"/>
                  </div>
                  <div className="cs_testimonial_info cs_accent_bg_v1 cs_white_color cs_radius_5 text-center">
                    <blockquote>We are very pleased with the way Besnik handled our purchase of a lake home. He was prompt, friendly, and very knowledgeable. He followed up on any and all concerns.</blockquote>
                    <h3 className="cs_testimonial_title cs_fs_24 cs_medium cs_white_color">Becky Nelson</h3>
                    <div className="cs_rating_container">
                      <div className="cs_rating" data-rating="5">
                        <div className="cs_rating_percentage"></div>
                      </div>
                    </div>
                  </div>
                </div>
                </div>
                <div id="tab_5" className="cs_tab">
                <div className="cs_testimonial cs_style_1">
                  <div className="cs_testimonial_thumb cs_center">
                    <img src={Avatar5} alt="Avatar"/>
                  </div>
                  <div className="cs_testimonial_info cs_accent_bg_v1 cs_white_color cs_radius_5 text-center">
                    <blockquote>We are very pleased with the way Besnik handled our purchase of a lake home. He was prompt, friendly, and very knowledgeable. He followed up on any and all concerns.</blockquote>
                    <h3 className="cs_testimonial_title cs_fs_24 cs_medium cs_white_color">Becky Nelson</h3>
                    <div className="cs_rating_container">
                      <div className="cs_rating" data-rating="5">
                        <div className="cs_rating_percentage"></div>
                      </div>
                    </div>
                  </div>
                </div>
                </div>
                <div id="tab_6" className="cs_tab">
                <div className="cs_testimonial cs_style_1">
                  <div className="cs_testimonial_thumb cs_center">
                    <img src={Avatar6} alt="Avatar"/>
                  </div>
                  <div className="cs_testimonial_info cs_accent_bg_v1 cs_white_color cs_radius_5 text-center">
                    <blockquote>We are very pleased with the way Besnik handled our purchase of a lake home. He was prompt, friendly, and very knowledgeable. He followed up on any and all concerns.</blockquote>
                    <h3 className="cs_testimonial_title cs_fs_24 cs_medium cs_white_color">Becky Nelson</h3>
                    <div className="cs_rating_container">
                      <div className="cs_rating" data-rating="5">
                        <div className="cs_rating_percentage"></div>
                      </div>
                    </div>
                  </div>
                </div>
                </div>
                <div id="tab_7" className="cs_tab">
                <div className="cs_testimonial cs_style_1">
                  <div className="cs_testimonial_thumb cs_center">
                    <img src={Avatar8} alt="Avatar"/>
                  </div>
                  <div className="cs_testimonial_info cs_accent_bg_v1 cs_white_color cs_radius_5 text-center">
                    <blockquote>We are very pleased with the way Besnik handled our purchase of a lake home. He was prompt, friendly, and very knowledgeable. He followed up on any and all concerns.</blockquote>
                    <h3 className="cs_testimonial_title cs_fs_24 cs_medium cs_white_color">Becky Nelson</h3>
                    <div className="cs_rating_container">
                      <div className="cs_rating" data-rating="5">
                        <div className="cs_rating_percentage"></div>
                      </div>
                    </div>
                  </div>
                </div>
                </div>
              </div>
            </div>
        </div>
      <div className="cs_height_120 cs_height_lg_80"></div>
    </section>
  {/* <!-- End Testimonial Section --> */}


      {/* Get In Touch */}

      <section id="contact">
        <div className="cs_height_120 cs_height_lg_80"></div>
        <div className="container">
          <div className="cs_section_heading cs_style_1 text-center">
            <h3 className="cs_section_title_up cs_accent_color_v1 cs_semibold cs_fs_24 wow fadeInDown">Need Any Help?</h3>
            <h2 className="cs_section_title cs_semibold cs_fs_45 mb-0">Get in Touch With Us</h2>
          </div>
          <div className="cs_height_45 cs_height_lg_30"></div>
          <form className="cs_contact_form row cs_gap_y_24" id="cs_form">
            <div className="col-md-6 position-relative">
              <input type="text" name="fname"  className="cs_form_field cs_radius_5" required/>
              <label>First Name</label>
            </div>
            <div className="col-md-6 position-relative">
              <input type="text" name="lname" className="cs_form_field cs_radius_5" required/>
              <label>Last Name</label>
            </div>
            <div className="col-md-6 position-relative">
              <input type="text" name="phone" className="cs_form_field cs_radius_5" required/>
              <label>Phone</label>
            </div>
            <div className="col-md-6 position-relative">
              <input type="text" name="email" className="cs_form_field cs_radius_5" required/>
              <label>Email Address</label>
            </div>
            <div className="col-md-6 position-relative">
              <input type="text" name="website" className="cs_form_field cs_radius_5" required/>
              <label>Website</label>
            </div>
            <div className="col-md-6 position-relative">
              <input type="text" name="subject" className="cs_form_field cs_radius_5" required />
              <label>Subject</label>
            </div>
            <div className="col-md-12 position-relative">
              <textarea name="message" rows="6" className="cs_form_field cs_radius_5" required></textarea>
              <label>Message</label>
            </div>
            <div className="col-md-12 text-md-center">
              <button type="submit" className="w-full btn bg-sky-500 text-white cs_fs_24 cs_semibold">Send Message</button>
            </div>
          </form>
        </div>
        <div className="cs_height_120 cs_height_lg_80"></div>
      </section>

      <section className="cs_newsletter_1_wrap mb-24">
        <div className="container">
          <div className="cs_newsletter cs_style_1 cs_accent_bg_v1 wow fadeIn">
            <div className="cs_newsletter_left d-flex gap-4">
              <div className="cs_newsletter_icon">
                <img src={Icons5} alt="Icon5"/>
              </div>
              <h2 className="cs_newsletter_title cs_fs_24 cs_semibold mb-0 cs_white_color">Latest Updates Subscribe To <br/> Our Newsletter</h2>
            </div>
            <form action="#" className="cs_newsletter_form">
              <input type="text" name="email" className="cs_newsletter_form_field cs_radius_2" placeholder="Enter your Email" />
              <button type="submit" className="cs_btn cs_style_1 cs_fs_18 cs_medium cs_white_bg cs_accent_color_v1 bg-sky-900">Submit</button>
            </form>
          </div>
        </div>
      </section>


    </div>  
  )
}
