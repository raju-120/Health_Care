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
          `https://health-care-server-0t0x.onrender.com/api/appointment/bookings?${currentUser?.data?.user?.email}`,
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
                <th className="text-xl font-semibold text-black">Index</th>
                <th className="text-xl font-semibold text-black">Name</th>
                <th className="text-xl font-semibold text-black">
                  Doctor Name
                </th>
                <th className="text-xl font-semibold text-black">Department</th>
                <th className="text-xl font-semibold text-black">Date</th>
                <th className="text-xl font-semibold text-black">Slots</th>
                <th className="text-xl font-semibold text-black">Meeting</th>
                <th className="text-xl font-semibold text-black">Bill</th>
                <th className="text-xl font-semibold text-black">B.Verified</th>
                <th className="text-xl font-semibold text-black">Talk</th>
                {/* <th className="text-xl font-semibold text-black">Reg Form</th> */}
                <th className="text-xl font-semibold text-black">Status</th>
              </tr>
            </thead>
            <tbody>
              {allData?.map((data, i) => (
                <tr className="hover" key={data?._id}>
                  <td>{i + 1}</td>
                  <td>{data?.name}</td>
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
                    <>
                      {data?.isVerified === "pending" ? (
                        <span className="text-red-500">Not Verified</span>
                      ) : (
                        <span className="text-green-500">Verified</span>
                      )}
                    </>
                  </td>
                  <td>
                    <>
                      {data?.friend === "pending" ||
                      data?.status === "pending" ? (
                        <span className="text-red-500">pending</span>
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
                    </>
                  </td>
                  <td>
                    {data.status === "pending" ? (
                      <span className="text-red-500">pending</span>
                    ) : (
                      <span className="text-green-500">approved</span>
                    )}
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
