import React from "react";
import { Grid, Typography } from "@mui/material";
import NavBar from "../components/NavBar";
const Keys = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <NavBar showLogout />
      </Grid>
      <Grid item xs={12} sm={6} marginLeft={11} marginTop={10}>
        <Typography
          variant="h3"
          align="center"
          sx={{ fontWeight: "500", fontSize: "40px" }}
        >
          Toxic Comment Classification API
        </Typography>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Typography variant="h3" align="right"></Typography>
      </Grid>
    </Grid>
  );
};

export default Keys;
