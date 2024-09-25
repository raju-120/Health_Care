import { useEffect, useState } from "react";
import {useSelector} from "react-redux";
import {Link,  useNavigate} from "react-router-dom";
import { BsMessenger } from "react-icons/bs";

export default function MyAppointment() {
  const {currentUser} = useSelector(state => state?.user)
  const [allData, setAllData] = useState([]);
  const navigate = useNavigate();

  //console.log("user: " , currentUser?.data?.user?.email);
  console.log("Data: " , allData);

  useEffect(() => {
    const getAllAdmins = async () => {
      try {
        const res = await fetch(`/api/appointment/bookings/${currentUser?.data?.user?.email}`, {
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
  }, [currentUser?.data?.user?.email]);

  const handleClick = (e, _id) => {
    e.preventDefault();
    if (_id) {
      //console.log('_id:', _id);
      navigate(`/dashboard/Payment/${_id}`);
    } else {
      console.error('ID is null or undefined');
    }
  };

  const handleClickInvoice = (e, _id) =>{
    e.preventDefault();
    console.log("first", _id)
    if(_id){
      navigate(`/dashboard/invoice/${_id}`)
    }else {
      console.error('Payment is not complete');
    }
  }

  return (
    <div>
      <div className="m-4 p-3 bg-stone-200 rounded-md">
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th className="text-xl font-semibold text-black">Name</th>
              <th className="text-xl font-semibold text-black">Doctor Name</th>
              <th className="text-xl font-semibold text-black">Department</th>
              <th className="text-xl font-semibold text-black">Date</th>
              <th className="text-xl font-semibold text-black">Bill</th>
              <th className="text-xl font-semibold text-black">Talk</th> 
              <th className="text-xl font-semibold text-black">Action</th>
              <th className="text-xl font-semibold text-black">Paitent Form</th>
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
                {/* <td className="text-md">{data?.appointmentSlots}</td> */}
                <td className="text-lg">
                <>
                  {data?.price && !data?.paid ? (
                    <button onClick={(e) => handleClick(e, data?._id)} className="hover:opacity-50">
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
                      <>
                        {
                          data?.friend === 'pending' ? 
                          (
                            <span className='text-red-500'>
                              {data?.friend}
                            </span>
                          )
                          :
                          (
                            <Link to='/chat'>
                              <span className='text-green-500 text-2xl hover:opacity-50'>
                                <BsMessenger />
                              </span>
                            </Link>
                          )
                        }
                      </>
                    </td>

                <td className="text-lg ">
                  {currentUser?.data?.user?.role === 'admin' || currentUser?.data?.user?.role === 'systemAdmin' ? (
                    <button className="bg-orange-600 p-1 rounded hover:opacity-75">
                      {data?.status}
                    </button>
                  ) : (
                    <span>{data?.status}</span>
                  )}
                </td>
                <td>
                  <Link to='/patientinfo'>Form</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
    </div>
  )
}
