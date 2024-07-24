import { useEffect, useState } from "react"
import DoctorsCard from "./DoctorsCard";
import {useQuery} from 'react-query';

import Icons5 from '../../assets/images/icons/envelop_icon.png';

export default function Doctors() {


  /* const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); */
  const [formData, setFormData] = useState({});
  const [deptData, setDeptData] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDoctorSlots, setSelectedDoctorSlots] = useState([]);
  const [doctorBill, setDoctorBill] = useState(0);
  const [selectedDate, setSelectedDate] = useState("");
  const [fullyBooked, setFullyBooked] = useState(false);
  const [appointmentSlots, setAppointmentSlots] = useState([]);


 const [allData, setAllData] = useState([]); 
 console.log(allData);

  useEffect(() => {
    const getAllDoctor = async () => {
      try {
        const res = await fetch("/api/auth/doctors", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await res.json();
        if (!data.success) {
          console.log(data.message);
        } else {
          setAllData(data.data); // Assuming data contains a field 'data' with the list of doctors
        }
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    getAllDoctor(); // Call the function
  }, []);

  console.log(allData); 

  /* useEffect(() =>{
    fetch('/api/doctor/doctorlists')
    .then(res => res.json())
    .then(data => setAllData(data))
  },[])  */
  useEffect(() =>{
    fetch('department.json')
    .then(res => res.json())
    .then(data => setAllData(data))
  },[]) 

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
    <div className="mt-36">
      <div className="text-center">
        <h1 className="text-2xl font-semibold">Find your Doctors by the <span className="text-green-800">Department</span></h1>
        
        {/* Doctors search section by department */}

        <section className="cs_newsletter_1_wrap mb-24 mt-5">
          <div className="container lg:max-w-[1250px] ">
            <div className="cs_newsletter cs_style_1 cs_accent_bg_v1 ">
              <form  className="lg:ml-52 cs_newsletter_form lg:text-center">
                <select id="department" onChange={handleChange} className="input input-bordered w-full">
                  <option value="">Search by the Department</option>
                  {deptData?.map((dept, index) => (
                    <option key={index} value={dept?.deptname}>{dept?.deptname}</option>
                  ))}
                </select>
                <button type="submit" className="cs_btn cs_style_1 cs_fs_18 cs_medium cs_white_bg cs_accent_color_v1 bg-sky-900">Submit</button>
              </form>
            </div>
          </div>
        </section>


        {/* <div className="col-md-12 position-relative">
          <form className="cs_contact_form row cs_gap_y_24" id="cs_form">
            <div className="col-md-6 position-relative">
              <input type="text" name="fname"  className="cs_form_field cs_radius_5" required/>
              <label>First Name</label>
            </div>
            </form>
        </div>  */}

      </div>
      <div className='grid lg:grid-cols-3 sm:grid-cols-1 gap-6 lg:ml-24 lg:mr-24'>
          {allData?.map((data) =>
          <DoctorsCard
            key={data?._id}
            data= {data}
          ></DoctorsCard>)}
      </div> 
    </div>
  )
}
