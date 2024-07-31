import React from 'react';

export default function Modal({ setShowModal, data }) {
  return (
    <>
      <input type="checkbox" id="my_modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box w-11/12 max-w-3xl">
          <label htmlFor="my_modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>

          {data?.doctors?.length > 0 ? (
            
            data?.doctors?.map((doctor) => (
              <div key={doctor?.id}>

                 {console.log("details",doctor)}
                {/*{console.log("name",doctor?.docname)} */}
                {/* <h1 className="text-black">{doctor?.docname}</h1> */}

                <div className="card bg-sky-700 text-neutral-content w-full top-6 mb-2">
                  <div className="card-body items-center text-center">
                    
                    <div className='flex justify-center mr-auto'>
                      
                      <div className="avatar">
                        <div className="lg:w-48 w-12 rounded">
                          <img src={doctor?.avatar} />
                        </div>
                      </div>
                      
                      <div className='ml-12'>
                        <h2 className="font-bold text-3xl text-black mb-1 text-center">{doctor?.docname}</h2>
                        <div className='text-start mt-2'>
                          <p>Gender: <span className='text-sky-200 font-semibold'>{doctor?.gender}</span></p>
                          <p>BMDC-Code: <span className='text-sky-200 font-semibold'>{doctor?.bmdc}</span></p>
                          <p>Department Name: <span className='text-sky-200 font-semibold'>{doctor?.depname}</span></p>
                          <p>Designation: <span className='text-sky-200 font-semibold'>{doctor?.designation}</span></p>
                          <p>Qualification: <span className='text-sky-200 font-semibold'>{doctor?.qualification}</span></p>
                          <p>Availabale Day: <span className='text-sky-200 font-semibold'>Today</span></p>
                        </div>
                      </div>

                    </div>

                    <div className="card-actions justify-end mt-2">
                      <h1 className='card-title'>Address: <span className='text-black'>{doctor?.address}</span></h1>
                    </div> 

                  </div>
                </div>

              </div>
            ))

          ) : (
            <p>No doctors found.</p>
          )}

          <div className="card-actions justify-end mt-5 ">
            <label htmlFor="my_modal" className="btn btn-warning text-right">Close!</label>
          </div>
        </div>
      </div>
    </>
  );
}
