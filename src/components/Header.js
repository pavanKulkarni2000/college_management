import React from "react";
import { AppBar, Toolbar, Typography, makeStyles, Icon } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  icon:{
    margin:'20px'
  }
}));

export default function Header() {
  const classes = useStyles()
  return (
    <AppBar position="fixed" className={classes.appBar}
      color='black'>
      <Toolbar>
        <Icon
          className={classes.icon}>
          <img src="/assets/logo.svg"/>
        </Icon>
      
        <Typography variant="h6" noWrap>
          College Space
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
