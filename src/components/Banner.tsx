import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";

export default function TopBanner({ onSave }: { onSave: () => void }) {
  return (
    <AppBar position="fixed" color="primary" elevation={3}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" component="div">
          Todoアプリ
        </Typography>
        <Button variant="contained" color="secondary" startIcon={<SaveIcon />} onClick={onSave}>
          Save
        </Button>
      </Toolbar>
    </AppBar>
  );
}
