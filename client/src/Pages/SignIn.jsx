import { useDispatch, useSelector } from "react-redux";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../redux/user/userSlice";
//import OAuth from "../Components/OAuth";
import toast from "react-hot-toast";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignIn() {
  const [loginType, setLoginType] = useState("user");
  const [formData, setFormData] = useState({});
  const { error } = useSelector((state) => state?.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log(formData);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleToggle = (type) => {
    setLoginType(type);
  };

  //SUbmit Login Section
  const handleUserSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        toast.error("User credential did not matched!");
        return;
      }

      dispatch(signInSuccess(data));
      toast.success("User Login Successful");
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  /* Doctor Sign in */
  const handleDoctorSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/doctorssignin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      //console.log(data);
      if (data.success === false) {
        dispatch(signInFailure());
        toast.error("Doctor credential unmatched");
        return;
      }
      dispatch(signInSuccess(data));
      toast.success("Doctor Login Successful");
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  /* admin */
  const handleAdminSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/systemadminsignin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      //console.log(data);
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        toast.error("User credential did not matched!");
        return;
      }

      dispatch(signInSuccess(data));
      toast.success("System Admin Login Successful");
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error?.message));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <div className="flex justify-center mb-4">
          <button
            className={`px-4 py-2 mr-2 rounded ${loginType === "user" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            onClick={() => handleToggle("user")}
          >
            User Login
          </button>
          <button
            className={`px-4 py-2 mr-2 rounded ${loginType === "doctor" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            onClick={() => handleToggle("doctor")}
          >
            Doctor Login
          </button>
          <button
            className={`px-4 py-2 rounded ${loginType === "system-admin" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            onClick={() => handleToggle("system-admin")}
          >
            System Admin
          </button>
        </div>

        {loginType === "user" && (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-center">User Login</h2>
            <form onSubmit={handleUserSubmit}>
              <div className="mb-4">
                <label className="block mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="email"
                  className="w-full p-2 border border-gray-300 rounded"
                  onChange={handleChange}
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2">Password</label>
                <input
                  type="password"
                  id="password"
                  placeholder="password"
                  className="w-full p-2 border border-gray-300 rounded"
                  onChange={handleChange}
                />
              </div>

              <button className="w-full bg-blue-500 text-white py-2 rounded">
                Login
              </button>
              {error && (
                <p className="text-red-500 font-lg mt-2">{error?.message}</p>
              )}
            </form>
            <p className="mt-2">
              Have not registered? Please{" "}
              <span className="text-center text-green-400">
                {" "}
                <Link to="/sign-up"> Sign-Up</Link>{" "}
              </span>{" "}
            </p>
          </div>
        )}

        {loginType === "doctor" && (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-center">
              Doctor Login
            </h2>
            <form onSubmit={handleDoctorSubmit}>
              <div className="mb-4">
                <label className="block mb-2">Email</label>
                <input
                  type="text"
                  id="email"
                  placeholder="Doctor email"
                  className="w-full p-2 border border-gray-300 rounded"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Password</label>
                <input
                  type="password"
                  id="password"
                  placeholder="password"
                  className="w-full p-2 border border-gray-300 rounded"
                  onChange={handleChange}
                />
              </div>
              <button className="w-full bg-blue-500 text-white py-2 rounded">
                Dotcor Login
              </button>
              {error && (
                <p className="text-red-500 font-lg mt-2">{error?.message}</p>
              )}
            </form>
          </div>
        )}

        {loginType === "system-admin" && (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>
            <form onSubmit={handleAdminSubmit}>
              <div className="mb-4">
                <label className="block mb-2">Email</label>
                <input
                  type="text"
                  id="email"
                  placeholder="admin email"
                  className="w-full p-2 border border-gray-300 rounded"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Password</label>
                <input
                  type="password"
                  id="password"
                  placeholder="password"
                  className="w-full p-2 border border-gray-300 rounded"
                  onChange={handleChange}
                />
              </div>
              <button className="w-full bg-blue-500 text-white py-2 rounded">
                Admin Login
              </button>
              {error && (
                <p className="text-red-500 font-lg mt-2">{error?.message}</p>
              )}
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
