import { useState, useEffect, useRef, useCallback } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import PrescriptionModal from "./PrescriptionModal/prescriptionModal.jsx";
import "./style.css";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";
import { AiOutlineVideoCamera } from "react-icons/ai";
import Modal from "react-modal";
import DOMPurify from "dompurify";
import { useParams } from "react-router-dom";

const socket = io("http://localhost:5000");

export default function ChatWindow() {
  const { currentUser } = useSelector((state) => state.user);
  const { id } = useParams();

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [doctors, setDoctors] = useState([]);
  // const [user, setUser] = useState([]);
  const [getPdfFiles, setGetPDFFiles] = useState([]);
  const [chatChange, setChatChange] = useState(true);
  const [isRinging, setIsRinging] = useState(false);
  const [caller, setCaller] = useState(null);
  const [showCallModal, setShowCallModal] = useState(false);
  const [appointmentData, setAppointmentData] = useState([]);

  const user = doctors;

  const localStream = useRef(null);
  const remoteStream = useRef(null);
  const peerConnection = useRef(null);

  // console.log("Appointment Data:  ", appointmentData);
  console.log("Appointment user ID:  ", appointmentData?.uId);
  // console.log("Selected ID:  ", user);

  // console.log("Appointment :  ", id);

  const iceServers = {
    iceServers: [
      { urls: "stun:stun.l.google.com:19302" }, // STUN server configuration
    ],
  };
  //video calling connection
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const createPeerConnection = useCallback(() => {
    const peer = new RTCPeerConnection(iceServers);

    peer.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("ice-candidate", {
          candidate: event.candidate,
          to: selectedUser?.username,
          from: currentUser?.data?.user?.username,
        });
      }
    };
    //video calling connection peer track
    peer.ontrack = (event) => {
      if (remoteStream.current) {
        remoteStream.current.srcObject = event.streams[0];
      }
    };

    localStream.current.getTracks().forEach((track) => {
      peer.addTrack(track, localStream.current);
    });

    peerConnection.current = peer;
    console.log("Messenger Video call: ", peerConnection.current);
  });

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

  // Handle Video Call trigger
  const handleVideoCall = async () => {
    const senderId = currentUser?.data?.user?._id;
    const receiverId = selectedUser?._id;

    if (senderId && receiverId) {
      try {
        localStream.current = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        const videoCallWindow = window.open("/video-call", "_blank");

        // Transfer the necessary data (like peerConnection) to the new window
        videoCallWindow.localStream = localStream.current;
        videoCallWindow.selectedUser = selectedUser;
        videoCallWindow.currentUser = currentUser;

        // Once the new window is ready, start the peer connection and offer
        videoCallWindow.onload = async () => {
          videoCallWindow.createPeerConnection();

          // createPeerConnection();

          const offer = await peerConnection.current.createOffer();
          await peerConnection.current.setLocalDescription(offer);

          socket.emit("incomingCall", {
            from: senderId,
            to: receiverId,
            offer: offer, // Include the offer to streamline the process
          });
        };
      } catch (error) {
        console.error("Error starting the video call: ", error);
      }
    }
  };

  // Handle incoming call (ringing)
  useEffect(() => {
    socket.on("incomingCall", ({ from, offer }) => {
      console.log("Incoming call from: ", from);

      setIsRinging(true);
      setCaller(from);
      setShowCallModal(true); // Trigger the call modal

      // When the call is answered, the following logic will proceed
      const answerCall = async () => {
        setShowCallModal(false);
        setIsRinging(false);

        localStream.current = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        createPeerConnection(); // Create the peer connection

        // Set remote description with the offer received
        await peerConnection.current.setRemoteDescription(
          new RTCSessionDescription(offer)
        );

        // Create and send the answer back
        const answer = await peerConnection.current.createAnswer();
        await peerConnection.current.setLocalDescription(answer);

        socket.emit("answer", {
          answer,
          to: from, // Send answer back to the caller
          from: currentUser?.data?.user?.username,
        });
      };
      answerCall();
    });

    return () => {
      socket.off("incomingCall");
    };
  }, [createPeerConnection, currentUser?.data?.user?.username]);

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
  }, [selectedUser, currentUser?.data?.user?.username, createPeerConnection]);

  // Handle incoming answer
  useEffect(() => {
    socket.on("answer", async ({ answer }) => {
      if (peerConnection.current) {
        await peerConnection.current.setRemoteDescription(
          new RTCSessionDescription(answer)
        );
      }
    });
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

  // Calling Features
  const answerCall = async () => {
    setShowCallModal(false);
    setIsRinging(false);

    const senderId = currentUser?.data?.user?._id;

    // Open a new window for the video call
    const videoCallWindow = window.open("/video-call", "_blank");

    // Pass relevant data to the new window
    videoCallWindow.localStream = localStream.current;
    videoCallWindow.selectedUser = caller;
    videoCallWindow.currentUser = currentUser;

    // Emit the answer through WebSocket when window is ready
    videoCallWindow.onload = async () => {
      videoCallWindow.createPeerConnection();

      socket.emit("answerCall", { from: caller, to: senderId });

      const answer =
        await videoCallWindow.peerConnection.current.createAnswer();
      await videoCallWindow.peerConnection.current.setLocalDescription(answer);

      // Send answer back to the caller via WebSocket
      socket.emit("answer", {
        answer,
        to: caller,
        from: currentUser?.data?.user?.username,
      });

      // Open a new window for the video call
      // const videoCallWindow = window.open("/video-call", "_blank");
      // videoCallWindow.opener = null; // Prevent the new window from accessing the parent window
    };
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

  // const handleDownload = (pdfContent, filename) => {
  //   // Create a temporary div to hold the HTML content
  //   const tempDiv = document.createElement("div");
  //   tempDiv.innerHTML = pdfContent;
  //   document.body.appendChild(tempDiv); // Append to body for visibility

  //   // Use a timeout to ensure content is rendered before capturing
  //   setTimeout(() => {
  //     html2canvas(tempDiv)
  //       .then((canvas) => {
  //         const imgData = canvas.toDataURL("image/png");
  //         const doc = new jsPDF();

  //         // Add image to PDF
  //         doc.addImage(imgData, "PNG", 10, 10);

  //         // Save the PDF
  //         doc.save(filename);

  //         // Clean up the temporary div
  //         document.body.removeChild(tempDiv);
  //       })
  //       .catch((err) => {
  //         console.error("Error capturing element: ", err);
  //         document.body.removeChild(tempDiv); // Clean up in case of error
  //       });
  //   }, 100); // Delay in milliseconds (adjust as necessary)
  // };

  return (
    <div className="chat-container lg:mt-28 ">
      <div className="chat-users bg-gray-300 w-full rounded-lg h-full">
        <h2 className="text-blue-500">Available Users</h2>
        <ul>
          {/* {doctors.map((user) => (
            <li
              key={user?._id}
              onClick={() => handleUserSelect(user)}
              className="lg:text-xl font-semibold hover:opacity-15"
            >
              {user?.username}
            </li>
          ))} */}

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
                    <button
                      className="text-4xl bg-gary-400 hover:opacity-65 hover:text-gray-700 hover:bg-gray-400 rounded-lg"
                      onClick={handleVideoCall}
                    >
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
                    {/* {getPdfFiles.map((pdfFile) => (
                      <div key={pdfFile?._id} className="user-message">
                        {(pdfFile?.senderId === currentUser?.data?.user?._id &&
                          pdfFile?.receiverId === selectedUser?._id) ||
                        (pdfFile?.senderId === selectedUser?._id &&
                          pdfFile?.receiverId ===
                            currentUser?.data?.user?._id) ? (
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
                    ))} */}
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
