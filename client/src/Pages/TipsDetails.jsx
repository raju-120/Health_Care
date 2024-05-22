import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function TipsDetails() {
  const { id } = useParams();
  const [service, setService] = useState(null);
  console.log('i am here for service id: ',id)
  console.log('i am here for service id: ',service)

  useEffect(() => {
    const fetchService = async () => {
      const result = await fetch(`/api/posts/solution/${id}`, {
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
            <h1 className='text-3xl font-semibold'>SYMPTOMS : </h1>
            <li className='text-lg p-5'>{service.one}</li>
            <li className='text-lg p-5'>{service.two}</li>
            <li className='text-lg p-5'>{service.three}</li>

            <h1 className='text-3xl font-semibold'>Rick Fectors : </h1>
            <li className='text-lg p-5'>{service.four}</li>
            <li className='text-lg p-5'>{service.five}</li>
            <li className='text-lg p-5'>{service.six}</li>
            <h1 className='text-lg p-5'><span className='text-2xl font-semibold'>TreatMent: </span>{service.footer}</h1>
          </div>
          
        </div>
      </div>
    </div>
  );
}
