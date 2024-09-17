import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import {  toast, Toaster } from "react-hot-toast";


function Appointments() {
  const { currentUser } = useSelector((state) => state.user);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctorSlots, setSelectedDoctorSlots] = useState([]);
  const [doctorBill, setDoctorBill] = useState(0);
  const [doctorAdvBill, setDoctorAdvBill] = useState(0);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedDept, setSelectedDept] = useState("");
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [appointmentSlots, setAppointmentSlots] = useState([]); // Booked slots
  const [fullyBooked, setFullyBooked] = useState(false); // Track full bookings
  const [minDate, setMinDate] = useState("");
  const [maxDate, setMaxDate] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  
   
  const [deptData, setDeptData] = useState([]);
  const navigate = useNavigate();
  
  const [select, setSelect] = useState({
    isAgrre: false, //check box
  })


  console.log("formdata: ", formData);
  //console.log("Booked: ", fullyBooked.lenght)
  //console.log("Selected Doctors : ", selectedDoctor);
  //console.log("Department : ", deptData);
  

  //date blured function
  useEffect(() => {
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 6);

    const formatDate = (date) => {
      let day = String(date.getDate()).padStart(2, '0');
      let month = String(date.getMonth() + 1).padStart(2, '0'); 
      let year = date.getFullYear();
      return `${year}-${month}-${day}`;
    };

    setMinDate(formatDate(today));
    setMaxDate(formatDate(nextWeek));
  }, []);

  //Doctor fetching

  useEffect(() => {
    const getDoctor = async () => {
      try {
        const res = await fetch("/api/auth/doctors");
        const data = await res.json();
        setDoctors(data);
      } catch (error) {
        console.log('Error fetching departments:', error.message);
      }
    };
    getDoctor();
  }, []);

  useEffect(() => {
    const getDepartment = async () => {
      try {
        const res = await fetch("/api/auth/departments");
        const data = await res.json();
        setDeptData(data);
      } catch (error) {
        console.log('Error fetching departments:', error.message);
      }
    };
    getDepartment();
  }, []);

  //formData changing
  const handleChange = (e) => {
    e.preventDefault();
    const { id, value } = e.target;
    console.log({value})
    
      if (id === "name") {
        const regex = /^[A-Za-z\s]*$/;
        if (regex.test(value)) {
          setError('');
          setFormData({ ...formData, [id]: value });
        } else {
          setError('Please enter only alphabetic characters and spaces');
          setFormData({ ...formData, [id]: value.replace(/[^A-Za-z\s]/g, '') });
        }
      } 
      else {
        setFormData({
          ...formData,
          [id]: value,
         
        });
        if (id === 'department') {
          setSelectedDept(value);
        } else if (id === 'doctor') {
          const doctor = doctors?.data?.find(doc => doc?.username === value);
          setSelectedDoctor(doctor);
          setDoctorBill(doctor?.price ||'');
          setDoctorAdvBill(doctor?.advPrice || '');
          
          // Update formData to include doctorId
          setFormData(prevState => ({
              ...prevState,  
              docId: doctor?._id,     
              price: select.meeting === 'face-to-face' ?  doctor?.advPrice : doctor?.price ,
          }));
        
        }
      
    }
  };

  useEffect(() => {
    if (selectedDept) {
      const filtered = doctors?.data?.filter(doctor => doctor.department === selectedDept);
      setFilteredDoctors(filtered);
    } else {
      setFilteredDoctors([]);
    }
  }, [selectedDept, doctors]);

  const handleGenderChange = (e) => {
    setFormData({
      ...formData,
      gender: e.target.value,
    });
  };

  const handleMettingChange = (e) => {
  
  const meetingType = e.target.value;
  setSelect({
    ...select,
    meeting: meetingType,
  });

 
  setFormData(prevState => ({
    ...prevState,
    meeting: meetingType,
    price: meetingType === 'face-to-face' ? selectedDoctor?.advPrice : selectedDoctor?.price,
  }));
};

  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const appointmentData = {
      ...formData,
      permission: 'progress',
      docapprove: 'pending',
      /* price: formData.bill, */
      uId: currentUser?.data?.user?._id,
      doctorId: formData.docId,
      email: currentUser?.data?.user?.email,
      meeting: formData.meeting,
    };

    try {
      setLoading(true);
      const res = await fetch('/api/appointment/bookings', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(appointmentData),
      });

      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        toast.error("Something missing");
      }
      toast.success("Appointment submit successfully!", {
        position: "top-center",
        duration: 5000,
        style: {
          background: "#4CAF50",
          color: "white",
        },
      });
      setLoading(false);
      setError(null);
      navigate('/dashboard');
      
    } catch (error) {
      console.error('Error creating appointment:', error);
    }

    setFormData({
      department: formData.department,
      doctor: formData.doctor,
    });
    setSelectedDoctor(null);
    setSelectedDoctorSlots([]);
    setDoctorBill(0);
    setDoctorAdvBill(0);
    setSelectedDate("");
    setFullyBooked(false);
  };
  //console.log("Selected Doc Time: ", selectedDoctor?.slots);
  
  
  /* const filteredTimeSlots = selectedDoctorSlots?.filter(slots =>
    !appointmentSlots.includes(slots) ,
  );
  //console.log("SLots: ", filteredTimeSlots);

  useEffect(() => {
    if (selectedDate && filteredTimeSlots.length === 0) {
      setFullyBooked(true);
    } else {
      setFullyBooked(false);
    }
  }, [selectedDate, filteredTimeSlots, appointmentSlots]); */

  return (
    <div className="max-w-auto lg:p-5 mt-16 lg:mt-5 flex flex-col items-center">
      <h1 className="mt-5 text-4xl text-center font-semibold">Make Appointment</h1>
      <div className="lg:p-10 text-center w-full flex justify-center mt-5">
        <form className="flex flex-col items-center w-full max-w-4xl p-5 bg-gray-100 rounded-2xl" onSubmit={handleSubmit}>

          {/* Patient Name */}
          <div className="flex flex-col lg:flex-row lg:gap-4 items-center lg:w-2/3 mt-5">
            <h1 className="lg:w-1/3 text-left">Patient Name:</h1>
            <div className="lg:w-2/3">
            <input 
              type="name" 
              placeholder="Full Name" 
              id="name" 
              className="input input-bordered w-full"
              required 
              /* pattern="[A-Za-z\s]+"
              title="Please enter only alphabetic characters and spaces" */
              value={formData.name || ''}
              onChange={handleChange} />
              {error && <p className="text-red-500 mt-4">{"Please enter only alphabetic characters"}</p>}
            </div>
          </div>

          {/* Date of Birth */}
          <div className="flex flex-col lg:flex-row lg:gap-4 items-center lg:w-2/3 mt-5">
            <h1 className="lg:w-1/3 text-left">Date of Birth:</h1>
            <div className="lg:w-2/3">
              <input 
                type="date" 
                id="dateOfBirth" 
                onChange={handleChange} 
                max={new Date().toISOString().split("T")[0]}  // Set max date to today
                className="input input-bordered w-full"
                required 
              />
            </div>
          </div>

          {/* Gender */}
          <div className="flex flex-col lg:flex-row lg:gap-4 items-center lg:w-2/3 mt-5">
            <h1 className="lg:w-1/3 text-left">Gender :</h1>
            <div className="lg:w-2/3">
              <div className="flex gap-4">
                <label className="flex items-center">
                  <span>Male</span>
                  <input type="radio" name="gender" value="Male" className="m-2" onChange={handleGenderChange} required />
                </label>
                <label className="flex items-center">
                  <span>Female</span>
                  <input type="radio" name="gender" value="Female" className="m-2" onChange={handleGenderChange} required />
                </label>
              </div>
            </div>
          </div>

          {/* Mobile */}
          <div className="flex flex-col lg:flex-row lg:gap-4 items-center lg:w-2/3 mt-5">
            <h1 className="lg:w-1/3 text-left">Mobile :</h1>
            <div className="lg:w-2/3">
              <input type="number" placeholder="Number" id="phone" onChange={handleChange} className="input input-bordered w-full" required />
            </div>
          </div>

          {/* Meeting */}
          <div className="flex flex-col lg:flex-row lg:gap-4 items-center lg:w-2/3 mt-5">
            <h1 className="lg:w-1/3 text-left">Meeting :</h1>
            <div className="lg:w-2/3">
              <div className="flex gap-4">
                <label className="flex items-center">
                  <span>Face to Face</span>
                  <input type="radio" name="meeting" value="face-to-face" className="m-2" onChange={handleMettingChange} required />
                </label>
                <label className="flex items-center">
                  <span>Online</span>
                  <input type="radio" name="meeting" value="online" className="m-2" onChange={handleMettingChange} required />
                </label>
              </div>
            </div>
          </div>

          {
            select.meeting === 'face-to-face' && 
            (
              <>
                {/* Department */}
                <div className="flex flex-col lg:flex-row lg:gap-4 items-center lg:w-2/3 mt-5">
                  <h1 className="lg:w-1/3 text-left">Department :</h1>
                  <div className="lg:w-2/3">
                    <select id="department" onChange={handleChange} className="input input-bordered w-full" required >
                      <option value="">Choose department</option>
                      {deptData?.map((dept, index) => (
                        <option key={index} value={dept?.deptname}>{dept?.deptname}</option>
                      ))}
                    </select>
                  </div>
                </div>

                 {/* Doctor */}     
                <div className="flex flex-col lg:flex-row lg:gap-4 items-center lg:w-2/3 mt-5">
                    <h1 className="lg:w-1/3 text-left">Doctor :</h1>
                    <div className="lg:w-2/3">
                      <select id="doctor" onChange={handleChange} className="input input-bordered w-full" required >
                        <option value="">Choose doctor</option>
                        {filteredDoctors?.map((doctor) => (
                          <option key={doctor?._id} value={doctor?.username}>
                            {doctor?.username}
                          </option>
                        ))}
                      </select>
                    </div>
                </div>

                {/* Appointment Date */}
                <div className="flex flex-col lg:flex-row lg:gap-4 items-center lg:w-2/3 mt-5">
                  <h1 className="lg:w-1/3 text-left">Appointment Date :</h1>
                  <div className="lg:w-2/3">
                    <input 
                      type="date" 
                      id="date" 
                      min={minDate}
                      max={maxDate}
                      onChange={handleChange}
                      className="input input-bordered w-full" 
                      required 
                    />
                  </div>
                </div>

                {/* Time */}
               {/* {selectedDoctor && (
                  <div className="flex flex-col lg:flex-row lg:gap-4 items-center lg:w-2/3 mt-5">
                    <h1 className="lg:w-1/3 text-left">Time :</h1>
                    <div className="lg:w-2/3">
                      {fullyBooked ? (
                        <p className="text-red-500">All slots for this date are booked. Please choose another date.</p>
                        
                      ) : (
                        <select id="appointmentSlots" onChange={handleChange} className="input input-bordered w-full" required >
                          <option value="">Choose Time Slot</option>
                          {selectedDoctor?.slots.map((slot, index) => (
                            <option key={index} value={slot}>{slot}</option>
                          ))}
                        </select>
                      )}
                    </div>
                  </div>
                )} */}

                {/* Doctors Bill */}
                <div className="flex flex-col lg:flex-row lg:gap-4 items-center lg:w-2/3 mt-5">
                  <h1 className="lg:w-1/3 text-left">Advance Bill:</h1>
                  <div className="lg:w-2/3">
                    <input type="text" id="price" onChange={handleChange} value={`$ ${doctorAdvBill}`} readOnly className="input input-bordered w-full bg-gray-200" required />
                  </div>
                </div>
              </>
            )
          }

          {
            select.meeting === 'online' && 
            (
              <>
                {/* Department */}
                <div className="flex flex-col lg:flex-row lg:gap-4 items-center lg:w-2/3 mt-5">
                  <h1 className="lg:w-1/3 text-left">Department :</h1>
                  <div className="lg:w-2/3">
                    <select id="department" onChange={handleChange} className="input input-bordered w-full" required >
                      <option value="">Choose department</option>
                      {deptData?.map((dept, index) => (
                        <option key={index} value={dept?.deptname}>{dept?.deptname}</option>
                      ))}
                    </select>
                  </div>
                </div>

                 {/* Doctor */}     
                <div className="flex flex-col lg:flex-row lg:gap-4 items-center lg:w-2/3 mt-5">
                    <h1 className="lg:w-1/3 text-left">Doctor :</h1>
                    <div className="lg:w-2/3">
                      <select id="doctor" onChange={handleChange} className="input input-bordered w-full" required >
                        <option value="">Choose doctor</option>
                        {filteredDoctors?.map((doctor) => (
                          <option key={doctor?._id} value={doctor?.username}>
                            {doctor?.username}
                          </option>
                        ))}
                      </select>
                    </div>
                </div>

                {/* Appointment Date */}
                <div className="flex flex-col lg:flex-row lg:gap-4 items-center lg:w-2/3 mt-5">
                  <h1 className="lg:w-1/3 text-left">Appointment Date :</h1>
                  <div className="lg:w-2/3">
                    <input 
                      type="date" 
                      id="date" 
                      min={minDate}
                      max={maxDate}
                      onChange={handleChange}
                      className="input input-bordered w-full" 
                      required 
                    />
                  </div>
                </div>

                {/* Time */}
                {/* {selectedDoctor && (
                  <div className="flex flex-col lg:flex-row lg:gap-4 items-center lg:w-2/3 mt-5">
                    <h1 className="lg:w-1/3 text-left">Time :</h1>
                    <div className="lg:w-2/3">
                      {fullyBooked ? (
                        <p className="text-red-500">All slots for this date are booked. Please choose another date.</p>
                      ) : (
                        <select id="appointmentSlots" onChange={handleChange} className="input input-bordered w-full" required >
                          <option value="">Choose Time Slot</option>
                          {filteredTimeSlots.map((slot, index) => (
                            <option key={index} value={slot}>{slot}</option>
                          ))}
                        </select>
                      )}
                    </div>
                  </div>
                )}  */}

                {/* Doctors Bill */}
                <div className="flex flex-col lg:flex-row lg:gap-4 items-center lg:w-2/3 mt-5">
                  <h1 className="lg:w-1/3 text-left">Doctors Bill:</h1>
                  <div className="lg:w-2/3">
                    <input 
                      type="text" 
                      id="price" 
                      onChange={handleChange} 
                      value={`$ ${doctorBill}`} 
                      readOnly 
                      className="input input-bordered w-full bg-gray-200" 
                      required 
                    />
                  </div>
                </div>
              </>
            )
          }

          

          {/* Submit Button */}
          <button type="submit" className="mt-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            {loading ? 'Submitting...' : 'Submit'}
          </button>
          {error && <p className="text-red-500 mt-4">{error?.message}</p>}
        </form>
      </div>
      <Toaster position="center-top"/>
    </div>
  );
}

export default Appointments;
