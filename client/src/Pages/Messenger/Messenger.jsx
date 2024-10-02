import { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import io from "socket.io-client";
import PrescriptionModal from "./PrescriptionModal/prescriptionModal.jsx";
import "./style.css";
import jsPDF from 'jspdf';
import DOMPurify from 'dompurify';

const socket = io('http://localhost:5000');

function ChatWindow() {
  const { currentUser } = useSelector(state => state.user);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [getPdfFiles, setGetPDFFiles] = useState([]);
  const [chatChange, setChatChange] = useState(true);

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

  useEffect(() => {
    if (selectedUser) {
      const senderId = currentUser?.data?.user?._id;
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
      socket.emit('joinRoom', { userId: senderId });
      socket.on('receiveMessage', (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });
      return () => {
        socket.off('receiveMessage');
      };
    }
  }, [selectedUser, currentUser?.data?.user?._id]);

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

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setMessages([]);
  };

  useEffect(() => {
    const getPrescriptions = async () => {
      try {
        const res = await fetch('/api/prescription/getpdf');
        if (!res.ok) {
          console.error('Failed to fetch the PDF data:', res.statusText);
          return; 
        }
        const data = await res.json();
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

  const handleChatChange = (e) => {
    setChatChange(e.target.value === 'chat');
  };

  // Function to sanitize HTML content
  const sanitizeHtml = (html) => {
    return DOMPurify.sanitize(html); // This sanitizes the HTML to prevent XSS attacks
  };

  // Function to handle download
  const handleDownload = (htmlContent, fileName) => {
    const sanitizedContent = sanitizeHtml(htmlContent); // Sanitize before converting to PDF
    const doc = new jsPDF();

    doc.html(sanitizedContent, {
      callback: function (doc) {
        doc.save(fileName);
      },
      x: 10,
      y: 10,
      width: 180,
    });
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

      <div className="chat-messages h-full">
        <h2 className="text-lg font-semibold">Chat with <span className="lg:text-2xl text-blue-500">{selectedUser ? selectedUser?.username : "..."}</span></h2>
        <div className="chat-window overflow-x-auto lg:max-h-[40rem]">
          {selectedUser && (
            <>
              <div className="message-container">
                <div className="text-end mb-5 sticky top-0 bg-white z-10 p-2 w-full">
                  <button className="btn btn-primary mr-5 " value='chat' onClick={(e) => handleChatChange(e)}>Chat</button>
                  <button className="btn btn-primary" value='pdf' onClick={(e) => handleChatChange(e)}>PDF</button>
                </div>

                {chatChange ? (
                  <>
                    {messages.map((message) => (
                      <div key={message?._id} className={message.senderId === currentUser?.data?.user?._id ? "user-message" : "other-message"}>
                        {message.message}
                      </div>
                    ))}
                  </>
                ) : (
                  <>
                    {getPdfFiles?.length > 0 && getPdfFiles.map((pdfFile) => (
                      <div key={pdfFile?._id} className="user-message">
                        {pdfFile?.senderId === selectedUser?._id && pdfFile?.receiverId === currentUser?.data?.user?._id ? (
                          <>
                            <p>PDF Content:</p>
                            {/* Sanitize the HTML content before displaying */}
                            <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(pdfFile?.pdfContent) }} />

                            {/* Button to download PDF */}
                            {/* <button
                              onClick={() => handleDownload(pdfFile?.pdfContent, `prescription_${pdfFile?._id}.pdf`)}
                            >
                              Download PDF
                            </button> */}
                          </>
                        ) : null}
                      </div>
                    ))}
                  </>
                )}
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

      {isModalOpen && (
        <div>
          <PrescriptionModal
            isOpen={isModalOpen}
            selectedUser={selectedUser}
            onRequestClose={() => setModalOpen(false)}
          />
        </div>
      )}
    </div>
  );
}

export default ChatWindow;
