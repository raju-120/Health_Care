import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';

export default function SelectedPrescribeMedicine({
  selectedUser,
  medicines, 
  handleAddMedicine, 
  onRequestClose,
}) {
  const { currentUser } = useSelector(state => state?.user);
  const htmlRef = useRef();

  // Manage the dosage inputs in the state
  const [dosages, setDosages] = useState(
    medicines.reduce((acc, med, index) => {
      acc[index] = ''; // Initialize dosage for each medicine
      return acc;
    }, {})
  );

  // Track if form has been submitted
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Handle dosage change
  const handleDosageChange = (index, value) => {
    setDosages(prevDosages => ({
      ...prevDosages,
      [index]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      // Set form as submitted
      setIsSubmitted(true);

      // Disable all input fields in the DOM before capturing HTML content
      medicines.forEach((med, index) => {
        const inputElement = htmlRef.current.querySelector(`#dosage-${index}`);
        if (inputElement) {
          inputElement.value = dosages[index]; // Update the input element value
          inputElement.disabled = true; // Disable the input field
        }
      });

      // Get the updated HTML content with disabled inputs
      const htmlContent = htmlRef.current.outerHTML;
  
      // Create a JSON object to send to the backend
      const prescriptionData = {
        htmlContent,
        senderId: String(currentUser?.data?.user?._id),
        receiverId: String(selectedUser?._id),
        sendername: currentUser?.data?.user?.username,
        receivername: selectedUser?.username,
      };

      // Send JSON data to backend
      const res = await fetch('https://health-care-server-0t0x.onrender.com/api/prescription/sendpdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(prescriptionData),
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
                <td style={{ border: '1px solid black', padding: '8px' }}>
                  <input
                    id={`dosage-${index}`}
                    type="text"
                    value={dosages[index]} 
                    onChange={(e) => handleDosageChange(index, e.target.value)}
                    disabled={isSubmitted} // Disable after submission
                    placeholder="Enter dosage"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-8">
        <button
          onClick={handleAddMedicine}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none"
          disabled={isSubmitted} // Disable button after submission
        >
          Add Medicine
        </button>
        <button
          onClick={handleSubmit}
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none"
          disabled={isSubmitted} // Disable button after submission
        >
          Send Prescription
        </button>
      </div>
    </div>
  );
}
