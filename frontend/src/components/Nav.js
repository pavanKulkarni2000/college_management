import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  SvgIcon,
  Divider,
  Toolbar,
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import NotificationIcon from "@material-ui/icons/Notifications";
import { FaChalkboardTeacher } from "react-icons/fa";
import { BiChalkboard } from "react-icons/bi";
import {
  AiOutlineFolderAdd,
  AiTwotoneNotification,
  AiOutlineLogout,
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

export default function Nav({ user }) {
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
            <ListItem button component={Link} to="/home/student">
              <ListItemIcon>
                <HomeIcon className={classes.icons} />
              </ListItemIcon>
              <ListItemText primary={"Home"} />
            </ListItem>
            <ListItem button component={Link} to="/home/student/class">
              <ListItemIcon>
                <FaChalkboardTeacher size="25px" className={classes.icons} />
              </ListItemIcon>
              <ListItemText primary={"Class Post"} />
            </ListItem>
            <ListItem button component={Link} to="/home/student/department">
              <ListItemIcon>
                <BiChalkboard size="25px" className={classes.icons} />
              </ListItemIcon>
              <ListItemText primary={"Notice Board"} />
            </ListItem>
            <ListItem button component={Link} to="/home/student/placement">
              <ListItemIcon>
                <AiTwotoneNotification size="20px" className={classes.icons} />
              </ListItemIcon>
              <ListItemText primary={"Placement"} />
            </ListItem>
            {user && user.is_spc ? (
              <ListItem button component={Link} to="/home/student/creation">
                <ListItemIcon>
                  <AiOutlineFolderAdd size="20px" className={classes.icons} />
                </ListItemIcon>
                <ListItemText primary={"Add Company"} />
              </ListItem>
            ) : (
              <div></div>
            )}
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
