import { useEffect, useState } from "react";

export default function UserRegistrationForm() {
  const [allRegData, setAllRegData] = useState([]);
  useEffect(() => {
    const getUserRegisForm = async () => {
      const uId = currentUser?.data?.id;
      try {
        const res = await fetch(`https://health-care-server-0t0x.onrender.com/api/patient/patient-reg-form/${uId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        if (!data.success) {
          console.log(data.message);
        } else {
          setAllRegData(data.data);
        }
      } catch (error) {
        console.log("Error: ", error);
      }
    };
    getUserRegisForm();
  }, []);
  return <div>UserRegistrationForm</div>;
}
