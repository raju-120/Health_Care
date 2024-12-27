import { useRef, useState } from "react";
import { BsImageFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import {  toast, Toaster } from "react-hot-toast";

export default function Posts() {
  const { currentUser } = useSelector(state => state?.user);
  const [formData, setFormData] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const fileRef = useRef(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      avatar: file,
    });
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataObj = new FormData();
    formDataObj.append("descriptions", formData.descriptions);
    formDataObj.append("userRef", currentUser?.data?.user?._id);
    formDataObj.append("username", currentUser?.data?.user?.username);
    if (formData.avatar) {
      formDataObj.append("avatar", formData.avatar);
    }

    try {
      const res = await fetch("https://health-care-server-0t0x.onrender.com/api/posts/droped", {
        method: "POST",
        body: formDataObj,
      });
      const data = await res.json();
      console.log(data);

      setFormData({});
      setImagePreview(null);
      
      toast.success("Post created successfully!", {
        position: "top-center",
        duration: 5000,
        style: {
          background: "#4CAF50",
          color: "white",
        },
      });

    } catch (error) {
      console.error("Error uploading post:", error);
    }
  };

  return (
    <div className="mt-10 lg:p-5">
      <div className="lg:p-5 border box-border rounded-lg bg-slate-100">
        <div className="flex">
          <div className="mt-5">
            <img src={currentUser?.data?.user?.avatar} alt="user_photo" className="w-28 h-24 rounded-full" />
          </div>
          <div className="lg:mt-5 w-full ml-2">
            <form onSubmit={handleSubmit}>
              <input
                onChange={handleChange}
                id="descriptions"
                type="textarea"
                placeholder="What's on your mind?"
                className="w-full border p-3 rounded h-24"
                value={formData.descriptions || ""}
              />

              <input
                onChange={handleFileChange}
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
                {imagePreview ? (
                  <img src={imagePreview} alt="Image Preview" className="w-28 h-24 rounded-full" />
                ) : (
                  <BsImageFill />
                )}
              </p>

              <button className="text-xl mt-5 w-full bg-slate-400 p-2 uppercase hover:opacity-30 rounded">
                Post
              </button>
            </form>
          </div>
        </div>
      </div>
      <Toaster position="center-top"/>
    </div>
  );
}
