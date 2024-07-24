/* import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import serviceLogo from '../assets/services.jpg';
 */

import { useEffect } from 'react';

import '../assets/css/style.css';
import '../assets/css/animate.css';
import '../assets/css/bootstrap.min.css';
import '../assets/css/animated-text.css';
import '../assets/css/fontawesome.min.css';
// import '../assets/css/style.css.map';
import '../assets/css/odometer.css';

import { initializeJQuery } from '../assets/js/animated-text.min';
import '../assets/js/main';
import '../assets/js/odometer'

import Icon1 from '../assets/images/icons/crutches.svg';
import Icon2 from '../assets/images/icons/xray.svg';
import Icon3 from '../assets/images/icons/pulmonary.svg';
import Icon4 from '../assets/images/icons/cardiology.svg';
import Icon5 from '../assets/images/icons/dental.svg';
import Icon6 from '../assets/images/icons/neurology.svg';
import Icon7 from '../assets/images/icons/checked_icon.svg';
import Icon8 from '../assets/images/icons/checked_icon.svg';
import Icon9 from '../assets/images/icons/checked_icon.svg';
import Icon10 from '../assets/images/icons/checked_icon.svg';
import Icon11 from '../assets/images/icons/checked_icon.svg';
import Icon12 from '../assets/images/icons/checked_icon.svg';
import Icon13 from '../assets/images/icons/checked_icon.svg';
import Icon14 from '../assets/images/icons/checked_icon.svg';
import Icon15 from '../assets/images/icons/checked_icon.svg';
import Icon16 from '../assets/images/icons/checked_icon.svg';
import Icon17 from '../assets/images/icons/checked_icon.svg';
import Icon18 from '../assets/images/icons/checked_icon.svg';
import Icon19 from '../assets/images/icons/checked_icon.svg';
import Icon20 from '../assets/images/icons/checked_icon.svg';
import Icon21 from '../assets/images/icons/checked_icon.svg';
import Icon22 from '../assets/images/icons/checked_icon.svg';
import Icon23 from '../assets/images/icons/checked_icon.svg';
import Icon24 from '../assets/images/icons/checked_icon.svg';
import Icon25 from '../assets/images/icons/checked_icon.svg';
import Icon26 from '../assets/images/icons/checked_icon.svg';
import Icon27 from '../assets/images/icons/checked_icon.svg';
import Icon28 from '../assets/images/icons/checked_icon.svg';
import Icon29 from '../assets/images/icons/checked_icon.svg';
import Icon30 from '../assets/images/icons/checked_icon.svg';
import Icon31 from '../assets/images/icons/checked_icon.svg';
import Icon32 from '../assets/images/icons/checked_icon.svg';
import Icon33 from '../assets/images/icons/checked_icon.svg';
import Icon34 from '../assets/images/icons/checked_icon.svg';
import Icon35 from '../assets/images/icons/checked_icon.svg';
import Icon36 from '../assets/images/icons/checked_icon.svg';
import Icon37 from '../assets/images/icons/checked_icon.svg';
import Icon38 from '../assets/images/icons/checked_icon.svg';
import Icon39 from '../assets/images/icons/checked_icon.svg';
import Icon40 from '../assets/images/icons/checked_icon.svg';
import Icon41 from '../assets/images/icons/checked_icon.svg';
import Icon42 from '../assets/images/icons/checked_icon.svg';


import deptImg from '../assets/images/department_img_1.jpeg';
import deptImg2 from '../assets/images/department_img_2.jpeg';
import deptImg3 from '../assets/images/department_img_3.jpeg';
import deptImg4 from '../assets/images/department_img_4.jpeg';
import deptImg5 from '../assets/images/department_img_5.jpeg';
import deptImg6 from '../assets/images/department_img_6.jpeg';


