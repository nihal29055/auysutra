import React from 'react';
import { Container, Typography, Box } from '@mui/material';

function Appointments() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          My Appointments
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage your therapy appointments here.
        </Typography>
      </Box>
    </Container>
  );
}

export default Appointments;