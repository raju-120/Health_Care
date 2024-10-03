import React, { useRef, useEffect, useState } from "react";

const VideoCall = () => {
  const localVideoRef = useRef(null); // Reference to the local video element (caller)
  const remoteVideoRef = useRef(null); // Reference to the remote video element (receiver)
  const [peerConnection, setPeerConnection] = useState(null);
  const [localStream, setLocalStream] = useState(null);

  useEffect(() => {
    // Initialize WebRTC Peer Connection when the component is mounted
    const pc = new RTCPeerConnection({
      iceServers: [
        { urls: "stun:stun.l.google.com:19302" }, // Google STUN server
      ],
    });

    pc.ontrack = (event) => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0]; // Attach the remote stream
      }
    };

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        // Handle ICE candidate exchange here (through signaling server)
        console.log("New ICE candidate: ", event.candidate);
      }
    };

    setPeerConnection(pc);

    return () => {
      pc.close();
    };
  }, []);

  const startCall = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setLocalStream(stream);

      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream; // Display caller's own video
      }

      // Add local stream to the peer connection (for WebRTC)
      stream
        .getTracks()
        .forEach((track) => peerConnection.addTrack(track, stream));

      // Create an offer to initiate the call
      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);

      // Send the offer to the remote peer (via signaling server)
      console.log("Offer sent: ", offer);
    } catch (error) {
      console.error("Error accessing media devices: ", error);
    }
  };

  const handleAnswer = async (answer) => {
    // Set remote description when receiving the answer
    await peerConnection.setRemoteDescription(
      new RTCSessionDescription(answer)
    );
  };

  return (
    <div>
      <h1>Video Call</h1>

      {/* Local video (caller's video) */}
      <div>
        <h2>Local Video (Caller)</h2>
        <video
          ref={localVideoRef}
          autoPlay
          playsInline
          muted
          style={{ width: "400px" }}
        />
      </div>

      {/* Remote video (receiver's video) */}
      <div>
        <h2>Remote Video (Receiver)</h2>
        <video
          ref={remoteVideoRef}
          autoPlay
          playsInline
          style={{ width: "400px" }}
        />
      </div>

      {/* Buttons */}
      <div>
        <button onClick={startCall}>Start Call</button>
      </div>
    </div>
  );
};

export default VideoCall;
