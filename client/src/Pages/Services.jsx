/* import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import serviceLogo from '../assets/services.jpg';
 */

import { useEffect, useState } from 'react';

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

import photo from '../assets/images/appointment_bg.jpeg'

const tabs = [
  {
    id: 'crutches',
    header:"Crutches",
    title: 'Welcome to our Crutches',
    icons: Icon1,
    description: 'Oillum abrem deleniti adipisci suscipit dignissimos. remaining essentially unchanged. It was popularised in the with the . Lorem Ipsum is simply dummy text of the printing and typesetting industry lorem ipsum is simple dummy text of the printing.',
    image:deptImg, 
    item1: "Qualified Doctors",
    item2: "Need Emergency",
    item3: "Throat / Larynx Surgery",
    item4: "24 Hours Service",
    item5: "Nose and Sinus",
    item6: "Mission statement",
  },
  {
    id: 'x-ray',
    header:"X-ray",
    title: 'Welcome to our X-ray',
    icons: Icon3,
    description: 'Oillum abrem deleniti adipisci suscipit dignissimos. remaining essentially unchanged. It was popularised in the with the . Lorem Ipsum is simply dummy text of the printing and typesetting industry lorem ipsum is simple dummy text of the printing.',
    image:deptImg3, 
    item1: "Qualified Doctors",
    item2: "Need Emergency",
    item3: "Throat / Larynx Surgery",
    item4: "24 Hours Service",
    item5: "Nose and Sinus",
    item6: "Mission statement",
  },
  {
    id: 'cardiology',
    header:"Cardiology",
    title: 'Welcome to our Cardiology',
    icons: Icon4,
    description: 'Oillum abrem deleniti adipisci suscipit dignissimos. remaining essentially unchanged. It was popularised in the with the . Lorem Ipsum is simply dummy text of the printing and typesetting industry lorem ipsum is simple dummy text of the printing.',
    image:deptImg4, 
    item1: "Qualified Doctors",
    item2: "Need Emergency",
    item3: "Throat / Larynx Surgery",
    item4: "24 Hours Service",
    item5: "Nose and Sinus",
    item6: "Mission statement",
  },
  /* {
    id: 'dental',
    header:"Dental Care",
    title: 'Welcome to our Dental care',
    icons: Icon2,
    description: 'Oillum abrem deleniti adipisci suscipit dignissimos. remaining essentially unchanged. It was popularised in the with the . Lorem Ipsum is simply dummy text of the printing and typesetting industry lorem ipsum is simple dummy text of the printing.',
    image:deptImg2, 
    item1: "Qualified Doctors",
    item2: "Need Emergency",
    item3: "Throat / Larynx Surgery",
    item4: "24 Hours Service",
    item5: "Nose and Sinus",
    item6: "Mission statement",
  },
  {
    id: 'dental',
    header:"Dental Care",
    title: 'Welcome to our Dental care',
    icons: Icon2,
    description: 'Oillum abrem deleniti adipisci suscipit dignissimos. remaining essentially unchanged. It was popularised in the with the . Lorem Ipsum is simply dummy text of the printing and typesetting industry lorem ipsum is simple dummy text of the printing.',
    image:deptImg2, 
    item1: "Qualified Doctors",
    item2: "Need Emergency",
    item3: "Throat / Larynx Surgery",
    item4: "24 Hours Service",
    item5: "Nose and Sinus",
    item6: "Mission statement",
  }, */
  // Add more tabs as needed
];



