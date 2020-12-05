import React, { useEffect, useState } from 'react';
import {makeStyles} from "@material-ui/core/styles"
import { Drawer,  List, ListItem, ListItemIcon, ListItemText, SvgIcon } from '@material-ui/core';
import HomeIcon from "@material-ui/icons/Home"
import NotificationIcon from "@material-ui/icons/Notifications"
import {FaChalkboardTeacher} from "react-icons/fa"
import {BiChalkboard} from "react-icons/bi"
import {AiTwotoneNotification, AiOutlineLogout} from "react-icons/ai"


const useStyles=makeStyles((theme)=>({
    drawerPaper: {width: 'inherit'}
}))

export default function Nav({open,onChange}){
    
    const classes=useStyles();

    function handleDrawerToggle() {
        onChange(!open)
      }

    return (
        <div
        style={{ display: 'flex'}}
        >
            <Drawer
            style={{ width: '220px'}}
            variant="temporary"
            anchor="left"
            open={open}
            onClose={handleDrawerToggle}
            classes={{paper: classes.drawerPaper}}
            >
            <List>
                <ListItem button>
                    <ListItemIcon>
                        <HomeIcon/>
                    </ListItemIcon>
                    <ListItemText primary={"Home"}/>
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <NotificationIcon/>
                    </ListItemIcon>
                    <ListItemText primary={"Notification"}/>
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <FaChalkboardTeacher size="25px"/>
                    </ListItemIcon>
                    <ListItemText primary={"Class Board"}/>
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <BiChalkboard size="25px"/>
                    </ListItemIcon>
                    <ListItemText primary={"Department"}/>
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <AiTwotoneNotification size="20px"/>
                    </ListItemIcon>
                    <ListItemText primary={"New dept. post"}/>
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <AiOutlineLogout size="20px"/>
                    </ListItemIcon>
                    <ListItemText primary={"Log Out"}/>
                </ListItem>
            </List>
            </Drawer>
        </div>
    );
}