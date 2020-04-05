import React from "react";

import axios from "axios";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function ProductDelete({ data }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = async () => {
    await axios
      .delete("http://192.168.1.20:8000/deleteLocal", { data })
      .then(() => {
        setOpen(false);
        window.location.reload();
      });
  };

  return (
    <div>
      <Button color="primary" size="small" onClick={handleClickOpen}>
        Delete
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Are You Sure</DialogTitle>
        <DialogActions>
          <Button onClick={handleDelete} color="primary">
            Oklay
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Nope
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
