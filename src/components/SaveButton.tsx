import React from "react";
import { Button, Box } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";

export default function SaveButton({ onClick }: { onClick: () => void }) {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 16,
        right: 16,
        zIndex: 1000,
      }}
    >
      <Button variant="contained" color="primary" startIcon={<SaveIcon />} onClick={onClick}>
        Save
      </Button>
    </Box>
  );
}
