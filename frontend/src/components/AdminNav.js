import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Toolbar,
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import { FaChalkboardTeacher, FaUserGraduate } from "react-icons/fa";
import { BiChalkboard } from "react-icons/bi";
import {
  AiOutlineLogout,
  AiOutlineFolderAdd,
  AiOutlineUserAdd,
  AiOutlineForm,
} from "react-icons/ai";
import { useHistory, Link } from "react-router-dom";
import PopUp from "./PopUp";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    background: "#235a8c",
    color: "white",
  },
  drawerContainer: {
    overflow: "auto",
  },
  icons: {
    color: "white",
  },
  divider: {
    background: "white",
  },
}));

export default function Nav() {
  const [open, setOpen] = useState(false);

  const classes = useStyles();
  const history = useHistory();

  return (
    <div>
      <Drawer
        variant="permanent"
        className={classes.drawer}
        classes={{ paper: classes.drawerPaper }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            <ListItem button component={Link} to="/home/admin">
              <ListItemIcon>
                <FaUserGraduate className={classes.icons} />
              </ListItemIcon>
              <ListItemText primary={"Student Table"} />
            </ListItem>
            <ListItem button component={Link} to="/home/admin/teacher">
              <ListItemIcon>
                <FaChalkboardTeacher size="25px" className={classes.icons} />
              </ListItemIcon>
              <ListItemText primary={"Teacher Table"} />
            </ListItem>
            <ListItem button component={Link} to="/home/admin/register">
              <ListItemIcon>
                <AiOutlineUserAdd size="25px" className={classes.icons} />
              </ListItemIcon>
              <ListItemText primary={"Register for Course"} />
            </ListItem>
            <ListItem button component={Link} to="/home/admin/course">
              <ListItemIcon>
                <AiOutlineFolderAdd size="25px" className={classes.icons} />
              </ListItemIcon>
              <ListItemText primary={"Add Course"} />
            </ListItem>
            <ListItem button component={Link} to="/home/admin/design">
              <ListItemIcon>
                <AiOutlineForm size="25px" className={classes.icons} />
              </ListItemIcon>
              <ListItemText primary={"Design form"} />
            </ListItem>
            <Divider classes={{ root: classes.divider }} />
            <ListItem button onClick={() => setOpen(true)}>
              <ListItemIcon>
                <AiOutlineLogout size="20px" className={classes.icons} />
              </ListItemIcon>
              <ListItemText primary={"Log Out"} />
            </ListItem>
          </List>
        </div>
      </Drawer>
      <PopUp
        open={open}
        setOpen={setOpen}
        dialog="Are you sure you want to Logout?"
        action1="Cancel"
        action2="Logout"
      />
    </div>
  );
}
