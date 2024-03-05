import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import app from '../firebase/firebase';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage';

export default function Profile() {
  
  const {currentUser} = useSelector(state => state.user);
  const fileRef = useRef(null);
  const [file,setFile] = useState(undefined);
  const [formData, setFormData] = useState({});
  const [filePerc,setFilePerc] = useState(0); 
  const [fileUploadError, setFileUploadError] = useState(null);
  
  console.log(formData); /*
  console.log(file);
  console.log(filePerc);
  console.log(fileUploadError); */

  const handleChange = (e) =>{
    setFormData({
      ...formData, 
      [e.target.id] : e.target.value,
    })
  };

  useEffect(() =>{
    if(file){
      handleFileUpload(file)
    }
  },[file]);

  const handleFileUpload =(file) =>{
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage,fileName);
    const uploadTask = uploadBytesResumable(storageRef,file); 

    uploadTask.on('state_changed',
    (snapshot) =>{
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setFilePerc(Math.round(progress));
    }, (error) =>{
      setFileUploadError(true);
    },() =>{
      getDownloadURL(uploadTask.snapshot.ref) 
        .then((downloadUrl) =>{
          setFormData({...formData, avatar: downloadUrl});
        })
    }
    )
  };


  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl front-semibold text-center my-7'>Profile</h1>
      
      <form  className='flex flex-col gap-4'>
        <input 
          onChange={(e) => setFile(e.target.files[0])}
          ref={fileRef}
          type='file'
          accept='image/*'
          hidden
        />

         <img 
            onClick={() => fileRef.current.click()}
            src={currentUser.avatar} 
            alt="profile" 
            className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2' 
        />
        
        <p className='text-sm self-center'>{fileUploadError? 
            (<span className='text-red-500'>Error Image Upload (Image must be less then 2MB)</span>)
            :
            filePerc >0 && filePerc< 100 ? (
              <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>)
              :
              filePerc === 100?(
                <span className='text-green-700'> Successfully uploaded! </span>
                ):(
                  ""
                )
          }
        </p>

        <input 
          type="text" 
          defaultValue={currentUser.username}
          placeholder='username' 
          id='username' 
          className='border p-3 rounded-lg' 
          onChange={handleChange}
        />

        <input 
          type="email" 
          defaultValue={currentUser.email}
          placeholder='email' 
          id='email' 
          className='border p-3 rounded-lg'
          readOnly 
        />

        <input 
          type="password" 
          placeholder='password' 
          id='password' 
          className='border p-3 rounded-lg' 
          onChange={handleChange}
        />

        <button className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-70'
          >  Update
        </button>
      </form>
    </div>
  )
}
