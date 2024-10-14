import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { BsMessenger } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export default function AppointmentRequestDoctor() {
  const { currentUser } = useSelector((state) => state.user);
  const [allData, setAllData] = useState([]);
  const [loadingId, setLoadingId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getAllRequests = async () => {
      try {
        const res = await fetch("/api/appointment/bookings", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        if (data.success) {
          setAllData(data.data);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    getAllRequests();
  }, []);

  const handleApprove = async (id, doctor, date, department, email, name) => {
    setLoadingId(id); // Track the loading state for the specific appointment

    try {
      const response = await fetch(
        `/api/appointment/booking/update/doctor/${id}`,
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
            doctor,
            date,
            department,
            email,
            name,
            accessToken: currentUser?.data?.accessToken,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to update status");

      // Update the state locally to avoid needing a page refresh
      setAllData((prevData) =>
        prevData.map((appt) =>
          appt._id === id ? { ...appt, docapporve: "approved" } : appt
        )
      );
    } catch (error) {
      console.error("Error updating appointment:", error);
    } finally {
      setLoadingId(null); // Reset the loading state
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
              <th>Bill</th>
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
                <td className="text-md">{data.appointmentSlots}</td>
                <td>
                  {data.price && data.paid ? (
                    <span className="text-green-500">Paid</span>
                  ) : (
                    <span className="text-red-500">Not Paid</span>
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
                  {data.docapporve === "pending" ? (
                    <button
                      className="btn btn-primary text-xs"
                      onClick={() => handleApprove(data._id)}
                      disabled={loadingId === data._id}
                    >
                      {loadingId === data._id ? (
                        <span className="text-white">Approving...</span>
                      ) : (
                        <span className="text-white">Approve</span>
                      )}
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
    </div>
  );
}
