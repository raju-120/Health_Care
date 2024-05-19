import {useState} from 'react';
import {getStorage, ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage';
import app from "../../firebase/firebase";
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';



export default function CreateAdvertising() {
  const {currentUser} = useSelector(state =>state.user);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    avatar: [],
  });
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const[loading, setLoading]= useState(false);
  const [imageUploadError,setImageUploadError] = useState(false);
  const [error,setError] = useState(false);
  const navigate = useNavigate();
  
  console.log(formData)
  console.log(files);
  

  const handleChange = (e) =>{
    setFormData({
      ...formData,
      [e.target.id] : e.target.value,
    })
  };

  const handleImageUpload = () =>{
    if(files.length >0 && files.length + formData.avatar.length <2){
     
      setUploading(true);
      setImageUploadError(false);
     
      const promises = [];
      for (let i = 0 ; i< files.length ; i++){
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises).then((urls) =>{
        setFormData({
          ...formData, 
          avatar: formData.avatar.concat(urls),
        });
        setImageUploadError(false);
        setUploading(false); 
      }).catch((err) =>{
        setImageUploadError('Image upload failed (2 Mb max) ');
        setUploading(false);
      })
    } else{
      setImageUploadError('You can only upload 1 image for Advertising.');
      setUploading(false);
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
      setError(false);
    
      const res = await fetch('/api/add/advertises',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser?.data?.user?._id
        }),
      });
      const data = await res.json();
      setLoading(false)
      if(data.success === false){
        setError(data.message);
        console.log(data);
      }
      window.alert('Advertise item uploaded successfully');
      navigate('/')
    }catch(error){
      setError(error.message);
      setLoading(false);
    }
  }
  
  
  return (
    <div>
      <main className="p-3 max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold text-center my-7">Create Your Health-Care Advertising </h2>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
            <div className="flex flex-col gap-4 flex-1">

                <input 
                    type="text" 
                    id="name" 
                    placeholder="Health-Care Name" 
                    maxLength='62' 
                    minLength='3' 
                    className="border p-3 rounded-lg" 
                    required
                    onChange={handleChange}
                />
                
                <input 
                  type="text" 
                  id="address" 
                  placeholder="Address" 
                  className="border p-3 rounded-lg" 
                  required
                  onChange={handleChange} 
                />

                <input 
                  type="number"
                  id="phone"
                  placeholder="Phone Number"
                  className="border p-3 rounded-lg"  
                  required
                  onChange={handleChange}
                />
                
                <div className="flex">
                  <div>
                    <p className="font-semibold">Images: 
                      <span className="font-normal text-gray-600 ml-2">Upload your advertising 1 Image(Less Then 2MB)</span>
                    </p>
                    <input 
                      onChange={(e) => setFiles(e.target.files)}
                      type="file" 
                      id="images" 
                      accept='image/*' 
                      className="p-3 border border-gray-200 rounded w-full" 
                    />
                    {imageUploadError && <p className="text-red-500">{imageUploadError}</p>}
                  </div>

                  <div className="m-6">
                    <button
                      disabled={uploading}
                      onClick={handleImageUpload}
                      type="button"
                      className="p-3 bg-green-600 text-white border border-green-700 rounded uppercase
                                hover:shadow-lg disabled:opacity-80"
                      >{uploading ? 'Image Uploading...' : 'Image Upload'}
                    </button>
                  </div>

                </div>

                

                
              
              <button
                disabled={loading || uploading}
                className="p-3 text-white bg-slate-700 
                  rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
              >
                  {loading ? 'Loading...' : 'Create Advertising'}
              </button>
            </div>
        </form>
        {error && <p className='text-red-500'>{error}</p>}
      </main>
    </div>
  )
}