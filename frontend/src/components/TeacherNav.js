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
import { BiScan, BiNotepad } from "react-icons/bi";
import {
  AiOutlineLogout,
  AiOutlineFolderAdd,
  AiOutlineUserAdd,
} from "react-icons/ai";
import { useHistory, Link } from "react-router-dom";
import PopUp from "./PopUp";
import { CgFeed } from "react-icons/cg";
import { BsCloudDownload } from "react-icons/bs";

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
            <ListItem button component={Link} to="/home/teacher">
              <ListItemIcon>
                <FaChalkboardTeacher size="25px" className={classes.icons} />
              </ListItemIcon>
              <ListItemText primary={"Add Class Post"} />
            </ListItem>
            {user && user.is_hod && (
              <ListItem button component={Link} to="/home/teacher/department">
                <ListItemIcon>
                  <BiNotepad size="25px" className={classes.icons} />
                </ListItemIcon>
                <ListItemText primary={"Add Department Post"} />
              </ListItem>
            )}
            <ListItem button component={Link} to="/home/teacher/post">
              <ListItemIcon>
                <CgFeed size="25px" className={classes.icons} />
              </ListItemIcon>
              <ListItemText primary={"Department Post's"} />
            </ListItem>
            <ListItem button component={Link} to="/home/teacher/scan">
              <ListItemIcon>
                <BiScan size="25px" className={classes.icons} />
              </ListItemIcon>
              <ListItemText primary={"Scan Document"} />
            </ListItem>
            <ListItem button component={Link} to="/home/teacher/getObjects">
              <ListItemIcon>
                <BsCloudDownload size="25px" className={classes.icons} />
              </ListItemIcon>
              <ListItemText primary={"Get Objects"} />
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
