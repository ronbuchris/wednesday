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
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import { userService } from '../services/user.service';

import { loadWorkspaces } from '../store/actions/workspace.actions';
import {
  onLogin,
  onSignup,
  onLogout,
  loadUsers,
} from '../store/actions/user.actions.js';

class _Login extends React.Component {
  state = {
    credentials: {
      username: '',
      fullname: '',
      password: '',
    },
    isSignup: false,
  };
  componentDidMount() {
    document.title = `Mondus Login`

  }
  handleChange = ({ target }) => {
    const field = target.name;
    if (!field) return;
    const val = target.value;
    this.setState((preState) => ({
      credentials: { ...preState.credentials, [field]: val },
    }));
  };

  onLogin = async (ev,guest) => {
    ev.preventDefault();
    if(guest){
      await this.props.onLogin(guest);
    } else{
      const { username, password } = this.state.credentials;
      if (!username || !password) return;
      await this.props.onLogin({ username, password }, null);
    }
    const user = userService.getLoggedinUser();
    const workspaces = await this.props.loadWorkspaces(user);
    console.log(`workspaces`, workspaces)
    this.props.loadUsers();

    //Open first board of first workspace
    const boardId = workspaces[0].boards[0]._id;
    // loadWorkspace(workspaces[0])
    this.props.history.push(`/board/${boardId}`);
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
                margin: '25px 0',
              }}
            >
              {isSignUp ? 'Sign Up' : 'Sign In'}
            </Button>

            <div
              className="sign-guest flex auto-center btn"
              onClick={(ev) => {
                this.onLogin(ev,'guest');
              }}
            >
              <h3>Sign in as a Guest</h3>
            </div>
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
  loadWorkspaces,
  loadUsers,
};

export const Login = connect(mapStateToProps, mapDispatchToProps)(_Login);
