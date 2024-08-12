import { useEffect, useState } from "react"
/* import DoctorsCard from "./DoctorsCard";

import Icons5 from '../../assets/images/icons/envelop_icon.png'; */

export default function Doctors() {


  /* const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); */
/*   const [formData, setFormData] = useState({});
  const [deptData, setDeptData] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDoctorSlots, setSelectedDoctorSlots] = useState([]);
  const [doctorBill, setDoctorBill] = useState(0);
  const [selectedDate, setSelectedDate] = useState("");
  const [fullyBooked, setFullyBooked] = useState(false);
  const [appointmentSlots, setAppointmentSlots] = useState([]); */
  /* const [allData, setAllData] = useState([]);
  const [deptData, setDeptData] = useState([]);
  const [selectedDept, setSelectedDept] = useState(null);
  const [filteredDept, setFilteredDept] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); */
 


  /* useEffect(() => {
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
          setAllData(data.data);
        }
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    getAllDoctor(); 
  }, []); */
/* 
  console.log(allData); 

  useEffect(() =>{
    fetch('/api/auth/doctors')
    .then(res => res.json())
    .then(data => setAllData(data))
  },[]) */
  /* useEffect(() =>{
    fetch('department.json')
    .then(res => res.json())
    .then(data => setAllData(data))
  },[])  */

  /* const handleChange = (e) => {
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
  }; */

  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedDept, setSelectedDept] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  
 console.log(allData);

  useEffect(() => {
    // Fetch departments data from the backend
    fetch('/api/auth/departments')
      .then(res => res.json())
      .then(data => {
        setAllData(data);
        setFilteredData(data);
      });
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredData(
      allData.filter(dept => dept.deptname.toLowerCase().includes(term))
    );
  };

  const handleDepartmentClick = (deptId) => {
    // Fetch doctors by department ID
    fetch(`/api/auth/doctors?deptId=${deptId}`)
      .then(res => res.json())
      .then(data => {
        setDoctors(data);
        setSelectedDept(deptId); // Show modal
      });
  };

  const closeModal = () => {
    setSelectedDept(null); // Close modal
  };


  return (
    <div className="mt-36">
    <div className="text-center">
      <h1 className="text-2xl font-semibold">
        Find your Doctors by the <span className="text-green-800">Department</span>
      </h1>

      {/* Search section */}
      <section className="cs_newsletter_1_wrap mb-24 mt-5">
        <div className="container lg:max-w-[1250px]">
          <div className="cs_newsletter cs_style_1 cs_accent_bg_v1">
            <input
              type="text"
              placeholder="Search by the Department"
              className="input input-bordered w-full"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>
      </section>

      {/* Departments display as cards */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:m-24">
        {filteredData.map((dept, index) => (
          <div
            key={index}
            className="card bg-white shadow-lg p-5 cursor-pointer"
            onClick={() => handleDepartmentClick(dept.id)}
          >
            <h2 className="text-xl font-semibold">{dept.deptname}</h2>
          </div>
        ))}
      </div>
    </div>

    {/* Modal to display doctors */}
    {selectedDept && (
      <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg max-w-lg w-full">
          <h2 className="text-xl font-semibold mb-4">Doctors in {filteredData.find(dept => dept.id === selectedDept)?.deptname}</h2>
          <button onClick={closeModal} className="absolute top-4 right-4 text-gray-600">Close</button>
          <div>
            {doctors.map((doctor, index) => (
              <div key={index} className="mb-2">
                <p>{doctor.name}</p>
                <p>{doctor.specialty}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    )}
  </div>

  )
}
/* <div className="mt-36">
      <div className="text-center">
        <h1 className="text-2xl font-semibold">Find your Doctors by the <span className="text-green-800">Department</span></h1>
        
       

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


        

      </div>
     {/*  <div className='grid gap-6 grid-cols-1 md:grid-col-2 lg:grid-cols-3 lg:m-24'>
          {allData?.map((data) =>
          <DoctorsCard
            key={data?.id}
            data= {data}
          ></DoctorsCard>)}
      </div>  *
    </div> */