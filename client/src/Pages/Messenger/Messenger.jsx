import { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import io from "socket.io-client";
import PrescriptionModal from "./PrescriptionModal/prescriptionModal.jsx";
import "./style.css";
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const socket = io('http://localhost:5000');

function ChatWindow() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const { currentUser } = useSelector(state => state.user);
  const [doctors, setDoctors] = useState([]);
  const [getPdfFiles, setGetPDFFiles] = useState([]);
  const [chatChange,setChatChange] = useState(true);

  // Fetch the list of doctors or users based on the role
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await fetch(currentUser?.data?.user?.role === 'doctor' ? "/api/auth/users" : "/api/auth/doctors");
        const data = await res.json();
        setDoctors(data?.data || []);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchDoctors();
  }, [currentUser?.data?.user]);

  // Fetch past messages and join the room when a user is selected
  useEffect(() => {
    if (selectedUser) {
      const senderId = currentUser?.data?.user?._id;

      // Fetch past messages
      const getMessages = async () => {
        const res = await fetch('/api/message', {
          method: 'POST',
          headers: {
            "content-type": "application/json"
          },
          body: JSON.stringify({ senderId, receiverId: selectedUser._id, accessToken: currentUser?.data?.accessToken })
        });
        const data = await res.json();
        setMessages(data);
      };
      getMessages();

      // Join the room
      socket.emit('joinRoom', { userId: senderId });

      // Handle receiving new messages
      socket.on('receiveMessage', (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });

      return () => {
        socket.off('receiveMessage');
      };
    }
  }, [selectedUser, currentUser?.data?.user?._id]);

  // Handle sending a new message
  const handleSendMessage = async () => {
    const senderId = currentUser?.data?.user?._id;
    const receiverId = selectedUser?._id;
    const senderusername = currentUser?.data?.user?.username;
    const receiverusername = selectedUser?.username;
    

    if (newMessage.trim() && senderId && receiverId) {
      socket.emit('sendMessage', { from: senderId, to: receiverId, message: newMessage, senderusername, receiverusername });
      setNewMessage("");
    }
  };

  // Handle user selection in the chat
  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setMessages([]);
  };

  // Fetch PDF data from the backend
  useEffect(() => {
    const getPrescriptions = async () => {
      try {
        const res = await fetch('/api/prescription/getpdf');
  
        if (!res.ok) {
          console.error('Failed to fetch the PDF data:', res.statusText);
          return; 
        }
  
        const data = await res.json();
        console.log("Fetched PDF Data: ", data); // Log to see the format of data
  
        if (data.success === false) {
          console.log("Data has not been fetched yet");
          return; 
        }
  
        setGetPDFFiles(data);
       
      } catch (error) {
        console.error('Error fetching the PDF data:', error);
      }
    };
  
    getPrescriptions();
  }, []);


  const handleChatChange = (e) =>{
    e.target.value === 'chat' ? setChatChange(true) : setChatChange(false)
    // console.log(e.target.value)
  }

  const downloadPdf = (pdfContent, pdfFileId) => {
    const doc = new jsPDF();
  
    // Add content to the PDF manually
    doc.setFontSize(14);
    doc.text("Even Care", 10, 10);
    doc.text("Dr. Sohel Rana", 10, 20);
    doc.text("Prescription Details:", 10, 30);
  
    // Create a table with medicine details using `autoTable` from jsPDF
    doc.autoTable({
      head: [['#', 'Medicine Name', 'Dosage']],
      body: [
        ['1', 'Naproxen', ''],
      ],
      startY: 40,
    });
  
    // Save the PDF with the file's ID
    doc.save(`prescription_${pdfFileId}.pdf`);
  };

  return (

    <div className="chat-container lg:mt-28 ">
      <div className="chat-users bg-gray-300 w-full rounded-lg h-full">
        <h2 className="text-blue-500">Available Users</h2>
        <ul>
          {doctors.map((user) => (
            <li key={user?._id} onClick={() => handleUserSelect(user)} className="lg:text-xl font-semibold hover:opacity-15">
              {user?.username}
            </li>
          ))}
        </ul>
      </div>



      <div className="chat-messages h-full ">
        <h2 className="text-lg font-semibold">Chat with <span className="lg:text-2xl text-blue-500">{selectedUser ? selectedUser?.username : "..."}</span></h2>
        <div className="chat-window">
          {selectedUser && (
            <>
              <div className="message-container mb-72">
              <button className="btn btn-primary" value='chat' onClick={ (e)=> handleChatChange(e)}>Chat</button>
              <button className="btn btn-primary" value='pdf' onClick={ (e)=>handleChatChange(e)}>PDF</button>

              {
                chatChange ?
                <>
                                {messages.map((message) => (
                  <div key={message?._id} className={message.senderId === currentUser?.data?.user?._id ? "user-message" : "other-message"}>
                    {message.message}
                    
                    {/* Render PDF files related to the chat */}
                  </div>
                ))}
                </>
                :
                <>
                                    {
                      getPdfFiles?.length > 0 && getPdfFiles.map((pdfFile) => (
                        <div key={pdfFile?._id} className="user-message">
                          <p>PDF Content: </p>
                          <button onClick={() => downloadPdf(pdfFile?.pdfContent, pdfFile?._id)}>
            Download Prescription PDF
          </button>
                          {/* <iframe src={pdfFile?.pdf?.url} width="100%" height="600px" title="PDF Viewer" /> */}
                        </div>
                      ))
                    }
                </>
              }


              </div>
              <div className="chat-input gap-2">
                <input
                  type="text"
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(event) => { event.key === "Enter" && handleSendMessage() }}
                  required
                />
                <button onClick={handleSendMessage}>Send</button>
                {
                  currentUser?.data?.user?.role === 'doctor' && 
                  <button onClick={() => setModalOpen(true)}>Prescribe Medicine</button>
                }
              </div>
            </>
          )}
        </div>
      </div>

      {
        <div >
          <PrescriptionModal
            isOpen={isModalOpen}
            selectedUser={selectedUser}
            onRequestClose={() => setModalOpen(false)}
          />
        </div>
      }
    </div>
  );
}

export default ChatWindow;
