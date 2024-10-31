import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";

export default function PatientRegistrationForm() {
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    sex: "",
    dob: "",
    bloodGroup: "",
    fatherName: "",
    maritalStatus: "Unmarried",
    email: "",
    nationalId: "",
    spouseName: "",
    occupation: "",
    religion: "",
    nationality: "",
    placeOfBirth: "",
    passportNo: "",
    language: "",
    citizenship: "",
    address: {
      houseNo: "",
      roadNo: "",
      po: "",
      ps: "",
      district: "",
      country: "",
      phoneNumber: "",
      homeNumber: "",
    },
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleAddressChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      address: {
        ...formData.address,
        [id]: value,
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const registration = {
      ...formData,
      uId: currentUser?.data?.user?._id,
    };

    try {
      const response = await fetch("/api/patient/patient-reg-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registration),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Registration successful", result);

        // Display success toast notification
        toast.success("Appointment submitted successfully!", {
          position: "top-center",
          duration: 5000,
          style: {
            background: "#4CAF50",
            color: "white",
          },
        });

        // Reset the form after successful submission
        setFormData({
          name: "",
          age: "",
          sex: "",
          dob: "",
          bloodGroup: "",
          fatherName: "",
          maritalStatus: "Unmarried",
          email: "",
          nationalId: "",
          spouseName: "",
          occupation: "",
          religion: "",
          nationality: "",
          placeOfBirth: "",
          passportNo: "",
          language: "",
          citizenship: "",
          address: {
            houseNo: "",
            roadNo: "",
            po: "",
            ps: "",
            district: "",
            country: "",
            phoneNumber: "",
            homeNumber: "",
          },
        });
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="mx-auto lg:p-5 mt-10 lg:mt-2 flex flex-col items-center">
      <h1 className="mt-20 text-4xl text-center font-semibold">
        Patient Registration Form
      </h1>
      <div className="lg:p-10 w-full flex justify-center mt-5 bg-white shadow-lg rounded-lg">
        <form onSubmit={handleSubmit} className="w-full space-y-5">
          <h2 className="text-2xl font-semibold">Patient Information</h2>

          {/* Name */}
          <div className="flex flex-col lg:flex-row lg:space-x-5">
            <div className="w-full">
              <label className="block text-left font-medium">Name*</label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full mt-2 p-2 border border-gray-300 rounded"
              />
            </div>
          </div>

          {/* Age and Sex */}
          <div className="flex flex-col lg:flex-row lg:space-x-5">
            <div className="w-full lg:w-1/2">
              <label className="block text-left font-medium">Age*</label>
              <input
                type="number"
                id="age"
                value={formData.age}
                onChange={handleChange}
                required
                className="w-full mt-2 p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="w-full lg:w-1/2">
              <label className="block text-left font-medium">Sex*</label>
              <select
                id="sex"
                value={formData.sex}
                onChange={handleChange}
                required
                className="w-full mt-2 p-2 border border-gray-300 rounded"
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* DOB and Blood Group */}
          <div className="flex flex-col lg:flex-row lg:space-x-5">
            <div className="w-full lg:w-1/2">
              <label className="block text-left font-medium">
                Date of birth*
              </label>
              <input
                type="date"
                id="dob"
                value={formData.dob}
                onChange={handleChange}
                required
                className="w-full mt-2 p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="w-full lg:w-1/2">
              <label className="block text-left font-medium">
                Blood Group*
              </label>
              <input
                type="text"
                id="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleChange}
                required
                className="w-full mt-2 p-2 border border-gray-300 rounded"
              />
            </div>
          </div>

          {/* Personal Information */}
          <h2 className="text-2xl font-semibold">Personal Information</h2>

          {/* Parent's Name */}
          <div>
            <label className="block text-left font-medium">
              Father/Mother Name*
            </label>
            <input
              type="text"
              id="fatherName"
              value={formData.fatherMotherName}
              onChange={handleChange}
              required
              className="w-full mt-2 p-2 border border-gray-300 rounded"
            />
          </div>

          {/* Marital Status */}
          <div>
            <label className="block text-left font-medium">
              Marital Status*
            </label>
            <select
              id="maritalStatus"
              value={formData.maritalStatus}
              onChange={handleChange}
              required
              className="w-full mt-2 p-2 border border-gray-300 rounded"
            >
              <option value="Unmarried">Unmarried</option>
              <option value="Married">Married</option>
              <option value="Divorced">Divorced</option>
              <option value="Widowed">Widowed</option>
            </select>
          </div>

          {/* Email and National ID */}
          <div className="flex flex-col lg:flex-row lg:space-x-5">
            <div className="w-full lg:w-1/2">
              <label className="block text-left font-medium">Email*</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full mt-2 p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="w-full lg:w-1/2">
              <label className="block text-left font-medium">
                National ID Number
              </label>
              <input
                type="text"
                id="nationalId"
                value={formData.nationalId}
                onChange={handleChange}
                className="w-full mt-2 p-2 border border-gray-300 rounded"
              />
            </div>
          </div>

          {/* Spouse Name and Occupation */}
          <div className="flex flex-col lg:flex-row lg:space-x-5">
            <div className="w-full lg:w-1/2">
              <label className="block text-left font-medium">Spouse Name</label>
              <input
                type="text"
                id="spouseName"
                value={formData.spouseName}
                onChange={handleChange}
                className="w-full mt-2 p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="w-full lg:w-1/2">
              <label className="block text-left font-medium">Occupation</label>
              <input
                type="text"
                id="occupation"
                value={formData.occupation}
                onChange={handleChange}
                className="w-full mt-2 p-2 border border-gray-300 rounded"
              />
            </div>
          </div>

          {/* Address */}
          <h3 className="text-2xl font-semibold">Address (Present)</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div>
              <label className="block text-left font-medium">House No*</label>
              <input
                type="text"
                id="houseNo"
                value={formData.address.houseNo}
                onChange={handleAddressChange}
                required
                className="w-full mt-2 p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-left font-medium">Road No*</label>
              <input
                type="text"
                id="roadNo"
                value={formData.address.roadNo}
                onChange={handleAddressChange}
                required
                className="w-full mt-2 p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-left font-medium">P.O.*</label>
              <input
                type="text"
                id="po"
                value={formData.address.po}
                onChange={handleAddressChange}
                required
                className="w-full mt-2 p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-left font-medium">P.S.*</label>
              <input
                type="text"
                id="ps"
                value={formData.address.ps}
                onChange={handleAddressChange}
                required
                className="w-full mt-2 p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-left font-medium">District*</label>
              <input
                type="text"
                id="district"
                value={formData.address.district}
                onChange={handleAddressChange}
                required
                className="w-full mt-2 p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-left font-medium">Country*</label>
              <input
                type="text"
                id="country"
                value={formData.address.country}
                onChange={handleAddressChange}
                required
                className="w-full mt-2 p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-left font-medium">
                Home Number*
              </label>
              <input
                type="number"
                id="homeNumber"
                value={formData.address.homeNumber}
                onChange={handleAddressChange}
                required
                className="w-full mt-2 p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-left font-medium">Phone*</label>
              <input
                type="number"
                id="phoneNumber"
                value={formData.address.phoneNumber}
                onChange={handleAddressChange}
                required
                className="w-full mt-2 p-2 border border-gray-300 rounded"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Submit
          </button>
        </form>
      </div>
      <Toaster position="center-top" />
    </div>
  );
}
