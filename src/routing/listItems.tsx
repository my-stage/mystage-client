import React from 'react';
import ListSubheader from '@material-ui/core/ListSubheader';
import PeopleIcon from '@material-ui/icons/People';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ListItemLink from './ListItemLink';
import HomeIcon from '@material-ui/icons/Home';
import EventIcon from '@material-ui/icons/Event';
import MovieIcon from '@material-ui/icons/Movie';

export const mainListItems = (
  <div>
    <ListItemLink to="/" primary="Home" icon={<HomeIcon />} />
    <ListItemLink to="/users" primary="Users" icon={<PeopleIcon />} />
    <ListItemLink to="/shows" primary="Shows" icon={<MovieIcon />} />
    <ListItemLink to="/events" primary="Events" icon={<EventIcon />} />
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Saved reports</ListSubheader>
    <ListItemLink to="/notimplemented" primary="Current month" icon={<AssignmentIcon />} />
    <ListItemLink to="/notimplemented" primary="Last quarter" icon={<AssignmentIcon />} />
    <ListItemLink to="/notimplemented" primary="Year-end sale" icon={<AssignmentIcon />} />
  </div>
);
