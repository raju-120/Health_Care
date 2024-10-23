import { useState, useEffect, useRef, useCallback } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import PrescriptionModal from "./PrescriptionModal/prescriptionModal.jsx";
import "./style.css";
import "./agoraStyle.css";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";
import { AiOutlineVideoCamera } from "react-icons/ai";
import Modal from "react-modal";
import DOMPurify from "dompurify";
import { useParams } from "react-router-dom";
import ringingSound from "../../assets/MP3/phone-ringing.mp3";

import AgoraRTC from "agora-rtc-sdk-ng"; // Import Agora SDK

const socket = io("http://localhost:5000");
// Replace with your App ID and temporary token from Agora console
const APP_ID = "025ba60212fc444fa127d79c69a4d0c5";
const token =
  "007eJxTYNjxOjk4lmPu2fZr6zeJLORILTx9+cyudxZM7kdzQ16LC4coMKSaWaSapiVamBpamJkYJxtZJKYZpxpamBiYWCamWhqYOTVJpDcEMjJcW3eNiZEBAkF8LoayzJTU/PjkxJwcBgYAOb8iEQ==";
const CHANNEL_NAME = "video_call";

// Use a sound for the ringing
const audio = new Audio(ringingSound);

export default function ChatWindow() {
  const { currentUser } = useSelector((state) => state.user);
  const { id } = useParams();

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [getPdfFiles, setGetPDFFiles] = useState([]);
  const [chatChange, setChatChange] = useState(true);
  const [isRinging, setIsRinging] = useState(false);
  const [caller, setCaller] = useState(null);
  // const [showCallModal, setShowCallModal] = useState(false);
  const [appointmentData, setAppointmentData] = useState([]);
  // const [isCallActive, setIsCallActive] = useState(false);

  // State to manage call status
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);
  const [isCalling, setIsCalling] = useState(false);

  const user = doctors;

  // Use `useRef` to hold the Agora client instance.
  const client = useRef(null);
  const localVideoRef = useRef(null); // For displaying local video
  const remoteVideoRef = useRef(null); // For displaying remote video

  // Fetch the specific appoontment ID
  useEffect(() => {
    const fetchAppointmentId = async () => {
      try {
        const res = await fetch(`/api/appointment/booking/${id}`);
        const data = await res.json();
        // console.log("Data : ", data);
        setAppointmentData(data?.data);
      } catch (error) {
        console.log("Error: ", error);
      }
    };
    fetchAppointmentId();
  }, [id]);

  // Fetch Doctor ID & User ID
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        let url;
        if (currentUser?.data?.user?.role === "doctor") {
          url = `/api/auth/user/${appointmentData?.uId}`;
        } else if (appointmentData?.docId) {
          url = `/api/auth/doctors/${appointmentData?.docId}`;
        } else {
          console.warn("Doctor ID is undefined");
          return; // Exit if docId is not available
        }

        const res = await fetch(url);
        if (!res.ok) {
          throw new Error("Failed to fetch doctors");
        }

        const data = await res.json();
        // console.log("Data from User: ", data.data);
        setDoctors(data?.data || []);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchDoctors();
  }, [currentUser?.data?.user, appointmentData?.docId, appointmentData?.uId]);

  // useEffect(() => {
  //   const fetchDoctors = async () => {
  //     try {
  //       const res = await fetch(
  //         currentUser?.data?.user?.role === "doctor"
  //           ? `/api/auth/users`
  //           : `/api/auth/doctors`
  //       );
  //       const data = await res.json();
  //       console.log("Data from User: ", data.data);
  //       setDoctors(data?.data || []);
  //     } catch (error) {
  //       console.error("Error fetching users:", error);
  //     }
  //   };
  //   fetchDoctors();
  // }, [currentUser?.data?.user]);

  //Set user Selection & Set the state
  const handleUserSelect = (user) => {
    // console.log("Selected ID: ", user);
    setSelectedUser(user);
    setMessages([]);
  };

  // Select to chat with
  useEffect(() => {
    if (selectedUser) {
      const senderId = currentUser?.data?.user?._id;
      const getMessages = async () => {
        const res = await fetch("/api/message", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            senderId,
            receiverId: selectedUser._id,
            accessToken: currentUser?.data?.accessToken,
          }),
        });
        const data = await res.json();
        setMessages(data);
      };
      getMessages();
      socket.emit("joinRoom", { userId: senderId });
      socket.on("receiveMessage", (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });
      return () => {
        socket.off("receiveMessage");
      };
    }
  }, [
    selectedUser,
    currentUser?.data?.user?._id,
    currentUser?.data?.accessToken,
  ]);

  // Sending mesaage function
  const handleSendMessage = async () => {
    const senderId = currentUser?.data?.user?._id;
    const receiverId = selectedUser?._id;
    const senderusername = currentUser?.data?.user?.username;
    const receiverusername = selectedUser?.username;

    if (newMessage.trim() && senderId && receiverId) {
      socket.emit("sendMessage", {
        from: senderId,
        to: receiverId,
        message: newMessage,
        senderusername,
        receiverusername,
      });
      setNewMessage("");
    }
  };

  // Get PDF File
  useEffect(() => {
    const getPrescriptions = async () => {
      try {
        const res = await fetch("/api/prescription/getpdf");
        if (!res.ok) {
          console.error("Failed to fetch the PDF data:", res.statusText);
          return;
        }
        const data = await res.json();
        if (data.success === false) {
          console.log("Data has not been fetched yet");
          return;
        }
        setGetPDFFiles(data);
      } catch (error) {
        console.error("Error fetching the PDF data:", error);
      }
    };
    getPrescriptions();
  }, []);

  const handleChatChange = (e) => {
    setChatChange(e.target.value === "chat");
  };

  const sanitizeHtml = (html) => {
    return DOMPurify.sanitize(html); // Sanitize to prevent XSS attacks
  };

  // Initialize Agora client
  const initializeAgora = useCallback(() => {
    client.current = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
    client.current.on("user-published", async (user, mediaType) => {
      await client.current.subscribe(user, mediaType);
      if (mediaType === "video") {
        const remoteTrack = user.videoTrack;
        remoteTrack.play(remoteVideoRef.current);
      }
    });

    client.current.on("user-unpublished", () => {
      remoteVideoRef.current.innerHTML = ""; // Clear the video element
    });
  }, []);

  const joinChannel = async () => {
    try {
      await client.current.join(APP_ID, CHANNEL_NAME, token, currentUser?._id);
      const localTrack = await AgoraRTC.createCameraVideoTrack();
      localTrack.play(localVideoRef.current);
      await client.current.publish([localTrack]);
    } catch (error) {
      console.error("Error joining channel:", error);
    }
  };

  const leaveChannel = async () => {
    await client.current.leave();
    setIsCallModalOpen(false);
  };

  const handleAgoraVideoCall = () => {
    initializeAgora();
    joinChannel();
    setIsCallModalOpen(true);
  };

  // Handle incoming call (ringing)
  useEffect(() => {
    const incomingCallHandler = ({ from }) => {
      ringingSound.play(); // Play ringing sound
      setIsRinging(true);
      setCaller(from);
      setIsCallModalOpen(true); // Show the call modal
    };

    socket.on("incomingCall", incomingCallHandler);
    return () => {
      socket.off("incomingCall", incomingCallHandler);
    };
  }, []);

  const acceptCall = () => {
    ringingSound.pause(); // Stop ringing sound
    setIsRinging(false);
    handleAgoraVideoCall();
  };

  const declineCall = () => {
    ringingSound.pause(); // Stop ringing sound
    setIsRinging(false);
    setCaller(null);
  };

  return (
    <div className="chat-container lg:mt-28 ">
      <div className="chat-users bg-gray-300 w-full rounded-lg h-full">
        <h2 className="text-blue-500">Available Users</h2>
        <ul>
          <li
            key={user?._id}
            onClick={() => handleUserSelect(user)}
            className="lg:text-xl font-semibold hover:opacity-15"
          >
            {user?.username}
          </li>
        </ul>
      </div>

      <div className="chat-messages h-full">
        <h2 className="text-lg font-semibold">
          Chat with{" "}
          <span className="lg:text-2xl text-blue-500">
            {selectedUser ? selectedUser?.username : "..."}
          </span>
        </h2>
        <div className="chat-window overflow-x-auto lg:max-h-[40rem]">
          {selectedUser && (
            <>
              <div className="message-container">
                <div className="flex justify-between">
                  <div className="text-start mb-5 sticky top-0 bg-white  p-2 w-full">
                    <button
                      className="btn btn-primary mr-5 "
                      value="chat"
                      onClick={(e) => handleChatChange(e)}
                    >
                      Chat
                    </button>
                    <button
                      className="btn btn-primary"
                      value="pdf"
                      onClick={(e) => handleChatChange(e)}
                    >
                      PDF
                    </button>
                  </div>
                  <div>
                    {!isCalling ? (
                      <button
                        className="text-4xl bg-gray-400 hover:opacity-65 hover:text-gray-700 hover:bg-gray-400 rounded-lg"
                        onClick={handleAgoraVideoCall}
                      >
                        <AiOutlineVideoCamera />
                      </button>
                    ) : (
                      <button className="btn btn-danger" onClick={declineCall}>
                        End Call
                      </button>
                    )}
                  </div>
                </div>

                {chatChange ? (
                  <>
                    {messages.map((message) => (
                      <div
                        key={message?._id}
                        className={
                          message.senderId === currentUser?.data?.user?._id
                            ? "user-message"
                            : "other-message"
                        }
                      >
                        {message.message}
                      </div>
                    ))}
                  </>
                ) : (
                  <>
                    {getPdfFiles.map((pdfFile) => {
                      // Check the condition for rendering PDF content
                      const shouldRenderContent =
                        (pdfFile?.senderId === currentUser?.data?.user?._id &&
                          pdfFile?.receiverId === selectedUser?._id) ||
                        (pdfFile?.senderId === selectedUser?._id &&
                          pdfFile?.receiverId === currentUser?.data?.user?._id);

                      return (
                        <div key={pdfFile?._id} className="user-message">
                          {shouldRenderContent && ( // Only render if condition is true
                            <>
                              <p>PDF Content:</p>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: sanitizeHtml(pdfFile?.pdfContent),
                                }}
                              />
                            </>
                          )}
                        </div>
                      );
                    })}
                  </>
                )}
              </div>

              {isCallModalOpen && (
                <div className="fixed bg-black bg-opacity-50 backdrop-blur-md flex items-center justify-center">
                  <Modal
                    isOpen={isCallModalOpen}
                    onRequestClose={declineCall}
                    className="p-5 w-full mt-24 max-w-4xl mx-auto  bg-white rounded-lg"
                  >
                    <h2 className="text-xl font-bold mb-4">
                      Video Call with {selectedUser?.username}
                    </h2>
                    <div className="video-container mb-4 gap-2">
                      <div
                        ref={localVideoRef}
                        className="local-video bg-gray-300 rounded-lg h-96 w-full"
                      />
                      <div
                        ref={remoteVideoRef}
                        className="remote-video bg-gray-300 rounded-lg h-96 w-full "
                      />
                    </div>
                    <button
                      onClick={leaveChannel}
                      className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
                    >
                      End Call
                    </button>
                  </Modal>
                </div>
              )}

              {isRinging && (
                <Modal isOpen={isRinging} onRequestClose={declineCall}>
                  <h2>Incoming Call</h2>
                  <p>Caller: {caller}</p>
                  <button
                    className="btn btn-outline btn-success"
                    onClick={acceptCall}
                  >
                    Accept
                  </button>
                  <button
                    className="btn btn-outline btn-warning"
                    onClick={declineCall}
                  >
                    Decline
                  </button>
                </Modal>
              )}

              <div className="chat-input gap-2">
                <input
                  type="text"
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(event) => {
                    event.key === "Enter" && handleSendMessage();
                  }}
                  required
                />
                <button onClick={handleSendMessage}>Send</button>
                {currentUser?.data?.user?.role === "doctor" && (
                  <button onClick={() => setModalOpen(true)}>
                    Prescribe Medicine
                  </button>
                )}
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
