import React from "react";
import { Grid, Typography, Box, Button } from "@mui/material";
import NavBar from "../components/NavBar";
import NewKeyModal from "../components/NewKeyModal";
import NewProjectModal from "../components/NewProjectModal";
const Keys = () => {
  const testProjects = [
    "firstProject",
    "insureGPT",
    "classification API",
    "project Grid",
  ];
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <NavBar showLogout />
      </Grid>
      <Grid item xs={12} sm={12} marginTop={10}>
        <Typography
          variant="h3"
          align="center"
          sx={{ fontWeight: "500", fontSize: "35px" }}
        >
          Your Projects and API Keys
        </Typography>
        <Box align="center" marginTop={3}>
          <NewProjectModal />
        </Box>
        <Box margin="5% 10% 0% 10%">
          {testProjects.map((title, index) => (
            <NewKeyModal key={index} title={title} />
          ))}
        </Box>
      </Grid>
      <Grid item xs={12} sm={12} marginTop={3}>
        <Typography
          variant="h3"
          align="center"
          sx={{ fontWeight: "500", fontSize: "35px" }}
        >
          How Do I Use This API?
        </Typography>
        <Typography
          variant="body1"
          margin="3% 0% 0% 5%"
          sx={{ fontWeight: "300", fontSize: 18 }}
        >
          Send request to http://localhost:8000/api/classify <br />
          request object:
          {' {apiKey: "include your key here", text: "text to be classified"}'}
          <br />
          response object:
          {" {score: [0, 0, 1, 0, 1, 0]}"} where 0 means false and 1 means true
          <br />
          Each element in the response object array corresponds to (in order)
          ...
          <ul>
            <li>threat</li>
            <li>identity hate</li>
            <li>toxic</li>
            <li>severely toxic</li>
            <li>insult</li>
            <li>obscene</li>
          </ul>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Keys;
