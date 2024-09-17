
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
          <div >
            <MedicineFetchData 
              medicineData={medicineData}
              handleSelectMedicine={handleSelectMedicine}
            />
          </div>
            
            {/* Automatically selected the items from the fetched data */}

          
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
