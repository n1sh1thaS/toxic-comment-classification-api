import React from "react";
import { Typography, AppBar, Toolbar, Button } from "@mui/material";

const NavBar = (props) => {
  const { showLogin, showSignup, showLogout, showHome } = props;

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location = "/";
  };

  return (
    <div>
      <AppBar position="static" sx={{ background: "black" }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6" component="div">
            <Button
              variant="text"
              href="/"
              sx={{ color: "white", fontSize: 16 }}
            >
              Toxic Comment Classification API
            </Button>
          </Typography>
          <Typography
            variant="h6"
            component="div"
            sx={{ display: "flex", alignItems: "center" }}
          >
            {showLogin && (
              <Button variant="text" href="/login" sx={{ color: "white" }}>
                Login
              </Button>
            )}
            {showSignup && (
              <Button variant="text" href="/signup" sx={{ color: "white" }}>
                Sign Up
              </Button>
            )}
            {showLogout && (
              <Button
                variant="text"
                onClick={handleLogout}
                sx={{ color: "white" }}
              >
                Logout
              </Button>
            )}
            {showHome && (
              <Button variant="text" href="/" sx={{ color: "white" }}>
                Home
              </Button>
            )}
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
