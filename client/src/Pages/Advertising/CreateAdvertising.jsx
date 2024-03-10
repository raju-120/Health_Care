import { useState } from "react";
import {getStorage, ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage';
import app from "../../firebase/firebase";



export default function CreateAdvertising() {

  const [formData,setFormData] = useState({
        imageUrls: [],
        name : '',
        address : '',
        phone: ''
  });
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [imageUploadError,setImageUploadError] = useState(false);
  
  console.log(formData);
  //console.log(files);


  const handleChange = (e) =>{
    setFormData({
      ...formData, [e.target.id] : e.target.value,
    })
  };

  const handleImageUpload = () =>{
    if(files.length >0 && files.length + formData.imageUrls.length <2){
     
      setUploading(true);
      setImageUploadError(false);
     
      const promises = [];
      for (let i = 0 ; i< files.length ; i++){
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises).then((urls) =>{
        setFormData({
          ...formData, 
          imageUrls: formData.imageUrls.concat(urls)
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
      const storage = getStorage(app);
      const fileName =  file.name;
      const storageRef = ref(storage,fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

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
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    console.log(formData);
  }

  return (
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
                      multiple 
                      className="p-3 border border-gray-200 rounded w-full" 
                    />

                  </div>

                  <div className="m-6">
                    <button
                      onClick={handleImageUpload}
                      type="button"
                      className="p-3 bg-green-600 text-white border border-green-700 rounded uppercase
                                hover:shadow-lg disabled:opacity-80"
                      >Image Upload
                    </button>
                    {imageUploadError && <p className="text-red-500">{imageUploadError}</p>}
                  </div>

                </div>

                

                
              
              <button
                disabled={uploading} 
                className="p-3 text-white bg-slate-700 
                  rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
              >
                  {uploading ? 'Uploading...' : 'Create Advertising'}
              </button>
            </div>
        </form>
        {}
    </main>
  )
}
