import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import clsx from 'clsx';
import {
  Drawer,
  AppBar,
  Toolbar,
  List,
  ListSubheader,
  Typography,
  Divider,
  IconButton,
  Badge,
  Container,
  Menu,
  MenuItem
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  MoreVert as MoreVertIcon,
  Notifications as NotificationsIcon,
  AccountCircle as AccountIcon
} from '@material-ui/icons';
import { mainListItems, managementListItems } from './routing/listItems';
import Dashboard from './pages/Dashboard';
import AudioPlayer from './pages/AudioPlayer';
import Events from './pages/Events';
import UsersMgmt from './pages/UsersMgmt';
import ShowsMgmt from './pages/ShowsMgmt';
import EventsMgmt from './pages/EventsMgmt';
import { UserContext } from './contexts';
import { Api } from './api';
import UserForm from "./forms/UserForm";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
}));

export default function MainLayout() {
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [accountMenuAnchorEl, setAccountMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [moreMenuAnchorEl, setMoreMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [notificationsCount, setNotificationsCount] = useState(0);

  const { user, setUser, token, setToken } = React.useContext(UserContext);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };
  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };
  const handleAccountClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAccountMenuAnchorEl(event.currentTarget);
  }
  const handleAccountMenuClose = () => {
    setAccountMenuAnchorEl(null);
  }
  const handleMoreClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMoreMenuAnchorEl(event.currentTarget);
  }
  const handleMoreMenuClose = () => {
    setMoreMenuAnchorEl(null);
  }
  const handleNotificationsClick = () => {
    setNotificationsCount(notificationsCount + 1);
  }
  const handleLogout = () => {
    handleAccountMenuClose();
    Api.logout().then(res => {
      if(res.status === 200) {
        setUser(null);
        setToken("");
      }
    });
  };
  const handleProfile = () => {
    handleAccountMenuClose();
  };
  const handleMyAccount = () => {
    handleAccountMenuClose();
  };

  return (
    <>
      <AppBar position="absolute" className={clsx(classes.appBar, drawerOpen && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, drawerOpen && classes.menuButtonHidden)}
          >
          <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            myStage
          </Typography>
          <IconButton color="inherit" onClick={handleMoreClick}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="more-menu"
            anchorEl={moreMenuAnchorEl}
            keepMounted
            open={Boolean(moreMenuAnchorEl)}
            onClose={handleMoreMenuClose}
          >
            <MenuItem onClick={handleMoreMenuClose}>More I</MenuItem>
            <MenuItem onClick={handleMoreMenuClose}>More II</MenuItem>
            <MenuItem onClick={handleMoreMenuClose}>More III</MenuItem>
            <MenuItem onClick={handleMoreMenuClose}>More IV</MenuItem>
            <MenuItem onClick={handleMoreMenuClose}>More V</MenuItem>
            <MenuItem onClick={handleMoreMenuClose}>More VI</MenuItem>
            <MenuItem onClick={handleMoreMenuClose}>More VII</MenuItem>
            <MenuItem onClick={handleMoreMenuClose}>More VIII</MenuItem>
            <MenuItem onClick={handleMoreMenuClose}>More IX</MenuItem>
            <MenuItem onClick={handleMoreMenuClose}>More X</MenuItem>
          </Menu>
          <IconButton color="inherit" onClick={handleNotificationsClick}>
            <Badge badgeContent={notificationsCount} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton color="inherit" onClick={handleAccountClick}>
            <AccountIcon />
          </IconButton>
          <Typography>
            { user ? user.name : "" }
          </Typography>
          <Menu
            id="account-menu"
            anchorEl={accountMenuAnchorEl}
            keepMounted
            open={Boolean(accountMenuAnchorEl)}
            onClose={handleAccountMenuClose}
          >
            <MenuItem onClick={handleProfile}>Profile</MenuItem>
            <MenuItem onClick={handleMyAccount}>My account</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !drawerOpen && classes.drawerPaperClose),
        }}
        open={drawerOpen}>
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          {mainListItems}
          <Divider />
          <ListSubheader inset>Verwaltung</ListSubheader>
          {managementListItems}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Switch>
            <Route exact path="/dashboard"><Dashboard /></Route>
            <Route exact path="/audio-player"><AudioPlayer /></Route>
            <Route exact path="/events"><Events /></Route>
            <Route exact path="/mgmt/shows"><ShowsMgmt /></Route>
            <Route exact path="/mgmt/events"><EventsMgmt /></Route>
            <Route exact path="/mgmt/users"><UsersMgmt /></Route>
            <Route exact path="/mgmt/users/:userId"><UserForm /></Route>
            <Route exact path="/mgmt/users/create"><UserForm /></Route>
          </Switch>
        </Container>
      </main>
    </>
  );
}
