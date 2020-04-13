import React, { useEffect } from "react";

import { CssBaseline } from "@material-ui/core";
import { useStyles } from "./Style";

// componets
import HomeDrawer from "./components/HomeComponent/HomeDrawer";
import ProductContent from "./components/HomeComponent/ProductContent";

// mobx
import { observer, inject } from "mobx-react";

const App = observer((store) => {
  const classes = useStyles();

  // inject dulu ke sini
  const { getDataLocal } = store.productStore;

  // useEffect(() => {
  //   getDataLocal();
  // }, [getDataLocal]);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <HomeDrawer />
      <ProductContent />
    </div>
  );
});
export default inject("productStore")(App);
