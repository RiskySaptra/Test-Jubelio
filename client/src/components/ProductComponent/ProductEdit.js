import React, { useState } from "react";
import axios from "axios";

import {
  Button,
  Dialog,
  DialogContent,
  TextField,
  Grid,
  DialogTitle,
  DialogActions,
} from "@material-ui/core";

export default function ProductEdit({ data }) {
  const [open, setOpen] = useState(false);

  const [datass, setDatass] = useState({
    id: data.id,
    productName: null,
    productDetails: null,
    price: null,
    SKU: null,
  });

  const handleChange = (e) => {
    setDatass({ ...datass, [e.target.name]: e.target.value });
  };

  const handleClick = () => {
    setOpen(!open);
  };

  const handleUpdate = async () => {
    await axios.put("localhost/updateLocal", { datass }).then(setOpen(false));
  };

  return (
    <div>
      <Button color="primary" size="small" onClick={handleClick}>
        edit
      </Button>
      <Dialog open={open} onClose={handleClick}>
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
