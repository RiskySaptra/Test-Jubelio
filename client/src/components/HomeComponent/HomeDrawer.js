import React from "react";

import clsx from "clsx";

import {
  useTheme,
  Typography,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Drawer,
  AppBar,
} from "@material-ui/core";

// Icons
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import GetAppIcon from "@material-ui/icons/GetApp";
import AddBoxIcon from "@material-ui/icons/AddBox";

// Style
import { useStyles } from "../../Style";

// mobx
import { observer, inject } from "mobx-react";

const HomeDrawer = observer((store) => {
  const classes = useStyles();
  const theme = useTheme();

  const { getData, updateDataLocal, getDataLocal } = store.productStore;

  const [open, setOpen] = React.useState(false);

  const handleDrawer = () => {
    setOpen(!open);
  };

  return (
    <>
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
            onClick={handleDrawer}
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
          <IconButton onClick={handleDrawer}>
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
          {/* <ListItem button>
            <ListItemIcon>
              <InboxIcon style={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary={"// Update Elevenia"} />
          </ListItem> */}
        </List>
      </Drawer>
    </>
  );
});
export default inject("productStore")(HomeDrawer);
