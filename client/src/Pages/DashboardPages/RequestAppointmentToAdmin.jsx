import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function RequestAppointmentToAdmin() {
    const {currentUser} = useSelector(state => state.user)
    const [allData, setAllData] = useState([]);
    const navigate = useNavigate();

    console.log("first: ", currentUser?.data?.accessToken);

  useEffect(() => {
    const getAllAdmins = async () => {
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
        console.error("Error fetching admins:", error);
      }
    };

    getAllAdmins();
  }, []);

  const handleClickInvoice = (e, _id) =>{
    e.preventDefault();
    console.log("first", _id)
    if(_id){
      navigate(`/dashboard/invoice/${_id}`)
    }else {
      console.error('Payment is not complete');
    }
  }

  const handleApprove = async (id, doctor, date, department, email) => {
    try {
      const response = await fetch(`/api/appointment/booking/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${currentUser?.data?.accessToken}`
        },
        body: JSON.stringify({
          doctor,
          date,
          department,
          email,
          status: "approved",
          accessToken: currentUser?.data?.accessToken,
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
      <div>
          <div className="m-4 p-2 bg-stone-200 rounded-md">
            <div className="overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th className="text-xl font-semibold text-black">Name</th>
                    <th className="text-xl font-semibold text-black">Doctor Name</th>
                    <th className="text-xl font-semibold text-black">Department</th>
                    <th className="text-xl font-semibold text-black">Date</th>
                    <th className="text-xl font-semibold text-black">Slot</th>
                    <th className="text-xl font-semibold text-black">Bill</th>
                    <th className="text-xl font-semibold text-black">Action</th>
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
    <td className="text-lg">
      <>
        {data?.price && !data?.paid ? (
          <button className="hover:opacity-50">
            Pay
          </button>
        ) : (
          <button onClick={(e) => handleClickInvoice(e, data?._id)}>
            <span className='text-green-500 hover:opacity-50'>
              Invoice
            </span>
          </button>
        )}
      </>
    </td>
    <td>
      <button
        className="bg-green-500 text-white p-2 rounded mr-2"
        onClick={() => handleApprove(data?._id, data?.doctor, data?.date, data?.department, data?.email)}
      >
        {data?.status === "approved" ? "Approved" : "Approve"}
      </button>
    </td>
  </tr>
))}

                </tbody>
              </table>
            </div>
          </div>
      </div>
    );
}
