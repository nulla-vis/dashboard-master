import React, { useState } from 'react';
import { Container, Paper, TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = ({ login, loggedIn }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    // Basic validation
    if (!email && !password) {
      setError('Mohon masukkan e-mail dan password');
      return; // Return early to prevent further execution
    } else if (!email) {
      setError('Mohon masukkan e-mail');
      return;
    } else if (!password) {
      setError('Mohon masukkan password');
      return;
    } else {
      setError('');
    }

    await fetch(`http://127.0.0.1:3131/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => {
        // Parse the JSON response
        return response.json();
      })
      .then((data) => {
        if (data.status === 'error' || data.statusCode === 500) {
          setError(data.payload.id);
        } else {
          // Call the login function to handle the successful login
          login();
          // Redirect the user
          navigate('/');
        }
      })
      .catch((err) => {
        err.message == "Failed to fetch" ? setError("SERVER NOT REACHABLE") : setError(err.message)
      });
  };

  return (
    <Container
      maxWidth="xs"
      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
    >
      <Paper elevation={3} style={{ padding: '20px', width: '100%' }}>
        <Typography variant="h5" component="div" gutterBottom>
          Login
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <form onSubmit={handleLogin}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            variant="outlined"
            value={email}
            onChange={handleEmailChange}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            variant="outlined"
            value={password}
            onChange={handlePasswordChange}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Login
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;
