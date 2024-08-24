import { useState } from "react";


export default function SelectedPrescribeMedicine({medicines,handleSelectMedicine,handleMedicineChange,handleAddMedicine, onRequestClose,onSubmit, /* handleSubmit */}) {
    //const [prescribeData, setPrescribeData] = useState({});
  
    console.log("Name: ",medicines )

    const handleSubmit = async () => {
      try {
        // Log the medicines data to the console
        console.log("Submitting data:", medicines);
  
        // Prepare the data to be sent to the API
        const response = await fetch('/api/prescriptions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(medicines),
        });
  
        const data = await response.json();
  
        // Check if the response was successful
        if (data.success) {
          console.log("Prescription submitted successfully:", data);
          // Optionally call onSubmit here if you need to handle additional tasks
          onSubmit(medicines);
        } else {
          console.error("Failed to submit prescription:", data.message);
        }
      } catch (error) {
        console.error("An error occurred while submitting the prescription:", error);
      }
  
      // Close the modal
      onRequestClose();
    };
      
  
return (
    <div>
      <div className="space-y-4">
        {medicines?.map((med, index) => (
          <div key={index} className="flex flex-col md:flex-row md:space-x-4">
            <input
              type="text"
              placeholder="Medicine Name"
              value={med.name}
              onChange={(e) => handleMedicineChange(index, 'name', e.target.value)}
              className="w-full p-3 mb-2 md:mb-0 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Dosage"
              value={med.dosage}
              onChange={(e) => handleMedicineChange(index, 'dosage', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-8">
        <button
          onClick={handleAddMedicine}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none"
        >
          Add Medicine
        </button>
        <button
          onClick={handleSubmit}
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none"
        >
          Send Prescription
        </button>
      </div>
    </div>
  )
}
