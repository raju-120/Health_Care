import { useState } from "react";


export default function PatientRegistrationForm() {

    const [formData, setFormData] = useState({
        name: '',
        age: '',
        sex: '',
        dob: '',
        bloodGroup: '',
        fatherMotherName: '',
        maritalStatus: 'Unmarried',
        email: '',
        nationalId: '',
        spouseName: '',
        occupation: '',
        religion: '',
        nationality: '',
        placeOfBirth: '',
        passportNo: '',
        language: '',
        citizenship: '',
        address: {
          houseNo: '',
          roadNo: '',
          po: '',
          ps: '',
          district: '',
          country: '',
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
    
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
      };

  return (
    <div className="max-w-4xl mx-auto lg:p-5 mt-16 lg:mt-5 flex flex-col items-center">
        <h1 className="mt-20 text-4xl text-center font-semibold">Patient Registration Form</h1>
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
                <label className="block text-left font-medium">Date of birth*</label>
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
                <label className="block text-left font-medium">Blood Group*</label>
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
                <label className="block text-left font-medium">Father/Mother's Name*</label>
                <input
                type="text"
                id="fatherMotherName"
                value={formData.fatherMotherName}
                onChange={handleChange}
                required
                className="w-full mt-2 p-2 border border-gray-300 rounded"
                />
            </div>

            {/* Marital Status */}
            <div>
                <label className="block text-left font-medium">Marital Status*</label>
                <div className="flex space-x-3 mt-2">
                <div className="flex items-center">
                    <input
                    type="radio"
                    id="married"
                    name="maritalStatus"
                    value="Married"
                    onChange={handleChange}
                    checked={formData.maritalStatus === 'Married'}
                    className="mr-2"
                    />
                    <label htmlFor="married">Married</label>
                </div>
                <div className="flex items-center">
                    <input
                    type="radio"
                    id="unmarried"
                    name="maritalStatus"
                    value="Unmarried"
                    onChange={handleChange}
                    checked={formData.maritalStatus === 'Unmarried'}
                    className="mr-2"
                    />
                    <label htmlFor="unmarried">Unmarried</label>
                </div>
                <div className="flex items-center">
                    <input
                    type="radio"
                    id="others"
                    name="maritalStatus"
                    value="Others"
                    onChange={handleChange}
                    checked={formData.maritalStatus === 'Others'}
                    className="mr-2"
                    />
                    <label htmlFor="others">Others</label>
                </div>
                </div>
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
                <label className="block text-left font-medium">National ID Number</label>
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
            </div>

            <button
                type="submit"
                className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition"
            >
                Submit
            </button>
            </form>
        </div>
        </div>

  )
}