export default function Services() {

  useEffect(() => {
    initializeJQuery();
  }, []);

  /* const [services, setServices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      const result = await fetch('/api/posts/services', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await result.json();
      console.log(data.data);
      setServices(data.data);
    };
    fetchServices();
  }, []);

  const handleClick = (e, _id) => {
    e.preventDefault();
    console.log('_id:', _id)
    navigate(`/service/${_id}`);
  }; */

  return (
    <div className='Items-center text-center m-24'>
      <section id="services">
        <div className="cs_height_120 cs_height_lg_80"></div>
          <div className="container">
            <div className="cs_section_heading cs_style_1 text-center">
              <h3 className="cs_section_title_up cs_accent_color_v1 cs_semibold cs_fs_24">What we provide our services</h3>
              <h2 className="cs_section_title cs_semibold cs_fs_45 wow fadeInUp mb-0">We are Providing Best Services <br/> To Our Customers</h2>
            </div>
            <div className="cs_height_63 cs_height_lg_40"></div>
          </div>
        <div className="container">
          <div className="cs_tabs">
            <ul className="cs_tab_links cs_style_1 cs_mp0">
              <li className="active">
                <a href="#crutches">
                  <img src={Icon1} alt="Icon1"/>
                  <span>Crutches</span>
                </a>
              </li>
              <li>
                <a href="#x_ray">
                  <img src={Icon2} alt="Icon2"/>
                  <span>X-ray</span>
                </a>
              </li>
              <li>
                <a href="#pulmonary">
                  <img src={Icon3} alt="Icon3"/>
                  <span>Pulmonary</span>
                </a>
              </li>
              <li>
                <a href="#cardiology">
                  <img src={Icon4} alt="Icon4"/>
                  <span>Cardiology</span>
                </a>
              </li>
              <li>
                <a href="#dental">
                  <img src={Icon5} alt="Icon5"/>
                  <span>Dental Care</span>
                </a>
              </li>
              <li>
                <a href="#neurology">
                  <img src={Icon6} alt="Icon6"/>
                  <span>Neurology</span>
                </a>
              </li>
            </ul>
            <div className="cs_height_50 cs_height_lg_40"></div>
            <div className="tab-content">
              <div id="crutches" className="cs_tab active">
                <div className="cs_card cs_style_1 cs_white_bg cs_radius_5">
                  <div className="row cs_gap_y_20">
                    <div className="col-lg-7">
                      <div className="cs_card_text">
                        <h2 className="cs_card_title cs_fs_35 cs_semibold">Welcome to our Crutches</h2>
                        <p className="cs_card_subtitle">Oillum abrem deleniti adipisci suscipit dignissimos. remaining essentially unchanged. It was popularised in the with the . Lorem Ipsum is simply dummy text of the printing and typesetting industry lorem ipsum is simple dummy text of the printing.</p>
                        <h3 className="cs_list_title cs_fs_20 cs_bold cs_accent_color_v1">Quick Amenities in</h3>
                        <ul className="cs_list cs_style_2 cs_mp0 cs_fs_18 cs_primary_color cs_semibold">
                          <li>
                            <i><img src={Icon7} alt="Icon7"/></i>
                            Qualified Doctors
                          </li>
                          <li>
                            <i><img src={Icon8} alt="Icon8"/></i>
                            24 Hours Service
                          </li>
                          <li>
                            <i><img src={Icon9} alt="Icon9"/></i>
                            Need Emergency
                          </li>
                          <li>
                            <i><img src={Icon10} alt="Icon10"/></i>
                            Nose and Sinus
                          </li>
                          <li>
                            <i><img src={Icon11} alt="Icon11"/></i>
                            Throat / Larynx Surgery
                          </li>
                          <li>
                            <i><img src={Icon12} alt="Icon12"/></i>
                            Mission statement
                          </li>
                        </ul>
                        <a href="#" className="cs_btn cs_style_1 cs_size_md cs_fs_18 cs_semibold cs_accent_bg_v1 cs_white_color">Read More</a>
                      </div>
                    </div>
                    <div className="col-lg-5 text-end">
                      <div className="cs_card_thumb cs_radius_5">
                        <img src={deptImg} alt="Department Image"/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div id="x_ray" className="cs_tab">
                <div className="cs_card cs_style_1 cs_white_bg cs_radius_5">
                  <div className="row cs_gap_y_20">
                    <div className="col-lg-7">
                      <div className="cs_card_text">
                        <h2 className="cs_card_title cs_fs_35 cs_semibold">Welcome to our X-Ray</h2>
                        <p className="cs_card_subtitle">Oillum abrem deleniti adipisci suscipit dignissimos. remaining essentially unchanged. It was popularised in the with the . Lorem Ipsum is simply dummy text of the printing and typesetting industry lorem ipsum is simple dummy text of the printing.</p>
                        <h3 className="cs_list_title cs_fs_20 cs_bold cs_accent_color_v1">Quick Amenities in</h3>
                        <ul className="cs_list cs_style_2 cs_mp0 cs_fs_18 cs_primary_color cs_semibold">
                          <li>
                            <i><img src={Icon13} alt="Icon13"/></i>
                            Qualified Doctors
                          </li>
                          <li>
                            <i><img src={Icon14} alt="Icon14"/></i>
                            24 Hours Service
                          </li>
                          <li>
                            <i><img src={Icon15} alt="Icon15"/></i>
                            Need Emergency
                          </li>
                          <li>
                            <i><img src={Icon16} alt="Icon16"/></i>
                            Nose and Sinus
                          </li>
                          <li>
                            <i><img src={Icon17} alt="Icon17"/></i>
                            Throat / Larynx Surgery
                          </li>
                          <li>
                            <i><img src={Icon18} alt="Icon18"/></i>
                            Mission statement
                          </li>
                        </ul>
                        <a href="#" className="cs_btn cs_style_1 cs_size_md cs_fs_18 cs_semibold cs_accent_bg_v1 cs_white_color">Read More</a>
                      </div>
                    </div>
                    <div className="col-lg-5 text-end">
                      <div className="cs_card_thumb cs_radius_5">
                        <img src={deptImg2} alt="Department Image"/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div id="pulmonary" className="cs_tab">
                <div className="cs_card cs_style_1 cs_white_bg cs_radius_5">
                  <div className="row cs_gap_y_20">
                    <div className="col-lg-7">
                      <div className="cs_card_text">
                        <h2 className="cs_card_title cs_fs_35 cs_semibold">Welcome to our Pulmonary</h2>
                        <p className="cs_card_subtitle">Oillum abrem deleniti adipisci suscipit dignissimos. remaining essentially unchanged. It was popularised in the with the . Lorem Ipsum is simply dummy text of the printing and typesetting industry lorem ipsum is simple dummy text of the printing.</p>
                        <h3 className="cs_list_title cs_fs_20 cs_bold cs_accent_color_v1">Quick Amenities in</h3>
                        <ul className="cs_list cs_style_2 cs_mp0 cs_fs_18 cs_primary_color cs_semibold">
                          <li>
                            <i><img src={Icon19} alt="Icon19"/></i>
                            Qualified Doctors
                          </li>
                          <li>
                            <i><img src={Icon20} alt="Icon20"/></i>
                            24 Hours Service
                          </li>
                          <li>
                            <i><img src={Icon21} alt="Icon21"/></i>
                            Need Emergency
                          </li>
                          <li>
                            <i><img src={Icon22} alt="Icon22"/></i>
                            Nose and Sinus
                          </li>
                          <li>
                            <i><img src={Icon23} alt="Icon23"/></i>
                            Throat / Larynx Surgery
                          </li>
                          <li>
                            <i><img src={Icon24} alt="Icon24"/></i>
                            Mission statement
                          </li>
                        </ul>
                        <a href="#" className="cs_btn cs_style_1 cs_size_md cs_fs_18 cs_semibold cs_accent_bg_v1 cs_white_color">Read More</a>
                      </div>
                    </div>
                    <div className="col-lg-5 text-end">
                      <div className="cs_card_thumb cs_radius_5">
                        <img src={deptImg3} alt="Department Image"/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div id="cardiology" className="cs_tab">
                <div className="cs_card cs_style_1 cs_white_bg cs_radius_5">
                  <div className="row cs_gap_y_20">
                    <div className="col-lg-7">
                      <div className="cs_card_text">
                        <h2 className="cs_card_title cs_fs_35 cs_semibold">Welcome to our Cardiology</h2>
                        <p className="cs_card_subtitle">Oillum abrem deleniti adipisci suscipit dignissimos. remaining essentially unchanged. It was popularised in the with the . Lorem Ipsum is simply dummy text of the printing and typesetting industry lorem ipsum is simple dummy text of the printing.</p>
                        <h3 className="cs_list_title cs_fs_20 cs_bold cs_accent_color_v1">Quick Amenities in</h3>
                        <ul className="cs_list cs_style_2 cs_mp0 cs_fs_18 cs_primary_color cs_semibold">
                          <li>
                            <i><img src={Icon25} alt="Icon25"/></i>
                            Qualified Doctors
                          </li>
                          <li>
                            <i><img src={Icon26} alt="Icon26"/></i>
                            24 Hours Service
                          </li>
                          <li>
                            <i><img src={Icon27} alt="Icon27"/></i>
                            Need Emergency
                          </li>
                          <li>
                            <i><img src={Icon28} alt="Icon28"/></i>
                            Nose and Sinus
                          </li>
                          <li>
                            <i><img src={Icon29} alt="Icon29"/></i>
                            Throat / Larynx Surgery
                          </li>
                          <li>
                            <i><img src={Icon30} alt="Icon30"/></i>
                            Mission statement
                          </li>
                        </ul>
                        <a href="#" className="cs_btn cs_style_1 cs_size_md cs_fs_18 cs_semibold cs_accent_bg_v1 cs_white_color">Read More</a>
                      </div>
                    </div>
                    <div className="col-lg-5 text-end">
                      <div className="cs_card_thumb cs_radius_5">
                        <img src={deptImg4} alt="Department Image"/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div id="dental" className="cs_tab">
                <div className="cs_card cs_style_1 cs_white_bg cs_radius_5">
                  <div className="row cs_gap_y_20">
                    <div className="col-lg-7">
                      <div className="cs_card_text">
                        <h2 className="cs_card_title cs_fs_35 cs_semibold">Welcome to our Dental</h2>
                        <p className="cs_card_subtitle">Oillum abrem deleniti adipisci suscipit dignissimos. remaining essentially unchanged. It was popularised in the with the . Lorem Ipsum is simply dummy text of the printing and typesetting industry lorem ipsum is simple dummy text of the printing.</p>
                        <h3 className="cs_list_title cs_fs_20 cs_bold cs_accent_color_v1">Quick Amenities in</h3>
                        <ul className="cs_list cs_style_2 cs_mp0 cs_fs_18 cs_primary_color cs_semibold">
                          <li>
                            <i><img src={Icon31} alt="Icon31"/></i>
                            Qualified Doctors
                          </li>
                          <li>
                            <i><img src={Icon32} alt="Icon32"/></i>
                            24 Hours Service
                          </li>
                          <li>
                            <i><img src={Icon33} alt="Icon33"/></i>
                            Need Emergency
                          </li>
                          <li>
                            <i><img src={Icon34} alt="Icon34"/></i>
                            Nose and Sinus
                          </li>
                          <li>
                            <i><img src={Icon35} alt="Icon35"/></i>
                            Throat / Larynx Surgery
                          </li>
                          <li>
                            <i><img src={Icon36} alt="Icon36"/></i>
                            Mission statement
                          </li>
                        </ul>
                        <a href="#" className="cs_btn cs_style_1 cs_size_md cs_fs_18 cs_semibold cs_accent_bg_v1 cs_white_color">Read More</a>
                      </div>
                    </div>
                    <div className="col-lg-5 text-end">
                      <div className="cs_card_thumb cs_radius_5">
                        <img src={deptImg5} alt="Department Image"/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div id="neurology" className="cs_tab">
                <div className="cs_card cs_style_1 cs_white_bg cs_radius_5">
                  <div className="row cs_gap_y_20">
                    <div className="col-lg-7">
                      <div className="cs_card_text">
                        <h2 className="cs_card_title cs_fs_35 cs_semibold">Welcome to our Neurology</h2>
                        <p className="cs_card_subtitle">Oillum abrem deleniti adipisci suscipit dignissimos. remaining essentially unchanged. It was popularised in the with the.Lorem Ipsum is simply dummy text of the printing and typesetting industry lorem ipsum is simple dummy text of the printing.</p>
                        <h3 className="cs_list_title cs_fs_20 cs_bold cs_accent_color_v1">Quick Amenities in</h3>
                        <ul className="cs_list cs_style_2 cs_mp0 cs_fs_18 cs_primary_color cs_semibold">
                          <li>
                            <i><img src={Icon37} alt="Icon37"/></i>
                            Qualified Doctors
                          </li>
                          <li>
                            <i><img src={Icon38} alt="Icon38"/></i>
                            24 Hours Service
                          </li>
                          <li>
                            <i><img src={Icon39} alt="Icon39"/></i>
                            Need Emergency
                          </li>
                          <li>
                            <i><img src={Icon40} alt="Icon40"/></i>
                            Nose and Sinus
                          </li>
                          <li>
                            <i><img src={Icon41} alt="Icon41"/></i>
                            Throat / Larynx Surgery
                          </li>
                          <li>
                            <i><img src={Icon42} alt="Icon42"/></i>
                            Mission statement
                          </li>
                        </ul>
                        <a href="#" className="cs_btn cs_style_1 cs_size_md cs_fs_18 cs_semibold cs_accent_bg_v1 cs_white_color">Read More</a>
                      </div>
                    </div>
                    <div className="col-lg-5 text-end">
                      <div className="cs_card_thumb cs_radius_5">
                        <img src={deptImg6} alt="Department Image"/>
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

      <section className="cs_bg_filed" id="appointment" data-src="assets/images/appointment_bg.jpeg">
        <div className="cs_height_120 cs_height_lg_80"></div>
          <div className="container">
            <div className="row cs_gap_y_30">
              <div className="col-lg-12">
                <div className="cs_accordian_wrap">
                  <div className="cs_section_heading cs_style_1">
                    <h3 className="cs_section_title_up cs_accent_color_v1 cs_medium cs_fs_20">People Also Ask</h3>
                    <h2 className="cs_section_title cs_semibold cs_fs_35 mb-0">Frequently Asked Questions</h2>
                  </div>
                  <div className="cs_height_40 cs_height_lg_30"></div>
                  <div className="cs_accordian cs_style_1 cs_white_bg">
                    <h3 className="cs_accordian_head cs_fs_18 cs_medium mb-0">
                      What medical expenses are not tax deductible?
                      <span className="cs_accordian_toggle cs_center">
                        <i className="fa-regular fa-eye"></i>
                        <i className="fa-regular fa-eye-slash"></i>
                      </span>
                    </h3>
                    <div className="cs_accordian_body">
                      There are many variations of passages of available but the Ut elit tellus luctus nec ullamcorper at mattis, there are many variations of passages of available but the Ut elit tellus luctus nec ullamcorper at mattis.
                    </div>
                  </div>
                  <div className="cs_accordian cs_style_1 cs_white_bg active">
                    <h3 className="cs_accordian_head cs_fs_18 cs_medium mb-0">
                      Are dental expenses deductible 2023?
                        <span className="cs_accordian_toggle cs_center">
                          <i className="fa-regular fa-eye"></i>
                          <i className="fa-regular fa-eye-slash"></i>
                        </span>
                    </h3>
                    <div className="cs_accordian_body">
                      There are many variations of passages of available but the Ut elit tellus luctus nec ullamcorper at mattis, there are many variations of passages of available but the Ut elit tellus luctus nec ullamcorper at mattis.
                    </div>
                  </div>
                  <div className="cs_accordian cs_style_1 cs_white_bg">
                    <h3 className="cs_accordian_head cs_fs_18 cs_medium mb-0">
                      What is the standard deduction for 2023 for over 65?
                      <span className="cs_accordian_toggle cs_center">
                        <i className="fa-regular fa-eye"></i>
                        <i className="fa-regular fa-eye-slash"></i>
                      </span>
                    </h3>
                    <div className="cs_accordian_body">
                      There are many variations of passages of available but the Ut elit tellus luctus nec ullamcorper at mattis, there are many variations of passages of available but the Ut elit tellus luctus nec ullamcorper at mattis.
                    </div>
                  </div>
                  <div className="cs_accordian cs_style_1 cs_white_bg">
                    <h3 className="cs_accordian_head cs_fs_18 cs_medium mb-0">
                      What qualifies as a qualified medical expense?
                        <span className="cs_accordian_toggle cs_center">
                          <i className="fa-regular fa-eye"></i>
                          <i className="fa-regular fa-eye-slash"></i>
                        </span>
                    </h3>
                    <div className="cs_accordian_body">
                      There are many variations of passages of available but the Ut elit tellus luctus nec ullamcorper at mattis, there are many variations of passages of available but the Ut elit tellus luctus nec ullamcorper at mattis.
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </section>












    <script src="../client/src/assets/js/main.js"></script>
    <script src="../client/src/assets/js/isotope.pkg.min.js"></script>
    <script src="../client/src/assets/js/jquery-3.6.0.min.js"></script>
    <script src="../client/src/assets/js/jquery-timepicker.min.js"></script>
    <script src="../client/src/assets/js/jquery-ui.min.js"></script>
    <script src="../client/src/assets/js/jquery.slick.min.js"></script>
    <script src="../client/src/assets/js/light_gallery.min.js"></script>
    <script src="../client/src/assets/js/odometer.js"></script>
    <script src="../client/src/assets/js/ripple.min.js"></script>
    <script src="../client/src/assets/js/select2.min.js"></script>
    <script src="../client/src/assets/js/wow.min.js"></script>
    <script src="../client/src/assets/js/YTPlayer.min.js"></script>


    {/* <div className='mb-24'>
      <div>
        <img src={serviceLogo} alt="" className='w-[1990px] h-[500px] no-repeat' />
      </div>
      <div className="mt-10">
        <h1 className="text-4xl font-semibold text-center ml-16">Services We Provide</h1>
        <div className='mt-10 ml-36'>
          <div className='flex flex-wrap justify-around text-center'>
            {services.length > 0 ? (
              services.map((service) => (
                <div key={service._id}>
                  <h1
                    onClick={(e) => handleClick(e, service._id)}
                    className="mt-10 uppercase font-semibold box-border p-20 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)] rounded-lg hover:opacity-30 cursor-pointer"
                  >
                    {service.name}
                  </h1>
                </div>
              ))
            ) : (
              <p>Loading services...</p>
            )}
          </div>
        </div>
      </div>
    </div> */}
    </div>
  );
}
