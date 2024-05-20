import { useEffect, useState } from "react";

export default function RightSide() {
  const [allData, setAllData] = useState([]);

  useEffect(() => {
    const getAdvertise = async () => {
      try {
        const res = await fetch('/api/add/advertises', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const result = await res.json();
        if (!result.success) {
          console.log(result.message);
          window.alert("Server is not working");
        } else {
          setAllData(result.data); // assuming the data is in result.data
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        window.alert("An error occurred while fetching data.");
      }
    };
    getAdvertise(); // Call the function, not return it
  }, []);

  return (
    <div className="mt-16 bg-gray-200 border-4 border-gray-400 rounded-xl" style={{ width: '26em' }}>
      <div className="rounded-lg" style={{ width: '30em',  }}>
        <div className="carousel" style={{ width: '25em', height: '25em' }}>
          <h1>Hi</h1>
          {allData.length > 0 ? (
            allData.map((data) => (
              <div key={data?._id} className="carousel-item relative w-full flex flex-col">
                <div>
                  {data.avatar && data.avatar.length > 0 && (
                    <img
                      src={data.avatar[0]} // Display the first avatar image
                      alt="Avatar"
                      className="w-full m-2 rounded-2xl"
                    />
                  )}
                  <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href={`${data._id}`} className="btn btn-circle">❮</a>
                    <a href="#slide2" className="btn btn-circle">❯</a>
                  </div>
                </div>
                <div className="mt-4 ml-10">
                  <h1>Address: {data.address}</h1>
                  <h1>Name: {data.name}</h1> {/* Example usage, replace with actual data field */}
                  <h1>Contact Number: {data.phone}</h1> {/* Example usage, replace with actual data field */}
                </div>
              </div>
            ))
          ) : (
            <p>No data available</p>
          )}
        </div>
      </div>
    </div>
  );
}
