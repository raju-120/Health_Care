import { useEffect, useState } from "react";
import HospitalCard from "./HospitalCard";

export default function Hospital() {
    const [data, setData] = useState(null);

  useEffect(() => {
    // Fetch the JSON file from the public folder
    fetch('./../../../public/place.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setData(data);
      })
      .catch(error => {
        console.error('Error fetching the JSON file:', error);
      });
  }, []);
  return (
    <div>
        <div className='grid lg:grid-cols-3 sm:grid-cols-1 gap-6 lg:ml-24 lg:mr-24'>
            {data?.map((data) =>
                <HospitalCard
                key={data?._id}
                data= {data}
                ></HospitalCard>)
            }
        </div>
    </div>
  )
}
