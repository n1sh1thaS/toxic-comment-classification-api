import React from "react";
import LoginForm from "../components/LoginForm";
import NavBar from "../components/NavBar";
import { Typography, Grid } from "@mui/material";

const Login = () => {
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <NavBar showSignup />
        </Grid>
        <Grid item xs={12} marginTop={18}>
          <Typography
            variant="h3"
            align="center"
            sx={{ fontSize: 35, marginBottom: 5 }}
          >
            Login to Your Account
          </Typography>
          <Typography variant="h4" align="center">
            <LoginForm />
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;
