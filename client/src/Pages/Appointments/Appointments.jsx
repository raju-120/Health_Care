import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import {  toast, Toaster } from "react-hot-toast";

function Appointments() {
  const { currentUser } = useSelector(state => state.user);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [deptData, setDeptData] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDoctorSlots, setSelectedDoctorSlots] = useState([]);
  const [doctorBill, setDoctorBill] = useState(0);
  const [selectedDate, setSelectedDate] = useState("");
  const [fullyBooked, setFullyBooked] = useState(false);
  const [appointmentSlots, setAppointmentSlots] = useState([]);

  console.log("Current User: ", currentUser?.data?.user?.email);
  console.log("Current User: ", currentUser?.data?.user?._id);

  useEffect(() => {
    const getDepartment = async () => {
      try {
        const res = await fetch("department.json");
        const data = await res.json();
        setDeptData(data);
      } catch (error) {
        console.log('Error fetching departments:', error.message);
      }
    };
    getDepartment();
  }, []);

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

  const handleGenderChange = (e) => {
    setFormData({
      ...formData,
      gender: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);

    const updatedSlots = [...appointmentSlots, formData.appointmentSlots];
    setAppointmentSlots(updatedSlots);

  
    const appointmentData = {
      ...formData,
      permission: 'progress',
      price: doctorBill,
      uId: currentUser?.data?.user?._id,
      email: currentUser?.data?.user?.email,
    };

    console.log("Appointment Data to Submit:", appointmentData);

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
    setSelectedDate("");
    setFullyBooked(false);
  };

  const filteredTimeSlots = selectedDoctorSlots.filter(slot =>
    !appointmentSlots.includes(slot)
  );

  useEffect(() => {
    if (selectedDate && filteredTimeSlots.length === 0) {
      setFullyBooked(true);
    } else {
      setFullyBooked(false);
    }
  }, [selectedDate, filteredTimeSlots, appointmentSlots]);

  return (
    <div className="max-w-auto p-5 flex flex-col items-center">
      <h1 className="mt-5 text-4xl text-center font-semibold">Make Appointment</h1>
      <div className="lg:p-10 text-center w-full flex justify-center mt-5">
        <form className="flex flex-col items-center w-full max-w-4xl p-5 bg-gray-100 rounded-lg" onSubmit={handleSubmit}>

          {/* Patient Name */}
          <div className="flex flex-col lg:flex-row lg:gap-4 items-center lg:w-2/3 mt-5">
            <h1 className="lg:w-1/3 text-left">Patient Name:</h1>
            <div className="lg:w-2/3">
              <input type="text" placeholder="Full Name" id="name" className="input input-bordered w-full" onChange={handleChange} />
            </div>
          </div>

          {/* Date of Birth */}
          <div className="flex flex-col lg:flex-row lg:gap-4 items-center lg:w-2/3 mt-5">
            <h1 className="lg:w-1/3 text-left">Date of Birth:</h1>
            <div className="lg:w-2/3">
              <input type="date" id="dateOfBirth" onChange={handleChange} className="input input-bordered w-full" />
            </div>
          </div>

          {/* Gender */}
          <div className="flex flex-col lg:flex-row lg:gap-4 items-center lg:w-2/3 mt-5">
            <h1 className="lg:w-1/3 text-left">Gender :</h1>
            <div className="lg:w-2/3">
              <div className="flex gap-4">
                <label className="flex items-center">
                  <span>Male</span>
                  <input type="radio" name="gender" value="Male" className="m-2" onChange={handleGenderChange} />
                </label>
                <label className="flex items-center">
                  <span>Female</span>
                  <input type="radio" name="gender" value="Female" className="m-2" onChange={handleGenderChange} />
                </label>
              </div>
            </div>
          </div>

          {/* Mobile */}
          <div className="flex flex-col lg:flex-row lg:gap-4 items-center lg:w-2/3 mt-5">
            <h1 className="lg:w-1/3 text-left">Mobile :</h1>
            <div className="lg:w-2/3">
              <input type="number" placeholder="Number" id="phone" onChange={handleChange} className="input input-bordered w-full" />
            </div>
          </div>

          {/* Department */}
          <div className="flex flex-col lg:flex-row lg:gap-4 items-center lg:w-2/3 mt-5">
            <h1 className="lg:w-1/3 text-left">Department :</h1>
            <div className="lg:w-2/3">
              <select id="department" onChange={handleChange} className="input input-bordered w-full">
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
              <select id="doctor" onChange={handleChange} className="input input-bordered w-full">
                <option value="">Choose doctor</option>
                {doctors.map((doctor, index) => (
                  <option key={index} value={doctor.docname}>{doctor.docname}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Appointment Date */}
          <div className="flex flex-col lg:flex-row lg:gap-4 items-center lg:w-2/3 mt-5">
            <h1 className="lg:w-1/3 text-left">Appointment Date :</h1>
            <div className="lg:w-2/3">
              <input type="date" id="date" onChange={handleChange} className="input input-bordered w-full" />
            </div>
          </div>

          {/* Time */}
          {selectedDoctor && (
            <div className="flex flex-col lg:flex-row lg:gap-4 items-center lg:w-2/3 mt-5">
              <h1 className="lg:w-1/3 text-left">Time :</h1>
              <div className="lg:w-2/3">
                {fullyBooked ? (
                  <p className="text-red-500">All slots for this date are booked. Please choose another date.</p>
                ) : (
                  <select id="appointmentSlots" onChange={handleChange} className="input input-bordered w-full">
                    <option value="">Choose Time Slot</option>
                    {filteredTimeSlots.map((slot, index) => (
                      <option key={index} value={slot}>{slot}</option>
                    ))}
                  </select>
                )}
              </div>
            </div>
          )}

          {/* Doctors Bill */}
          <div className="flex flex-col lg:flex-row lg:gap-4 items-center lg:w-2/3 mt-5">
            <h1 className="lg:w-1/3 text-left">Doctors Bill:</h1>
            <div className="lg:w-2/3">
              <input type="text" id="price" onChange={handleChange} value={`$ ${doctorBill}`} readOnly className="input input-bordered w-full bg-gray-200" />
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" className="mt-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            {loading ? 'Submitting...' : 'Submit'}
          </button>
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </form>
      </div>
      <Toaster position="center-top"/>
    </div>
  );
}

export default Appointments;
