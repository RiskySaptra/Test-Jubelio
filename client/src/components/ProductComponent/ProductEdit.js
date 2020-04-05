import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import { DialogContent, TextField, Grid } from "@material-ui/core";

export default function ProductEdit({ data }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button color="primary" size="small" onClick={handleClickOpen}>
        edit
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Product {data.productNo}</DialogTitle>
        <DialogContent>
          <Grid container direction="column">
            <TextField
              autoFocus
              margin="dense"
              label="SKU"
              style={{ minWidth: "300px" }}
            />
            <TextField autoFocus margin="dense" label="Product Name" />
            <TextField autoFocus margin="dense" label="Price" />
            <TextField autoFocus margin="dense" label="Details" />
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
