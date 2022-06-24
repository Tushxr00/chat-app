import { Grid, Typography, Paper, makeStyles } from "@material-ui/core";
import React, { useContext } from "react";
import { SocketContext } from "../Context";

const useStyles = makeStyles((theme) => ({
  video: {
    width: "550px",
    [theme.breakpoints.down("xs")]: {
      width: "300px",
    },
  },
  gridContainer: {
    justifyContent: "center",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },
  paper: {
    padding: "10px",
    border: "2px solid black",
    margin: "10px",
  },
}));

const VideoPlayer = () => {
  const classes = useStyles();

  const socketCtx = useContext(SocketContext);
  // console.log(socketCtx.myVideo);

  return (
    <Grid container className={classes.gridContainer}>
      {/* Our own video player*/}

      <Paper
        className={classes.paper}
        style={{
          display: socketCtx.myVideo.current !== null ? "block" : "none",
        }}
      >
        <Grid item xs={12} md={6}>
          <Typography variant="h5" gutterBottom>
            {socketCtx.name || "Name"}
          </Typography>

          <video
            playsInline
            muted
            ref={socketCtx.myVideo}
            autoPlay
            className={classes.video}
          />
        </Grid>
      </Paper>

      {/* Other user's video player*/}

      <Paper
        className={classes.paper}
        style={{
          display:
            socketCtx.callAccepted &&
            !socketCtx.callEnded &&
            socketCtx.myVideo.current !== null
              ? "block"
              : "none",
        }}
      >
        <Grid item xs={12} md={6}>
          <Typography variant="h5" gutterBottom>
            {socketCtx.call.name || "Name"}
          </Typography>
          <video
            playsInline
            ref={socketCtx.userVideo}
            autoPlay
            className={classes.video}
          />
        </Grid>
      </Paper>
    </Grid>
  );
};

export default VideoPlayer;
