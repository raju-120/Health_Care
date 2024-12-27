import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";

export default function BloodDonner() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const [bloodDonors, setBloodDonors] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    email: currentUser?.data?.user?.email || "",
    division: "",
    lastdonatedate: "",
    area: "",
    bloodgroup: "",
  });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch all Blood Donor lists
  const fetchBloodDonors = async () => {
    try {
      const response = await fetch(`https://health-care-server-0t0x.onrender.com/api/donner/blooddonnerlist`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setBloodDonors(data?.data || []);
      setFilteredData(data?.data || []);
    } catch (error) {
      console.error("Error fetching blood donors:", error);
    }
  };

  useEffect(() => {
    fetchBloodDonors();
  }, []);

  const handleSearchChange = (e) => {
    const term = e.target.value.trim().toLowerCase();
    setSearchTerm(term);
    setFilteredData(
      bloodDonors?.filter((donor) =>
        donor.bloodgroup.toLowerCase().includes(term)
      )
    );
  };

  const handleSearchClick = () => {
    const trimmedSearchTerm = searchTerm.trim().toLowerCase();
    const filtered = bloodDonors?.filter((donor) =>
      donor.bloodgroup.toLowerCase().includes(trimmedSearchTerm)
    );
    setFilteredData(filtered);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("https://health-care-server-0t0x.onrender.com/api/donner/blooddonner", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!data?.success) {
        toast.error(data?.message);
      } else {
        setLoading(false);
        toast.success("Blood Donor registered successfully.");

        // Fetch the updated blood donors list
        await fetchBloodDonors();
        window.location.reload();
      }
    } catch (error) {
      console.log("Data is corrupted", error?.message);
      setLoading(false);
      setError("Something went wrong. Please try again.");
      toast.error(error?.message);
    }
  };

  return (
    <div className="Items-center text-center lg:m-24 mt-5">
      <section id="services">
        <div className="cs_height_120 cs_height_lg_80"></div>
        <div className="container">
          <div className="cs_section_heading cs_style_1 text-center">
            <h3 className="cs_section_title_up cs_accent_color_v1 cs_semibold cs_fs_24">
              Here is our Blood Donor list
            </h3>
            <h2 className="cs_section_title cs_semibold cs_fs_45 wow fadeInUp mb-0">
              You can reach out to them <br /> To Our Blood Donor
            </h2>
          </div>
          <div className="cs_height_63 cs_height_lg_40"></div>
        </div>
        <div className="cs_height_120 cs_height_lg_80"></div>
      </section>

      {/* Donor List search section by blood group */}
      <section className="mb-24 mt-[-7em]">
        <div className="container mx-auto lg:px-5">
          <form className="w-full" onSubmit={(e) => e.preventDefault()}>
            <div className="mb-8">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  placeholder="Search by Blood Group"
                  className="w-full p-3 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={handleSearchClick}
                  className="bg-blue-500 text-white p-3 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredData.map((donor, index) => (
                <div
                  key={index}
                  className="bg-white text-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="text-center">
                    <p className="text-xl font-semibold mb-2">
                      {donor.firstname} {donor.lastname}
                    </p>
                    <p className="text-lg mb-1">
                      <span className="font-medium text-green-500">
                        Blood Group:
                      </span>{" "}
                      {donor.bloodgroup}
                    </p>
                    <p className="text-lg mb-1">
                      <span className="font-medium">Contact:</span> +880{" "}
                      {donor.phone}
                    </p>
                    <p className="text-lg mb-1">
                      <span className="font-medium">Area:</span> {donor.area}
                    </p>
                    <p className="text-lg">
                      <span className="font-medium">Last Donated Date:</span>{" "}
                      {donor.lastdonatedate}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </form>
        </div>
      </section>

      {/*Donner Regististration  section*/}

      {currentUser?.data?.user?.role === "user" && (
        <section id="contact">
          <div className="cs_height_120 cs_height_lg_80"></div>
          <div className="container">
            <div className="cs_section_heading cs_style_1 text-center">
              <h3 className="cs_section_title_up cs_accent_color_v1 cs_semibold cs_fs_24 wow fadeInDown">
                Want be a part of <span className="text-blue-500">Blood</span>
                <span className="text-sky-600">Donner</span>?
              </h3>
              <h2 className="cs_section_title cs_semibold cs_fs_45 mb-0">
                Please Register as a Donner
              </h2>
            </div>
            <div className="cs_height_45 cs_height_lg_30"></div>

            <form
              onSubmit={handleSubmit}
              className="cs_contact_form row cs_gap_y_24"
              id="cs_form"
            >
              <div className="col-md-6 position-relative">
                <input
                  type="text"
                  id="firstname"
                  name="firstname"
                  onChange={handleChange}
                  className="cs_form_field cs_radius_5"
                  required
                />
                <label>First Name</label>
              </div>

              <div className="col-md-6 position-relative">
                <input
                  type="text"
                  name="lastname"
                  id="lastname"
                  onChange={handleChange}
                  className="cs_form_field cs_radius_5"
                  required
                />
                <label>Last Name</label>
              </div>

              <div className="col-md-6 position-relative">
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  onChange={handleChange}
                  className="cs_form_field cs_radius_5"
                  required
                />
                <label>Phone</label>
              </div>

              <div className="col-md-6 position-relative">
                <input
                  type="text"
                  name="email"
                  id="email"
                  onChange={handleChange}
                  className="cs_form_field cs_radius_5"
                  defaultValue={currentUser?.data?.user?.email}
                  required
                />
                <label>Email Address</label>
              </div>

              <div className="col-md-6 position-relative">
                <input
                  type="text"
                  name="division"
                  id="division"
                  onChange={handleChange}
                  className="cs_form_field cs_radius_5"
                  required
                />
                <label>Divion</label>
              </div>

              <div className="col-md-6 position-relative">
                <input
                  type="date"
                  name="lastdonatedate"
                  id="lastdonatedate"
                  onChange={handleChange}
                  className="cs_form_field cs_radius_5"
                  max={new Date().toISOString().split("T")[0]} // Set max date to today
                  required
                />
                <label>Last Donate date</label>
              </div>

              <div className="col-md-6 position-relative">
                <textarea
                  name="area"
                  id="area"
                  onChange={handleChange}
                  className="cs_form_field cs_radius_5"
                  required
                />
                <label>Prefference Area that you can donate.</label>
              </div>

              <div className="col-md-6 position-relative">
                <input
                  type="text"
                  name="bloodgroup"
                  id="bloodgroup"
                  onChange={handleChange}
                  className="cs_form_field cs_radius_5"
                  required
                />
                <label>Blood Group</label>
              </div>

              <div className="col-md-12 text-md-center">
                <button
                  type="submit"
                  className="w-full btn bg-sky-500 text-white cs_fs_24 cs_semibold"
                >
                  {loading ? "Loading..." : "Register as Donner"}
                </button>
              </div>
              {error && <p className="text-red-500">{error.message}</p>}
            </form>
          </div>
          <div className="cs_height_120 cs_height_lg_80"></div>
        </section>
      )}
      <Toaster position="center-top" />
    </div>
  );
}
