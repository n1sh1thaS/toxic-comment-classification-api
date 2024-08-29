import React from "react";
import { Grid, Typography } from "@mui/material";
import NavBar from "../components/NavBar";
import toxicCommentImage from "../assets/toxicCommentImage.png";
import "../css/home.css";

const Home = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <NavBar showLogin showSignup />
      </Grid>
      <Grid item xs={12} sm={6} marginLeft={11} marginTop={10}>
        <Typography
          variant="h3"
          align="center"
          sx={{ fontWeight: "500", fontSize: "40px" }}
        >
          Toxic Comment Classification API
        </Typography>
        <Typography variant="body1" marginTop={6} sx={{ fontSize: 22 }}>
          Welcome! This Toxic Comment Classification API helps ensure safe
          <br />
          and respectful communication on your digital platforms.
        </Typography>
        <Typography variant="body1" marginTop={2} sx={{ fontSize: 22 }}>
          Make an account, <br /> get your API key, <br /> effortlessly create a
          positive online environment.
        </Typography>
        <Typography variant="body1" marginTop={2} sx={{ fontSize: 22 }}>
          Determine if text qualifies as...
          <ul>
            <li>a threat</li>
            <li>identity hate</li>
            <li>toxic</li>
            <li>severely toxic</li>
            <li>an insult</li>
            <li>obscene</li>
          </ul>
        </Typography>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Typography variant="h3" align="right">
          <img className="toxicCommentImage" src={toxicCommentImage} alt="" />
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Home;