export default function Services() {

  const [activeTab, setActiveTab] = useState('crutches');

  const handleTabClick = (id) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    const offset = 1100; // Adjust this value to match your sticky tab height

    window.scrollTo({
      top: element.offsetTop - offset,
      behavior: 'smooth',
    });
  };

  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);}

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
    <div className='Items-center text-center mt-24'>

    <section id="services" className="lg:py-12">
      <div className="container mx-auto">
        <div className="w-full lg:p-5">
          <ul className="flex border-b gap-1 border-gray-200 sticky mt-0 lg:z-index-10 overflow-x-auto whitespace-nowrap">
            <div className='flex space-x-1'>
              {tabs.map((tab) => (
                <li
                  key={tab?.id}
                  className={`cursor-pointer ${activeTab === tab?.id ? 'text-accent border-b-2 border-accent' : ''}`}
                  onClick={() => handleTabClick(tab?.id)}
                >
                  <a className="flex flex-col sm:flex-row w-full sm:w-auto items-center space-x-0 sm:space-x-2 h-16 sm:h-32 bg-sky-100 hover:bg-blue-200 p-3 rounded-xl">
                    <img
                      src={tab.icons}
                      alt={`Icon for ${tab.header}`}
                      className="w-4 sm:w-12 lg:w-14"
                    />
                    <span className="text-base sm:text-lg lg:text-2xl font-bold sm:ml-4">
                      {tab.header}
                    </span>
                  </a>
                </li>
              ))}
            </div>

          </ul>

          {tabs?.map((tab) => (
            <div
              key={tab?.id}
              id={tab?.id}
              className={`tab-content ${activeTab === tab.id ? 'block' : 'hidden'}`}
            >
              <div className="bg-white rounded-lg shadow-lg lg:p-6 mt-4">
                <div className="flex flex-wrap lg:-mx-4">
                  <div className="w-full lg:w-7/12 px-4">
                    <div className="cs_card_text">
                      <h2 className="cs_card_title text-3xl font-semibold">{tab.title}</h2>
                      <p className="cs_card_subtitle text-gray-600 mt-4">{tab.description}</p>
                      <h3 className="cs_list_title text-xl font-bold text-accent mt-6 text-left">Quick Amenities in</h3>
                      <ul className="cs_list mt-4 space-y-4 lg:space-y-2">
                        {/* First Row */}
                        <div className='flex flex-wrap justify-start lg:gap-5'>
                          {/* Qualified Doctors */}
                          <div className='flex items-start w-full sm:w-auto lg:text-xl'>
                            <img className='w-6 lg:w-8 mt-2 lg:mt-[-2px] mr-2' src={Icon7} alt="" />
                            <p className='font-bold'>Qualified Doctors</p>
                          </div>

                          {/* 24 Hours Service */}
                          <div className='flex items-start w-full sm:w-auto lg:text-xl ml-0 sm:ml-14'>
                            <img className='w-6 lg:w-8 mt-2 lg:mt-[-2px] mr-2' src={Icon7} alt="" />
                            <p className='font-bold'>24 Hours Service</p>
                          </div>
                        </div>

                        {/* Second Row */}
                        <div className='flex flex-wrap justify-start lg:gap-5'>
                          {/* Need Emergency */}
                          <div className='flex items-start w-full sm:w-auto lg:text-xl'>
                            <img className='w-6 lg:w-8 mt-2 lg:mt-[-2px] mr-2' src={Icon7} alt="" />
                            <p className='font-bold'>Need Emergency</p>
                          </div>

                          {/* Nose and Sinus */}
                          <div className='flex items-start w-full sm:w-auto lg:text-xl ml-0 sm:ml-16'>
                            <img className='w-6 lg:w-8 mt-2 lg:mt-[-2px] mr-2' src={Icon7} alt="" />
                            <p className='font-bold'>Nose and Sinus</p>
                          </div>
                        </div>

                        {/* Third Row */}
                        <div className='flex flex-wrap justify-start lg:gap-5'>
                          {/* Throat / Larynx Surgery */}
                          <div className='flex items-start w-full sm:w-auto lg:text-xl'>
                            <img className='w-6 lg:w-8 mt-2 lg:mt-[-2px] mr-2' src={Icon7} alt="" />
                            <p className='font-bold'>Throat / Larynx Surgery</p>
                          </div>

                          {/* Mission statement */}
                          <div className='flex items-start w-full sm:w-auto lg:text-xl'>
                            <img className='w-6 lg:w-8 mt-2 lg:mt-[-2px] mr-2' src={Icon7} alt="" />
                            <p className='font-bold'>Mission Statement</p>
                          </div>
                        </div>
                      </ul>

                    </div>
                  </div>
                  <div className="w-full lg:w-5/12 px-4 mt-6 lg:mt-0">
                    <div className="cs_card_thumb rounded-lg overflow-hidden">
                      <img src={tab.image} alt="Department" className="w-full h-auto" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
      {/* <section id="services">
        <div className="cs_height_120 cs_height_lg_80"></div>
          <div className="container">
            <div className="cs_section_heading cs_style_1 text-center">
              <h3 className="cs_section_title_up cs_accent_color_v1 cs_semibold cs_fs_24">What we provide our services</h3>
              <h2 className="cs_section_title cs_semibold cs_fs_45 wow fadeInUp mb-0">We are Providing Best Services <br/> To Our Customers</h2>
            </div>
            <div className="cs_height_63 cs_height_lg_40"></div>
          </div>



          <div className="container">
            <div className="w-full ml-24">
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
              <div className="cs_height_50 cs_height_lg_40 ml-24"></div>
              <div className="tab-content ">

                <div id="crutches" className="cs_tab active ">
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
      </section> */}

          {/* FAQ */}
      <section className="cs_bg_filed h-auto" id="appointment" style={{ backgroundImage: `url(${photo})` }}>
        <div className="cs_height_120 cs_height_lg_80"></div>
          <div className="container mx-auto">
            <div className="row cs_gap_y_30">
              <div className="col-lg-12">
                <div className="cs_accordian_wrap">
                  <div className="cs_section_heading cs_style_1">
                    <h3 className="cs_section_title_up cs_accent_color_v1 cs_medium cs_fs_20">People Also Ask</h3>
                    <h2 className="cs_section_title cs_semibold cs_fs_35 mb-0">Frequently Asked Questions</h2>
                  </div>

                  <div className="cs_height_40 cs_height_lg_30"></div>

                  {[
                    "What medical expenses are not tax deductible?",
                    "Are dental expenses deductible 2023?",
                    "What is the standard deduction for 2023 for over 65?",
                    "What qualifies as a qualified medical expense?"
                  ].map((question, index) => (
                    <div
                      key={index}
                      className={`cs_accordian cs_style_1 cs_white_bg rounded-2xl ${openIndex === index ? 'active' : ''}`}
                    >
                      <h3
                        className="cs_accordian_head cs_fs_18 cs_medium mb-0 cursor-pointer"
                        onClick={() => toggleAccordion(index)}
                      >
                        {question}
                        <span className="cs_accordian_toggle cs_center">
                          {openIndex === index ? (
                            <i className="fa-regular fa-eye-slash"></i>
                          ) : (
                            <i className="fa-regular fa-eye"></i>
                          )}
                        </span>
                      </h3>
                      {openIndex === index && (
                        <div className="cs_accordian_body">
                          There are many variations of passages of available but the Ut elit tellus luctus nec ullamcorper at mattis,
                          <br />
                          there are many variations of passages of available but the Ut elit tellus luctus nec ullamcorper at mattis.
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        <div className="cs_height_120 cs_height_lg_80"></div>
      </section>













    {/* <script src="../client/src/assets/js/main.js"></script>
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
    <script src="../client/src/assets/js/YTPlayer.min.js"></script> */}


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
