
function Appointments() {
  return (
    <div className="max-w-auto p-5 flex flex-col items-center">
      <h1 className="mt-5 text-4xl text-center font-semibold">Make Appointment</h1>
      <div className="lg:p-10 text-center w-full flex justify-center mt-5">
        
        <form className="flex flex-col items-center w-full max-w-4xl p-5 bg-lime-100 ">
          <div className="flex lg:flex-row lg:gap-4 items-center lg:w-2/3 mt-5">
            <div><h1>Patient Name:</h1></div>
            <div className="lg:w-2/3 ml-1"><input type="text" placeholder="Full Name" className="input input-bordered w-full max-w-xs" /></div>
          </div>
          
          <div className="flex lg:flex-row lg:gap-4 items-center lg:w-2/3 mt-5 ml-2">
            <div><h1>Date of Birth:</h1></div>
            <div className="lg:w-2/3 ml-1"><input type="date" placeholder="Full Name" className="input input-bordered w-full max-w-xs" /></div>
          </div>
          
          <div className="flex lg:flex-row lg:gap-4 items-center lg:w-2/3 mt-5">
            <div><h1>Gender :</h1></div>
            <div className="lg:w-2/3 ml-1">
              <div className="flex gap-4">
                <div className="flex justify-between items-center">
                  <div>
                    Male
                  </div>
                  <div>
                    <input type="radio" name="" id="" className="m-2 mt-3"/>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    Female
                  </div>
                  <div>
                    <input type="radio" name="" id="" className="m-2 mt-3"/>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
          
          <div className="flex lg:flex-row lg:gap-4 items-center lg:w-2/3 mt-5">
            <div><h1>Mobile : </h1></div>
            <div className="lg:w-2/3 lg:ml-11"><input type="number" placeholder="Number" className="input input-bordered w-full max-w-xs" /></div>
          </div>

          <div className="flex lg:flex-row lg:gap-4 items-center lg:w-2/3 mt-5">
            <div><h1>Requested For :</h1></div>
            <div className="lg:w-2/3"><input type="date" placeholder="Full Name" className="input input-bordered w-full max-w-xs" /></div>
          </div>
          
        </form>

      </div>
    </div>

  )
}

export default Appointments