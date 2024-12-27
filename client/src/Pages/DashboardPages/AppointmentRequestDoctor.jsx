import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { BsMessenger } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";

export default function AppointmentRequestDoctor() {
  const { currentUser } = useSelector((state) => state.user);
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getAllRequests = async () => {
      try {
        const res = await fetch("https://health-care-server-0t0x.onrender.com/api/appointment/bookings", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        if (data?.success === false) {
          console.error(data.message);
        } else {
          setAllData(data?.data);
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    getAllRequests();
  }, []);

  const handleApprove = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://health-care-server-0t0x.onrender.com/api/appointment/booking/update/doctor/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentUser?.data?.accessToken}`,
          },
          body: JSON.stringify({
            status: "pending",
            docapporve: "approved",
            friend: "approved",
            accessToken: currentUser?.data?.accessToken,
          }),
        }
      );
      const result = await response.json();
      if (!result.success) {
        toast.error(`Error: ${result.message}`);
      } else {
        setAllData((prevData) =>
          prevData.map((appointment) =>
            appointment?._id === id
              ? { ...appointment, docapporve: "approved" }
              : appointment
          )
        );
        setLoading(false);
        toast.success("Successfully Appointment Approved From Doctor!");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error updating appointment:", error.message);
      toast.error(error?.message);
    }
  };

  const handleDocId = (e, _id) => {
    e.preventDefault();
    if (_id) navigate(`/chat/${_id}`);
    else console.error("Appointment Data not found");
  };

  return (
    <div className="mt-5 m-4">
      <div className="overflow-x-auto lg:max-h-[45rem]">
        <table className="table w-full bg-black">
          <thead>
            <tr>
              <th>Serial</th>
              <th>Patient Name</th>
              <th>Date</th>
              <th>Slot</th>
              <th>Meeting</th>
              <th>Bill</th>
              <th>B.Verified</th>
              <th>Talk</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allData.map((data, i) => (
              <tr key={data._id} className="hover:opacity-100">
                <td>{i + 1}</td>
                <td className="text-md">{data.name}</td>
                <td className="text-md">{data.date}</td>
                <td className="text-md">
                  {data.appointmentSlots || data.onlineAppointmentSlots}
                </td>
                <td>{data?.meeting}</td>
                <td>
                  {data.price && data.paid ? (
                    <span className="text-green-500">Paid</span>
                  ) : (
                    <span className="text-red-500">Not Paid</span>
                  )}
                </td>
                <td>
                  {data?.isVerified === "pending" ? (
                    <span className="text-red-500">Not Verified</span>
                  ) : (
                    <span className="text-green-500">Verified</span>
                  )}
                </td>

                <td>
                  {data.friend === "pending" ? (
                    <span className="text-red-500">Pending</span>
                  ) : (
                    data.meeting === "online" && (
                      <button
                        className="btn text-xs"
                        onClick={(e) => handleDocId(e, data._id)}
                      >
                        <BsMessenger className="text-xl text-blue-500" />
                      </button>
                    )
                  )}
                </td>
                <td>
                  {data?.docapporve === "pending" ? (
                    <button
                      className="btn btn-primary text-xs"
                      onClick={() => handleApprove(data._id)}
                      disabled={loading}
                    >
                      {loading ? "Approving" : "Confirm"}
                    </button>
                  ) : (
                    <span className="text-green-500">Approved</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Toaster position="center-top" />
    </div>
  );
}
