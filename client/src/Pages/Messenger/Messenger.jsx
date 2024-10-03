import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import PrescriptionModal from "./PrescriptionModal/prescriptionModal.jsx";
import "./style.css";
import jsPDF from "jspdf";
import DOMPurify from "dompurify";
import { AiOutlineVideoCamera } from "react-icons/ai";
import Modal from "react-modal";

const socket = io("http://localhost:5000");

export default function ChatWindow() {
  const { currentUser } = useSelector((state) => state.user);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [getPdfFiles, setGetPDFFiles] = useState([]);
  const [chatChange, setChatChange] = useState(true);
  const [isRinging, setIsRinging] = useState(false);
  const [caller, setCaller] = useState(null);
  const [showCallModal, setShowCallModal] = useState(false);

  const localStream = useRef(null);
  const remoteStream = useRef(null);
  const peerConnection = useRef(null);

  console.log("Selected User: ", selectedUser?.username);

  const iceServers = {
    iceServers: [
      { urls: "stun:stun.l.google.com:19302" }, // STUN server configuration
    ],
  };

  const createPeerConnection = () => {
    const peer = new RTCPeerConnection(iceServers);

    // Handle incoming ICE candidates
    peer.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("ice-candidate", {
          candidate: event.candidate,
          to: selectedUser?.username,
          from: currentUser?.data?.user?.username,
        });
      }
    };

    // Handle receiving tracks (remote video/audio)
    peer.ontrack = (event) => {
      remoteStream.current.srcObject = event.streams[0];
    };

    // Add local stream tracks to the peer connection
    localStream.current
      .getTracks()
      .forEach((track) => peer.addTrack(track, localStream.current));

    peerConnection.current = peer;
  };

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await fetch(
          currentUser?.data?.user?.role === "doctor"
            ? "/api/auth/users"
            : "/api/auth/doctors"
        );
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
  }, [selectedUser, currentUser?.data?.user?._id]);

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

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setMessages([]);
  };

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

  // Handle Video Call trigger
  const handleVideoCall = async () => {
    const senderId = currentUser?.data?.user?._id;
    const receiverId = selectedUser?._id;

    if (senderId && receiverId) {
      localStream.current = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      createPeerConnection();

      const offer = await peerConnection.current.createOffer();
      await peerConnection.current.setLocalDescription(offer);

      socket.emit("offer", { offer, to: receiverId, from: senderId });
    }
  };

  // Handle incoming call (ringing)
  useEffect(() => {
    socket.on("incomingCall", ({ from }) => {
      console.log("Incoming call from: ", from);
      setIsRinging(true);
      setCaller(from);
      setShowCallModal(true); // Confirm state update
    });

    return () => {
      socket.off("incomingCall");
    };
  }, []);

  // Handle incoming offer
  useEffect(() => {
    socket.on("offer", async ({ offer, from }) => {
      setIsRinging(true);
      setCaller(from);
      setShowCallModal(true);

      localStream.current = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      createPeerConnection();

      await peerConnection.current.setRemoteDescription(
        new RTCSessionDescription(offer)
      );

      const answer = await peerConnection.current.createAnswer();
      await peerConnection.current.setLocalDescription(answer);

      socket.emit("answer", {
        answer,
        to: from,
        from: currentUser?.data?.user?.username,
      });
    });

    // Clean up offer listener
    return () => {
      socket.off("offer");
    };
  }, [selectedUser]);

  // Handle incoming answer
  useEffect(() => {
    socket.on("answer", async ({ answer }) => {
      await peerConnection.current.setRemoteDescription(
        new RTCSessionDescription(answer)
      );
    });

    // Clean up answer listener
    return () => {
      socket.off("answer");
    };
  }, []);

  // Handle incoming ICE candidates
  useEffect(() => {
    socket.on("ice-candidate", async ({ candidate }) => {
      if (candidate) {
        await peerConnection.current.addIceCandidate(
          new RTCIceCandidate(candidate)
        );
      }
    });

    // Clean up ICE candidate listener
    return () => {
      socket.off("ice-candidate");
    };
  }, []);

  const answerCall = async () => {
    setShowCallModal(false);
    setIsRinging(false);
    const senderId = currentUser?.data?.user?._id;
    socket.emit("answerCall", { from: caller, to: senderId });

    // Open a new window for the video call
    const videoCallWindow = window.open("/video-call", "_blank");
    videoCallWindow.opener = null; // Prevent the new window from accessing the parent window
  };

  const declineCall = () => {
    setShowCallModal(false);
    setIsRinging(false);
    setCaller(null);
  };

  const handleChatChange = (e) => {
    setChatChange(e.target.value === "chat");
  };

  const sanitizeHtml = (html) => {
    return DOMPurify.sanitize(html); // Sanitize to prevent XSS attacks
  };

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
            <li
              key={user?._id}
              onClick={() => handleUserSelect(user)}
              className="lg:text-xl font-semibold hover:opacity-15"
            >
              {user?.username}
            </li>
          ))}
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
                  <div className="text-start mb-5 sticky top-0 bg-white z-10 p-2 w-full">
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
                    <button className="text-4xl" onClick={handleVideoCall}>
                      <AiOutlineVideoCamera />
                    </button>
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
                    {getPdfFiles?.length > 0 &&
                      getPdfFiles.map((pdfFile) => (
                        <div key={pdfFile?._id} className="user-message">
                          {pdfFile?.senderId === selectedUser?._id &&
                          pdfFile?.receiverId ===
                            currentUser?.data?.user?._id ? (
                            <>
                              <p>PDF Content:</p>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: sanitizeHtml(pdfFile?.pdfContent),
                                }}
                              />
                            </>
                          ) : null}
                        </div>
                      ))}
                  </>
                )}
              </div>

              {isRinging && (
                <Modal
                  isOpen={showCallModal}
                  onRequestClose={declineCall}
                  contentLabel="Incoming Call"
                  ariaHideApp={false}
                >
                  <h2>Incoming Call</h2>
                  <p>Caller: {caller}</p>
                  <button className="btn btn-success mr-4" onClick={answerCall}>
                    Accept
                  </button>
                  <button
                    className="btn btn-warning mr-4"
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
