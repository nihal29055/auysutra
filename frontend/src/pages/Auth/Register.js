import React from 'react';
import { Container, Typography, Box } from '@mui/material';

function Register() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Register
        </Typography>
        <Typography variant="body1">
          Registration page will be implemented here.
        </Typography>
      </Box>
    </Container>
  );
}

export default Register;