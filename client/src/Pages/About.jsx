import aboutUsLogo from '../assets/about.jpg';
import aboutSectionLogo from '../assets/absec.jpg';
import { BsBuildingFillCheck } from "react-icons/bs";
import { BsFillPeopleFill } from "react-icons/bs";
import { BsFillHeartPulseFill } from "react-icons/bs";
import team from '../assets/team.png';
import craft from '../assets/crafting-2.png';


import leftImag from '../assets/images/about_left.png';
import author from '../assets/images/avatar_1.jpeg';

import '../assets/css/style.css';
import '../assets/css/animate.css';
import '../assets/css/bootstrap.min.css';
import '../assets/css/animated-text.css';
import '../assets/css/fontawesome.min.css';
// import '../assets/css/style.css.map';
import '../assets/css/odometer.css';

import { initializeJQuery } from '../assets/js/animated-text.min';
import '../assets/js/main';
import '../assets/js/odometer';
import { useEffect } from 'react';



export default function About() {

  useEffect(() => {
    initializeJQuery();
  }, []);

  return (
    <div className='w-full mb-5 mt-24'>
      <img src={aboutUsLogo} alt="logo of about us" className='w-full lg:h-[500px]' />
      <div className='mt-5'>
        <h1 className='font-semibold text-4xl text-center mb-5 uppercase'>About us</h1>

        
        {/* About section */}

        <div className='m-24 mt-[-8%]'>
          <section className="cs_about cs_style_1" id="about">
            <div className="cs_height_120 cs_height_lg_80"></div>
              <div className="container">
                <div className="row cs_gap_y_40 align-items-center">
                  <div className="col-lg-6">
                    <div className="cs_about_thumb wow fadeInLeft">
                      <img src={leftImag} alt="About Thumb" />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="cs_pl_30">
                      <div className="cs_section_heading cs_style_1">
                        <h3 className="cs_section_title_up cs_accent_color_v1 cs_semibold cs_fs_18">A Hospital is a Health</h3>
                        <h2 className="cs_section_title cs_semibold cs_fs_35 mb-0">A hospital is a health care institution providing patient treatment with specialized medical</h2>
                      </div>
                      <div className="cs_height_32 cs_height_lg_20"></div>
                        <p className="cs_about_text">Organically grow the holistic world view of disruptive innovation via workplace.Organically grow the holistic world</p>
                      <ul className="cs_list cs_style_1 cs_mp0 cs_primary_color cs_medium">
                        <li>
                          <i className="fa-solid fa-circle-check cs_accent_color_v1"></i>
                          Giving medication administration.</li>
                        <li>
                          <i className="fa-solid fa-circle-check cs_accent_color_v1"></i>
                          Get good and delicious meal</li>
                        <li>
                          <i className="fa-solid fa-circle-check cs_accent_color_v1"></i>
                          Creating a good medic-sets.
                        </li>
                      </ul>
                        <div className="cs_review_progress_wrap">
                          <div className="cs_progress_text">
                            <h3 className="cs_fs_20 cs_semibold mb-0">Qualified Doctors</h3>
                          </div>
                          <div className="cs_progress_container">
                            <div className="cs_progress" data-progress="85">
                              <div className="cs_progress_percentage">
                                <div className="progress_value"><span>85%</span></div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="cs_author_card">
                          <div className="cs_author_thumb cs_center">
                            <img src={author} alt="Author" />  
                          </div>
                          <div className="cs_author_info">
                            <h3 className="cs_author_title cs_fs_20 cs_semibold">Kate Attjamin</h3>
                            <p className="mb-0">Founder & Director</p>
                          </div>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            <div className="cs_height_120 cs_height_lg_80"></div>
          </section>
        </div>
        
        <div className='lg:p-10 grid lg:grid-cols-3 mx-16 lg:mx-24 mt-[-10%]'>
          
          <div className='lg:w-2/3 mb-8 box-border mr-24 p-16 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)] rounded-lg'>
            <h1 className='text-zinc-500 text-2xl font-bold text-center'>About <br /> <span className='text-gray-700 font-bold text-2xl'> Even</span><span className='text-sky-400 text-2xl font-bold'>Care</span></h1>
          </div>
          
          <div>
            <p className='text-xl mb-5'>The Evercare Group believes access to healthcare is a fundamental right for 
              everyone, so it invests in emerging markets to bring private, quality driven 
              healthcare to meet the needs of local people. The Group was created in 
              response to a global challenge to ensure well-being at all ages is provided 
              to those living in developing countries as a pillar to support sustainable 
              economic development.</p>
          </div>
          <div>
            <p className='text-xl'>We are leading the way in transforming the traditional healthcare model 
              through our integrated cross-continents platform, our impact driven model 
              and our quality driven hospitals and other healthcare facilities.The Evercare 
              Group operates as an integrated healthcare delivery platform in emerging 
              markets across Africa and South Asia, including India, Pakistan, Bangladesh, 
              Kenya and Nigeria.</p>
          </div>
          

        </div>


        <div className='lg:p-10 gap-4 grid lg:grid-cols-3 mx-16 lg:mx-24'>
          

          <div>
            <h1 className='text-zinc-500 text-2xl font-bold text-center mb-5'>Vision</h1>
            <p className='text-xl mb-5'>To be the leading integrated healthcare network in 
            emerging markets, transforming the quality of healthcare and impacting millions 
            of people.</p>
          </div>

          <div>
            <h1 className='mb-5 text-zinc-500 text-2xl font-bold text-center'>Mission</h1>
            
            <p className='text-xl'>We are leading the way in transforming the traditional healthcare model 
              through our integrated cross-continents platform, our impact driven model 
              and our quality driven hospitals and other healthcare facilities.The Evercare 
              Group operates as an integrated healthcare delivery platform in emerging 
              markets across Africa and South Asia, including India, Pakistan, Bangladesh, 
              Kenya and Nigeria.</p>
          </div>
          

          <div>
            <img src={aboutSectionLogo} alt="aboutSectionLogo"  className='rounded-xl w-10/12'/>
          </div>
          

        </div>

        <div className='lg:p-10 gap-4 grid lg:grid-cols-3 mx-16 lg:mx-24'>
          

          <div>
              <h1 className='text-zinc-500 text-2xl font-bold mb-5'>Values</h1>
              <p className='text-xl mb-5'>We are committed to providing best-in-class, <br /> 
                accessible, private healthcare for all and we <br /> encourage all our employees 
                and caregivers <br /> to share our values: 
              </p>
          </div>

          <div className='bg-neutral-500 rounded-lg'>
            <div className='flex justify-around mt-10 ml-4'>
              <div>
                <p className='lg:text-5xl text-2xl text-lime-400 p-3'><BsBuildingFillCheck /></p>
              </div>
              <div>
                <h1 className='text-2xl text-amber-100 font-bold'>Quality</h1>
                <p className='text-lg text-white mt-5'>We are committed to providing quality healthcare for every patient.</p>
              </div>
            </div>
          </div>

          <div className='bg-gray-500 rounded-lg'>
            <div className='flex justify-around mt-10 ml-4'>
              <div>
                <p className='lg:text-5xl text-2xl m-2'> <BsFillPeopleFill /> </p>
              </div>
              <div>
                <h1 className='text-2xl text-stone-100 font-bold'>Integrity</h1>
                <p className='text-lg text-white mt-5'>We do the right thing, every time.</p>
              </div>
            </div>
          </div>
          
          <div className='bg-rose-500 rounded-lg'>
            <div className='flex justify-around mt-10 ml-4 mb-10'>
              <div>
                <p className='lg:text-4xl text-2xl text-blue-500 m-2 '> <BsFillHeartPulseFill /> </p>
              </div>
              <div>
                <h1 className='text-2xl text-stone-100 font-bold'>Passion</h1>
                <p className='text-lg text-white'>We are passionate about healthcare and this shows in the care we provide.</p>
              </div>
            </div>
          </div>

          <div className='bg-lime-700 rounded-lg'>
            <div className='flex justify-around mt-10 ml-4 mb-10'>
              <div>
                <img src={team} alt="team" className='rounded-full' />
              </div>
              <div className='mx-2'>
                <h1 className='text-2xl text-stone-100 font-bold'>Respect</h1>
                <p className='text-lg text-white'>We are respectful of everyone regardless of our differences and diversity.</p>
              </div>
            </div>
          </div>

          <div className='bg-lime-700 rounded-lg'>
            <div className='flex justify-around mt-10 ml-4 mb-10'>
              <div>
                <img src={craft} alt="team" className='rounded-full m-2' />
              </div>
              <div className='mx-4'>
                <h1 className='text-2xl text-stone-100 font-bold'>Innovation</h1>
                <p className='text-lg text-white'>We believe innovation allows us to 
                                                    improve our patients experience, 
                                                    increase caregiver engagement and 
                                                    ensure the health of our business.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}
