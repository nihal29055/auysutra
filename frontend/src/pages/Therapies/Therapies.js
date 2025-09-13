import React from 'react';
import { Container, Typography, Box } from '@mui/material';

function Therapies() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Available Therapies
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Browse our comprehensive list of Panchakarma therapies.
        </Typography>
      </Box>
    </Container>
  );
}

export default Therapies;