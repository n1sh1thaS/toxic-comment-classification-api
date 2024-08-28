import { TextField, Button, Box } from "@mui/material";
import React, { useState } from "react";

const SignUpForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
    console.log(username, email, password);
  };

  return (
    <form onSubmit={onSubmit}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          alignItems: "center",
        }}
      >
        <TextField
          id="outlined-basic"
          label="Username"
          variant="outlined"
          sx={{ width: 350 }}
          fullWidth
          onChange={(res) => setUsername(res.target.value)}
          value={username}
        />
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          sx={{ width: 350 }}
          fullWidth
          onChange={(res) => setEmail(res.target.value)}
          value={email}
        />
        <TextField
          id="outlined-basic"
          label="Password"
          variant="outlined"
          type="password"
          sx={{ width: 350 }}
          fullWidth
          onChange={(res) => setPassword(res.target.value)}
          value={password}
        />
        <Button
          variant="contained"
          type="submit"
          sx={{ background: "black", width: 200, height: 40 }}
        >
          Get Started
        </Button>
      </Box>
    </form>
  );
};

export default SignUpForm;
