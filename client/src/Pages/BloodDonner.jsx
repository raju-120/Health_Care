import React,{useState} from 'react'

export default function BloodDonner() {

  const [formData, setFormData] = useState({});
  const [deptData, setDeptData] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDoctorSlots, setSelectedDoctorSlots] = useState([]);
  const [doctorBill, setDoctorBill] = useState(0);
  const [selectedDate, setSelectedDate] = useState("");
  const [fullyBooked, setFullyBooked] = useState(false);
  const [appointmentSlots, setAppointmentSlots] = useState([]);


  const handleChange = (e) => {
    e.preventDefault();
    const { id, value } = e.target;

    if (id === "appointmentSlots") {
      setFormData({
        ...formData,
        [id]: value,
      });
    } else {
      setFormData({
        ...formData,
        [id]: value,
        bill: doctorBill,
      });

      if (id === "department") {
        const selectedDept = deptData.find((dept) => dept.deptname === value);
        if (selectedDept) {
          setDoctors(selectedDept.doctors);
          setSelectedDoctor(null);
          setSelectedDoctorSlots([]);
          setDoctorBill(0);
          setSelectedDate("");
          setFullyBooked(false);
          setAppointmentSlots([]);
        } else {
          setDoctors([]);
          setSelectedDoctor(null);
          setSelectedDoctorSlots([]);
          setDoctorBill(0);
          setSelectedDate("");
          setFullyBooked(false);
          setAppointmentSlots([]);
        }
      } else if (id === "doctor") {
        const selectedDoc = doctors.find((doc) => doc.docname === value);
        setSelectedDoctor(selectedDoc);
        setSelectedDoctorSlots(selectedDoc.slots);
        setDoctorBill(selectedDoc.bill);
        setAppointmentSlots([]);
      } else if (id === "date") {
        setSelectedDate(value);
        setFullyBooked(false);
        setAppointmentSlots([]);
      }
    }
  };

  return (
    <div className='Items-center text-center m-24 mt-5'>
      <section id="services">
        <div className="cs_height_120 cs_height_lg_80"></div>
          <div className="container">
            <div className="cs_section_heading cs_style_1 text-center">
              <h3 className="cs_section_title_up cs_accent_color_v1 cs_semibold cs_fs_24">Here is our Blood Donner list</h3>
              <h2 className="cs_section_title cs_semibold cs_fs_45 wow fadeInUp mb-0">You can reach out to them <br/> To Our Blood Donner</h2>
            </div>
            <div className="cs_height_63 cs_height_lg_40"></div>
          </div>
        <div className="cs_height_120 cs_height_lg_80"></div>
      </section>

        {/* Doctors search section by department */}

        <section className=" mb-24 mt-[-7em] ">
          <div className="container lg:max-w-[1050px] ">
            <form className=" col-lg-12">
              <div className="cs_height_0 cs_height_lg_50"></div>
              <div className="cs_sidebar cs_style_1">
              <div className="cs_sidebar_widget cs_radius_5 cs_search">
                <div className="cs_search_box cs_radius_5">
                  <input type="text" placeholder="Search by Blood Group"/>
                  <span className="cs_search_icon cs_accent_bg_v1 cs_white_color">
                    <button><i className="fa-solid fa-magnifying-glass"></i></button>
                  </span>
                </div>
              </div>
              </div>
            </form>
          </div>
        </section>


    {/*Donner Regististration  section*/}

      <section id="contact">
        <div className="cs_height_120 cs_height_lg_80"></div>
        <div className="container">
          <div className="cs_section_heading cs_style_1 text-center">
            <h3 className="cs_section_title_up cs_accent_color_v1 cs_semibold cs_fs_24 wow fadeInDown">Want be a part of <span className='text-blue-500'>Blood</span><span className='text-sky-600'>Donner</span>?</h3>
            <h2 className="cs_section_title cs_semibold cs_fs_45 mb-0">Please Register as a Donner</h2>
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
              <input type="text" name="division" className="cs_form_field cs_radius_5" required/>
              <label>Divion</label>
            </div>
            <div className="col-md-6 position-relative">
              <input type="text" name="LDD" className="cs_form_field cs_radius_5" required />
              <label>Last Donate date</label>
            </div>
            <div className="col-md-12 position-relative">
              <textarea name="message" rows="6" className="cs_form_field cs_radius_5" required></textarea>
              <label>Prefference Area that you can donate.</label>
            </div>
            <div className="col-md-12 text-md-center">
              <button type="submit" className="w-full btn bg-sky-500 text-white cs_fs_24 cs_semibold">Register as Donner</button>
            </div>
          </form>
        </div>
        <div className="cs_height_120 cs_height_lg_80"></div>
      </section>
    </div>
  )
}
