import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import "./style.css";

function ChatWindow() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

     const {currentUser} = useSelector(state=>state?.user);
    console.log('Current User: ' , currentUser?.data?.user?.username) 
    const [doctors, setDoctors] = useState([]);
    useEffect(() =>{
        const fetchDoctors = async () =>{
            try{
                if(currentUser?.data?.user?.role === 'doctor'){
                    const res = await fetch("/api/auth/users");
                    const data = await res.json();
                    if (Array.isArray(data?.data)) {
                        setDoctors(data?.data);
                    } else {
                        console.error("Data is not an array:", data);
                    }
                }else{
                    const res = await fetch("/api/auth/doctors");
                    const data = await res.json();
                    if (Array.isArray(data?.data)) {
                        setDoctors(data?.data);
                    } else {
                        console.error("Data is not an array:", data);
                    }
                }
            } catch (error) {
              console.error("Error fetching posts:", error);
            }
        }
        fetchDoctors();
    },[currentUser?.data?.user])

  const handleMessageChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      setMessages([...messages, { text: newMessage, sender: "user" }]);
      setNewMessage("");
    }
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  return (
    <div className="chat-container">
      <div className="chat-users bg-gray-300 w-full">
        <h2 className="text-blue-500">Available Users</h2>
        <ul>
          {doctors.map((user) => (
            <li key={user.id} onClick={() => handleUserSelect(user)}>
              {user.username}
            </li>
          ))}
        </ul>
      </div>
      <div className="chat-messages">
        <h2>Chat with {selectedUser ? selectedUser?.username : "..."}</h2>
        <div className="chat-window">
          {selectedUser && (
            <>
              <div className="message-container">
                {messages.map((message, index) => (
                  <div key={index} className={message.sender === "user" ? "user-message" : "other-message"}>
                    {message.text}
                  </div>
                ))}
              </div>
              <div className="chat-input">
                <input
                  type="text"
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={handleMessageChange}
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
