import React from "react";
import {
  Button,
  Container,
  Grid,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import CopyToClipboard from "react-copy-to-clipboard";

const Options = (props) => {
  return <div>Options {props.children}</div>;
};

export default Options;
