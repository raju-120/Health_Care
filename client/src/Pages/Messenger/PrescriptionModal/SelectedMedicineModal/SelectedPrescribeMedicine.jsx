import React, { useRef } from 'react';
import { useSelector } from 'react-redux';

export default function SelectedPrescribeMedicine({
  selectedUser,
  medicines, 
  handleSelectMedicine, 
  handleMedicineChange, 
  handleAddMedicine, 
  onRequestClose,
}) {
  const { currentUser } = useSelector(state => state?.user);
  const htmlRef = useRef();

  // Function to submit HTML to backend
  // Function to submit HTML to backend
const handleSubmit = async () => {
    try {
      // Get HTML content as string
      const htmlContent = htmlRef.current.outerHTML;
  
      // Create a JSON object to send to the backend
      const prescriptionData = {
        htmlContent,
        senderId: String(currentUser?.data?.user?._id),
        receiverId: String(selectedUser?._id),
        senderusername: currentUser?.data?.user?.username,
        receiverusername: selectedUser?.username,
      };
  
      // Send JSON data to backend
      const res = await fetch('/api/prescription/sendpdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Correct header for JSON
        },
        body: JSON.stringify(prescriptionData), // Convert the data to JSON
      });
  
      const data = await res.json();
      console.log("Data passed: ", data);
  
    } catch (error) {
      console.error("An error occurred while submitting the prescription:", error);
    }
  
    onRequestClose();
  };
  

  return (
    <div>
      {/* HTML content to send */}
      <div ref={htmlRef} className="space-y-4 p-4 border rounded-md">
        <h1 style={{ fontSize: '14pt', fontWeight: 'bold' }}>Even Care</h1>
        <h2 style={{ fontSize: '14pt', fontWeight: 'semi-bold' }}>{currentUser?.data?.user?.username}</h2>
        <h3 style={{ fontSize: '12pt', fontWeight: 'normal' }}>Prescription Details:</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid black', padding: '8px' }}>#</th>
              <th style={{ border: '1px solid black', padding: '8px' }}>Medicine Name</th>
              <th style={{ border: '1px solid black', padding: '8px' }}>Dosage</th>
            </tr>
          </thead>
          <tbody>
            {medicines?.map((med, index) => (
              <tr key={index}>
                <td style={{ border: '1px solid black', padding: '8px' }}>{index + 1}</td>
                <td style={{ border: '1px solid black', padding: '8px' }}>{med.name}</td>
                <td style={{ border: '1px solid black', padding: '8px' }}><input></input></td>
              </tr>
            ))}
          </tbody>
        </table>
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
  );
}
