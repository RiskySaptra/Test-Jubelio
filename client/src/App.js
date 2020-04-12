import React from "react";

import { CssBaseline } from "@material-ui/core";

// componets
import HomeDrawer from "./components/HomeComponent/HomeDrawer";
import ProductContent from "./components/HomeComponent/ProductContent";
import { useStyles } from "./Style";

const Home = () => {
  // console.log(store.productStore.dataProduct);
  // console.log(store);

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <HomeDrawer />
      <ProductContent />
    </div>
  );
};
export default Home;
