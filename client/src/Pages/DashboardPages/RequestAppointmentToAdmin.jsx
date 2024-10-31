import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";

export default function RequestAppointmentToAdmin() {
  const { currentUser } = useSelector((state) => state.user);
  const [allData, setAllData] = useState([]);
  const [loadingStates, setLoadingStates] = useState({});
  const navigate = useNavigate();

  // Fetch all appointment data
  useEffect(() => {
    const getAllAdmins = async () => {
      try {
        const res = await fetch("/api/appointment/bookings", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        if (!data.success) {
          console.log(data.message);
        } else {
          setAllData(data.data);
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    getAllAdmins();
  }, []);

  const handleClickInvoice = (e, _id) => {
    e.preventDefault();
    if (_id) {
      navigate(`/dashboard/invoice/${_id}`);
    } else {
      console.error("Payment is not complete");
    }
  };

  const handleApprove = async (id, doctor, date, department, email) => {
    setLoadingStates((prevState) => ({ ...prevState, [id]: true }));
    try {
      const response = await fetch(`/api/appointment/booking/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser?.data?.accessToken}`,
        },
        body: JSON.stringify({
          doctor,
          date,
          department,
          email,
          status: "approved",
        }),
      });

      const result = await response.json();
      if (!result.success) {
        toast.error(`Error: ${result.message}`);
      } else {
        setAllData((prevData) =>
          prevData.map((appt) =>
            appt._id === id ? { ...appt, status: "approved" } : appt
          )
        );
        toast.success("Appointment approved successfully!");
      }
    } catch (error) {
      console.error("Error updating appointment:", error.message);
    } finally {
      setLoadingStates((prevState) => ({ ...prevState, [id]: false }));
    }
  };

  return (
    <div>
      <div className="m-4 p-2 bg-stone-200 rounded-md">
        <div className="overflow-y-auto lg:max-h-[45rem]">
          <table className="table w-full">
            <thead>
              <tr>
                <th className="text-xl font-semibold text-black">Name</th>
                <th className="text-xl font-semibold text-black">
                  Doctor Name
                </th>
                <th className="text-xl font-semibold text-black">Department</th>
                <th className="text-xl font-semibold text-black">Date</th>
                <th className="text-xl font-semibold text-black">Slot</th>
                <th className="text-xl font-semibold text-black">Meeting</th>
                <th className="text-xl font-semibold text-black">Bill</th>
                <th className="text-xl font-semibold text-black">Action</th>
              </tr>
            </thead>
            <tbody>
              {allData?.map((data) => (
                <tr key={data?._id}>
                  <td>{data?.name}</td>
                  <td>{data?.doctor}</td>
                  <td>{data?.department}</td>
                  <td>{data?.date}</td>
                  <td>
                    {data?.appointmentSlots || data?.onlineAppointmentSlots}
                  </td>
                  <td>{data?.meeting}</td>
                  <td>
                    {data?.price && !data?.paid ? (
                      <button className="hover:opacity-50">Pay</button>
                    ) : (
                      <button onClick={(e) => handleClickInvoice(e, data?._id)}>
                        <span className="text-green-500 hover:opacity-50">
                          Invoice
                        </span>
                      </button>
                    )}
                  </td>
                  <td>
                    <button
                      className="bg-green-500 text-white p-2 rounded mr-2"
                      onClick={() =>
                        handleApprove(
                          data?._id,
                          data?.doctor,
                          data?.date,
                          data?.department,
                          data?.email
                        )
                      }
                      disabled={
                        loadingStates[data?._id] || data?.status === "approved"
                      }
                    >
                      {loadingStates[data?._id]
                        ? "Approving..."
                        : data?.status === "approved"
                          ? "Approved"
                          : "Confirm"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Toaster position="center-top" />
    </div>
  );
}
