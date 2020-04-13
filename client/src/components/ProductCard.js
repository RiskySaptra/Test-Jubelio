import React from "react";

import { toRupiah } from "indo-formatter";
import { Grid, Typography, Paper } from "@material-ui/core";

// components
import { card } from "../Style";
import DetailsDialog from "./ProductComponent/DetailsDialog";
import ProductDelete from "./ProductComponent/ProductDelete";
import ProductEdit from "./ProductComponent/ProductEdit";

const ProductCard = ({ data, loading, source, getDataLocal }) => {
  const classes = card();
  if (loading === false) {
    if (data.length === 0) {
      return (
        <>
          <p>Empty :(</p>
        </>
      );
    } else {
      return (
        <>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={5}
          >
            {data.map((item) => (
              <Paper className={classes.paper} key={item.id}>
                <Grid
                  container
                  direction="column"
                  justify="flex-start"
                  alignItems="stretch"
                  wrap="nowrap"
                  style={{ height: "100%" }}
                >
                  <Grid item xs={7} style={{ maxWidth: "100%" }}>
                    <Grid className={classes.image}>
                      <img
                        className={classes.img}
                        alt={item.productName}
                        src={item.image}
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={5} style={{ maxWidth: "100%" }}>
                    <Grid
                      container
                      direction="column"
                      justify="space-between"
                      style={{ padding: "5px", minHeight: "100%" }}
                    >
                      <Grid item style={{ maxWidth: "100%" }}>
                        <Typography variant="body2" color="textSecondary">
                          SKU : {item.SKU}
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                          {item.productName}
                        </Typography>
                      </Grid>
                      <Grid item style={{ maxWidth: "100%" }}>
                        <Grid container direction="column">
                          <Grid item style={{ marginBottom: "5px" }}>
                            <Typography variant="body2" gutterBottom>
                              {toRupiah(item.price, false)}
                            </Typography>
                            <DetailsDialog data={item.productDetails} />
                          </Grid>
                          {source === "local" ? (
                            <Grid item>
                              <Grid container>
                                <ProductDelete
                                  data={item}
                                  getDataLocal={getDataLocal}
                                />
                                <ProductEdit
                                  data={item}
                                  getDataLocal={getDataLocal}
                                />
                              </Grid>
                            </Grid>
                          ) : (
                            <></>
                          )}
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            ))}
          </Grid>
        </>
      );
    }
  } else {
    return (
      <>
        <div>Loading...</div>
      </>
    );
  }
};
export default ProductCard;
