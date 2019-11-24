import React from 'react';
import { Link, LinkProps } from 'react-router-dom';
import {
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core';
import ListItemLinkProps from './ListItemLinkProps';

export default function(props: ListItemLinkProps) {
  const { icon, primary, to } = props;

  const renderLink = React.useMemo(() =>
      React.forwardRef<HTMLAnchorElement, Omit<LinkProps, 'innerRef' | 'to'>>(
        (itemProps, ref) => (
          // With react-router-dom@^6.0.0 use `ref` instead of `innerRef`
          // See https://github.com/ReactTraining/react-router/issues/6056
          <Link to={to} {...itemProps} innerRef={ref} />
        ),
      ),
    [to],
  );

  return (
    <li>
      <ListItem button component={renderLink}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}
