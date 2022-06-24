import React from "react";
import { Button } from "@material-ui/core";
import { SocketContext } from "../Context";
import { useContext } from "react";

const Notifications = () => {
  const socketCtx = useContext(SocketContext);
  return (
    <div>
      {socketCtx.call.isReceivedCall && !socketCtx.callAccepted && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h1> {socketCtx.call.name} is Calling :</h1>
          <Button
            variant="contained"
            color="primary"
            onClick={socketCtx.answerCall}
          >
            Answer
          </Button>
        </div>
      )}
    </div>
  );
};

export default Notifications;
