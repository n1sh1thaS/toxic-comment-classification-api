import React, { useState } from "react";
import { Modal, Button, Box, IconButton, TextField } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  borderRadius: 3,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const NewProjectModal = (props) => {
  const [title, setTitle] = useState("Untitled");
  const [openModal, setOpenModal] = useState(false);
  const [key, setKey] = useState(null);

  const createProject = () => {
    //generate key + project
    setKey("12345random");
  };

  const resetModal = () => {
    setOpenModal(false);
    setKey("");
    setTitle("Untitled");
  };
  return (
    <>
      <Button onClick={() => setOpenModal(true)}>Create New Project</Button>
      <Modal open={openModal} onClose={resetModal}>
        <Box sx={modalStyle}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              id={key ? "standard-read-only-input" : "standard"}
              defaultValue={title}
              label="Project Name"
              variant="standard"
              slotProps={
                key
                  ? {
                      input: {
                        readOnly: true,
                      },
                    }
                  : null
              }
            />
            {!key && <Button onClick={createProject}>Generate API Key</Button>}
            {key && (
              <TextField
                error
                id="standard-read-only-input"
                defaultValue={key}
                label="Your API Key"
                variant="standard"
                slotProps={{
                  input: {
                    readOnly: true,
                  },
                }}
                helperText="You will not be able to view this API key again. Ensure that you have saved it securely. Generate a new key if needed."
              />
            )}
            <Box align="center">
              <IconButton onClick={resetModal} sx={{ align: "left" }}>
                <DoneIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default NewProjectModal;
