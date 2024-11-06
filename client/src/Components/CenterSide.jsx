/* import MyComponent from "../Pages/Posts/allPosts";
import Posts from "../Pages/Posts/Posts"; */

import { useEffect, useRef, useState } from "react";

import "../assets/css/style.css";
import "../assets/css/animate.css";
import "../assets/css/bootstrap.min.css";
import "../assets/css/animated-text.css";
import "../assets/css/fontawesome.min.css";
// import '../assets/css/style.css.map';
import "../assets/css/odometer.css";

/* JS Part */
import { initializeJQuery } from "../assets/js/animated-text.min";
import "../assets/js/main.js";
import "../assets/js/odometer.js";
import "../assets/js/animated-text.min.js";

// import '../assets/js/light_gallery.min.js'
// import '../assets/js/ripple.min.js'
// import '../assets/js/select2.min.js'

// import '../assets/js/isotope.pkg.min.js'
// import '../assets/js/light_gallery.min.js'

/* import leftImag from '../assets/images/about_left.png';
import author from '../assets/images/avatar_1.jpeg'; */
import aboutThumb from "../assets/images/about_left_2.png";
import dataSrc from "../assets/images/counter_bg.jpeg";
import Icons from "../assets/images/icons/funfact_icon_1.png";
import Icons2 from "../assets/images/icons/funfact_icon_2.png";
import Icon3 from "../assets/images/icons/funfact_icon_3.png";
import Icon4 from "../assets/images/icons/funfact_icon_4.png";

import Icons5 from "../assets/images/icons/envelop_icon.png";

import Icon6 from "../assets/images/avatar_2.png";
import Icon7 from "../assets/images/icons/quote_icon2.svg";
import Icon8 from "../assets/images/avatar_7.png";
import Icon9 from "../assets/images/avatar_4.png";
import Icon10 from "../assets/images/avatar_5.png";
import Icon11 from "../assets/images/testimonial_shape3.svg";
import Icon12 from "../assets/images/testimonial_shape2.svg";

import Avatar9 from "../assets/images/avatar_9.png";
import Avatar3 from "../assets/images/avatar_3.png";
import Avatar7 from "../assets/images/avatar_7.png";
import Avatar4 from "../assets/images/avatar_4.png";
import Avatar5 from "../assets/images/avatar_5.png";
import Avatar6 from "../assets/images/avatar_6.png";
import Avatar8 from "../assets/images/avatar_8.png";

import { Link } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import "odometer/themes/odometer-theme-default.css";
import Odometer from "odometer";
import { toast, Toaster } from "react-hot-toast";
import PatientRegistrationForm from "../Pages/Patient Registration Form/PatientRegistrationForm.jsx";
import { useSelector } from "react-redux";

//import Odometer from 'odometer';
//import Avatar from '../';

const testimonials = [
  {
    img: Icon6,
    name: "Dr. Luiz Frank",
    title: "Dental Surgery",
    quote:
      "Dialect is excellent - short and sweet and effective lessons and great quick review which is key to remembering. I love it! I’m learning Dutch!! I enjoy the dialogues and scenarios, which include helpful phrases that can be used in various situations.",
  },
  {
    img: Icon8,
    name: "Dr. Selina Gomez",
    title: "Neouro Surgery",
    quote:
      "Dialect is excellent - short and sweet and effective lessons and great quick review which is key to remembering. I love it! I’m learning Dutch!! I enjoy the dialogues and scenarios, which include helpful phrases that can be used in various situations.",
  },
  {
    img: Icon9,
    name: "Dr. Michel Jhonson",
    title: "Cardiologist",
    quote:
      "Dialect is excellent - short and sweet and effective lessons and great quick review which is key to remembering. I love it! I’m learning Dutch!! I enjoy the dialogues and scenarios, which include helpful phrases that can be used in various situations.",
  },
  {
    img: Icon10,
    name: "Dr. Nadim Kamal",
    title: "Dry Eye Surgery",
    quote:
      "Dialect is excellent - short and sweet and effective lessons and great quick review which is key to remembering. I love it! I’m learning Dutch!! I enjoy the dialogues and scenarios, which include helpful phrases that can be used in various situations.",
  },
];

