import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function ServiceDetail() {
  const { id } = useParams();
  const [service, setService] = useState(null);

  useEffect(() => {
    const fetchService = async () => {
      const result = await fetch(`https://health-care-server-0t0x.onrender.com/api/posts/service/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await result.json();
      setService(data.data);
    };
    fetchService();
  }, [id]);

  if (!service) {
    return <div>Loading...</div>;
  }

  return (
    <div className="service-detail">
      <div className="card w-full bg-base-100 shadow-xl">
        <div className="card-body items">
          <h2 className="text-center text-2xl font-semibold">{service.name}</h2>
          <p className='text-lg p-5'>{service.description}</p>
          <div className='ml-16 p-5'>
            <li className='text-lg p-5'>{service.one}</li>
            <li className='text-lg p-5'>{service.two}</li>
            <li className='text-lg p-5'>{service.three}</li>
            <li className='text-lg p-5'>{service.four}</li>
            <li className='text-lg p-5'>{service.five}</li>
            <li className='text-lg p-5'>{service.six}</li>
            <li className='text-lg p-5'>{service.seven}</li>
            <li className='text-lg p-5'>{service.eight}</li>
            <li className='text-lg p-5'>{service.footer}</li>
          </div>
          
        </div>
      </div>
    </div>
  );
}
