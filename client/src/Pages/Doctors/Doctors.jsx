import { useEffect, useState } from "react"
//import Modal from "../Modal/Modal";


export default function Doctors() {

  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedDept, setSelectedDept] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  //console.log("data", doctors?.data);

  useEffect(() => {
    const getDept = async () => {
      try {
        const res = await fetch('/api/auth/departments');
        const data = await res.json();
        setAllData(data);
        setFilteredData(data);
      } catch (err) {
        console.log('Error', err.message);
      }
    };
    getDept();
  }, []);

  useEffect(() => {
    const getdoc = async () => {
      try {
        const res = await fetch('/api/auth/doctors');
        const data = await res.json();
        setDoctors(data);
      } catch (err) {
        console.log('Error', err?.message);
      }
    };
    getdoc();
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredData(
      allData.filter((dept) =>
        dept.deptname.toLowerCase().includes(term)
      )
    );
  };

  const handleDepartmentClick = (deptname) => {
    console.log("first", doctors);
    const matchingDoctors = doctors?.data.filter(
      (doctor) => doctor.department === deptname
    );
    setFilteredDoctors(matchingDoctors);
    setSelectedDept(deptname);
  };

  const closeModal = () => {
    setSelectedDept(null);
  };

  return (
    <div className="mt-36">
      <div className="text-center">
        <h1 className="text-2xl font-semibold">
          Find your Doctors by the <span className="text-green-800">Department</span>
        </h1>

        {/* Search section */}
        <section className="cs_newsletter_1_wrap mb-24 mt-5">
          <div className="container lg:max-w-[1250px]">
            <div className="cs_newsletter cs_style_1 cs_accent_bg_v1">
              <input
                type="text"
                placeholder="Search by the Department"
                className="input input-bordered w-full"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </div>
        </section>

        {/* Departments display as cards */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:m-24">
          {filteredData.map((dept, index) => (
            <div
              key={index}
              className="card bg-white shadow-lg p-5 cursor-pointer"
              onClick={() => handleDepartmentClick(dept.deptname)}
            >
              <h2 className="text-xl font-semibold">{dept.deptname}</h2>
            </div>
          ))}
        </div>
      </div>

      {/* Modal to display doctors */}
      {selectedDept && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative bg-white p-6 rounded-lg max-w-lg w-full shadow-lg max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-semibold mb-4">Doctors in {selectedDept}</h2>
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white bg-red-500 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-red-300"
            >
              X
            </button>
            <div className="mt-4 space-y-4">
              {filteredDoctors && filteredDoctors.length > 0 ? (
                filteredDoctors.map((doctor) => (
                  <div
                    key={doctor?._id || doctor?.data?._id}
                    className="p-4 border rounded-lg shadow-sm"
                  >
                    <div className="flex flex-col lg:flex-row justify-between">
                      <div>
                        <img
                          src={doctor?.avatar[0]}
                          alt="image"
                          className="rounded-xl w-48 h-40 object-cover"
                        />
                      </div>
                      <div className="mt-4 lg:mt-0 lg:ml-4">
                        <h3 className="text-lg">
                          Name: <span className="font-semibold">{doctor?.username}</span>
                        </h3>
                        <p>BMDC Code: {doctor?.bmdc}</p>
                        <p>Gender: {doctor?.gender}</p>
                        <p>
                          Specialty: <span className="text-md">{doctor?.specialty}</span>
                        </p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <p>Qualification: {doctor?.qualification}</p>
                      <p>Department: {doctor?.department}</p>
                      <p>Designation: {doctor?.designation}</p>
                      <p>Institute Name: {doctor?.institute}</p>
                      <p className="text-center">
                        Appointment Number: <span className="font-bold">+{doctor?.appointmentnumber}</span>
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No doctors found for this department.</p>
              )}
            </div>
          </div>
        </div>
      )}


    </div>
  );
}
