import serviceLogo from '../assets/services.jpg';

export default function Services() {
  return (
    <div className='mb-24'>
      <div className=''>
        <img src={serviceLogo} alt="" className='w-[1990px] h-[500px]  no-repeat' />
      </div>
      <div className="mt-10">
        <h1 className="text-4xl font-semibold text-center ml-16">Services We Provide</h1>
        
        <div className='mt-10 ml-36'>
          <div className='flex flex-row justify-around text-center '>
            <div>
              <h1 className="mt-10 uppercase font-semibold box-border p-10 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)] rounded-lg">personal Health Information</h1>
              <h1 className="mt-10 uppercase font-semibold p-10 box-border shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)] rounded-lg">You can post the health issue</h1>
            </div>
            <div>
              <h1 className="mt-10 box-border uppercase font-semibold p-10 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)] rounded-lg">Advertise your health care hospital information</h1>
              <h1 className="mt-10 box-border uppercase font-semibold p-10 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)] rounded-lg">Discussion about the problem </h1>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
