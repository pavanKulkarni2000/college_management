import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  Icon,
  Box,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  icon: {
    margin: "20px",
  },
  user: {
    float: "right",
    marginRight: "5%",
    marginLeft: "10px",
  },
  title: {
    alignSelf: "center",
  },
}));

export default function Header({ user }) {
  const classes = useStyles();

  return (
    <AppBar position="fixed" className={classes.appBar} color="black">
      <Toolbar>
        <Box display="flex" flexGrow={1}>
          <Icon className={classes.icon}>
            <img src="/assets/logo.svg" />
          </Icon>

          <Typography className={classes.title} variant="h5" noWrap>
            College Space
          </Typography>
        </Box>
        {user && (
          <React.Fragment>
            <Icon>
              <img src="/assets/user.svg" />
            </Icon>
            <Typography className={classes.user} variant="h6" align="right">
              {user.name}
            </Typography>
          </React.Fragment>
        )}
      </Toolbar>
    </AppBar>
  );
}
