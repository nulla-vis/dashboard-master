import React from 'react';
import { CircularProgress, Container } from '@mui/material';
import { useTheme } from '@mui/material/styles'; // Import useTheme from MUI
import { tokens } from "../theme";

function LoadingComponent({ loading }) {
  const theme = useTheme(); // Get the current theme
  const colors = tokens(theme.palette.mode);
  return loading ? (
    <Container
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: colors, // Set background color based on theme
      }}
    >
      <CircularProgress color={theme.palette.mode === 'dark' ? 'secondary' : 'primary'} /> {/* Set color based on theme */}
    </Container>
  ) : null;
}

export default LoadingComponent;
