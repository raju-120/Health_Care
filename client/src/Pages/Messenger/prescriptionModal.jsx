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
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <h2>Prescribe Medicines</h2>
      {medicines.map((med, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder="Medicine Name"
            value={med.name}
            onChange={(e) => handleMedicineChange(index, 'name', e.target.value)}
          />
          <input
            type="text"
            placeholder="Dosage"
            value={med.dosage}
            onChange={(e) => handleMedicineChange(index, 'dosage', e.target.value)}
          />
        </div>
      ))}
      <button onClick={handleAddMedicine}>Add Medicine</button>
      <button onClick={() => { handleSubmit(); onRequestClose(); }}>Send</button>
    </Modal>
  );
};

export default PrescriptionModal;
