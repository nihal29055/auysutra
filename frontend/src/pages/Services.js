import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Paper,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Rating,
  Avatar,
  Divider
} from '@mui/material';
import {
  Spa,
  Schedule,
  LocalHospital,
  Healing,
  ExpandMore,
  CheckCircle,
  AccessTime,
  Person,
  Star,
  Close
} from '@mui/icons-material';

function Services() {
  const [selectedService, setSelectedService] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const mainServices = [
    {
      id: 1,
      name: "Vamana (Therapeutic Vomiting)",
      category: "Panchakarma",
      duration: "3-5 days",
      price: "₹15,000 - ₹25,000",
      image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&q=80",
      shortDescription: "Eliminates excess Kapha dosha through controlled therapeutic vomiting",
      fullDescription: "Vamana is one of the five main Panchakarma procedures designed to eliminate excess Kapha dosha from the upper part of the body. This therapy involves controlled therapeutic vomiting induced by herbal medicines after proper preparation of the patient.",
      benefits: [
        "Treats respiratory disorders like asthma and bronchitis",
        "Eliminates excess mucus and toxins",
        "Improves digestive fire (Agni)",
        "Helps in skin disorders and allergies",
        "Enhances mental clarity"
      ],
      process: [
        "Pre-treatment preparation (Poorva Karma)",
        "Administration of medicated ghee",
        "Steam therapy and oil massage",
        "Main treatment with herbal emetics",
        "Post-treatment care and diet"
      ],
      contraindications: [
        "Pregnancy and menstruation",
        "Severe heart conditions",
        "Acute infections",
        "Children below 12 years",
        "Extreme weakness"
      ],
      rating: 4.7,
      testimonials: [
        {
          name: "Priya Sharma",
          rating: 5,
          comment: "Remarkable improvement in my chronic respiratory issues. The doctors were very professional and caring."
        },
        {
          name: "Rahul Kumar",
          rating: 4,
          comment: "Effective treatment for my allergies. The preparation phase was crucial for the success."
        }
      ]
    },
    {
      id: 2,
      name: "Virechana (Purgation Therapy)",
      category: "Panchakarma",
      duration: "5-7 days",
      price: "₹18,000 - ₹28,000",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80",
      shortDescription: "Cleanses the body by eliminating excess Pitta dosha through controlled purgation",
      fullDescription: "Virechana is a controlled purgation therapy that eliminates excess Pitta dosha from the middle part of the body, primarily from the liver, gallbladder, and small intestine. This treatment is highly effective for various digestive and metabolic disorders.",
      benefits: [
        "Treats digestive disorders and liver problems",
        "Eliminates toxins from the body",
        "Improves skin complexion",
        "Helps in diabetes and metabolic disorders",
        "Reduces inflammation and acidity"
      ],
      process: [
        "Preparation with medicated ghee (Snehana)",
        "Steam therapy (Swedana)",
        "Administration of purgative medicines",
        "Monitoring and supportive care",
        "Recovery and rehabilitation"
      ],
      contraindications: [
        "Severe dehydration",
        "Rectal bleeding",
        "Pregnancy",
        "Severe weakness",
        "Acute diarrhea"
      ],
      rating: 4.8,
      testimonials: [
        {
          name: "Anita Verma",
          rating: 5,
          comment: "Life-changing treatment for my chronic digestive issues. Highly recommend this therapy."
        }
      ]
    },
    {
      id: 3,
      name: "Basti (Medicated Enema)",
      category: "Panchakarma",
      duration: "8-16 days",
      price: "₹25,000 - ₹40,000",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&q=80",
      shortDescription: "Highly effective therapy for Vata disorders using medicated enemas",
      fullDescription: "Basti is considered the most important Panchakarma therapy, particularly effective for Vata-related disorders. It involves the administration of medicated liquids through the rectum to cleanse and nourish the colon and the entire body.",
      benefits: [
        "Treats neurological disorders",
        "Improves joint health and mobility",
        "Enhances immunity and strength",
        "Helps in paralysis and muscle weakness",
        "Improves reproductive health"
      ],
      process: [
        "Patient assessment and preparation",
        "Oil massage and steam therapy",
        "Administration of medicated enemas",
        "Different types of Basti as per condition",
        "Post-treatment diet and lifestyle guidance"
      ],
      contraindications: [
        "Rectal tumors or bleeding",
        "Severe diarrhea",
        "Acute fever",
        "Recent rectal surgery",
        "Certain heart conditions"
      ],
      rating: 4.9,
      testimonials: [
        {
          name: "Dr. Rajesh Patel",
          rating: 5,
          comment: "Excellent results for my chronic back pain. The treatment was comfortable and effective."
        }
      ]
    },
    {
      id: 4,
      name: "Nasya (Nasal Administration)",
      category: "Panchakarma",
      duration: "7-14 days",
      price: "₹12,000 - ₹20,000",
      image: "https://images.unsplash.com/photo-1573883430746-d02e6ac8dea3?w=400&q=80",
      shortDescription: "Therapeutic nasal administration for head and neck disorders",
      fullDescription: "Nasya involves the administration of medicated oils, powders, or decoctions through the nasal cavity. This therapy is specifically designed to treat disorders of the head, neck, and upper respiratory system.",
      benefits: [
        "Treats sinusitis and nasal congestion",
        "Improves mental clarity and memory",
        "Helps in headaches and migraines",
        "Treats hair fall and premature graying",
        "Enhances voice quality"
      ],
      process: [
        "Facial massage and steam therapy",
        "Preparation of nasal medicines",
        "Administration of medicated substances",
        "Post-treatment care and precautions",
        "Follow-up and maintenance"
      ],
      contraindications: [
        "Acute nasal infections",
        "Nasal polyps or tumors",
        "Recent nasal surgery",
        "Severe cold and cough",
        "Pregnancy (certain types)"
      ],
      rating: 4.6,
      testimonials: [
        {
          name: "Meera Singh",
          rating: 5,
          comment: "Amazing relief from chronic sinusitis. The treatment was gentle yet very effective."
        }
      ]
    }
  ];

  const complementaryServices = [
    {
      name: "Abhyanga (Full Body Oil Massage)",
      duration: "60-90 minutes",
      price: "₹3,000 - ₹5,000",
      description: "Traditional Ayurvedic oil massage for relaxation and rejuvenation",
      image: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=300&q=80"
    },
    {
      name: "Shirodhara (Oil Pouring Therapy)",
      duration: "45-60 minutes",
      price: "₹4,000 - ₹6,000",
      description: "Continuous pouring of medicated oil on the forehead for mental peace",
      image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=300&q=80"
    },
    {
      name: "Swedana (Steam Therapy)",
      duration: "30-45 minutes",
      price: "₹2,000 - ₹3,000",
      description: "Herbal steam therapy to open pores and eliminate toxins",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&q=80"
    },
    {
      name: "Pizhichil (Oil Bath)",
      duration: "60-90 minutes",
      price: "₹6,000 - ₹8,000",
      description: "Lukewarm medicated oil poured all over the body",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&q=80"
    }
  ];

  const packageDeals = [
    {
      name: "Complete Panchakarma Package",
      duration: "21 days",
      originalPrice: "₹80,000",
      discountedPrice: "₹65,000",
      services: ["All 5 Panchakarma procedures", "Accommodation", "Meals", "Consultation", "Follow-up care"],
      savings: "₹15,000"
    },
    {
      name: "Detox & Rejuvenation Package",
      duration: "14 days",
      originalPrice: "₹45,000",
      discountedPrice: "₹38,000",
      services: ["Virechana", "Basti", "Complementary therapies", "Diet consultation", "Yoga sessions"],
      savings: "₹7,000"
    },
    {
      name: "Stress Relief Package",
      duration: "7 days",
      originalPrice: "₹25,000",
      discountedPrice: "₹20,000",
      services: ["Shirodhara", "Abhyanga", "Nasya", "Meditation sessions", "Consultation"],
      savings: "₹5,000"
    }
  ];

  const handleServiceClick = (service) => {
    setSelectedService(service);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedService(null);
  };

  return (
    <Container maxWidth="lg">
      {/* Header Section */}
      <Box sx={{ py: 6, textAlign: 'center' }}>
        <Typography variant="h3" component="h1" gutterBottom color="primary">
          Our Ayurvedic Services
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto' }}>
          Experience authentic Panchakarma therapies and complementary treatments designed to 
          restore balance, eliminate toxins, and promote holistic wellness.
        </Typography>
      </Box>

      {/* Main Panchakarma Services */}
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom textAlign="center" sx={{ mb: 4 }}>
          Panchakarma Therapies
        </Typography>
        <Grid container spacing={4}>
          {mainServices.map((service) => (
            <Grid item xs={12} md={6} lg={3} key={service.id}>
              <Card 
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': { 
                    transform: 'translateY(-4px)',
                    boxShadow: 6
                  }
                }}
                onClick={() => handleServiceClick(service)}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={service.image}
                  alt={service.name}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom>
                    {service.name}
                  </Typography>
                  <Chip 
                    label={service.category} 
                    color="primary" 
                    size="small" 
                    sx={{ mb: 1 }}
                  />
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {service.shortDescription}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <AccessTime fontSize="small" color="action" />
                    <Typography variant="body2">{service.duration}</Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <Rating value={service.rating} precision={0.1} size="small" readOnly />
                    <Typography variant="body2">({service.rating})</Typography>
                  </Box>
                  
                  <Typography variant="h6" color="primary">
                    {service.price}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Complementary Services */}
      <Box sx={{ py: 6 }}>
        <Typography variant="h4" gutterBottom textAlign="center" sx={{ mb: 4 }}>
          Complementary Therapies
        </Typography>
        <Grid container spacing={3}>
          {complementaryServices.map((service, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{ 
                height: '100%',
                transition: 'transform 0.3s ease',
                '&:hover': { transform: 'scale(1.02)' }
              }}>
                <CardMedia
                  component="img"
                  height="150"
                  image={service.image}
                  alt={service.name}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {service.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {service.description}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2">{service.duration}</Typography>
                    <Typography variant="h6" color="primary">{service.price}</Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Package Deals */}
      <Box sx={{ py: 6 }}>
        <Typography variant="h4" gutterBottom textAlign="center" sx={{ mb: 4 }}>
          Special Packages
        </Typography>
        <Grid container spacing={4}>
          {packageDeals.map((packageDeal, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card sx={{ 
                height: '100%',
                border: '2px solid transparent',
                transition: 'border-color 0.3s ease',
                '&:hover': { borderColor: 'primary.main' }
              }}>
                <CardContent>
                  <Typography variant="h5" gutterBottom color="primary">
                    {packageDeal.name}
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    Duration: {packageDeal.duration}
                  </Typography>
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="h4" color="primary" sx={{ display: 'inline' }}>
                      {packageDeal.discountedPrice}
                    </Typography>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        textDecoration: 'line-through',
                        color: 'text.secondary',
                        ml: 1,
                        display: 'inline'
                      }}
                    >
                      {packageDeal.originalPrice}
                    </Typography>
                  </Box>
                  
                  <Chip 
                    label={`Save ${packageDeal.savings}`} 
                    color="success" 
                    sx={{ mb: 2 }}
                  />
                  
                  <Typography variant="subtitle1" gutterBottom>
                    Includes:
                  </Typography>
                  <List dense>
                    {packageDeal.services.map((service, idx) => (
                      <ListItem key={idx} sx={{ px: 0 }}>
                        <ListItemIcon sx={{ minWidth: 30 }}>
                          <CheckCircle color="success" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary={service} />
                      </ListItem>
                    ))}
                  </List>
                  
                  <Button 
                    variant="contained" 
                    fullWidth 
                    size="large" 
                    sx={{ mt: 2 }}
                  >
                    Book Package
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Service Detail Dialog */}
      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog} 
        maxWidth="md" 
        fullWidth
        scroll="paper"
      >
        {selectedService && (
          <>
            <DialogTitle sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              bgcolor: 'primary.main',
              color: 'white'
            }}>
              <Typography variant="h5">{selectedService.name}</Typography>
              <Button onClick={handleCloseDialog} color="inherit">
                <Close />
              </Button>
            </DialogTitle>
            
            <DialogContent sx={{ p: 0 }}>
              <CardMedia
                component="img"
                height="250"
                image={selectedService.image}
                alt={selectedService.name}
              />
              
              <Box sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Chip label={selectedService.category} color="primary" />
                  <Typography variant="body1">{selectedService.duration}</Typography>
                  <Typography variant="h6" color="primary">
                    {selectedService.price}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                  <Rating value={selectedService.rating} precision={0.1} readOnly />
                  <Typography variant="body2">
                    ({selectedService.rating} based on {selectedService.testimonials.length} reviews)
                  </Typography>
                </Box>
                
                <Typography variant="body1" paragraph>
                  {selectedService.fullDescription}
                </Typography>

                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography variant="h6">Benefits</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <List>
                      {selectedService.benefits.map((benefit, idx) => (
                        <ListItem key={idx}>
                          <ListItemIcon>
                            <CheckCircle color="success" />
                          </ListItemIcon>
                          <ListItemText primary={benefit} />
                        </ListItem>
                      ))}
                    </List>
                  </AccordionDetails>
                </Accordion>

                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography variant="h6">Treatment Process</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <List>
                      {selectedService.process.map((step, idx) => (
                        <ListItem key={idx}>
                          <ListItemIcon>
                            <Typography variant="h6" color="primary">
                              {idx + 1}
                            </Typography>
                          </ListItemIcon>
                          <ListItemText primary={step} />
                        </ListItem>
                      ))}
                    </List>
                  </AccordionDetails>
                </Accordion>

                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography variant="h6">Contraindications</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <List>
                      {selectedService.contraindications.map((contra, idx) => (
                        <ListItem key={idx}>
                          <ListItemIcon>
                            <Typography color="error">⚠️</Typography>
                          </ListItemIcon>
                          <ListItemText primary={contra} />
                        </ListItem>
                      ))}
                    </List>
                  </AccordionDetails>
                </Accordion>

                {/* Testimonials */}
                <Box sx={{ mt: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Patient Reviews
                  </Typography>
                  {selectedService.testimonials.map((testimonial, idx) => (
                    <Paper key={idx} elevation={1} sx={{ p: 2, mb: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <Avatar sx={{ width: 30, height: 30 }}>
                          {testimonial.name.charAt(0)}
                        </Avatar>
                        <Typography variant="subtitle2">{testimonial.name}</Typography>
                        <Rating value={testimonial.rating} size="small" readOnly />
                      </Box>
                      <Typography variant="body2">
                        "{testimonial.comment}"
                      </Typography>
                    </Paper>
                  ))}
                </Box>
              </Box>
            </DialogContent>
            
            <DialogActions sx={{ p: 3 }}>
              <Button 
                variant="contained" 
                color="primary" 
                size="large"
                fullWidth
              >
                Book This Treatment
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Container>
  );
}

export default Services;