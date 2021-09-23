import React from 'react';
import { connect } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { onLogin, onSignup, onLogout } from '../store/actions/user.actions.js';

class _Login extends React.Component {
  state = {
    credentials: {
      username: '',
      fullname: '',
      password: '',
    },
    isSignup: false,
  };

  handleChange = ({ target }) => {
    const field = target.name;
    if (!field) return;
    const val = target.value;
    this.setState((preState) => ({
      credentials: { ...preState.credentials, [field]: val },
    }));
  };

  onLogin = (ev) => {
    ev.preventDefault();
    const { username, password } = this.state.credentials;
    if (!username || !password) return;
    this.props.onLogin({ username, password });
  };

  onSignup = (ev) => {
    ev.preventDefault();
    const { username, fullname, password } = this.state.credentials;
    if (!username || !password || !fullname) return;
    this.props.onSignup({ username, password, fullname });
  };

  render() {
    const { isSignUp, credentials } = this.state;
    const { username, fullname, password } = credentials;
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div
          style={{
            marginTop: '40px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar
            style={{
              margin: '40px',
              backgroundColor: 'blue',
            }}
          >
            {/* <LockOutlinedIcon /> */}
          </Avatar>
          <Typography component="h1" variant="h5">
            {isSignUp ? 'Sign up' : 'Sign in'}
          </Typography>
          <form
            style={{
              width: '100%',
              marginTop: '40px',
            }}
            onSubmit={isSignUp ? this.onSignup : this.onLogin}
            noValidate
          >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username Address"
              name="username"
              value={username}
              autoComplete="username"
              onChange={this.handleChange}
              autoFocus
            />
            {isSignUp && (
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="fullname"
                label="Full Name"
                name="fullname"
                value={fullname}
                autoComplete="fullname"
                onChange={this.handleChange}
              />
            )}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={password}
              onChange={this.handleChange}
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={{
                margin: '40px 0',
              }}
            >
              {isSignUp ? 'Sign Up' : 'Sign In'}
            </Button>
            <Grid container>
              {/* <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid> */}
              <Grid item>
                <Link
                  href="#"
                  variant="body2"
                  onClick={() => this.setState({ isSignUp: !isSignUp })}
                >
                  {isSignUp
                    ? 'Already have an account? Sign in'
                    : "Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.userModule.user,
  };
}

const mapDispatchToProps = {
  onLogin,
  onSignup,
  onLogout,
};

export const Login = connect(mapStateToProps, mapDispatchToProps)(_Login);
