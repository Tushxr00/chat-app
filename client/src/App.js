import React from "react";
import { AppBar, Typography } from "@material-ui/core";

import Notifications from "./components/Notifications";
import Options from "./components/Options";
import VideoPlayer from "./components/VideoPlayer";

// import AppBar from "@mui/material/AppBar";

const App = () => {
  return (
    <div>
      <p>hi</p>
      <AppBar position="static" color="inherit">
        {/* <Typography variant="h2" align="center"> */}
        Video chat
        {/* </Typography> */}
      </AppBar>
      {/* <VideoPlayer />
      <Options>
        <Notifications />
      </Options> */}
    </div>
  );
};

export default App;
