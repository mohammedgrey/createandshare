import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
// import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";
import "./Profile.css";
import ProfileInfo from "./ProfileInfo";
import ProfileCreations from "./ProfileCreations";
import ProfileFavCreators from "./ProfileFavCreators";
import { Switch, Route, Redirect, Link } from "react-router-dom";

const drawerWidth = 240;
const barColor =
  "linear-gradient(90deg, rgba(22,0,33,1) 0%, rgba(135,95,154,1) 49%, rgba(22,0,33,1) 100%)";

const useStyles = makeStyles((theme) => ({
  paper: {
    background: "black",
    color: "white",
  },
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    // [theme.breakpoints.up("sm")]: {
    //   width: `calc(100% - ${drawerWidth}px)`,
    //   marginLeft: drawerWidth,
    // },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function ProfileLayout(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={classes.appBar}
        style={{ background: barColor }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            {/* <MenuIcon /> */}
            <i class="fas fa-bars"></i>
          </IconButton>
          <Typography variant="h6" noWrap>
            <div className="profile-nav-bar">
              <h1>My Profile</h1>

              <div>
                <Link to="/">
                  {" "}
                  <i class="fas fa-home"></i>{" "}
                </Link>
              </div>
            </div>
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            // classes={{ paper: classes.paper }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            <div className="side-items-in-small-screen side-items-drawer">
              <NavLink to="/profile/info">
                {" "}
                <i class="fas fa-user-circle"></i> My Info
              </NavLink>
              <NavLink to="/profile/creations">
                {" "}
                <i class="far fa-id-card"></i> My Creations
              </NavLink>
              <NavLink to="/profile/favcreators">
                {" "}
                <i class="fas fa-users"></i> My Favorite Creators
              </NavLink>
            </div>
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            <div className="side-items-in-big-screen side-items-drawer">
              <NavLink to="/profile/info">
                {" "}
                <i class="fas fa-user-circle"></i> My Info
              </NavLink>
              <NavLink to="/profile/creations">
                {" "}
                <i class="far fa-id-card"></i> My Creations
              </NavLink>
              <NavLink to="/profile/favcreators">
                {" "}
                <i class="fas fa-users"></i> My Favorite Creators
              </NavLink>
            </div>
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />

        <Switch>
          <Route path="/profile/info" component={ProfileInfo} />
          <Route path="/profile/creations" component={ProfileCreations} />
          <Route path="/profile/favcreators" component={ProfileFavCreators} />
          <Redirect to="/profile/info" />
        </Switch>
      </main>
    </div>
  );
}

ProfileLayout.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ProfileLayout;
