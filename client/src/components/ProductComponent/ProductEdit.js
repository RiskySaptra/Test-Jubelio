import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import { DialogContent, TextField, Grid } from "@material-ui/core";

import axios from "axios";

export default function ProductEdit({ data }) {
  const [open, setOpen] = React.useState(false);

  const [datass, setDatass] = React.useState({
    id: data.id,
    productName: null,
    productDetails: null,
    price: null,
    SKU: null,
  });
  console.log(datass);

  const handleChange = (e) => {
    setDatass({ ...datass, [e.target.name]: e.target.value });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleUpdate = async () => {
    await axios
      .put("http://192.168.1.20:8000/updateLocal", { datass })
      .then(setOpen(false));
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
              name="SKU"
              margin="dense"
              label="SKU"
              onChange={handleChange}
              style={{ minWidth: "300px" }}
            />
            <TextField
              name="productName"
              autoFocus
              margin="dense"
              onChange={handleChange}
              label="Product Name"
            />
            <TextField
              name="price"
              autoFocus
              onChange={handleChange}
              margin="dense"
              label="Price"
            />
            <TextField
              name="productDetails"
              autoFocus
              margin="dense"
              onChange={handleChange}
              label="Details"
            />
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdate} color="primary" autoFocus>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
