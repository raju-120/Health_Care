import { useState } from "react";
import { Link } from "react-router-dom";
import DoctorsLogo from '../assets/absec.jpg';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import app from "../firebase/firebase";


export default function DoctorsSIgnUp() {

  const [formData, setFormData] = useState({
    avatar: [],
  });
  const [files, setFiles] = useState([]);
  const [upload, setUpload] = useState(false);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [loading, setLoading]= useState(false);
  const [error, setError] = useState(false);
  
  console.log(formData);
  console.log(files);

  const handleChange = (e) =>{
    setFormData({
      ...formData,
      [e.target.id] : e.target.value,
    });
  };

  const handleImageUpload = () =>{
    if(files.length >0 && files.length + formData.avatar.length < 2) {
     
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
    console.log(formData)
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



            <input 
              type="text" 
              id="specialty" 
              placeholder='Specialty' 
              onChange={handleChange}
              className='border p-3 rounded-lg' 
            />

            <input 
              type="text" 
              id="qualifications" 
              placeholder='Qualification' 
              onChange={handleChange}
              className='border p-3 rounded-lg' 
            />

            <input 
              type="text" 
              id="designation" 
              placeholder='Designation' 
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
              type="text" 
              id="department" 
              placeholder='Department' 
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
              type="number" 
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
              className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-75 disabled:opacity-65'>
                Doctor Sign Up
            </button>
            
            </form>
            
            
            <p className='text-lg mt-2'> Already register as a Doctor? Please 
                <Link to='/doctors-sign-up'>
                  <span className='text-blue-500 ml-2 font-semibold uppercase'>Log-In</span>
                </Link>
            </p>
            
            {/* {error && <p className="text-red-500">{error}</p>} */}
          </div>
        </div>
      </div>
    </div>
  )
}
