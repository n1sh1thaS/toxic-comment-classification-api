import { TextField, Button, Box } from "@mui/material";
import React, { useState } from "react";
import { getToken } from "../services/user-service";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    const loginSuccess = await getToken(email, password);
    if (loginSuccess) window.location = "/keys";
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
          Login
        </Button>
      </Box>
    </form>
  );
};

export default LoginForm;
