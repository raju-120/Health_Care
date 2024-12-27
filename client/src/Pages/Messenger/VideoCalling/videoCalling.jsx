import { useEffect, useRef } from "react";
import io from "socket.io-client";

// const socket = io("http://localhost:5000");
const socket = io("https://health-care-server-0t0x.onrender.com");

const VideoCallWindow = () => {
  const remoteStream = useRef(null);
  const localVideoRef = useRef(null);
  const peerConnection = useRef(null);
  const remoteVideoRef = useRef(null);

  //   useEffect(() => {
  //     // Set the local stream to the local video element
  //     const localStream = window.localStream;
  //     const localVideo = document.getElementById("localVideo");
  //     localVideo.srcObject = localStream;

  //     // Create peer connection (from the parent window)
  //     window.RTCPeerConnection = () => {
  //       const peer = new RTCPeerConnection({
  //         iceServers: [
  //           { urls: "stun:stun.l.google.com:19302" }, // STUN server configuration
  //         ],
  //       });

  //       peer.onicecandidate = (event) => {
  //         if (event.candidate) {
  //           socket.emit("ice-candidate", {
  //             candidate: event.candidate,
  //             to: window.selectedUser?.username,
  //             from: window.currentUser?.data?.user?.username,
  //           });
  //         }
  //       };

  //       peer.ontrack = (event) => {
  //         if (remoteStream.current) {
  //           remoteStream.current.srcObject = event.streams[0];
  //         }
  //       };

  //       // Add the local stream tracks to the peer connection
  //       localStream.getTracks().forEach((track) => {
  //         peer.addTrack(track, localStream);
  //       });

  //       window.RTCPeerConnection = peer;
  //     };
  //   }, []);

  useEffect(() => {
    const initializeVideoCall = async () => {
      // Access local video/audio stream
      const localStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      // Set the local video stream to the local video element
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = localStream;
      }

      window.RTCPeerConnection = () => {
        const peer = new RTCPeerConnection({
          iceServers: [
            { urls: "stun:stun.l.google.com:19302" }, // STUN server configuration
          ],
        });

        peer.onicecandidate = (event) => {
          if (event.candidate) {
            socket.emit("ice-candidate", {
              candidate: event.candidate,
              to: window.selectedUser?.username,
              from: window.currentUser?.data?.user?.username,
            });
          }
        };

        peer.ontrack = (event) => {
          if (remoteStream.current) {
            remoteStream.current.srcObject = event.streams[0];
          }
        };

        // Add the local stream tracks to the peer connection
        localStream.getTracks().forEach((track) => {
          peer.addTrack(track, localStream);
        });

        window.RTCPeerConnection = peer;
      };

      // Add local stream to peer connection
      localStream.getTracks().forEach((track) => {
        peerConnection.current.addTrack(track, localStream);
      });

      // Handle receiving tracks (remote video/audio)
      peerConnection.current.ontrack = (event) => {
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = event.streams[0]; // Attach the remote stream to remote video
        }
      };
    };

    initializeVideoCall();

    // Add necessary signaling logic if applicable here
    // like handling ICE candidates, offers, answers, etc.
  }, []);

  return (
    <div className="video-call-container flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="video-container flex space-x-8">
        <div className="local-video">
          <h3 className="text-lg font-semibold mb-2 text-center">Your Video</h3>
          <video
            ref={localVideoRef}
            autoPlay
            playsInline
            muted
            className="border border-gray-300 rounded-lg"
          ></video>
        </div>
        <div className="remote-video">
          <h3 className="text-lg font-semibold mb-2 text-center">
            Remote Video
          </h3>
          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            className="border border-gray-300 rounded-lg"
          ></video>
        </div>
      </div>

      <div className="controls mt-8">
        <button className="btn btn-error">End Call</button>
      </div>
    </div>
  );
};

export default VideoCallWindow;
