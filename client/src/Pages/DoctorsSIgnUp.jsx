import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DoctorsLogo from '../assets/absec.jpg';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import app from "../firebase/firebase";
import toast from "react-hot-toast";


export default function DoctorsSIgnUp() {

  const [formData, setFormData] = useState({
    username:'',
    email:'',
    bmdc:'',
    specialty:'',
    qualification: '',
    designation:'',
    institute:'',
    department:'',
    phone: '',
    appointmentnumber:'',
    address:'',
    avatar: [], 
    password:''
  });
  const [files, setFiles] = useState([]);
  const [upload, setUpload] = useState(false);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [loading, setLoading]= useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  
  //console.log(formData);
  

  const handleChange = (e) =>{
    setFormData({
      ...formData,
      [e.target.id] : e.target.value,
    });
  };


  const handleImageUpload = () =>{
    if(files.length >0 && files.length ) {
     
      setUpload(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0 ; i< files.length ; i++){
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises).then((urls) =>{
        setFormData({
          ...formData, 
          avatar: formData.avatar.concat(urls) 
        }); 
        setUpload(false);
        setImageUploadError(false);
      }).catch((err) =>{
        setImageUploadError('Image upload failed(2MB max image)')
        setUpload(false);
        console.log(err);
      })
    } else{
      setImageUploadError('You can upload only one image');
      setUpload(false);
    }
  };

  const storeImage = async(file) =>{
    return new Promise((resolve, reject) =>{
      const storage = getStorage(app) ;
      const fileName = file.name;
      const storageRef = ref( storage , fileName );
      const uploadTask = uploadBytesResumable(storageRef , file);

      uploadTask.on(
        'state_changed',
        (snapshot) =>{
          const progress = (snapshot.bytesTransferred /snapshot.totalBytes) * 100;
          console.log((`Upload is ${progress}% done.`))
        },
        (error) =>{
          reject(error);
        },
        () =>{
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>{
            resolve(downloadURL);
          })
        }
      )

    })
  };

  const handleSubmit = async(e) =>{
    e.preventDefault();
    try{
      setLoading(true); 
      const res = await fetch('/api/auth/doctorsignup' , 
      {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if(data.success === false){
        setLoading(false);
        setError(data.message) 
        //console.log(data.message);
        toast.error("Something is missing");
      }
      setLoading(false);
      setError(null);
      toast.success("Doctor Sign up Successful");
      navigate('/doctor-signin') 
    }catch(error){
      setLoading(false);
      setError(error.message); 
      //console.log(error.message);
    }
  };


  return (
    <div>
      <div className="max-w-full py-5">
        <h1 className="text-4xl font-semibold text-center my-10 uppercase">Doctors Sign UP</h1>
        <div className="lg:flex justify-around">
          <div className="lg:ml-20">
            <img src={DoctorsLogo} alt="login-image" className="shadow-2xl rounded-xl " />
          </div>
          <div className="lg:w-2/5 my-2">
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>

            <input 
              type="text" 
              id="username"
              placeholder='username' 
              onChange={handleChange}
              className='border p-4 rounded-lg' 
              defaultValue="Dr. "
            />

            <input 
              type="email" 
              id="email" 
              placeholder='email' 
              onChange={handleChange}
              className='border p-3 rounded-lg' 
            />

            <input 
              type="text" 
              id="bmdc" 
              maxLength='9'
              minLength='7'
              placeholder='Bangladesh Medical & Dental Council License Number' 
              onChange={handleChange}
              className='border p-3 rounded-lg' 
            />
                            

            {/* <input 
              type="text" 
              id="specialty" 
              placeholder='Specialty' 
              onChange={handleChange}
              className='border p-3 rounded-lg' 
            /> */}

            <select id="specialty" onChange={handleChange} className="text-sm select select-bordered w-full">
              <option defaultValue>Please select your Specialty</option>
                <option>Anesthesiology (Pain) Specialist</option>
                <option>Breast Specialist</option>
                <option>Cancer Surgery Specialist</option>
                <option>Cardiology Specialist</option>
                <option>Chest & Asthma Specialist</option>
                <option>Child Specialist</option>
                <option>Colorectal Surgery (Female) Specialist</option>
                <option>Dental Specialist</option>
                <option>Endocrinology (Diabetes & Hormone) Specialist</option>
                <option>ENT Specialist</option>
                <option>Eye Specialist</option>
                <option>Neuro-opthalmologist</option>
                <option>Pediatric Hematologist</option>
                <option>Infertility Specialist</option>
                <option>Kidney Specialist</option>
                <option>Liver Specialist</option>
                <option>Medicine Specialist</option>
                <option>Neurology Specialist</option>
                <option> Neurosurgery Specialist </option>
                <option>Orthopedic Specialist</option>
                <option>Pediatric Orthopedic Surgeon</option>
                <option>Physiotherapy Specialist</option>
                <option>Sex Specialist</option>
                <option>Skin Specialist</option>
                <option>Urology Specialist</option>
            </select>


            <select id="designation" onChange={handleChange} className="text-sm select select-bordered w-full">
              <option defaultValue>Please select your Designation</option>
                <option>Professor</option>
                <option>Assistant Professor</option>
                <option>Consultant</option>
            </select>

            {/* <input 
              type="text" 
              id="designation" 
              placeholder='Designation' 
              onChange={handleChange}
              className='border p-3 rounded-lg' 
            /> */}

            

            {/* <input 
              type="text" 
              id="department" 
              placeholder='Department' 
              onChange={handleChange}
              className='border p-3 rounded-lg' 
            /> */}

            <select id="department" onChange={handleChange} className="text-sm select select-bordered w-full">
              <option defaultValue>Please select your Department</option>
                <option>Medicine & Nephrology</option>
                <option>Cardiology</option>
                <option>Respiratory / Pulmonology Medicine</option>
                <option>Psychiatry</option>
                <option>General Surgery</option>
                <option>Orthopedic Surgery (Knee)</option>
                <option>Spine Surgery</option>
                <option>Neuro Surgery</option>
                <option>Orthopedic Surgery</option>
                <option>Urology</option>
                <option>Gynaecology & Obstetrics</option>
                <option>Skin & Dermatology</option>
                <option>E.N.T</option>
                <option>Neurology</option>
                <option>Dental</option>
                <option>Neurology</option>
            </select>

            <input 
              type="text" 
              id="qualification" 
              placeholder='Qualification' 
              onChange={handleChange}
              className='border p-3 rounded-lg' 
            />

            <input 
              type="text" 
              id="institute" 
              placeholder='Institute-Name' 
              onChange={handleChange}
              className='border p-3 rounded-lg' 
            />
            

            <input 
              type="number" 
              id="phone" 
              placeholder='Personal Number' 
              onChange={handleChange}
              className='border p-3 rounded-lg' 
            />

            <input 
              type="text" 
              id="appointmentnumber" 
              placeholder='Appointment Number' 
              onChange={handleChange}
              className='border p-3 rounded-lg' 
            />

            <input 
              type="text" 
              id="address" 
              placeholder='Address' 
              onChange={handleChange}
              className='border p-3 rounded-lg' 
            />
 
            <div className="flex">
              
              <div>
                <input 
                  type="file" 
                  onChange={(e) => setFiles(e.target.files)}
                  id="image" 
                  accept="image/*"
                  className='border p-3 rounded-lg' 
                />
              </div>

              <div className="mx-2 bg-green-500 rounded-xl ">
                <button 
                  disabled={upload}
                  onClick={handleImageUpload}
                  className="text-center p-3 text-lg text-white"
                    >
                      {upload ? 'Uploading....' : 'Image Upload'}
                    </button>
              </div>
            </div>
            {imageUploadError && <p className="text-red-500">{imageUploadError}</p>}  
            


            <input 
              type="password" 
              id="password" 
              placeholder='password' 
              onChange={handleChange}
              className='border p-3 rounded-lg' 
            />


            <button 
              disabled={loading || upload}
              className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-75 disabled:opacity-65'>
                {loading ? 'Signing up..' : 'Doctor Sign Up'}
            </button>
            
            </form>
            
            
            <p className='text-lg mt-2'> Already register as a Doctor? Please 
                <Link to='/doctor-signin'>
                  <span className='text-blue-500 ml-2 font-semibold uppercase'>Log-In</span>
                </Link>
            </p>
            
            {error && <p className="text-red-500">{error}</p>} 
          </div>
        </div>
      </div>
    </div>
  )
}
