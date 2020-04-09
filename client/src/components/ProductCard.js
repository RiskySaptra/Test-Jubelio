import React from "react";
import { Grid, Typography, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import DetailsDialog from "./ProductComponent/DetailsDialog";
import ProductDelete from "./ProductComponent/ProductDelete";
import ProductEdit from "./ProductComponent/ProductEdit";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "15px",
    justifyItems: "center",
  },
  paper: {
    padding: theme.spacing(1),
    margin: theme.spacing(2),
    elevation: 5,
    width: "250px",
    height: "400px",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  img: {
    margin: "auto",
    width: "100%",
    height: "200px",
  },
}));

const ProductCard = ({ data, loading, source }) => {
  const classes = useStyles();

  if (loading === false) {
    return (
      <>
        <Grid container direction="row" justify="center" alignItems="center">
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
                            Rp. {item.price}
                          </Typography>
                          <DetailsDialog data={item.productDetails} />
                        </Grid>
                        {source === "local" ? (
                          <Grid item>
                            <Grid container>
                              <ProductDelete data={item} />
                              <ProductEdit data={item} />
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
  } else {
    return (
      <>
        <div>Loading...</div>
      </>
    );
  }
};
export default ProductCard;
