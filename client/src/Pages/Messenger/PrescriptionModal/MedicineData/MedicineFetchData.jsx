

export default function MedicineFetchData({medicineData,handleSelectMedicine}) {
  return (
    <div className='grid grid-cols-2 lg:grid-cols-6 gap-6 mb-6'>
        {
              medicineData?.data?.map((med) => (
                <div 
                  key={med?._id} 
                  onClick={() => handleSelectMedicine(med?.medicinename)}
                  className="bg-gray-100 p-2 rounded-lg shadow-md cursor-pointer hover:bg-gray-200"
                >
                  <div className="text-center">
                    <h2 className="text-lg text-gray-800">{med?.medicinename}</h2>
                  </div>
                </div>
              ))
            }
    </div>
  )
}
