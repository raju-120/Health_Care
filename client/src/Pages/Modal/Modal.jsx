import React from 'react';

export default function Modal({ setShowModal, data }) {
  return (
    <>
      <input type="checkbox" id="my_modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative h-auto w-[600px]">
          <label htmlFor="my_modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>

          {data?.doctors?.length > 0 ? (
            
            data?.doctors?.map((doctor) => (
              <div key={doctor?.id}>

                {/* {console.log("details",doctor)}
                {console.log("name",doctor?.docname)} */}
                {/* <h1 className="text-black">{doctor?.docname}</h1> */}

                <div className="card bg-sky-700 text-neutral-content w-full top-6 mb-2">
                  <div className="card-body items-center text-center">
                    
                    <div className='flex justify-between'>
                      

                        <div className="avatar">
                          <div className="lg:w-36 w-12 rounded">
                            <img src={doctor?.avatar} />
                          </div>
                        </div>

                      
                      <div>
                        <h2 className="card-title mr-2">{doctor?.docname}</h2>
                      </div>
                    </div>

                    <div className="card-actions justify-end">
                      <button className="btn btn-primary">Accept</button>
                      <button className="btn btn-ghost">Deny</button>
                    </div>
                  </div>
                </div>

              </div>
            ))

          ) : (
            <p>No doctors found.</p>
          )}
        </div>
      </div>
    </>
  );
}
