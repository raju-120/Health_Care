import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddAdmin() {
  const [formData, setFormData] = useState({});
  const [file, setFile] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      // Create a new FormData object
      const formDataToSend = new FormData();
      formDataToSend.append("username", formData.username);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("password", formData.password);
      formDataToSend.append("role", "admin");
      if (file) {
        formDataToSend.append("avatar", file);
      }
      console.log('Form data: ', formDataToSend);
      const res = await fetch('https://health-care-server-0t0x.onrender.com/api/auth/adminsignup', {
        method: 'POST',
        body: formDataToSend,
      });
      
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      
      setLoading(false);
      setError(null);
      navigate('/dashboard/adminlist');
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div>
      <div className="max-w-full py-5">
        <h1 className="text-4xl font-semibold text-center my-10 uppercase">Add A New Admin</h1>
        <div className="lg:flex justify-around">
          <div className="lg:w-2/5 my-24">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                id="username"
                placeholder="Username"
                onChange={handleChange}
                className="border p-4 rounded-lg"
              />

              <input
                type="email"
                id="email"
                placeholder="Email"
                onChange={handleChange}
                className="border p-3 rounded-lg"
              />

              <input
                type="password"
                id="password"
                placeholder="Password"
                onChange={handleChange}
                className="border p-3 rounded-lg"
              />

              <input
                type="file"
                id="avatar"
                onChange={handleFileChange}
                className="border p-3 rounded-lg"
              />

              <button
                disabled={loading}
                className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-75 disabled:opacity-65"
              >
                {loading ? 'Loading...' : 'Add Admin'}
              </button>
            </form>
            {error && <p className="text-red-500">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
