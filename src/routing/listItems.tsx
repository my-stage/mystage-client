import React from 'react';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemLink from './ListItemLink';
import {
    Dashboard as DashboardIcon,
    QueueMusic as AudioPlayerIcon,
    Event as EventsIcon,
    People as UsersMgmtIcon,
    MovieFilter as ShowsMgmtIcon,
    EventNote as EventsMgmtIcon,
} from '@material-ui/icons';

export const mainListItems = (
  <>
    <ListItemLink to="/" primary="Dashboard" icon={<DashboardIcon />} />
    <ListItemLink to="/audio-player" primary="Audio Player" icon={<AudioPlayerIcon />} />
    <ListItemLink to="/events" primary="Events" icon={<EventsIcon />} />
  </>
);

export const managementListItems = (
  <>
    <ListItemLink to="/mgmt/shows" primary="Shows" icon={<ShowsMgmtIcon />} />
    <ListItemLink to="/mgmt/events" primary="Events" icon={<EventsMgmtIcon />} />
      <ListItemLink to="/mgmt/users" primary="Users" icon={<UsersMgmtIcon />} />
  </>
);
