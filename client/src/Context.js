import React, { createContext, useState, useRef, useEffect } from "react";
import { io } from "socket.io-client";
import Peer from "simple-peer";

const SocketContext = createContext();

const socket = io("http://localhost:5000");
// const socket = io("https://warm-wildwood-81069.herokuapp.com");

const ContextProvider = (props) => {
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState();
  const [name, setName] = useState("");
  const [call, setCall] = useState({});
  const [me, setMe] = useState("");

  // const myVideo = useRef({ current: { srcObject: {} } });
  // const userVideo = useRef({ current: { srcObject: {} } });

  const myVideo = useRef(null);
  const userVideo = useRef(null);
  const connectionRef = useRef(null);

  useEffect(() => {
    const getUserMedia = async () => {
      try {
        // const stream = await navigator.mediaDevices.getUserMedia({video: true});
        // videoRef.current.srcObject = stream;
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        setStream(stream);

        myVideo.current.srcObject = stream;
        console.log(myVideo.current.srcObject);
        socket.on("me", (id) => {
          setMe(id);
        });
        socket.on("callUser", ({ from, callerName, signal }) => {
          setCall({ isReceivedCall: true, from, callerName, signal });
        });
      } catch (err) {
        console.log(err);
      }
    };
    getUserMedia();
  }, [myVideo]);

  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: call.from });
    });

    peer.on("stream", (currentStream) => {
      userVideo.srcObject = currentStream;
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
  };

  const callUser = (id) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: me,
        name,
      });
    });

    peer.on("stream", (currentStream) => {
      userVideo.srcObject = currentStream;
    });

    socket.on("callAccepted", (signal) => {
      setCallAccepted(true);

      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);

    connectionRef.current.destroy();

    window.location.reload();
  };

  const contextValue = {
    call,
    callAccepted,
    myVideo,
    userVideo,
    stream,
    name,
    setName,
    callEnded,
    me,
    callUser,
    leaveCall,
    answerCall,
  };
  return (
    <SocketContext.Provider value={contextValue}>
      {props.children}
      {/* <video playsInline ref={myVideo} autoPlay /> */}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };
