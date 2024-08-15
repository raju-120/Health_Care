import { useState,useEffect } from "react";


export default function AppointmentRequestDoctor() {

    const [allData, setAllData] = useState([])
    console.log("first", allData);

    useEffect(() => {
        const getAllrequest = async () => {
          try {
            const res = await fetch("/api/appointment/bookings", {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json'
              }
            });
            const data = await res.json();
            if (!data.success) {
              console.log(data.message);
            } else {
              setAllData(data.data);
            }
          } catch (error) {
            console.error("Error fetching appointment booking list:", error);
          }
        };
    
        getAllrequest();
      }, []);
  return (
    <div>
        <h1>Hi</h1>
    </div>
  )
}
