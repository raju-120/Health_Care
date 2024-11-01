import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { /* Link, */ useNavigate } from "react-router-dom";
import { BsMessenger } from "react-icons/bs";

export default function MyAppointment() {
  const { currentUser } = useSelector((state) => state?.user);
  const [allData, setAllData] = useState([]);
  // const [allRegData, setAllRegData] = useState([]);
  const navigate = useNavigate();

  //console.log("user: " , currentUser?.data?.user?.email);
  console.log("Data: ", allData);

  useEffect(() => {
    const getAllAdmins = async () => {
      try {
        const res = await fetch(
          `/api/appointment/bookings/${currentUser?.data?.user?.email}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await res.json();
        if (!data.success) {
          console.log(data.message);
        } else {
          setAllData(data?.data);
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
      console.error("ID is null or undefined");
    }
  };

  const handleClickInvoice = (e, _id) => {
    e.preventDefault();
    console.log("first", _id);
    if (_id) {
      navigate(`/dashboard/invoice/${_id}`);
    } else {
      console.error("Payment is not complete");
    }
  };

  const handleDocId = (e, _id) => {
    e.preventDefault();
    // console.log("Appointment Id: ", _id);
    if (_id) {
      navigate(`/chat/${_id}`);
    } else {
      console.error("Appointment Data is not found");
    }
  };

  return (
    <div>
      <h1 className="text-center text-4xl font-bold mt-4 mb-4">
        Appointment List
      </h1>
      <div className="m-2 p-2 bg-stone-200 rounded-md">
        <div className="overflow-y-auto">
          <table className="table ">
            {/* head */}
            <thead>
              <tr>
                <th className="text-xl font-semibold text-black">Name</th>
                <th className="text-xl font-semibold text-black">
                  Doctor Name
                </th>
                <th className="text-xl font-semibold text-black">Department</th>
                <th className="text-xl font-semibold text-black">Date</th>
                <th className="text-xl font-semibold text-black">Slots</th>
                <th className="text-xl font-semibold text-black">Meeting</th>
                <th className="text-xl font-semibold text-black">Bill</th>
                <th className="text-xl font-semibold text-black">Talk</th>
                {/* <th className="text-xl font-semibold text-black">Reg Form</th> */}
                <th className="text-xl font-semibold text-black">Status</th>
              </tr>
            </thead>
            <tbody>
              {allData?.map((data) => (
                <tr className="hover" key={data?._id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="font-semibold text-md">
                          {data?.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="text-md">{data?.doctor}</td>
                  <td className="text-md">{data?.department}</td>
                  <td className="text-md">{data?.date}</td>
                  <td className="text-md">
                    {data?.appointmentSlots || data?.onlineAppointmentSlots}
                  </td>
                  <td className="text-md">{data?.meeting}</td>
                  <td className="text-lg">
                    <>
                      {data?.price && !data?.paid ? (
                        <button
                          onClick={(e) => handleClick(e, data?._id)}
                          className="hover:opacity-50 btn btn-outline btn-success text-xs"
                        >
                          Pay
                        </button>
                      ) : (
                        <button
                          onClick={(e) => handleClickInvoice(e, data?._id)}
                        >
                          <span className="text-green-500 hover:opacity-50">
                            Invoice
                          </span>
                        </button>
                      )}
                    </>
                  </td>

                  <td>
                    {/* {console.log("Doctor ID: ", data?.docId)} */}
                    <>
                      {data?.friend === "pending" ||
                      data?.status === "pending" ? (
                        <span className="text-red-500">Pending</span>
                      ) : (
                        data?.meeting === "online" && (
                          <button
                            className="btn text-xs"
                            onClick={(e) => handleDocId(e, data?._id)}
                          >
                            <BsMessenger className="text-xl text-blue-500" />
                          </button>
                        )
                      )}

                      {/* <Link to="/chat">
                            <span className="text-green-500 text-2xl hover:opacity-50">
                              <BsMessenger />
                            </span>
                          </Link> */}
                    </>
                  </td>

                  <td className="text-lg ">
                    {currentUser?.data?.user?.role === "admin" ||
                    currentUser?.data?.user?.role === "systemAdmin" ? (
                      <button className="bg-orange-600 p-1 rounded hover:opacity-75">
                        {data?.status}
                      </button>
                    ) : (
                      <span>{data?.status}</span>
                    )}
                  </td>
                  {/* <td>
                  <Link to='/patientinfo'>Form</Link>
                </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
