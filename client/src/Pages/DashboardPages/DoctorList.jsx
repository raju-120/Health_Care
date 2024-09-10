import { useEffect, useState } from "react";
import Modal from 'react-modal';
import { useSelector } from "react-redux";

// Modal styles
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');



export default function DoctorList() {

  const {currentUser} = useSelector(state=> state.user);
    const [allData, setAllData] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedAdminId, setSelectedAdminId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getAllAdmins = async () => {
      try {
        const res = await fetch("/api/auth/doctors", {
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

  const handleDelete = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(currentUser?.data?.user?.role === 'admin' ? `/api/auth/admin/delete-doctor/${id}` : `/api/auth/system-admin/delete-doctor/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await res.json();
      if (!data.success) {
        setError(data.message);
      } else {
        setAllData(allData.filter(admin => admin._id !== id));
        closeModal();
      }
    } catch (error) {
      setError("Error deleting admin: " + error.message);
    }
    setLoading(false);
  }

  const openModal = (id) => {
    setSelectedAdminId(id);
    setModalIsOpen(true);
  }

  const closeModal = () => {
    setSelectedAdminId(null);
    setModalIsOpen(false);
  }


  return (
    <div className="m-4 p-2 bg-stone-200 rounded-md">
      <div className="overflow-x-auto lg:max-h-[45rem] rounded-lg">
        <table className="table w-full  ">
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
                  <button
                    className="btn btn-warning btn-md"
                    onClick={() => openModal(data._id)}
                  >
                    Delete
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Confirmation Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Delete Confirmation"
      >
        <h2>Are you sure you want to delete this admin?</h2>
        {error && <p className="text-red-500">{error}</p>}
        <button
          onClick={() => handleDelete(selectedAdminId)}
          className="btn btn-danger"
          disabled={loading}
        >
          {loading ? "Deleting..." : "Confirm"}
        </button>
        <button
          onClick={closeModal}
          className="btn btn-secondary"
        >
          Cancel
        </button>
      </Modal>
    </div>
  )
}
