import React, { useState } from 'react';

import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import AccountCircle from '@material-ui/icons/AccountCircle';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import { API_EXPLORER_URL, DOCUMENTATION_URL } from '../../utils/config';
import { authApi } from '../../services/contaxy-api';
import { getUserPemissionId } from '../../utils/app-utils';
import { useShowAppDialog } from '../../app/AppDialogServiceProvider';
import ApiTokenDialog from '../Dialogs/ApiTokenDialog';
import ContentDialog from '../Dialogs/ContentDialog';

const ID_MENU_APPBAR = 'menu-appbar';
const REL = 'noopener noreferrer';

function UserMenu(props) {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState();
  const showAppDialog = useShowAppDialog();
  const { className, isAuthenticated, user } = props;

  const onClose = () => setAnchorEl(null);
  const onMenuClick = (event) => setAnchorEl(event.currentTarget);

  const onMyUserClick = async () => {
    showAppDialog(ContentDialog, {
      title: 'Me',
      jsonContent: user,
    });
  };

  const onApiTokenClick = async () => {
    const apiTokens = await authApi.listApiTokens();
    const userScope = getUserPemissionId(user);
    showAppDialog(ApiTokenDialog, {
      creationScope: userScope,
      tokens: apiTokens,
    });
  };

  const onLogoutClick = async () => {
    try {
      await authApi.logoutUserSession();
    } catch (err) {
      // ignore
    }
    window.location.reload();
  };

  const privateElements = (
    <div>
      <MenuItem onClick={onMyUserClick}>Me</MenuItem>
      <MenuItem onClick={onApiTokenClick}>{t('api_tokens')}</MenuItem>
      <MenuItem onClick={onLogoutClick}>{t('logout')}</MenuItem>
      <Divider />
    </div>
  );

  return (
    <div className={`${className} container`}>
      <IconButton
        aria-label="usermenu"
        aria-owns={ID_MENU_APPBAR}
        className={`${className} iconButton`}
        onClick={onMenuClick}
      >
        <AccountCircle />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        id={ID_MENU_APPBAR}
        open={Boolean(anchorEl)}
        onClose={onClose}
      >
        {isAuthenticated ? privateElements : false}
        <MenuItem
          className={`${className} menuItem`}
          component="a"
          href={DOCUMENTATION_URL}
          rel={REL}
          target="_blank"
        >
          {t('documentation')}
        </MenuItem>
        <MenuItem
          className={`${className} menuItem`}
          component="a"
          href={API_EXPLORER_URL}
          rel={REL}
          target="_blank"
        >
          {t('api_explorer')}
        </MenuItem>
      </Menu>
    </div>
  );
}

UserMenu.propTypes = {
  className: PropTypes.string,
  isAuthenticated: PropTypes.bool,
  user: PropTypes.instanceOf(Object),
};

UserMenu.defaultProps = {
  className: '',
  isAuthenticated: false,
  user: {},
};

const StyledUserMenu = styled(UserMenu)`
  &.container {
    margin-right: 12px;
  }

  &.iconButton {
    color: inherit;
  }

  &.user {
    display: inline-block;
    color: white;
  }

  &.menuItem {
    color: initial;
    text-decoration: none;
  }
`;

export default StyledUserMenu;
