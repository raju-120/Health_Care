import { useRef, useState } from "react";
import { BsImageFill } from "react-icons/bs";

export default function Posts() {

  const fileRef = useRef(null);
  const [file,setFile] = useState(undefined);
  console.log(file);

  return (
    <div className='mt-10 lg:p-5'>
        <div className='lg:p-5 border box-border rounded-lg'>
            <h1 className="lg:text-2xl p-2">Share your thoughts </h1>
            <div className="lg:mt-5">
              <form>

                  <input 
                    id="descriptions"
                    type='textarea' 
                    placeholder='Describe your problem'
                    className='w-full border p-3 rounded h-24' 
                  />

                  <input 
                    onChange={(e) => setFile(e.target.value)}
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
  )
}
