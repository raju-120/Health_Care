import { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import io from "socket.io-client";
import PrescriptionModal from "./PrescriptionModal/prescriptionModal.jsx";
import "./style.css";

const socket = io('http://localhost:5000');

function ChatWindow() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const { currentUser } = useSelector(state => state.user);
  const [doctors, setDoctors] = useState([]);

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
      const receiverId = selectedUser?._id;

      const getMessages = async () => {
        const res = await fetch('/api/message', {
          method: 'POST',
          headers: {
            "content-type": "application/json"
          },
          body: JSON.stringify({ senderId, receiverId, accessToken: currentUser?.data?.accessToken })
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

      // You don't need to update the state here; let the server handle it
      setNewMessage("");
    }
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setMessages([]);
  };

  const handlePrescribe = async (medicines) => {
    try {
      const response = await fetch('/api/posts/prescription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${currentUser?.data?.accessToken}`,
        },
        body: JSON.stringify({
          senderId: currentUser?.data?.user?._id,
          receiverId: selectedUser?._id,
          medicines,
        }),
      });

      if (response.ok) {
        const prescription = await response.json();
        console.log('Prescription created:', prescription);

        // Send prescription URL as message
        const senderId = currentUser?.data?.user?._id;
        const receiverId = selectedUser?._id;
        const senderusername = currentUser?.data?.user?.username;
        const receiverusername = selectedUser?.username;
        const message = `Prescription created: ${prescription.pdfUrl}`;

        socket.emit('sendMessage', { from: senderId, to: receiverId, message, senderusername, receiverusername });

        setModalOpen(false);
      } else {
        console.error('Error creating prescription:', await response.text());
      }
    } catch (error) {
      console.error('Error creating prescription:', error);
    }
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
                {messages.map((message) => (
                  <div key={message?._id} className={message.senderId === currentUser?.data?.user?._id ? "user-message" : "other-message"}>
                    {message.message}
                  </div>
                ))}
              </div>
              <div className="chat-input gap-2">
                <input
                  type="text"
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(event) => { event.key === "Enter" && handleSendMessage() }}
                />
                <button onClick={handleSendMessage}>Send</button>
                {
                  currentUser?.data?.user?.role === 'doctor' && 
                  <button  onClick={() => setModalOpen(true)}>Prescribe Medicine</button>
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
            onSubmit={handlePrescribe}
          />
        </div>
      }
    </div>
  );
}

export default ChatWindow;
