import React, { useReducer } from 'react';

import PropTypes from 'prop-types';
import styled from 'styled-components';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { authApi } from '../services/contaxy-api';
import GlobalStateContainer from '../app/store';

function Login(props) {
  const { setIsAuthenticated } = GlobalStateContainer.useContainer();
  const { className } = props;

  const [formInput, setFormInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      username: '',
      password: '',
    }
  );

  const handleSubmit = async (event) => {
    // TODO: change the status to authenticated if login succeeded
    event.preventDefault();
    console.log(formInput);
    const response = await authApi.requestToken('password', {
      username: formInput.username,
      password: formInput.password,
      setAsCookie: true,
    });

    console.log(response);
    document.cookie = `ct_token=${response.access_token}; path=/`;
    setIsAuthenticated(true);
    // TODO: remove this cookie as soon as the server returns a cookie
    return false;
  };

  const handleInput = (event) => {
    const { name, value } = event.target;
    setFormInput({ [name]: value });
  };

  return (
    <form className={`${className} container`} onSubmit={handleSubmit}>
      <TextField
        required
        className={`${className} input`}
        id="username"
        name="username"
        label="Username"
        variant="filled"
        defaultValue={formInput.username}
        onChange={handleInput}
      />
      <TextField
        required
        className={`${className} input`}
        id="password"
        name="password"
        label="Password"
        type="password"
        autoComplete="current-password"
        variant="filled"
        defaultValue={formInput.password}
        onChange={handleInput}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        className={className}
      >
        Login
      </Button>
    </form>
  );
}

Login.propTypes = {
  className: PropTypes.string,
};

Login.defaultProps = {
  className: '',
};

const StyledLogin = styled(Login)`
  &.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 24px;
  }

  &.input {
    margin-bottom: 8px;
  }
`;

export default StyledLogin;
