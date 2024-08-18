
import { useState } from 'react';
import Modal from 'react-modal';

const PrescriptionModal = ({ isOpen, onRequestClose, onSubmit }) => {
  const [medicines, setMedicines] = useState([{ name: '', dosage: '' }]);

  const handleMedicineChange = (index, field, value) => {
    const newMedicines = [...medicines];
    newMedicines[index][field] = value;
    setMedicines(newMedicines);
  };

  const handleAddMedicine = () => {
    setMedicines([...medicines, { name: '', dosage: '' }]);
  };

  const handleSubmit = () => {
    onSubmit(medicines);
  };

  return (
    <>
  <div className="fixed inset-50 flex items-center justify-center bg-black bg-opacity-50">
    <Modal 
      isOpen={isOpen} 
      onRequestClose={onRequestClose} 
      className="w-1/2 h-1/2 bg-white rounded-lg shadow-lg p-7 lg:mt-36 mt-10 text-center lg:m-96"
    >
      <h2 className="text-2xl font-semibold mb-4">Prescribe Medicines</h2>
      <div className="space-y-4">
        {medicines.map((med, index) => (
          <div key={index} className="flex flex-col md:flex-row md:space-x-4">
            <input
              type="text"
              placeholder="Medicine Name"
              value={med.name}
              onChange={(e) => handleMedicineChange(index, 'name', e.target.value)}
              className="w-full p-2 mb-2 md:mb-0 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Dosage"
              value={med.dosage}
              onChange={(e) => handleMedicineChange(index, 'dosage', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={handleAddMedicine}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Add Medicine
        </button>
        <button
          onClick={() => { handleSubmit(); onRequestClose(); }}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none"
        >
          Send
        </button>
      </div>
    </Modal>
  </div>
</>

  );
};

export default PrescriptionModal;
