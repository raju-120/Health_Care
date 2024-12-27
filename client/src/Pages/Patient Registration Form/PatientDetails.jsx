import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function PatientDetails() {
  const { uId } = useParams();
  const [patients, setPatients] = useState();
  const [patient, setPatient] = useState(null);

  //   console.log("Matched ID: ", patients);
  //   console.log("Matched User ID: ", patient.address.houseNo);
  //   console.log("user ID: ", uId);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`https://health-care-server-0t0x.onrender.com/api/patient/patient-reg-form`);
      const data = await res.json();
      console.log("Specific Data Fetched: ", data);
      setPatients(data);

      const matchedPatient = data.find((patient) => patient.uId === uId);
      setPatient(matchedPatient);
    };
    fetchData();
  }, [uId]);

  if (!patients) {
    return <p className="text-center mt-10">Loading or no patient found...</p>;
  }

  return (
    <>
      <div className="mx-auto lg:p-10 mt-10 lg:mt-2 flex flex-col items-center">
        <h1 className="mt-20 text-4xl text-center font-semibold">
          Patient Personal Information
        </h1>
      </div>
      <div className="lg:p-10 max-w-[800px] mx-auto flex justify-center mt-5 bg-white shadow-lg rounded-lg">
        <div className="w-full space-y-5">
          {/* <h2 className="text-2xl font-semibold">Patient Information: </h2> */}

          <div className="flex flex-col lg:flex-row lg:space-x-5 gap-4 lg:mb-5">
            <div className="w-full">
              <label className="block text-left font-medium">
                Name :{" "}
                <span className="uppercase font-bold">{patient.name}</span>
              </label>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row lg:space-x-5 gap-4 lg:mb-5">
            <div className="w-full lg:w-1/2">
              <label className="block text-left font-medium">
                Age: {patient.age}
              </label>
            </div>
            <div className="w-full lg:w-1/2">
              <label className="block text-left font-medium">
                Gender: {patient.gender}
              </label>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row lg:space-x-5 gap-4 lg:mb-5">
            <div className="w-full lg:w-1/2">
              <label className="block text-left font-medium">
                Date of birth: {patient.dob}
              </label>
            </div>
            <div className="w-full lg:w-1/2">
              <label className="block text-left font-medium">
                Blood Group: {patient.bloodGroup}
              </label>
            </div>
          </div>

          <div>
            <label className="block text-left font-medium">
              Father/Mother Name: {patient.fatherName}
            </label>
          </div>

          <div className="flex flex-col lg:flex-row lg:space-x-5 gap-4 lg:mb-5">
            <div className="w-full lg:w-1/2">
              <label className="block text-left font-medium">
                Marital Status: {patient.maritalStatus}
              </label>
            </div>
            <div className="w-full lg:w-1/2">
              <label className="block text-left font-medium">
                Religion:{" "}
                <span className="uppercase"> {patient.religion} </span>
              </label>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row lg:space-x-5 gap-4 lg:mb-5">
            <div className="w-full lg:w-1/2">
              <label className="block text-left font-medium">
                Email: {patient.email}
              </label>
            </div>
            <div className="w-full lg:w-1/2">
              <label className="block text-left font-medium">
                Nationality:{" "}
                <span className="uppercase">{patient.nationality}</span>
              </label>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-4 lg:space-x-5 lg:mb-5">
            <div className="w-full lg:w-1/2">
              <label className="block text-left font-medium">
                Guardian Name: {patient.guardianName}
              </label>
            </div>
            <div className="w-full lg:w-1/2">
              <label className="block text-left font-medium">
                Occupation: {patient.occupation}
              </label>
            </div>
          </div>

          <h3 className="text-2xl font-semibold mt-5">Address (Present): </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <label className="block text-left font-medium">
                House No: {patient.address.houseNo}
              </label>
            </div>
            <div>
              <label className="block text-left font-medium">
                Road No: {patient.address.roadNo}
              </label>
            </div>

            <div>
              <label className="block text-left font-medium">
                Post Office: {patient.address.po}
              </label>
            </div>
            <div>
              <label className="block text-left font-medium">
                Police Station: {patient.address.ps}
              </label>
            </div>
            <div>
              <label className="block text-left font-medium">
                District:{" "}
                <span className="uppercase">{patient.address.district}</span>
              </label>
            </div>
            <div>
              <label className="block text-left font-medium">
                Division:{" "}
                <span className="uppercase">{patient.address.division}</span>
              </label>
            </div>
            <div>
              <label className="block text-left font-medium">
                Home Number: {patient.address.phoneNumber}
              </label>
            </div>
            <div>
              <label className="block text-left font-medium">
                Emergency Contact Number: {patient.address.emergencyNumber}
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PatientDetails;
