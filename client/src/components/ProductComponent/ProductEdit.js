import React, { useState } from "react";
import axios from "axios";

import {
  Button,
  Dialog,
  DialogContent,
  TextField,
  TextareaAutosize,
  Grid,
  DialogTitle,
  DialogActions,
} from "@material-ui/core";

export default function ProductEdit({ data }) {
  const [open, setOpen] = useState(false);

  const [datass, setDatass] = useState({
    id: data.id,
    productName: data.productName,
    productDetails: data.productDetails,
    price: data.price,
    SKU: data.SKU,
  });

  const handleChange = (e) => {
    setDatass({ ...datass, [e.target.name]: e.target.value });
  };

  const handleClick = () => {
    setOpen(!open);
  };

  const handleUpdate = async () => {
    await axios.put("http://localhost:8000/updateLocal", { datass });
    setOpen(!open);
    alert("Success");
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
            <TextareaAutosize
              rowsMin={3}
              placeholder="Details"
              name="productDetails"
              autoFocus
              margin="dense"
              onChange={handleChange}
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
