import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import app from '../firebase/firebase';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage';
import { signOutUserFailure, signOutUserStart, signOutUserSuccess, updateUserFailure, updateUserStart, updateUserSuccess } from '../redux/user/userSlice';
import {Link, useNavigate} from 'react-router-dom';


export default function Profile() {

  const {currentUser} = useSelector(state => state.user);
  const fileRef = useRef(null);
  const [file,setFile] = useState(undefined);
  const [formData, setFormData] = useState({});
  const [filePerc,setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log('Current User ID: ', `${currentUser?.data?.user?._id}`) 
  console.log(formData);
 

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

    setLoading(true);
    uploadTask.on('state_changed',
    (snapshot) =>{
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setFilePerc(Math.round(progress));
    }, (error) =>{
      console.log('Something went wrong in uploading image:', error.message);
      setFileUploadError(true);
    },() =>{
      getDownloadURL(uploadTask.snapshot.ref)
        .then((downloadUrl) =>{
          setFormData({...formData, avatar: downloadUrl});
          setLoading(false);
        })
    }
    )
  };

  const handleSubmit = async(e) =>{
    e.preventDefault();
    if(currentUser?.data?.user?.role === 'doctor'){
      try{
        dispatch(updateUserStart());
        const result = await fetch(`/api/auth/docupdate/${currentUser?.data?.user?._id}`,{
          method:'POST',
          headers: {
            'Content-type' : 'application/json'
          },
          body: JSON.stringify(formData)
        });
        const data = await result.json();
        if(data.success === false){
          dispatch(updateUserFailure(data.message))
          return;
        }
        dispatch(updateUserSuccess(data))
        setUpdateSuccess(true);
      }catch(error){
        console.log(error);
      }
    }else{
      try{
        dispatch(updateUserStart());
        const result = await fetch(`/api/auth/update/${currentUser?.data?.user?._id}`,{
          method:'POST',
          headers: {
            'Content-type' : 'application/json'
          },
          body: JSON.stringify(formData)
        });
        const data = await result.json();
        if(data.success === false){
          dispatch(updateUserFailure(data.message))
          return;
        }
        dispatch(updateUserSuccess(data))
        setUpdateSuccess(true);
      }catch(error){
        console.log(error);
      }
    }
  };


  const handleSingOut = async() =>{
    console.log(currentUser)
    if( currentUser?.data?.user?.role === 'doctor' )
      {
        console.log(formData)
      try{
        dispatch(signOutUserStart());
        const res = await fetch('/api/auth/docsignout',{
          method:'POST',
          headers: {
            'Content-type' : 'application/json'
          },
          body: JSON.stringify(currentUser)
        });
        const data = await res.json();
        console.log('Data log out doctor: ',data );
        if(data.success === false){
          dispatch(signOutUserFailure(data.message));
          return;
        }
        dispatch(signOutUserSuccess(data.message));
        navigate('/sign-in');
      }catch(error){
        dispatch(signOutUserFailure(error.message));
      }
    }else{
      console.log(formData)
        try{
          dispatch(signOutUserStart());
          const res = await fetch('/api/auth/signout',{
            method:'POST',
            headers: {
              'Content-type' : 'application/json'
            },
            body: JSON.stringify(formData)
          });
          const data = await res.json();
          console.log(data)
          if(data.success === false){
            dispatch(signOutUserFailure(data.message));
            return;
          }
          dispatch(signOutUserSuccess(data.message));
          navigate('/sign-in');
        }catch(error){
          dispatch(signOutUserFailure(error.message));
        }
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto mb-24'>
      <h1 className='text-3xl front-semibold text-center my-7'>Profile</h1>

      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          onChange={(e) => setFile(e.target.files[0])}
          ref={fileRef}
          type='file'
          accept='image/*'
          hidden
        />

         <img
            onClick={() => fileRef.current.click()}
            src={currentUser?.data?.user?.avatar}
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
          defaultValue={currentUser?.data?.user?.username}
          placeholder='username'
          id='username'
          className='border p-3 rounded-lg'
          onChange={handleChange}
        />

        <input
          type="email"
          defaultValue={currentUser?.data?.user?.email}
          placeholder='email'
          id='email'
          className='border p-3 rounded-lg'
          onChange={handleChange}
          readOnly
        />

        <input 
          type="password" 
          placeholder='password' 
          id='password' 
          className='border p-3 rounded-lg' 
          onChange={handleChange}
        />

        <button disabled={loading} className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-100 disabled:opacity-40'
          >  {loading ? 'Loading...' : 'Update'}
        </button>
      </form>
      <p className='text-green-700 mt-5'>{updateSuccess? 'User is updated successfully': ''}</p>
      
      <div className='flex justify-between'>
        
        <div>
          <button 
            className='bg-red-500 text-white rounded-lg p-3 uppercase hover:opacity-50 disabled:opacity-70' 
            >delete user
          </button>
        </div>

        <div>
          <button 
            onClick={handleSingOut}
            className='bg-green-500 text-white rounded-lg p-3 uppercase hover:opacity-50 disabled:opacity-70' 
            >sign out
          </button>
        </div>

      </div>
      <Link to='/create-advertising'>
        <div className='w-full text-center my-10  bg-slate-500 p-2 rounded-xl'>
          <button type='button' className='text-white text-lg hover:opacity-40 opacity-90'>Advertising your Health-Care center</button>
        </div>
      </Link>
      
    </div>
  )
}
