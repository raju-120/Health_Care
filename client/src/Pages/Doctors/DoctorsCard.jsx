

export default function DoctorsCard({data}) {
    const {username,avatar,bmdc,specialty,qualification,designation,institute,department,phone,appointmentnumber,address,email} = data;
  return (
    <div >
        <div className="card card-side bg-base-100 shadow-xl">
            <div className='mt-5 flex flex-col lg:flex-row'>
                <figure>
                    <img src={avatar} alt="avatar" className='lg:w-64 lg:h-96 rounded-xl lg:ml-4'/>
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{username}</h2>
                    <p className='text-lg'>Email: <span  className='font-bold text-lg'> {email} </span></p>
                    <p className='text-lg'>BM&DC license: <span className='font-bold text-lg'>{bmdc}</span></p>
                    <p className='text-lg'> Designation : <span className='font-bold text-lg'>{designation}</span></p>
                    <p className='text-lg'> Qualification : <span className='font-bold text-lg'>{qualification}</span></p>
                    <p className='text-lg'> Department Name : <span className='font-bold text-lg'>{department}</span></p>
                    <p className='text-lg'>Specialty: <span  className='font-bold text-lg'> {specialty} </span></p>
                    <p className='text-lg'>Appointment Number: <span  className='font-bold text-lg'>  {appointmentnumber}  </span></p>
                    <p className='text-lg'>Chamber Address: <span  className='font-bold text-lg'>  {address}  </span></p>
                    <p className='text-lg'>Institute-Name: <span  className='font-bold text-lg'>  {institute}  </span></p>
                </div>
            </div>
        </div>
    </div>
  )
}
