import React from "react";

import { Grid } from "@material-ui/core";

// components
import ProductCard from "../ProductCard";

// Style
import { useStyles } from "../../Style";

// mobx
import { observer, inject } from "mobx-react";

const ProductContent = observer((store) => {
  const classes = useStyles();

  const {
    dataProduct,
    loading,
    source,
    waitingData,
    getDataLocal,
  } = store.productStore;

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
});
export default inject("productStore")(ProductContent);
