import { useEffect, useState } from "react";

export default function AdminList() {
  const [allData, setAllData] = useState([]);

  useEffect(() => {
    const getAllAdmins = async () => {
      try {
        const res = await fetch("/api/auth/getadmin", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await res.json();
        if (!data.success) {
          console.log(data.message);
        } else {
          setAllData(data.data); // Ensure this matches your API's response structure
        }
      } catch (error) {
        console.error("Error fetching admins:", error);
      }
    };

    getAllAdmins(); // Call the function
  }, []);

  return (
    <div className="m-4 p-5 bg-stone-200 rounded-md">
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th className="text-xl font-semibold text-black">Name</th>
              <th className="text-xl font-semibold text-black">Email</th>
              <th className="text-xl font-semibold text-black">Action</th>
            </tr>
          </thead>
          <tbody>
            {allData?.map((data) => (
              <tr key={data?._id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={data?.avatar} alt="Avatar" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold text-lg">{data?.username}</div>
                    </div>
                  </div>
                </td>
                <td className="text-lg">{data?.email}</td>
                <th>
                  <button className="btn  btn-warning btn-md">Delete</button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
