import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {  toast, Toaster } from "react-hot-toast";

export default function AddDoctor() {
  const [formData, setFormData] = useState({
    slots: Array().fill(''), // Initial 5 empty slots
    onlineSlots: Array().fill(''), // Initial 5 empty online slots
  });
  const [file, setFile] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deptData, setDeptData] = useState([]);
  const [specialistsItems, setSpecialistsItems] = useState([]);
  const navigate = useNavigate();

 
 
 console.log("Data: ", formData);

  useEffect(() => {
    const getDepartment = async () => {
      try {
        const res = await fetch("/department.json");
        const data = await res.json();
        setDeptData(data);
      } catch (error) {
        console.log('Error fetching departments:', error.message);
      }
    };
    getDepartment();
  }, []);


  useEffect(() =>{
    const getSpecialLists = async () =>{
      try {
        const res = await fetch("/special.json")
        const data = await res.json();
        setSpecialistsItems(data);
      }catch(error){
        console.log("Error in fetching", error)
      }
    } ;
    getSpecialLists();
  },[])

  const handleChange = (e) => {
    e.preventDefault()
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [e.target.id] : e.target.value
    })
    if (id === "department") {
      const selectedDept = deptData.find((dept) => dept.deptname === value);
    }
    if(id === "specialty"){
      const selectedSpecial = specialistsItems.find((item) => item.sname === value)    
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };


  const handleGenderChange = (e) => {
    setFormData({
      ...formData,
      gender: e.target.value,
    });
  };
  

  /* Slots section */
  const handleSlotChange = (index, value) => {
    const newSlots = [...formData.slots];
    newSlots[index] = value;
    setFormData({ ...formData, slots: newSlots });
  };
  
  // Optionally add more slots dynamically
  const addNewSlot = () => {
    setFormData({
      ...formData,
      slots: [...formData.slots,'']
    });
  };


