import React, { useEffect, useState } from "react";
import { Grid, Typography, Box } from "@mui/material";
import NavBar from "../components/NavBar";
import NewKeyModal from "../components/NewKeyModal";
import NewProjectModal from "../components/NewProjectModal";
import { getProjectTitles, addProject } from "../services/project-api-service";
const Keys = () => {
  const [projects, setProjects] = useState([]);
  const [key, setKey] = useState(null);

  //get user projects
  useEffect(() => {
    const getProjects = async () => {
      const projectTitles = await getProjectTitles();
      setProjects(projectTitles);
    };
    getProjects();
  }, []);

  const createProject = async (title) => {
    //generate key + project
    const keyRes = await addProject(title);
    setKey(keyRes);
    setProjects([...projects, title]);
  };

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
          <NewProjectModal createProject={createProject} apikey={key} />
        </Box>
        <Box margin="5% 10% 0% 10%">
          {projects.map((title, index) => (
            <NewKeyModal key={index} title={title} id={index} />
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
          component="pre"
          sx={{ fontWeight: "300", fontSize: 18, whiteSpace: "pre-wrap" }}
        >
          Send a POST request to http://localhost:8000/api/classify/
          {"<project-ID>"} <br />
          Note: Project ID's are visible under each project's name in the list
          above <br /> <br />
          Request Format: <br />
          fetch ( 'http://localhost:8000/api/classify/
          {"<project-ID>"}' ,
          {` { 
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Api-Key YOUR_API_KEY'
            },
            body: JSON.stringify({
              text: '<text-to-be-classified>',
            })
          }`}
          <br />
          )
          <br />
          <br />
          Response Object:
          {" { classification: [0, 0, 1, 0, 1, 0] }"} where 0 means false and 1
          means true
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
