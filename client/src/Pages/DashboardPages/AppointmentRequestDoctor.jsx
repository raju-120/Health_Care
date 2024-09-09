import { useState,useEffect } from "react";
import { useSelector } from "react-redux";
import { BsMessenger } from "react-icons/bs";
import { Link } from "react-router-dom";


export default function AppointmentRequestDoctor() {

    const {currentUser} = useSelector((state) => state.user);
    const [allData, setAllData] = useState([]);
   /*  console.log("User", currentUser?.data);
    console.log("Data", allData); */

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


      /* const handleApprove = async (id, doctor, date, department, email) => {
        try {
          const response = await fetch(`/api/appointment/booking/update/doctor/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${currentUser?.data?.accessToken}`
            },
            body: JSON.stringify({
              status: "pending",
              docapporve: "approved",
              friend: "approved",
              doctor, date, department, email,
              accessToken: currentUser?.data?.accessToken
            })
          });
      
          if (!response.ok) {
            throw new Error('Failed to update status');
          }
      
          const updatedAppointment = await response.json();
      
          // Update state with the new data
          setAllData(prevData =>
            prevData.map(appt =>
              appt._id === id
                ? { ...appt, ...updatedAppointment }
                : appt
            )
          );
      
        } catch (error) {
          console.error('Error updating appointment:', error.message);
        }
      }; */
      const handleApprove = async (id, doctor, date, department, email,name) => {
        try {
          const response = await fetch(`/api/appointment/booking/update/doctor/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${currentUser?.data?.accessToken}`
            },
            body: JSON.stringify({
              status: "pending",
              docapporve: "approved",
              friend: "approved",
              doctor, date, department, email,name,
              accessToken: currentUser?.data?.accessToken
            })
          });
      
          if (!response.ok) {
            throw new Error('Failed to update status');
          }
      
          const updatedAppointment = await response.json();
          
          // Update the state immediately with the new status
          setAllData(prevData =>
            prevData.map(appt =>
              appt._id === id ? { ...appt, ...updatedAppointment } : appt
            )
          );
        } catch (error) {
          console.error('Error updating appointment:', error.message);
        }
      };
      
      


  return (
    <div className="mt-5 m-4">
        <div className="overflow-x-auto lg:max-h-[45rem]">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Patient Name</th>
              <th>DOB</th>
              <th>Date</th>
              <th>Bill</th>
              <th>Talk</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allData?.map((data) => (
              <tr key={data?._id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="font-semibold text-md">{data?.name}</div>
                    </div>
                  </div>
                </td>
                <td className="text-md">{data?.doctor}</td>
                <td className="text-md">{data?.department}</td>
                <td className="text-md">{data?.date}</td>
                <td className="text-md">{data?.appointmentSlots}</td>
                <td>
                      {data?.price && data?.paid ? (
                        <span className='text-green-500'>Paid</span>
                      ) : (
                        <span className='text-red-500'>Not Paid</span>
                      )}
                </td>
                <td>
                      {data?.friend === 'pending' ? (
                        <span className='text-red-500'>{data?.friend}</span>
                      ) : (
                        <Link to='/chat'>
                          <span className='text-green-500 text-2xl hover:opacity-50'>
                            <BsMessenger />
                          </span>
                        </Link>
                      )}
                    </td>
                    <td>
                      {data?.docapporve === 'pending' ? (
                        <button
                          className="btn btn-primary text-xs"
                          onClick={() => handleApprove(data?._id, data?.doctor, data?.date, data?.department, data?.email , data?.name)}
                        >
                          <span className='text-white'>{data?.docapporve}</span>
                        </button>
                      ) : (
                        <span className='text-green-500'>Approved</span>
                      )}
                    </td>
              </tr>
            ))}

          

          </tbody>
        </table>

        </div>
    </div>
  )
}


{/* {
  allData?.map((data, index) => (
    currentUser?.data?.user?.username === data?.doctor && (
      <tr className="hover" key={data?._id}>
        <th>{index}</th>
        <td>{data?.name}</td>
        <td>{data?.dateOfBirth}</td>
        <td>{data?.date}</td>
        <td>
          {data?.price && data?.paid ? (
            <span className='text-green-500'>Paid</span>
          ) : (
            <span className='text-red-500'>Not Paid</span>
          )}
        </td>
        <td>
          {data?.friend === 'pending' ? (
            <span className='text-red-500'>{data?.friend}</span>
          ) : (
            <Link to='/chat'>
              <span className='text-green-500 text-2xl hover:opacity-50'>
                <BsMessenger />
              </span>
            </Link>
          )}
        </td>
        <td>
          {data?.docapporve === 'pending' ? (
            <button
              className="btn btn-primary text-xs"
              onClick={() => handleApprove(data?._id, data?.doctor, data?.date, data?.department, data?.email)}
            >
              <span className='text-white'>{data?.docapporve}</span>
            </button>
          ) : (
            <span className='text-green-500'>Approved</span>
          )}
        </td>
      </tr>
    )
  ))
} */}