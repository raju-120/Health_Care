import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import "./style.css";
import Sidebar from "./Sidebar/Sidebar";
import ChatBox from "./Chatbox/Chatbox";
import toast from "react-hot-toast";

const socket = io.connect("/api");
console.log('socket:', socket)

function ChatWindow() {
  const [message, setMessage] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  const {currentUser} = useSelector(state=>state?.user);
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
  },[currentUser?.data?.user]);

  const handleMessageChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSendMessage = async(e) => {
    e.preventDefault();
    try{
      setMessage('')
      const res= await fetch(`/api/message/send/${selectedUser?._id}`,{
        method:'POST',
        headers: {
          'content-type' : 'applications/json'
        },
        body: JSON.stringify({
          message,
          senderId: currentUser?.data?.user?._id,
          receiverId: selectedUser?._id

        })
      });
      const data = await res.json();
      if(data.success === false){
        toast.error('message was not sent!');
      }
      setMessage(data);
      toast.success('message sent successfully');
    }catch(error){console.log(error.message)}
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
            <Sidebar
              user={user}
              key={user?._id}
              handleUserSelect={handleUserSelect}
            ></Sidebar>
          ))}
        </ul>
      </div>
      <div className="chat-messages h-full mt-5">
        <h2 className="text-lg font-semibold">Chat with <span className="text-2xl text-blue-500">{selectedUser ? selectedUser?.username : "..."}</span></h2>
        <div className="chat-window">
          <ChatBox
              selectedUser= {selectedUser}
              message={message}
              newMessage={newMessage}
              handleMessageChange={handleMessageChange}
              handleSendMessage={handleSendMessage}
          >

          </ChatBox>
        </div>
      </div>
    </div>
  );
}

export default ChatWindow;