const initialFormState = {
  firstname: "",
  lastname: "",
  phone: "",
  email: "",
  remark: "",
};

export default function CenterSide() {
  const controls = useAnimation();

  const { currentUser } = useSelector((state) => state?.user);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [formdata, setFormData] = useState(initialFormState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  console.log("currentUser: ", currentUser?.data?.user);
  console.log("FormData: ", formdata);

  const handleChange = (e) => {
    e.preventDefault();
    const { id, value } = e.target;
    setFormData({
      ...formdata,
      [id]: value,
    });
    //console.log("first: ", value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await fetch("/api/complainbox/complains", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formdata),
      });

      const data = await res.json();

      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        toast.error("Something missing: " + data.message);
      } else {
        toast.success("Your suggestion submitted successfully!", {
          position: "top-center",
          duration: 5000,
          style: {
            background: "#4CAF50",
            color: "white",
          },
        });

        // Reset the form after successful submission
        setFormData(initialFormState);
        setError(null);
      }

      setLoading(false);
    } catch (err) {
      console.error("Error : ", err);
    }
  };

  const handlePrevClick = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? testimonials.length - 1 : prevSlide - 1
    );
  };

  const handleNextClick = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % testimonials.length);
  };

  const getVisibleTestimonials = () => {
    const visible = [];
    for (let i = 0; i < 4; i++) {
      visible.push(testimonials[(currentSlide + i) % testimonials.length]);
    }
    return visible;
  };

  const visibleTestimonials = getVisibleTestimonials();

  useEffect(() => {
    initializeJQuery();
  }, []);

  /* part - 1 */

  const odometerPart1Ref = useRef(null);
  useEffect(() => {
    if (odometerPart1Ref.current) {
      const odometer = new Odometer({
        el: odometerPart1Ref.current,
        value: 0,
        format: "",
        theme: "default",
        duration: 2000, // Duration of the animation in milliseconds
      });

      setTimeout(() => {
        odometer.update(230);
      }, 1000);
    }
  }, []);

  /* part - 2 */
  const odometerPart2Ref = useRef(null);
  useEffect(() => {
    if (odometerPart2Ref.current) {
      const odometer = new Odometer({
        el: odometerPart2Ref.current,
        value: 0,
        format: "",
        theme: "default",
        duration: 2000, // Duration of the animation in milliseconds
      });

      setTimeout(() => {
        odometer.update("2000");
      }, 1000);
    }
  }, []);

  /* part - 3 */

  const odometerPart3Ref = useRef(null);
  useEffect(() => {
    if (odometerPart3Ref.current) {
      const odometer = new Odometer({
        el: odometerPart3Ref.current,
        value: 0,
        format: "",
        theme: "default",
        duration: 2000, // Duration of the animation in milliseconds
      });

      setTimeout(() => {
        odometer.update(99);
      }, 1000);
    }
  }, []);

  /* part - 4 */
  const odometerRef = useRef(null);

  useEffect(() => {
    if (odometerRef.current) {
      const odometer = new Odometer({
        el: odometerRef.current,
        value: 0,
        format: "",
        theme: "default",
        duration: 2000, // Duration of the animation in milliseconds
      });

      setTimeout(() => {
        odometer.update(125);
      }, 1000);
    }
  }, []);

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="">
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

      <section
        className="cs_hero cs_style_5 position-relative mt-[-40px]"
        id="home"
      >
        <div
          className="cs_hero_top cs_bg_filled cs_primary_bg cs_bg_filed"
          data-src="assets/images/hero_bg_11.jpeg"
        >
          <div className="container">
            <div className="cs_hero_text text-center">
              <h1 className="cs_hero_title cs_headline clip cs_fs_60 cs_semibold cs_white_color">
                Take Best Quality <br /> Treatment for <br />
                <span className="cs_words_wrapper ">
                  <b className="is-visible">Crutches.</b>
                  <b>Laboratory.</b>
                  <b>Cardiology.</b>
                  <b>Dentist.</b>
                  <b>Neurology.</b>
                </span>
              </h1>
              <p className="cs_hero_subtitle cs_fs_18 cs_white_color">
                Lorem ipsum dolor sit amet consectetuer adipiscing Phasellus{" "}
                <br /> hendrerit lorem dolor sit nibh nec urna. In nisi
              </p>
              <Link to="/appointment">
                <button className="cs_btn cs_style_1 cs_fs_18 cs_semibold cs_accent_bg_v1 cs_white_color pointer">
                  Appointment
                </button>
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
                <img src={aboutThumb} alt="About Thumb" />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="cs_pl_30">
                <div className="cs_section_heading cs_style_1">
                  <h3 className="cs_section_title_up cs_accent_color_v2 cs_medium cs_fs_20">
                    Welcome to Evencare
                  </h3>
                  <h2 className="cs_section_title cs_semibold cs_fs_40 mb-0">
                    Evencare is a Modern Hospital Clinic that Meets Your Highest
                  </h2>
                </div>
                <div className="cs_height_17 cs_height_lg_10"></div>
                <p className="cs_about_text cs_type_2">
                  Quisque dignissim enim diam, eget pulvinar ex viverra id.
                  Nulla a lobortis lectus, id volutpat magna. Morbi consequat
                  porttitor fermentum. Nulla vestibulum tincidunt viverra.
                  Vestibulum accumsan molestie lorem, non laoreet massa.
                </p>
                <p className="cs_about_text cs_type_2">
                  Quisque dignissim enim diam, eget pulvinar ex viverra id.
                  Nulla a lobortis lectus, id volutpat magna. Morbi consequat
                  porttitor fermentum. Nulla vestibulum tincidunt viverra.
                  Vestibulum accumsan molestie lorem, non laoreet massa.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="cs_height_120 cs_height_lg_80"></div>
      </section>

      {currentUser?.data?.user.role === "user" && <PatientRegistrationForm />}

      {/* Qalifier success rate + Count down section should be added. */}

      <section
        className="cs_counting cs_bg_filed cs_primary_bg"
        data-src={dataSrc}
      >
        <div className="cs_height_133 cs_height_lg_80"></div>
        <div className="container-fluid">
          <div className="row cs_gap_y_40 align-items-center justify-content-between m-10">
            {/* part 1 */}
            <div className="col-xl-3 col-md-6 flex">
              <div className="cs_funfact_icon cs_center">
                <img
                  className="w-24 p-2 mr-2 shadow-lg shadow-gray-700 bg-white  rounded-xl"
                  src={Icons}
                  alt="Icon3"
                />
              </div>
              <div className="cs_funfact_text">
                <h2 className="cs_counter_number cs_fs_65 cs_white_color d-flex align-items-center cs_semibold">
                  <span ref={odometerPart1Ref} className="odometer"></span>+
                </h2>
                <p className="cs_counter_title cs_fs_24 cs_semibold cs_white_color mb-0">
                  Specialised Support
                </p>
              </div>
            </div>

            {/* part -2 */}

            <div className="col-xl-3 col-md-6 flex">
              <div className="cs_funfact_icon cs_center">
                <img
                  className="w-24 p-2 mr-2 shadow-lg shadow-gray-700 bg-white  rounded-xl"
                  src={Icons2}
                  alt="Icon3"
                />
              </div>
              <div className="cs_funfact_text">
                <h2 className="cs_counter_number cs_fs_65 cs_white_color d-flex align-items-center cs_semibold">
                  <span ref={odometerPart2Ref} className="odometer"></span>+
                </h2>
                <p className="cs_counter_title cs_fs_24 cs_semibold cs_white_color mb-0">
                  Happy Patients
                </p>
              </div>
            </div>

            {/* Part 3 */}

            <div className="col-xl-3 col-md-6 flex">
              <div className="cs_funfact_icon cs_center">
                <img
                  className="w-24 p-2 mr-2 shadow-lg shadow-gray-700 bg-white  rounded-xl"
                  src={Icon3}
                  alt="Icon3"
                />
              </div>
              <div className="cs_funfact_text">
                <h2 className="cs_counter_number cs_fs_65 cs_white_color d-flex align-items-center cs_semibold">
                  <span ref={odometerPart3Ref} className="odometer"></span>+
                </h2>
                <p className="cs_counter_title cs_fs_24 cs_semibold cs_white_color mb-0">
                  Qualified Doctors
                </p>
              </div>
            </div>

            {/* part 4  */}

            <div className="col-xl-3 col-md-6 flex">
              <div className="cs_funfact_icon cs_center">
                <img
                  className="w-24 p-2 mr-2 shadow-lg shadow-gray-700 bg-white rounded-xl"
                  src={Icon4}
                  alt="Icon4"
                />
              </div>
              <div className="cs_funfact_text">
                <h2 className="cs_counter_number cs_fs_65 cs_white_color d-flex align-items-center cs_semibold">
                  <span ref={odometerRef} className="odometer"></span>+
                </h2>
                <p className="cs_counter_title cs_fs_24 cs_semibold cs_white_color mb-0">
                  Hospital Rooms
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="cs_height_133 cs_height_lg_80"></div>
      </section>

      {/* <!-- Start Testimonial Section --> */}

      <section className="cs_slider cs_style_1 cs_testimonial_slider cs_accent_v4_light position-relative overflow-hidden">
        <div className="cs_height_120 cs_height_lg_80"></div>

        <div className="container position-relative z-2">
          <div className="">
            <div className="flex lg:justify-between justify-around">
              <div className="cs_section_heading cs_style_1">
                <h3 className="cs_section_title_up cs_semibold cs_fs_24 cs_accent_color_v4">
                  Our Testimonial
                </h3>
                <h2 className="cs_section_title cs_semibold cs_fs_45 mb-0">
                  What Our Clients Says
                </h2>
              </div>
              <div className="cs_slider_arrows cs_style_1  wow fadeInUp">
                <div
                  className="cs_left_arrow cs_slider_arrow cs_version_4 cs_center slick-arrow"
                  onClick={handlePrevClick}
                >
                  <i className="fa-solid fa-chevron-left"></i>
                </div>
                <div
                  className="cs_right_arrow cs_slider_arrow cs_version_4 cs_center slick-arrow"
                  onClick={handleNextClick}
                >
                  <i className="fa-solid fa-chevron-right"></i>
                </div>
              </div>
            </div>
          </div>

          <div className="cs_height_40 cs_height_lg_20"></div>
          <div className="cs_slider_container">
            <div className="flex ml-2 gap-4">
              {visibleTestimonials.map((testimonial, index) => (
                <div
                  className="cs_testimonial cs_style_3 cs_white_bg cs_radius_2 position-relative"
                  key={index}
                >
                  <div className="cs_avatar">
                    <div className="cs_avatar_thumb cs_radius_50 overflow-hidden">
                      <img src={testimonial.img} alt="Avatar" />
                    </div>
                    <div className="cs_avatar_info">
                      <h3 className="cs_avatar_title cs_fs_24 cs_semibold">
                        {testimonial.name}
                      </h3>
                      <p className="cs_avatar_subtitle cs_medium mb-0">
                        {testimonial.title}
                      </p>
                    </div>
                  </div>
                  <blockquote>{testimonial.quote}</blockquote>
                  <hr />
                  <div className="cs_quote_shape position-absolute">
                    <img src={Icon7} alt="Icon" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="cs_testimonial_shape3 position-absolute wow fadeInLeft">
          <img src={Icon11} alt="Shape Image" />
        </div>
        <div className="cs_testimonial_shape4 position-absolute">
          <img src={Icon12} alt="Shape Image" />
        </div>
        <div className="cs_height_100 cs_height_lg_60"></div>
      </section>

      {/* <!-- End Testimonial Section --> */}

      {/* Get In Touch */}

      <section id="contact">
        <div className="cs_height_120 cs_height_lg_80"></div>
        <div className="container">
          <div className="cs_section_heading cs_style_1 text-center">
            <h3 className="cs_section_title_up cs_accent_color_v1 cs_semibold cs_fs_24 wow fadeInDown">
              Have Any Suggestion or Complain?
            </h3>
            <h2 className="cs_section_title cs_semibold cs_fs_45 mb-0">
              Get in Touch With Us
            </h2>
          </div>
          <div className="cs_height_45 cs_height_lg_30"></div>

          <form
            onSubmit={handleSubmit}
            className="cs_contact_form row cs_gap_y_24"
            id="cs_form"
          >
            <div className="col-md-6 position-relative">
              <input
                type="text"
                name="firstname"
                id="firstname"
                value={formdata.firstname}
                onChange={handleChange}
                className="cs_form_field cs_radius_5"
                required
              />
              <label>First Name</label>
            </div>

            <div className="col-md-6 position-relative">
              <input
                type="text"
                name="lastname"
                id="lastname"
                value={formdata.lastname}
                onChange={handleChange}
                className="cs_form_field cs_radius_5"
                required
              />
              <label>Last Name</label>
            </div>

            <div className="col-md-6 position-relative">
              <input
                type="number"
                name="phone"
                id="phone"
                value={formdata.phone}
                onChange={handleChange}
                className="cs_form_field cs_radius_5"
                required
              />
              <label>Phone</label>
            </div>

            <div className="col-md-6 position-relative">
              <input
                type="email"
                name="email"
                id="email"
                value={formdata.email}
                onChange={handleChange}
                className="cs_form_field cs_radius_5"
                required
              />
              <label>Email Address</label>
            </div>

            <div className="col-md-12 position-relative">
              <textarea
                name="message"
                rows="6"
                id="remark"
                value={formdata.remark}
                onChange={handleChange}
                className="cs_form_field cs_radius_5"
                required
              ></textarea>
              <label>Message</label>
            </div>

            <div className="col-md-12 text-md-center">
              <button
                type="submit"
                className="w-full btn bg-sky-500 text-white cs_fs_24 cs_semibold"
              >
                {loading ? "Submitting..." : "Send Message"}
              </button>
            </div>
          </form>

          {error && <p className="text-red-500">{error.message}</p>}
        </div>
        <div className="cs_height_120 cs_height_lg_80"></div>
      </section>

      {/* Subscription news letter */}
      <section className="cs_newsletter_1_wrap mb-24">
        <div className="container">
          <div className="cs_newsletter cs_style_1 cs_accent_bg_v1 wow fadeIn">
            <div className="cs_newsletter_left d-flex gap-4">
              <div className="cs_newsletter_icon">
                <img src={Icons5} alt="Icon5" />
              </div>
              <h2 className="cs_newsletter_title cs_fs_24 cs_semibold mb-0 cs_white_color">
                Latest Updates Subscribe To <br /> Our Newsletter
              </h2>
            </div>
            <form action="#" className="cs_newsletter_form">
              <input
                type="text"
                name="email"
                className="cs_newsletter_form_field cs_radius_2"
                placeholder="Enter your Email"
              />
              <button
                type="submit"
                className="cs_btn cs_style_1 cs_fs_18 cs_medium cs_white_bg cs_accent_color_v1 bg-sky-900"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
