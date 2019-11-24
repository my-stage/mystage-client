import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemLinkProps from './ListItemLinkProps';
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';

export default function(props: ListItemLinkProps) {
  const { icon, primary, to } = props;

  const renderLink = React.useMemo(() =>
      React.forwardRef<HTMLAnchorElement, Omit<RouterLinkProps, 'innerRef' | 'to'>>(
        (itemProps, ref) => (
          // With react-router-dom@^6.0.0 use `ref` instead of `innerRef`
          // See https://github.com/ReactTraining/react-router/issues/6056
          <RouterLink to={to} {...itemProps} innerRef={ref} />
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
