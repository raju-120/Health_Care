/* import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"; */
/* import app from "../../firebase/firebase"; */

import { /* useEffect, */ useRef, useState } from "react";
import { BsImageFill } from "react-icons/bs";
import { useSelector } from "react-redux";

export default function Posts() {

  const {currentUser} = useSelector(state => state?.user);
  const [formData, setFormData] = useState({});
  const fileRef = useRef(null);


  /* const [file,setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError ,setFileUploadError] = useState(null);
   */
  //console.log(formData);
  //console.log(file);
  //console.log(fileUploadError);

  const handleChange = (e)=>{
    setFormData({
      ...formData,
      [e.target.id] : e.target.value,
    });
  };

  /* useEffect(() =>{
    if(file)
    handleFileUpload(file);
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
  }; */

  const handleSubmit = async(e) =>{
    e.preventDefault();

    const res = await fetch('/api/post/droppost',{
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(
        {
          ...formData,
          userRef : currentUser?.data?.user?._id,
        }
      ),
    });
    const data = await res.json();
    console.log(data);
  }

  return (
    <div className='mt-10 lg:p-5'>
        <div className='lg:p-5 border box-border rounded-lg bg-slate-100'>
            <div className="flex">
              <div className="mt-5 ">
                <img src={currentUser?.data?.user?.avatar} alt="user_photo" className="w-28 h-24 rounded-full" />
              </div>
              <div className="lg:mt-5 w-full ml-2">
                <form onSubmit={handleSubmit}>

                    <input 
                      onChange={handleChange}
                      id="descriptions"
                      type='textarea' 
                      placeholder="What's on your mind?"
                      className='w-full border p-3 rounded h-24' 
                    />

                    <input 
                      onChange={handleChange}
                      id="avatar"
                      type="file"
                      ref={fileRef}
                      accept="image/*"
                      hidden
                    />

                    <p
                      onClick={() => fileRef.current.click()}
                      className="mt-2 ml-2 text-2xl text-green-500 hover:cursor-pointer"
                      >
                        <BsImageFill />
                    </p>

                    <button className="text-xl mt-5 w-full bg-slate-400 p-2 uppercase hover:opacity-30 rounded">Post</button>
                </form>
              </div>
            </div>
        </div>
    </div>
  )
}
