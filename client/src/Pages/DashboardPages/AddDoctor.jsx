import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddDoctor() {
  const [formData, setFormData] = useState({});
  const [file, setFile] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deptData, setDeptData] = useState([]);
  const [specialistsItems, setSpecialistsItems] = useState([]);
  const navigate = useNavigate();

  console.log("List: ", deptData);
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


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

     
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  }; 

  /* const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      // Create a new FormData object
      const formDataToSend = new FormData();
      formDataToSend.append("username", formData.username);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("password", formData.password);
      formDataToSend.append("role", "admin");
      if (file) {
        formDataToSend.append("avatar", file);
      }
      console.log('Form data: ', formDataToSend);
      const res = await fetch('/api/auth/adminsignup', {
        method: 'POST',
        body: formDataToSend,
      });
      
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      
      setLoading(false);
      setError(null);
      navigate('/dashboard/adminlist');
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  }; */

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

              <div className="flex gap-2"> 
                <div className="w-1/2">
                  <input
                    type="text"
                    id="bmdc"
                    placeholder="BMDC - CODE"
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg"
                    maxLength={7}
                    pattern="/[a-zA-Z][a-zA-Z0-9]*$/"
                    required
                  />
                </div>
                <div className="w-1/2">
                  {/* <input
                    type="text"
                    id="department"
                    placeholder="Department"
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg"
                    /> */}
                  <select id="department" onChange={handleChange} className="input input-bordered w-full" required >
                    <option value="">Choose department</option>
                    {deptData?.map((dept, index) => (
                      <option key={index} value={dept?.deptname}>{dept?.deptname}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex gap-2">
                <div className="w-1/2">
                {/* <input
                    type="text"
                    id="designation"
                    placeholder="Designation"
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg"
                  /> */}
                  <select id="designation" onChange={handleChange} className="select select-bordered w-full border rounded-lg" required>
                    <option  defaultValue>Choose Designation</option>
                    <option>Professor</option>
                    <option>Associate Professor</option>
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
              
              <div className="flex gap-2">
                <div className="w-1/2">
                  {/* <input
                    type="text"
                    id="specialty"
                    placeholder="Specialty"
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg"
                  /> */}
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
                    required
                  />
                </div>
              </div>

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
                    type="number"
                    id="appointmentnumber"
                    placeholder="Appointment Number"
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg"
                    required
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <div className="w-1/2">
                  <input
                    type="number"
                    id="bill"
                    placeholder="Charge per Visit"
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg"
                    required
                  />
                </div>
                <div className="w-1/2 ">
                  {/* <input
                  type="text"
                  id="time"
                  placeholder="Appointment Number"
                  onChange={handleChange}
                  className="w-full border p-3 rounded-lg"
                  /> */}
                   <select id="time" onChange={handleChange} className="select select-bordered w-full border rounded-lg" required>
                    <option  defaultValue>Choose Available Time & Day</option>
                    <option>Sat,Sun,Mon,Tues(5.00PM - 10.30PM)</option>
                    <option>Sat,Tues,Wed,fri(5.00PM - 10.30PM)</option>
                    <option>Sun,Tues,Wed,Fri(5.00PM - 10.30PM)</option>
                    <option>Mon,Tues,Thus,Fri(6.00PM - 11.30PM)</option>
                    
                  </select>
                </div>
              </div>
              
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


              <input
                type="text"
                id="institute"
                placeholder="Institute"
                onChange={handleChange}
                className="border p-3 rounded-lg"
                required
              />

              <input
                type="password"
                id="password"
                placeholder="Password"
                onChange={handleChange}
                className="border p-3 rounded-lg"
                required
              />

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
            {error && <p className="text-red-500">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  )
}
