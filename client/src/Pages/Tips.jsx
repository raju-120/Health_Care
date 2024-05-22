import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import serviceLogo from '../assets/services.jpg';

export default function Tips() {
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      const result = await fetch('/api/posts/solutions', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await result.json();
      console.log(data.data);
      setServices(data.data);
    };
    fetchServices();
  }, []);

  const handleClick = (e, _id) => {
    e.preventDefault();
    console.log('_id:', _id)
    navigate(`/solution/${_id}`);
  };

  return (
    <div className='mb-24'>
      <div>
        <img src={serviceLogo} alt="" className='w-[1990px] h-[500px] no-repeat' />
      </div>
      <div className="mt-10">
        <h1 className="text-4xl font-semibold text-center ml-16">Services We Provide</h1>
        <div className='mt-10 p-10'>
          <div className='grid grid-cols-4 gap-6 justify-around text-center'>
            {services.length > 0 ? (
              services.map((service) => (
                <div key={service._id}>
                  <h1
                    onClick={(e) => handleClick(e, service._id)}
                    className="mt-10 uppercase font-semibold box-border p-20 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)] rounded-lg hover:opacity-30 cursor-pointer"
                  >
                    {service.name}
                  </h1>
                </div>
              ))
            ) : (
              <p>Loading services...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
