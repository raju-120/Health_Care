/* import { useState } from "react"; */
import {useSelector} from 'react-redux';
import jsPDF from 'jspdf';
import 'jspdf-autotable';


export default function SelectedPrescribeMedicine({medicines,handleSelectMedicine,handleMedicineChange,handleAddMedicine, onRequestClose,onSubmit, /* handleSubmit */}) {
    //const [prescribeData, setPrescribeData] = useState({});
    const {currentUser} = useSelector(state => state.user);
  
    console.log("User Details", currentUser?.data?.user?.username);
    console.log("Name: ",medicines )

    const handleSubmit = async () => {
        try {
                const doc =new jsPDF();

                //Left side if the pdf
                doc.setFontSize(14);

                doc.setFont('helvetica', 'bold');
                doc.text("Even Care", 10, 20);

                //right side of the pdf

                doc.setFontSize(14);

                doc.setFont('Romania', 'semi-bold');
                doc.text(`${currentUser?.data?.user?.username}`,150,20 );

                //Prescription Section

                doc.setFontSize(12);
                doc.setFont('helvetica', 'normal');
                doc.text('Prescription Details: ', 10,40);

                //reset the font style after header

                doc.setFont('helvetica', 'normal');
                doc.setFontSize(12);
                
                //Generate the table

                const tableColumn = ['#', "Medicine Name", "Dosage"];
                const tableRows = [];

                medicines?.forEach((med, index) =>{
                    const medicineData = [
                        index + 1,
                        med.name,
                        med.dosage
                    ];
                    tableRows.push(medicineData);
                });

                //Auto table Plugin create for medicine table
                doc.autoTable(tableColumn, tableRows, {startY: 50});

                //save PDF
                const pdfBlob = doc.output('blob');
                const pdfUrl = URL.createObjectURL(pdfBlob);

                //optional download pdf
                const link = document.createElement('a');
                link.href = pdfUrl;
                link.download = 'prescription.pdf';
                link.click(); 

                //send pdf to the server
                const formData = new FormData();
                formData.append('pdf', pdfBlob,'prescription.pdf');

                console.log("Prescription: ", formData);





    
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
  )
}
