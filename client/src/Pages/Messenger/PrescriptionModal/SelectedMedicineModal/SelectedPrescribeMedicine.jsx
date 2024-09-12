import { useSelector } from 'react-redux';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useEffect } from 'react';
import io from 'socket.io-client';

export default function SelectedPrescribeMedicine({
  selectedUser,
  medicines, 
  handleSelectMedicine, 
  handleMedicineChange, 
  handleAddMedicine, 
  onRequestClose,
}) {
    const { currentUser } = useSelector(state => state?.user);
    console.log("selected user id: ", selectedUser?._id)
    /* const socket = io('http://localhost:5000'); */

    /* useEffect(() => {
      if (currentUser) {
        socket.emit('joinRoom', { userId: currentUser.data.user._id });
      }

      // Set up the receiveMessage listener only once
      socket.on('receiveMessage', (message) => {
          if (message.pdf && message.pdf.data) {
              // Convert the received data to a Blob
              const pdfBlob = new Blob([new Uint8Array(message.pdf.data.data)], { type: message.pdf.contentType });
          
              // Create a download link
              const downloadLink = document.createElement('a');
              downloadLink.href = URL.createObjectURL(pdfBlob);
              downloadLink.download = 'Prescription.pdf'; // Set the file name
              downloadLink.click(); // Trigger the download
          } else {
              console.log("Message received:", message.message);
          }
      });

      return () => {
        // Clean up the socket connection and event listener
        socket.disconnect();
      };
    }, [currentUser, socket]); */

    const handleSubmit = async () => {
        try {
            const doc = new jsPDF();
    
            // PDF content generation
            doc.setFontSize(14);
            doc.setFont('helvetica', 'bold');
            doc.text("Even Care", 10, 20);
            doc.setFontSize(14);
            doc.setFont('Romania', 'semi-bold');
            doc.text(`${currentUser?.data?.user?.username}`, 150, 20);
            doc.setFontSize(12);
            doc.setFont('helvetica', 'normal');
            doc.text('Prescription Details: ', 10, 40);
    
            const tableColumn = ['#', "Medicine Name", "Dosage"];
            const tableRows = [];
    
            medicines?.forEach((med, index) => {
                const medicineData = [
                    index + 1,
                    med.name,
                    med.dosage
                ];
                tableRows.push(medicineData);
            });
    
            doc.autoTable(tableColumn, tableRows, { startY: 50 });
    
            const pdfBlob = doc.output('blob');
            const formData = new FormData();
    
            formData.append('file', pdfBlob, 'prescription.pdf');
            formData.append('senderId', String(currentUser?.data?.user?._id)); 
            formData.append('receiverId', String(selectedUser?._id)); 
            formData.append('senderusername', currentUser?.data?.user?.username);
            formData.append('receiverusername', selectedUser?.username);
    
            const res = await fetch('/api/medicine/sendpdf', {
                method: 'POST',
                body: formData,
            });
    
            const data = await res.json();
            console.log("Data pass: ", data);
    
        } catch (error) {
            console.error("An error occurred while submitting the prescription:", error);
        }
    
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
    );
}
