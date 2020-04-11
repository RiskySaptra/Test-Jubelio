import React, { useState } from "react";
import axios from "axios";

import { CssBaseline } from "@material-ui/core";

// componets
import HomeDrawer from "./components/HomeComponent/HomeDrawer";
import ProductContent from "./components/HomeComponent/ProductContent";
import { useStyles } from "./Style";

const Home = () => {
  const classes = useStyles();

  const [dataProduct, setDataProduct] = useState([]);
  const [loading, setloading] = useState(true);
  const [source, setSource] = useState("");
  const [waitingData, setWaitingData] = useState(false);

  const getData = async () => {
    setWaitingData(true);
    setloading(true);

    await axios.get("http://localhost:8000/indexData").then((res) => {
      setSource("ext");
      setDataProduct(res.data);
      setloading(false);
    });
  };
  const updateDataLocal = async () => {
    setWaitingData(true);
    setloading(true);

    await axios
      .post("http://localhost:8000/addAllLocal", { dataProduct })
      .then((res) => {
        setDataProduct(res.data);
        setloading(false);
      });
  };
  const getDataLocal = async () => {
    setWaitingData(true);
    setloading(true);

    await axios.get("http://localhost:8000/indexDataLocal").then((res) => {
      setSource("local");
      setDataProduct(res.data);
      setloading(false);
    });
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <HomeDrawer
        getData={getData}
        updateDataLocal={updateDataLocal}
        getDataLocal={getDataLocal}
      />
      <ProductContent
        dataProduct={dataProduct}
        loading={loading}
        source={source}
        waitingData={waitingData}
        getDataLocal={getDataLocal}
      />
    </div>
  );
};
export default Home;
