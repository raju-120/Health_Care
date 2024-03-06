

export default function CreateAdvertising() {
  return (
    <main className="p-3 max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold text-center my-7">Create Your Health-Care Advertising </h2>
        <form  className="flex flex-col sm:flex-row gap-4">
            <div className="flex flex-col gap-4 flex-1">

                <input 
                    type="text" 
                    id="name" 
                    placeholder="Health-Care Name" 
                    maxLength='62' 
                    minLength='3' 
                    className="border p-3 rounded-lg" 
                    required
                />
                
                <input 
                    type="text" 
                    id="address" 
                    placeholder="Address" 
                    className="border p-3 rounded-lg"  
                    required
                />
                <input 
                  type="number"
                  id="phone"
                  placeholder="Phone Number"
                  className="border p-3 rounded-lg"  
                  required
                />
                
                <div className="flex">
                  <div>
                    <p className="font-semibold">Images: 
                      <span className="font-normal text-gray-600 ml-2">Upload your advertising image(Less Then 2MB)</span>
                    </p>
                    <input 
                      type="file" 
                      id="images" 
                      accept='image/*' 
                      multiple 
                      className="p-3 border border-gray-200 rounded w-full" 
                    />

                  </div>

                  <div className="m-6">
                    <button
                      type="button"
                      className="p-3 bg-green-600 text-white border border-green-700 rounded uppercase
                                hover:shadow-lg disabled:opacity-80"
                      >Image Upload
                    </button>
                  </div>

                </div>

                

                
              
              <button className="p-3 text-white bg-slate-700 
                  rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
              >
                  Create Advertising
              </button>
            </div>
        </form>
    </main>
  )
}
