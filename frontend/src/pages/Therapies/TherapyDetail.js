import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import { useParams } from 'react-router-dom';

function TherapyDetail() {
  const { id } = useParams();

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Therapy Details
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Therapy ID: {id}
        </Typography>
      </Box>
    </Container>
  );
}

export default TherapyDetail;