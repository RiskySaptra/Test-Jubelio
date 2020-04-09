import React, { useState } from "react";
import axios from "axios";

import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import GetAppIcon from "@material-ui/icons/GetApp";
import AddBoxIcon from "@material-ui/icons/AddBox";
import { Grid } from "@material-ui/core";

// componets
import ProductCard from "./components/ProductCard";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    background: "#2f4050",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    background: "#2f4050",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(8) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const Home = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [dataProduct, setDataProduct] = useState([]);
  console.log(dataProduct.length);

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
        console.log(res);

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

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        style={{ background: "#243d48" }}
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Welcome
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar} style={{ color: "white" }}>
          <Typography>Products</Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon style={{ color: "white" }} />
            ) : (
              <ChevronLeftIcon style={{ color: "white" }} />
            )}
          </IconButton>
        </div>
        <Divider />
        <List style={{ color: "white" }}>
          <Typography
            style={{ marginLeft: "5%" }}
            className={clsx(classes.menuButton, {
              [classes.hide]: !open,
            })}
          >
            Elevenia
          </Typography>
          {/* tanda */}
          <ListItem button onClick={getData}>
            <ListItemIcon>
              <GetAppIcon style={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary={"Data From Elevenia"} />
          </ListItem>
          <ListItem button onClick={updateDataLocal}>
            <ListItemIcon>
              <InboxIcon style={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary={"Update Local DB"} />
          </ListItem>
        </List>
        <Divider />
        <List style={{ color: "white" }}>
          <Typography
            style={{ marginLeft: "5%" }}
            className={clsx(classes.menuButton, {
              [classes.hide]: !open,
            })}
          >
            Local DB
          </Typography>
          <ListItem button onClick={getDataLocal}>
            <ListItemIcon>
              <GetAppIcon style={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary={"Data From Local DB"} />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <AddBoxIcon style={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary={"Add Product"} />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <InboxIcon style={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary={"// Update Elevenia"} />
          </ListItem>
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Grid container justify="center" spacing={5}>
          {waitingData === true ? (
            <ProductCard data={dataProduct} loading={loading} source={source} />
          ) : (
            <h2>Silahkan Pilih Sumber Data</h2>
          )}
        </Grid>
      </main>
    </div>
  );
};
export default Home;
