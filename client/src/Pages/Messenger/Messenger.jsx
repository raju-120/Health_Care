import { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import io from "socket.io-client";
import "./style.css";

const socket = io('http://localhost:5000');

function ChatWindow() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const { currentUser } = useSelector(state => state.user);
  const [doctors, setDoctors] = useState([]);


  //find out the users or doctor
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

  //selected for user or doctor
  useEffect(() => {
    if (selectedUser) {
      const senderId = currentUser?.data?.user?._id;
      const receiverId = selectedUser?._id;

      console.log(senderId, receiverId)
      
      const getMessage = async()=>{
        const result = await fetch('/api/message',{
          method: 'POST',
          headers:{
            "content-type": "application/json"
          },
          body: JSON.stringify({senderId, receiverId, accessToken:currentUser?.data?.accessToken})
        })
        const data = await result.json();
        setMessages(data)
        console.log(data);
      }
      getMessage();


      return () => {
        socket.off('receive_message');
      };
    }
  }, [selectedUser, currentUser?.data?.user?._id]);


  const handleSendMessage = async () => {
    if(currentUser?.data?.user?.role === 'doctor'){
        const senderId = currentUser?.data?.user?._id;
      const receiverId = selectedUser?._id;
      const sendername= currentUser?.data?.user?.username;
      const receiverusername= selectedUser?.username;
      
      if (newMessage.trim() && senderId && receiverId) {
          // Emit the message to the Socket.IO server
          socket.emit('send_message', { senderId, receiverId, message: newMessage });

          // Send the message to the server to save in the database
          const res = await fetch(`/api/message/send/doc/${receiverId}`, {
              method: "POST",
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${currentUser?.data?.accessToken}`
              },
              body: JSON.stringify({
                  senderId,
                  receiverId,
                  message: newMessage,
                  accessToken: currentUser?.data?.accessToken,
                  sendername,
                  receiverusername

              })
          });

          const data = await res.json();
          console.log(data)
          if (!res.ok) {
              console.log('Message not sent: ', data?.message);
          } else {
              // Update the local state with the new message
              setMessages(data);
              setNewMessage("");
          }
      }
    }else{
        const senderId = currentUser?.data?.user?._id;
        const receiverId = selectedUser?._id;
        const sendername= currentUser?.data?.user?.username;
        const receiverusername= selectedUser?.username;
      
        if (newMessage.trim() && senderId && receiverId) {
            // Emit the message to the Socket.IO server
            socket.emit('send_message', { senderId, receiverId, message: newMessage ,sendername,receiverusername});

            // Send the message to the server to save in the database
            const res = await fetch(`/api/message/send/${receiverId}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${currentUser?.data?.accessToken}`
                },
                body: JSON.stringify({
                    senderId,
                    receiverId,
                    message: newMessage,
                    accessToken: currentUser?.data?.accessToken,
                    sendername,
                    receiverusername
                })
            });

            const data = await res.json();

            if (!res.ok) {
                console.log('Message not sent: ', data?.message);
            } else {
                // Update the local state with the new message
                setMessages(prevMessages => [...prevMessages, { senderId, receiverId, message: newMessage }]);
                setNewMessage("");
            }
        }
    }
};



  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setMessages([]); // Optionally, clear messages when selecting a new user
  };

  return (
    <div className="chat-container">
      <div className="chat-users bg-gray-300 w-full">
        <h2 className="text-blue-500">Available Users</h2>
        <ul>
          {doctors.map((user) => (
            <li key={user?._id} onClick={() => handleUserSelect(user)} className="lg:text-xl font-semibold hover:opacity-15">
              {user?.username}
            </li>
          ))}
        </ul>
      </div>

      <div className="chat-messages h-full mt-5">
        <h2 className="text-lg font-semibold">Chat with <span className="lg:text-2xl text-blue-500">{selectedUser ? selectedUser?.username : "..."}</span></h2>
        <div className="chat-window">
          {selectedUser && (
            <>
              <div className="message-container mb-72">
              {console.log(messages)}
                {messages.map((message) => (
                  <div key={message?._id} className={message.senderId === currentUser?.data?.user?._id ? "user-message" : "other-message"}>
                    {message.message}
                    
                  </div>
                ))}
              </div>
              <div className="chat-input">
                <input
                  type="text"
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(event) => { event.key === "Enter" && handleSendMessage() }}
                />
                <button onClick={handleSendMessage}>Send</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatWindow;