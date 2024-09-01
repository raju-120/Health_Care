
import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import MedicineFetchData from './MedicineData/MedicineFetchData';
import SelectedPrescribeMedicine from './SelectedMedicineModal/SelectedPrescribeMedicine';

const PrescriptionModal = ({ isOpen, onRequestClose, onSubmit,selectedUser }) => {
  const [medicines, setMedicines] = useState([{ name: '', dosage: '' }]);
  const [medicineData, setMedicineData] = useState([]);

  const handleMedicineChange = (index, field, value) => {
    const newMedicines = [...medicines];
    newMedicines[index][field] = value;
    setMedicines(newMedicines);
  };

  const handleAddMedicine = () => {
    setMedicines([...medicines, { name: '', dosage: '' }]);
  };

  const handleSelectMedicine = (medName) => {
    const newMedicines = [...medicines];
    const emptyIndex = newMedicines.findIndex(med => med.name === '');
    
    if (emptyIndex !== -1) {
      newMedicines[emptyIndex].name = medName;
    } else {
      newMedicines.push({ name: medName, dosage: '' });
    }
    
    setMedicines(newMedicines);
  };

 /*  const handleSubmit = () => {
    onSubmit(medicines);
  }; */
/*  */
  useEffect(() => {
    const getAllMedicineList = async () => {
      try {
        const res = await fetch('/api/medicine/medicineLists');
        const data = await res.json();
        if (data.success === false) {
          console.log("Data has not been fetched yet");
        } else {
          setMedicineData(data); // Only set data if the fetch was successful
        }
      } catch (err) {
        console.log("Something happened in the backend", err);
      }
    };
    getAllMedicineList();
  }, []);

  return (
    <>
      <div className="fixed flex items-center justify-center bg-black bg-opacity-50">
        <Modal 
          isOpen={isOpen} 
          onRequestClose={onRequestClose} 
          className="mt-36 m-36 h-[70%] bg-white rounded-lg shadow-lg p-7 overflow-y-auto"
        >
          <h2 className="text-3xl font-semibold text-center mb-10">Prescribe Medicines</h2>
          
          {/* Fetched the data */}
          <div /* className='grid grid-cols-2 lg:grid-cols-6 gap-6 mb-6' */>
            <MedicineFetchData 
              medicineData={medicineData}
              handleSelectMedicine={handleSelectMedicine}
            />
          </div>
            
            {/* Automatically selected the items from the fetched data */}

          {/* <div className="space-y-4">
            {medicines.map((med, index) => (
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
          </div> */}
          <SelectedPrescribeMedicine
            selectedUser={selectedUser} 
            medicines={medicines}
            handleMedicineChange={handleMedicineChange}
            handleAddMedicine={handleAddMedicine}
            onSubmit={onSubmit}
            onRequestClose={onRequestClose}
            medicineData={medicineData}
            handleSelectMedicine={handleSelectMedicine}
          />
            
        </Modal>
      </div>
  </>
  
  


  );
};

export default PrescriptionModal;
