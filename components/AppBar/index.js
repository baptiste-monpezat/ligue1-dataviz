import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import styled from "styled-components";

const Logo = styled.div`
  margin-right: 20px;
`;

export default function ButtonAppBar() {
  return (
    <AppBar style={{ marginBottom: "20px" }} position="static">
      <Toolbar style={{ background: "#02296c" }} variant="dense">
        <Logo>
          <img height="30" src="soccer_white.png" />
        </Logo>
        <Typography variant="h6" color="inherit" component="div">
          Ligue 1 DataViz
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
