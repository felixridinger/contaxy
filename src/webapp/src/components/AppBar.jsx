import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import MaterialUiAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import ProjectSelector from './ProjectSelector';
import UserMenu from './UserMenu';
import { APP_NAME } from '../utils/config';
import { setActiveProject } from '../utils/project-utils';

function AppBar(props) {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const { className, isAuthenticated, user } = props;

  const handleDrawerClick = () => setDrawerOpen(!isDrawerOpen);

  const privateComponents = (
    <IconButton
      color="inherit"
      aria-label="open drawer"
      onClick={handleDrawerClick}
      className={`${className} menuButton`}
    >
      <MenuIcon />
    </IconButton>
  );

  return (
    <MaterialUiAppBar>
      <Toolbar disableGutters>
        {isAuthenticated ? privateComponents : false}
        <Typography
          variant="h6"
          color="inherit"
          className={`${className} title`}
        >
          {APP_NAME}
        </Typography>
        <ProjectSelector
          activeProject={{}}
          projects={[]}
          onProjectChange={setActiveProject}
        />
        <Typography className={`${className} user`}>{user}</Typography>
        <UserMenu />
      </Toolbar>
    </MaterialUiAppBar>
  );
}

AppBar.propTypes = {
  className: PropTypes.string, // passed by styled-components
  isAuthenticated: PropTypes.bool,
  user: PropTypes.string,
};

AppBar.defaultProps = {
  className: '',
  isAuthenticated: false,
  user: '',
};

const StyledAppBar = styled(AppBar)`
  &.title {
    flex: 1;
    margin-left: ${(props) => (props.isAuthenticated ? '96px' : '0px')};
    font-weight: 300;
    text-align: left;
  }
  &.menuButton {
    margin-right: 36px;
    margin-left: 12px;
  }
`;

export default StyledAppBar;
