import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button
} from '@mui/material';

const therapies = [
  {
    name: 'Vamana',
    description: 'Therapeutic emesis for detoxification of the upper gastrointestinal tract. Helps in Kapha disorders like asthma and skin issues.',
    image: '/images/vamana.jpg',
  },
  {
    name: 'Virechana',
    description: 'Therapeutic purgation to eliminate toxins from the liver and intestines. Effective for Pitta disorders like jaundice and acidity.',
    image: '/images/virechana.jpg',
  },
  {
    name: 'Basti',
    description: 'Medicated enema that balances Vata dosha, cleanses the colon, and improves overall health.',
    image: '/images/basti.jpg',
  },
  {
    name: 'Nasya',
    description: 'Nasal administration of herbal oils or powders for sinusitis, migraine, and other head-related disorders.',
    image: '/images/nasya.jpg',
  },
  {
    name: 'Raktamokshana',
    description: 'Bloodletting therapy that purifies blood, improves circulation, and manages skin diseases.',
    image: '/images/raktamokshana.jpg',
  },
  {
    name: 'Abhyanga',
    description: 'Full-body oil massage that improves circulation, reduces fatigue, and rejuvenates the body.',
    image: '/images/abhyanga.jpg',
  },
  {
    name: 'Shirodhara',
    description: 'A calming therapy where warm herbal oil is poured steadily on the forehead, reducing stress and anxiety.',
    image: '/images/shirodhara.jpg',
  },
  {
    name: 'Pizhichil',
    description: 'Medicated oil bath for rejuvenation, pain relief, and strengthening immunity.',
    image: '/images/pizhichil.jpg',
  },
];

function Therapies() {
  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          py: 6,
          textAlign: 'center',
          background: 'linear-gradient(to right, #a8edea, #fed6e3)',
          borderRadius: 3,
          mb: 4,
        }}
      >
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Discover Panchakarma Therapies
        </Typography>
        <Typography variant="h6" color="text.secondary" maxWidth="800px" mx="auto">
          Experience ancient Ayurvedic healing therapies tailored for detoxification,
          rejuvenation, and long-term wellness.
        </Typography>
      </Box>

      {/* Therapies Grid */}
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {therapies.map((therapy, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  height: '100%',
                  borderRadius: 3,
                  boxShadow: 4,
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 8,
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={therapy.image}
                  alt={therapy.name}
                  sx={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {therapy.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {therapy.description}
                  </Typography>
                  <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                    <Button variant="contained" size="small" color="primary">
                      Learn More
                    </Button>
                    <Button variant="outlined" size="small" color="success">
                      Book Now
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default Therapies;
