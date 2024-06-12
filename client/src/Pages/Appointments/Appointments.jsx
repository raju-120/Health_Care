import { useState } from "react"

function Appointments() {

  const [formData, setFormData] = useState({});
  console.log(formData)

  const handleChange = (e) =>{
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.id] : e.target.value
    });
  }

  return (
    <div className="max-w-auto p-5 flex flex-col items-center">
      <h1 className="mt-5 text-4xl text-center font-semibold">Make Appointment</h1>
      <div className="lg:p-10 text-center w-full flex justify-center mt-5">
        <form className="flex flex-col items-center w-full max-w-4xl p-5 bg-gray-100  rounded-lg">
          {/* Patient Name */}
          <div className="flex flex-col lg:flex-row lg:gap-4 items-center lg:w-2/3 mt-5">
            <h1 className="lg:w-1/3 text-left">Patient Name:</h1>
            <div className="lg:w-2/3"><input type="text" placeholder="Full Name" id="name" className="input input-bordered w-full" onChange={handleChange}/></div>
          </div>

          {/* Date of Birth */}
          <div className="flex flex-col lg:flex-row lg:gap-4 items-center lg:w-2/3 mt-5">
            <h1 className="lg:w-1/3 text-left">Date of Birth:</h1>
            <div className="lg:w-2/3"><input type="date" id="date" onChange={handleChange} className="input input-bordered w-full" /></div>
          </div>

          {/* Gender */}
          <div className="flex flex-col lg:flex-row lg:gap-4 items-center lg:w-2/3 mt-5">
            <h1 className="lg:w-1/3 text-left">Gender :</h1>
            <div className="lg:w-2/3">
              <div className="flex gap-4">
                <label className="flex items-center">
                  <span>Male</span>
                  <input type="radio" name="gender" className="m-2" id="male" onChange={handleChange}/>
                </label>
                <label className="flex items-center">
                  <span>Female</span>
                  <input type="radio" name="gender" className="m-2" id="female" onChange={handleChange} />
                </label>
              </div>
            </div>
          </div>

          {/* Mobile */}
          <div className="flex flex-col lg:flex-row lg:gap-4 items-center lg:w-2/3 mt-5">
            <h1 className="lg:w-1/3 text-left">Mobile :</h1>
            <div className="lg:w-2/3"><input type="number" placeholder="Number" id="phone" onChange={handleChange} className="input input-bordered w-full" /></div>
          </div>

          {/* Requested For */}
          <div className="flex flex-col lg:flex-row lg:gap-4 items-center lg:w-2/3 mt-5">
            <h1 className="lg:w-1/3 text-left">Requested For :</h1>
            <div className="lg:w-2/3"><input type="text" placeholder="Consultant" id="request" onChange={handleChange} className="input input-bordered w-full" /></div>
          </div>

          {/* Specialty for Consultant */}
          <div className="flex flex-col lg:flex-row lg:gap-4 items-center lg:w-2/3 mt-5">
            <h1 className="lg:w-1/3 text-left">Specialty for Consultant :</h1>
            <div className="lg:w-2/3"><input type="text" placeholder="Choose specialty" id="specialty" onChange={handleChange} className="input input-bordered w-full" /></div>
          </div>

          {/* Doctor */}
          <div className="flex flex-col lg:flex-row lg:gap-4 items-center lg:w-2/3 mt-5">
            <h1 className="lg:w-1/3 text-left">Doctor :</h1>
            <div className="lg:w-2/3"><input type="text" placeholder="Doctor Name" id="doctor" onChange={handleChange} className="input input-bordered w-full" /></div>
          </div>

          {/* Time */}
          <div className="flex flex-col lg:flex-row lg:gap-4 items-center lg:w-2/3 mt-5">
            <h1 className="lg:w-1/3 text-left">Time :</h1>
            <div className="lg:w-2/3"><input type="time" id="time" onChange={handleChange} className="input input-bordered w-full" /></div>
          </div>

          <div className="mt-5"></div>

        </form>
      </div>
    </div>


  )
}

export default Appointments