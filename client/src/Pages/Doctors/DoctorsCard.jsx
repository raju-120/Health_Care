import { Link } from "react-router-dom";


export default function DoctorsCard({data}) {
   
    //const {username,avatar,bmdc,specialty,qualification,designation,institute,department,phone,appointmentnumber,address,email} = data;
    /* const {deptname, id} = data; */


    const handleDept =(e)=>{
        e.preventDefault();
        console.log('click',)
    }

  
    return (
    <div className="card w-full bg-base-100 shadow-xl hover:bg-blue-200 hover:opacity-65 hover:pointer hover:p-5px">
        <div className="text-center m-5">
            <button onClick={(e) => handleDept(data?.id,e)} className="mt-2 text-center text-2xl font-semibold">{data?.deptname}</button>
        </div>



        {/* <div className="card w-full bg-base-100 shadow-xl">
            <div className="lg:p-10 grid lg:grid-cols-3 mx-16 lg:mx-24 ">
                
                    <button onClick={(e) => handleDept(id,e)} className="btn  text-center text-2xl font-semibold">{deptname}</button>
               
            </div>
        </div> */}


        



    {/* <div key={_id}>
        <div className="hiver:opacity-25 hover:bg-sky-300 card card-side shadow-xl">
            <div className='mt-5 grid lg:grid-col-3 grid-col-1 gap-4 items-center'>
                <h1 className="card-title text-center hover:pointer" >{deptname}</h1>
                <div className="flex lg:flex-col-row  flex-col-row">
                     <div>
                        <figure>
                            <img src={avatar} alt="avatar" className='lg:w-34 lg:h-34 rounded-xl lg:ml-4'/>
                        </figure>
                    </div>
                    <div>
                        <h1 className="card-title">{data?.deptname}</h1>
                        <p className='text-lg'>Email: <span  className='font-bold text-lg'> {email} </span></p>
                        <p className='text-lg'>BM&DC license: <span className='font-bold text-lg'>{bmdc}</span></p>
                        <p className='text-lg'> Designation : <span className='font-bold text-lg'>{designation}</span></p>
                        <p className='text-lg'> Qualification : <span className='font-bold text-lg'>{qualification}</span></p>
                        <p className='text-lg'> Department Name : <span className='font-bold text-lg'>{department}</span></p>
                    </div>
                </div>
                <div className="card-body">
                    
                    <p className='text-lg'>Specialty: <span  className='font-bold text-lg'> {specialty} </span></p>
                    <p className='text-lg'>Appointment Number: <span  className='font-bold text-lg'>  {appointmentnumber}  </span></p>
                    <p className='text-lg'>Chamber Address: <span  className='font-bold text-lg'>  {address}  </span></p>
                    <p className='text-lg'>Institute-Name: <span  className='font-bold text-lg'>  {institute}  </span></p>
                </div>
            </div>
        </div> 
    </div>
    </div> */}
    </div>
  )
}
