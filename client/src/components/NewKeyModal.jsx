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

const NewKeyModal = (props) => {
  const { title, id } = props;
  const [openModal, setOpenModal] = useState(false);
  const [newKey, setNewKey] = useState("Error Generating Key. Try Again.");

  const generateNewKey = () => {
    //generate key and replace old key
    setNewKey("12345random");
    setOpenModal(true);
  };
  return (
    <>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent={"space-between"}
        margin="2%"
      >
        <span style={{ fontWeight: "bold" }}>
          {title} <br /> ID: {id}
        </span>
        <Button onClick={generateNewKey}>Generate New API Key</Button>
      </Box>
      <Modal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
        }}
      >
        <Box sx={modalStyle}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              error
              id="standard-read-only-input"
              defaultValue={newKey}
              label={`Your New API Key for ${title}`}
              variant="standard"
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
              helperText="You will not be able to view this API key again. Ensure that you have saved it securely. Generate a new key if needed."
            />
            <Box align="center">
              <IconButton
                onClick={() => {
                  setOpenModal(false);
                }}
                sx={{ align: "left" }}
              >
                <DoneIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default NewKeyModal;
