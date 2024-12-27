import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import app from "../firebase/firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import {
  signOutUserFailure,
  signOutUserStart,
  signOutUserSuccess,
  updateUserFailure,
  updateUserStart /* updateUserSuccess */,
} from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export default function Profile() {
  const { currentUser } = useSelector((state) => state?.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [formData, setFormData] = useState({
    slots: currentUser?.data?.user?.slots || [""],
    onlineSlots: currentUser?.data?.user?.onlineSlots || [""],
  });
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSlotChange = (index, value) => {
    const newSlots = [...formData.slots];
    newSlots[index] = value;
    setFormData({ ...formData, slots: newSlots });
  };

  const handleOnlineSlotChange = (index, value) => {
    const newOnlineSlots = [...formData.onlineSlots];
    newOnlineSlots[index] = value;
    setFormData({ ...formData, onlineSlots: newOnlineSlots });
  };

  /* const addNewSlot = () =>{
    setFormData({...formData, slots: [...formData.slots || ''] });
  };

  const addNewOnlineSlot = () =>{
    setFormData({...formData, onlineSlots: [...formData.onlineSlots || '']});
  }; */

  // Image uploading to the google firebase
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    setLoading(true);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        console.log("Something went wrong in uploading image:", error.message);
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setFormData({ ...formData, avatar: downloadUrl });
          setLoading(false);
        });
      }
    );
  };

  // Update Profile Information based on role
  const handleSubmit = async (e) => {
    e.preventDefault();
    const isDoctor = currentUser?.data?.user?.role === "doctor";
    const userId = currentUser?.data?.user?._id;
    const url = isDoctor
      ? `https://health-care-server-0t0x.onrender.com/api/auth/docupdate/${userId}`
      : `https://health-care-server-0t0x.onrender.com/api/auth/update/${userId}`;
    const accessToken = currentUser?.data?.accessToken;

    if (!userId || !accessToken) {
      toast.error("User is not authenticated.");
      return;
    }

    try {
      dispatch(updateUserStart());

      const result = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          ...formData,
          accessToken: currentUser?.data?.accessToken,
          id: currentUser?.data?.user?._id,
        }),
      });

      const data = await result.json();
      console.log(data);

      if (!data.success) {
        dispatch(updateUserFailure(data.message));
        toast.error("Only you can update your own information.");
        return;
      }

      setUpdateSuccess(true);
      /* dispatch(updateUserSuccess(data)); */
      toast.success(
        isDoctor
          ? "Doctor profile updated successfully."
          : "User profile updated successfully."
      );
    } catch (error) {
      console.log(error);
      dispatch(updateUserFailure(error.message));
      window.alert("An error occurred while updating the profile.");
    }
  };

  //sign out
  const handleSingOut = async () => {
    console.log(currentUser);
    if (currentUser?.data?.user?.role === "doctor") {
      try {
        dispatch(signOutUserStart());
        const res = await fetch("https://health-care-server-0t0x.onrender.com/api/auth/docsignout", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },

          body: JSON.stringify(currentUser),
        });
        const data = await res.json();
        console.log("Data log out doctor: ", data);
        if (data.success === false) {
          dispatch(signOutUserFailure(data.message));
          return;
        }
        dispatch(signOutUserSuccess(data.message));
        navigate("/sign-in");
      } catch (error) {
        dispatch(signOutUserFailure(error.message));
      }
    } else if (currentUser?.data?.user?.role === "system-admin") {
      try {
        dispatch(signOutUserStart());
        const res = await fetch("https://health-care-server-0t0x.onrender.com/api/auth/sysadminlogout", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },

          body: JSON.stringify(currentUser),
        });
        const data = await res.json();
        console.log("Data log out doctor: ", data);
        if (data.success === false) {
          dispatch(signOutUserFailure(data.message));
          return;
        }
        dispatch(signOutUserSuccess(data.message));
        navigate("/systemadmin");
      } catch (error) {
        dispatch(signOutUserFailure(error.message));
      }
    } else if (currentUser?.data?.user?.role === "admin") {
      try {
        dispatch(signOutUserStart());
        const res = await fetch("https://health-care-server-0t0x.onrender.com/api/auth/adminlogout", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },

          body: JSON.stringify(currentUser),
        });
        const data = await res.json();
        console.log("Data log out doctor: ", data);
        if (data.success === false) {
          dispatch(signOutUserFailure(data.message));
          return;
        }
        dispatch(signOutUserSuccess(data.message));
        navigate("/admin");
      } catch (error) {
        dispatch(signOutUserFailure(error.message));
      }
    } //or user signout
    else {
      try {
        dispatch(signOutUserStart());
        const res = await fetch("https://health-care-server-0t0x.onrender.com/api/auth/signout", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(currentUser),
        });
        const data = await res.json();
        console.log(data);
        if (data.success === false) {
          dispatch(signOutUserFailure(data.message));
          return;
        }
        dispatch(signOutUserSuccess(data.message));
        navigate("/sign-in");
      } catch (error) {
        dispatch(signOutUserFailure(error.message));
      }
    }
  };

  return (
    <div className="p-3 max-w-3/5 lg:mx-96 mb-24">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>

      {currentUser?.data?.user?.role === "doctor" ? (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 p-3 max-w-full md:max-w-lg lg:max-w-xl mx-auto"
        >
          {/* Avatar Upload */}
          <input
            onChange={(e) => setFile(e.target.files[0])}
            ref={fileRef}
            type="file"
            accept="image/*"
            hidden
          />
          <img
            onClick={() => fileRef.current.click()}
            src={currentUser?.data?.user?.avatar}
            alt="profile"
            className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
          />
          <p className="text-sm self-center">
            {fileUploadError ? (
              <span className="text-red-500">
                Error Image Upload (Image must be less than 2MB)
              </span>
            ) : filePerc > 0 && filePerc < 100 ? (
              <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>
            ) : filePerc === 100 ? (
              <span className="text-green-700"> Successfully uploaded! </span>
            ) : (
              ""
            )}
          </p>

          {/* Doctor Specific Fields */}
          <input
            type="text"
            defaultValue={currentUser?.data?.user?.username}
            placeholder="Username"
            id="username"
            className="border p-3 rounded-lg w-full"
            onChange={handleChange}
          />
          <input
            type="email"
            defaultValue={currentUser?.data?.user?.email}
            placeholder="Email"
            id="email"
            className="border p-3 rounded-lg w-full"
            readOnly
          />
          <input
            type="text"
            id="bmdc"
            placeholder="BMDC"
            readOnly
            className="border p-3 rounded-lg w-full"
            defaultValue={currentUser?.data?.user?.bmdc}
          />
          <input
            type="text"
            id="specialty"
            placeholder="Specialty"
            className="border p-3 rounded-lg w-full"
            defaultValue={currentUser?.data?.user?.specialty}
            onChange={handleChange}
          />
          <input
            type="text"
            id="qualification"
            placeholder="Qualification"
            className="border p-3 rounded-lg w-full"
            defaultValue={currentUser?.data?.user?.qualification}
            onChange={handleChange}
          />
          <input
            type="text"
            id="designation"
            placeholder="Designation"
            className="border p-3 rounded-lg w-full"
            defaultValue={currentUser?.data?.user?.designation}
            onChange={handleChange}
          />
          <input
            type="number"
            id="phone"
            placeholder="Phone"
            className="border p-3 rounded-lg w-full"
            defaultValue={currentUser?.data?.user?.phone}
            onChange={handleChange}
          />
          <input
            type="number"
            id="appointmentnumber"
            placeholder="Appointment Number"
            className="border p-3 rounded-lg w-full"
            defaultValue={currentUser?.data?.user?.appointmentnumber}
            onChange={handleChange}
          />
          <input
            type="text"
            id="address"
            placeholder="Address"
            className="border p-3 rounded-lg w-full"
            defaultValue={currentUser?.data?.user?.address}
            onChange={handleChange}
          />

          {/* Doctor-specific Time Slots */}
          <div>
            <h3 className="font-semibold mb-2">Face to Face Time Slots: </h3>
            <div className="flex flex-wrap">
              {formData.slots.map((slot, index) => (
                <div key={index} className="w-full sm:w-1/2 lg:w-1/3 p-2">
                  <input
                    type="text"
                    value={slot}
                    placeholder={`Slot ${index + 1}`}
                    onChange={(e) => handleSlotChange(index, e.target.value)}
                    className="border p-3 rounded-lg w-full"
                    required
                  />
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Online Time Slots: </h3>
            <div className="flex flex-wrap">
              {formData.onlineSlots.map((slot, index) => (
                <div key={index} className="w-full sm:w-1/2 lg:w-1/3 p-2">
                  <input
                    type="text"
                    value={slot}
                    placeholder={`Slot ${index + 1}`}
                    onChange={(e) =>
                      handleOnlineSlotChange(index, e.target.value)
                    }
                    className="border p-3 rounded-lg w-full"
                    required
                  />
                </div>
              ))}
            </div>
          </div>

          <input
            type="password"
            placeholder="Password"
            id="password"
            className="border p-3 rounded-lg w-full"
            onChange={handleChange}
          />

          <button
            disabled={loading}
            className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-100 disabled:opacity-40 w-full"
          >
            {loading ? "Loading..." : "Update"}
          </button>
        </form>
      ) : (
        // User Form
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Avatar Upload */}
          <input
            onChange={(e) => setFile(e.target.files[0])}
            ref={fileRef}
            type="file"
            accept="image/*"
            hidden
          />
          <img
            onClick={() => fileRef.current.click()}
            src={currentUser?.data?.user?.avatar}
            alt="profile"
            className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
          />
          <p className="text-sm self-center">
            {fileUploadError ? (
              <span className="text-red-500">
                Error Image Upload (Image must be less than 2MB)
              </span>
            ) : filePerc > 0 && filePerc < 100 ? (
              <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>
            ) : filePerc === 100 ? (
              <span className="text-green-700"> Successfully uploaded! </span>
            ) : (
              ""
            )}
          </p>

          {/* User Specific Fields */}
          <input
            type="text"
            defaultValue={currentUser?.data?.user?.username}
            placeholder="Username"
            id="username"
            className="border p-3 rounded-lg"
            onChange={handleChange}
          />
          <input
            type="email"
            defaultValue={currentUser?.data?.user?.email}
            placeholder="Email"
            id="email"
            className="border p-3 rounded-lg"
            onChange={handleChange}
            readOnly
          />
          <input
            type="password"
            placeholder="Password"
            id="password"
            className="border p-3 rounded-lg"
            onChange={handleChange}
          />

          <button
            disabled={loading}
            className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-100 disabled:opacity-40"
          >
            {loading ? "Loading..." : "Update"}
          </button>
        </form>
      )}

      <p className="text-green-700 mt-5">
        {updateSuccess ? "User is updated successfully" : ""}
      </p>

      <div className="flex justify-end">
        <div>
          <button
            onClick={handleSingOut}
            className="bg-green-500 text-white rounded-lg p-3 uppercase hover:opacity-50 disabled:opacity-70"
          >
            Sign Out
          </button>
        </div>
      </div>
      <Toaster position="center-top" />
    </div>
  );
}
