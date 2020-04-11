import React, { useState } from "react";
import axios from "axios";

import { Button, Dialog, DialogActions } from "@material-ui/core";

export default function ProductDelete({ data, getDataLocal }) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleDelete = async () => {
    await axios
      .delete("http://localhost:8000/deleteLocal", { data })
      .then(() => {
        setOpen(false);
        getDataLocal();
      });
  };

  return (
    <>
      <Button color="primary" size="small" onClick={handleClick}>
        Delete
      </Button>
      <Dialog open={open} onClose={handleClick}>
        <DialogActions>
          <p>Are you sure ?</p>
          <Button
            size="small"
            onClick={handleDelete}
            variant="contained"
            color="primary"
          >
            Yes
          </Button>
          <Button
            size="small"
            onClick={handleClick}
            variant="contained"
            color="primary"
            autoFocus
          >
            No
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
