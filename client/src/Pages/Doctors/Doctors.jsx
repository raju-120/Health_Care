import { useEffect, useState } from "react"
import DoctorsCard from "./DoctorsCard";
import {useQuery} from 'react-query';

export default function Doctors() {

  const [allData, setAllData] = useState([]); // Initialize state as an array

  useEffect(() => {
    const getAllDoctor = async () => {
      try {
        const res = await fetch("/api/auth/doctors", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await res.json();
        if (!data.success) {
          console.log(data.message);
        } else {
          setAllData(data.data); // Assuming data contains a field 'data' with the list of doctors
        }
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    getAllDoctor(); // Call the function
  }, []);

  console.log(allData);

  /* useEffect(() =>{
    fetch('/api/doctor/doctorlists')
    .then(res => res.json())
    .then(data => setAllData(data))
  },[]) */

  return (
    <div className='grid lg:grid-cols-2 sm:grid-cols-1 gap-6 lg:ml-24 lg:mr-24'>
        {allData?.map((data) =>
        <DoctorsCard
          key={data._id}
          data= {data}
        ></DoctorsCard>)}
    </div>
  )
}
