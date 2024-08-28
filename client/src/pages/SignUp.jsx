import React from "react";
import SignUpForm from "../components/SignUpForm";
import NavBar from "../components/NavBar";
import { Typography, Grid } from "@mui/material";

const SignUp = () => {
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <NavBar showLogin />
        </Grid>
        <Grid item xs={12} marginTop={18}>
          <Typography
            variant="h3"
            align="center"
            sx={{ fontSize: 35, marginBottom: 5 }}
          >
            Create Your Account
          </Typography>
          <Typography variant="h4" align="center">
            <SignUpForm />
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default SignUp;
