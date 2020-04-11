import React from "react";

import { Grid } from "@material-ui/core";

// components
import ProductCard from "../ProductCard";

// Style
import { useStyles } from "../../Style";

const ProductContent = ({
  dataProduct,
  loading,
  source,
  getDataLocal,
  waitingData,
}) => {
  const classes = useStyles();
  return (
    <>
      <Grid className={classes.content}>
        <div className={classes.toolbar} />
        {waitingData === true ? (
          <ProductCard
            data={dataProduct}
            loading={loading}
            source={source}
            getDataLocal={getDataLocal}
          />
        ) : (
          <h2>Silahkan Pilih Sumber Data</h2>
        )}
      </Grid>
    </>
  );
};
export default ProductContent;
