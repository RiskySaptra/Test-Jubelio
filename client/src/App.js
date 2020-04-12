import React from "react";

import { CssBaseline } from "@material-ui/core";
import { useStyles } from "./Style";

// componets
import HomeDrawer from "./components/HomeComponent/HomeDrawer";
import ProductContent from "./components/HomeComponent/ProductContent";

const App = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <HomeDrawer />
      <ProductContent />
    </div>
  );
};
export default App;