/* Online Slots */
  const handleOnlineSlotChange = (index, value) => {
    const newOnlineSlots = [...formData.onlineSlots];
    newOnlineSlots[index] = value;
    setFormData({ ...formData, onlineSlots: newOnlineSlots });
  };
  
  // Optionally add more online slots dynamically
  const addNewOnlineSlot = () => {
    setFormData({
      ...formData,
      onlineSlots: [...formData.onlineSlots, ''] 
    });
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      
      const formDataToSend = new FormData();
      formDataToSend.append("username", formData.username);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("bmdc", formData.bmdc);
      formDataToSend.append("department", formData.department);
      formDataToSend.append("designation", formData.designation);
      formDataToSend.append("qualification", formData.qualification);
      formDataToSend.append("specialty", formData.specialty);
      formDataToSend.append("address", formData.address);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("appointmentnumber", formData.appointmentnumber);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("advPrice", formData.advPrice);
      formDataToSend.append("time", formData.time);
      formDataToSend.append("gender", formData.gender);
      formDataToSend.append("institute", formData.institute);
      formDataToSend.append("password", formData.password);



      
      formDataToSend.append("slots", JSON.stringify(formData.slots));
      //console.log("SLots: ",formDataToSend)

      formDataToSend.append("onlineSlots", JSON.stringify(formData.onlineSlots));
      //console.log("Online SLots: ", formDataToSend)

        
      if (file) {
        formDataToSend.append("avatar", file);
      }
    

      console.log('Form data: ', formDataToSend);
      const res = await fetch('https://health-care-server-0t0x.onrender.com/api/auth/doctorsignup', {
        method: 'POST',
        body: formDataToSend,
      });
      
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      toast.success("Doctor Registration successfully Complete!", {
        position: "top-center",
        duration: 5000,
        style: {
          background: "#4CAF50",
          color: "white",
        },
      });
      
      setLoading(false);
      setError(null);
      navigate('/dashboard/doctors');
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  }; 

  return (
    <div>
      <div className="max-w-full py-2">
        <h1 className="text-4xl font-semibold text-center my-10 uppercase">Register a New Doctor</h1>
        <div className="lg:flex justify-around">
          <div className="lg:w-2/5 my-2">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              
              <input
                type="text"
                id="username"
                placeholder="Username"
                onChange={handleChange}
                className="border p-3 rounded-lg"
                required
              />

              <input
                type="email"
                id="email"
                placeholder="Email"
                onChange={handleChange}
                className="border p-3 rounded-lg"
                required
              />

              {/* BMDC & Department */}
              <div className="flex gap-2"> 
                <div className="w-1/2">
                  <input
                    type="text"
                    id="bmdc"
                    placeholder="BMDC - CODE"
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg"
                    maxLength={7}
/*                     pattern="/[a-zA-Z][a-zA-Z0-9]*$/" */
                    required
                  />
                </div>
                <div className="w-1/2">
                 
                  <select id="department" onChange={handleChange} className="input input-bordered w-full" required >
                    <option value="">Choose department</option>
                    {deptData?.map((dept, index) => (
                      <option key={index} value={dept?.deptname}>{dept?.deptname}</option>
                    ))}
                  </select>
                </div>
              </div>

                {/* Designation & qualification */}
              <div className="flex gap-2">
                <div className="w-1/2">
                  <select id="designation" onChange={handleChange} className="select select-bordered w-full border rounded-lg" required>
                    <option  defaultValue>Choose Designation</option>
                    <option>Professor</option>
                    <option>Assistant Professor</option>
                    <option>Consultant</option>
                  </select>
                  
                </div>
                <div className="w-1/2">    
                  <input
                    type="text"
                    id="qualification"
                    placeholder="Qualification"
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg"
                    required
                  />
                </div>
              </div>
              {/* specialty & address */}
              <div className="flex gap-2">
                <div className="w-1/2">
                  
                  <select id="specialty" onChange={handleChange} className="input input-bordered w-full" required >
                    <option value="">Choose specialty</option>
                    {specialistsItems?.map((item, index) => (
                      <option key={index} value={item?.sname}>{item?.sname}</option>
                    ))}
                  </select>
                </div>
                <div className="w-1/2">    
                  <input
                    type="text"
                    id="address"
                    placeholder="Address"
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg"
                    defaultValue='Plot 81, Block-E, Bashundhara Rd, Dhaka 1229'
                    required
                  />
                </div>
              </div>
                {/* phone & appointmentnumber */}
              <div className="flex gap-2">
                <div className="w-1/2">
                  <input
                    type="number"
                    id="phone"
                    placeholder="Contact Number"
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg"
                    required
                  />
                </div>
                <div className="w-1/2">
                  <input
                    type="text"
                    id="appointmentnumber"
                    placeholder="Appointment Number"
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg"
                    defaultValue='+09666710678'
                    
                    required
                  />
                </div>
              </div>
              {/* price & time */}
              <div className="flex gap-2">
                <div className="w-1/2">
                  <input
                    type="number"
                    id="price"
                    placeholder="Charge per Visit"
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg"
                    required
                  />
                </div>
                <div className="w-1/2 ">
                   <select id="time" onChange={handleChange} className="select select-bordered w-full border rounded-lg" required>
                    <option  defaultValue>Choose Available Time & Day</option>
                    <option>Sat,Sun,Mon,Tues(5.00PM - 10.30PM)</option>
                    <option>Sat,Tues,Wed,fri(5.00PM - 10.30PM)</option>
                    <option>Sun,Tues,Wed,Fri(5.00PM - 10.30PM)</option>
                    <option>Mon,Tues,Thus,Fri(6.00PM - 11.30PM)</option>
                    
                  </select>
                </div>
              </div>
              {/* gender & Advance payment rate */}
              <div className="flex">
                <div className="flex flex-col lg:flex-row lg:gap-4 items-center lg:w-2/3">
                  <h1 className="lg:w-1/3 text-left text-2xl font-semibold">Gender :</h1>
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

                <div className="w-2/3">
                  <input
                    type="number"
                    id="advPrice"
                    placeholder="Advance Charge per Visit"
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg"
                    defaultValue={500}
                    required
                    
                  />
                </div>
              </div>

              <input
                type="text"
                id="institute"
                placeholder="Institute"
                onChange={handleChange}
                className="border p-3 rounded-lg"
                required
              />

              {/* Face to face meet-up slots */}
              <div>
                <h3 className="font-semibold">Face to Face Meet-up Slots</h3>
                <div className="flex flex-wrap gap-3">
                  {formData.slots.map((slot, index) => (
                    <div key={index} className="w-1/3 p-2">
                      <input
                        type="text"
                        value={slot}
                        placeholder={`Slot ${index + 1}`}
                        onChange={(e) => handleSlotChange(index, e.target.value)}
                        className="border p-3 rounded-lg"
                        required
                      />
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={addNewSlot}
                  className="bg-blue-500 text-white p-2 rounded-lg mt-2"
                >
                  Add More Slot
                </button>
              </div>

              {/* Online Meet Up sLots */}
              
              <div>
                <h3 className="font-semibold mb-2">Online Slots</h3>
                <div className="flex flex-wrap gap-3">
                {formData.onlineSlots.map((onlineSlot, index) => (
                  <div key={index} className="w-1/3 p-2">
                    <input
                      type="text"
                      value={onlineSlot}
                      placeholder={`Online Slot ${index + 1}`}
                      onChange={(e) => handleOnlineSlotChange(index, e.target.value)}
                      className="border p-3 rounded-lg w-full"
                      required
                    />
                  </div>
                ))}
                </div>
                <button
                  type="button"
                  onClick={addNewOnlineSlot}
                  className="bg-blue-500 text-white p-2 rounded-lg mt-2"
                >
                  Add More Online Slot
                </button>
              </div>


                {/* Password section */}
              <input
                type="password"
                id="password"
                placeholder="Password"
                onChange={handleChange}
                className="border p-3 rounded-lg"
                required
              />

              {/* Profile section */}
              <input
                type="file"
                id="avatar"
                onChange={handleFileChange}
                className="border p-3 rounded-lg"
                required
              />

              <button
                disabled={loading}
                className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-75 disabled:opacity-65"
              >
                {loading ? 'Loading...' : 'Register Doctor'} 
              </button>
            </form>
            {error && <p className="text-red-500">{error.message}</p>}
          </div>
        </div>
      </div>
      <Toaster position="center-top"/>
    </div>
  )
}
