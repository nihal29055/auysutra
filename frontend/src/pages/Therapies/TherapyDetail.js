import React, { useState, useEffect } from 'react';
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
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Rating,
  Avatar,
  Divider,
  Alert,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import {
  ExpandMore,
  CheckCircle,
  AccessTime,
  LocalHospital,
  Warning,
  Schedule,
  Person,
  Star,
  ArrowBack,
  BookOnline,
  Phone,
  Email,
  Spa
} from '@mui/icons-material';
import { useParams, useNavigate, Link as RouterLink } from 'react-router-dom';

function TherapyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [therapy, setTherapy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingDialog, setBookingDialog] = useState(false);
  const [bookingData, setBookingData] = useState({
    name: '',
    email: '',
    phone: '',
    preferredDate: '',
    preferredTime: '',
    notes: ''
  });

  // Mock therapy data - In real app, this would come from API
  const therapyData = {
    1: {
      id: 1,
      name: "Vamana (Therapeutic Vomiting)",
      category: "Panchakarma",
      duration: "3-5 days",
      price: "₹15,000 - ₹25,000",
      image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80",
      shortDescription: "Eliminates excess Kapha dosha through controlled therapeutic vomiting",
      fullDescription: "Vamana is one of the five main Panchakarma procedures designed to eliminate excess Kapha dosha from the upper part of the body. This therapy involves controlled therapeutic vomiting induced by herbal medicines after proper preparation of the patient. It is particularly effective for respiratory disorders, skin conditions, and digestive issues caused by excess Kapha.",
      benefits: [
        "Treats respiratory disorders like asthma and bronchitis",
        "Eliminates excess mucus and toxins from the body",
        "Improves digestive fire (Agni) and metabolism",
        "Helps in skin disorders and allergies",
        "Enhances mental clarity and cognitive function",
        "Strengthens immunity and overall vitality",
        "Balances Kapha dosha effectively"
      ],
      process: [
        {
          phase: "Pre-treatment Preparation (Poorva Karma)",
          duration: "3-7 days",
          description: "Patient assessment, dietary modifications, and initial preparation with herbal medicines"
        },
        {
          phase: "Oleation Therapy (Snehana)",
          duration: "3-5 days",
          description: "Administration of medicated ghee internally to prepare the body"
        },
        {
          phase: "Steam Therapy (Swedana)",
          duration: "1-2 days",
          description: "Herbal steam therapy and oil massage to open body channels"
        },
        {
          phase: "Main Treatment (Pradhana Karma)",
          duration: "1 day",
          description: "Administration of herbal emetics to induce therapeutic vomiting"
        },
        {
          phase: "Post-treatment Care (Paschat Karma)",
          duration: "7-14 days",
          description: "Recovery phase with special diet, rest, and gradual return to normal activities"
        }
      ],
      contraindications: [
        "Pregnancy and menstruation",
        "Severe heart conditions and hypertension",
        "Acute infections and fever",
        "Children below 12 years and elderly above 70",
        "Extreme weakness or debility",
        "Recent surgery or major illness",
        "Severe mental disorders"
      ],
      beforeAfterCare: {
        before: [
          "Follow prescribed diet for 3-7 days before treatment",
          "Avoid heavy, oily, and cold foods",
          "Take prescribed herbal medicines regularly",
          "Get adequate rest and avoid stress",
          "Inform about any medications or health conditions"
        ],
        after: [
          "Follow strict dietary guidelines for recovery",
          "Take complete rest for 2-3 days",
          "Avoid exposure to cold and wind",
          "Take prescribed post-treatment medicines",
          "Attend follow-up consultations",
          "Gradually return to normal activities"
        ]
      },
      rating: 4.7,
      totalReviews: 127,
      testimonials: [
        {
          name: "Priya Sharma",
          age: 34,
          condition: "Chronic Asthma",
          rating: 5,
          date: "2024-08-15",
          comment: "Remarkable improvement in my chronic respiratory issues. The doctors were very professional and caring. After years of struggling with asthma, this treatment has given me a new lease on life.",
          verified: true
        },
        {
          name: "Rahul Kumar",
          age: 28,
          condition: "Allergic Rhinitis",
          rating: 4,
          date: "2024-07-22",
          comment: "Effective treatment for my allergies. The preparation phase was crucial for the success. Though challenging, the results were worth it.",
          verified: true
        },
        {
          name: "Sunita Devi",
          age: 45,
          condition: "Chronic Sinusitis",
          rating: 5,
          date: "2024-06-10",
          comment: "Life-changing experience. My chronic sinusitis is completely cured. The entire team was supportive throughout the treatment process.",
          verified: true
        }
      ],
      practitioner: {
        name: "Dr. Priya Sharma",
        qualification: "BAMS, MD (Panchakarma)",
        experience: "15+ years",
        specialization: "Panchakarma & Chronic Disease Management",
        image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&q=80"
      },
      availability: [
        { day: "Monday", slots: ["9:00 AM", "11:00 AM", "2:00 PM", "4:00 PM"] },
        { day: "Tuesday", slots: ["9:00 AM", "11:00 AM", "2:00 PM"] },
        { day: "Wednesday", slots: ["9:00 AM", "2:00 PM", "4:00 PM"] },
        { day: "Thursday", slots: ["9:00 AM", "11:00 AM", "2:00 PM", "4:00 PM"] },
        { day: "Friday", slots: ["9:00 AM", "11:00 AM", "2:00 PM"] },
        { day: "Saturday", slots: ["9:00 AM", "11:00 AM"] }
      ],
      relatedTherapies: [2, 3, 4]
    },
    2: {
      id: 2,
      name: "Virechana (Purgation Therapy)",
      category: "Panchakarma",
      duration: "5-7 days",
      price: "₹18,000 - ₹28,000",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
      shortDescription: "Cleanses the body by eliminating excess Pitta dosha through controlled purgation",
      // Add similar detailed structure for other therapies...
      rating: 4.8,
      totalReviews: 98
    },
    3: {
      id: 3,
      name: "Basti (Medicated Enema)",
      category: "Panchakarma",
      duration: "8-16 days",
      price: "₹25,000 - ₹40,000",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80",
      shortDescription: "Highly effective therapy for Vata disorders using medicated enemas",
      rating: 4.9,
      totalReviews: 156
    },
    4: {
      id: 4,
      name: "Nasya (Nasal Administration)",
      category: "Panchakarma",
      duration: "7-14 days",
      price: "₹12,000 - ₹20,000",
      image: "https://images.unsplash.com/photo-1573883430746-d02e6ac8dea3?w=800&q=80",
      shortDescription: "Therapeutic nasal administration for head and neck disorders",
      rating: 4.6,
      totalReviews: 89
    }
  };

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const therapyInfo = therapyData[id];
      if (therapyInfo) {
        setTherapy(therapyInfo);
      }
      setLoading(false);
    }, 1000);
  }, [id]);

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    // Handle booking submission
    console.log('Booking submitted:', bookingData);
    alert('Booking request submitted successfully! We will contact you soon.');
    setBookingDialog(false);
    setBookingData({
      name: '',
      email: '',
      phone: '',
      preferredDate: '',
      preferredTime: '',
      notes: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (loading) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
          <CircularProgress size={60} />
        </Box>
      </Container>
    );
  }

  if (!therapy) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h4" gutterBottom color="error">
            Therapy Not Found
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            The therapy you are looking for does not exist or has been removed.
          </Typography>
          <Button
            variant="contained"
            startIcon={<ArrowBack />}
            onClick={() => navigate('/therapies')}
          >
            Back to Therapies
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      {/* Back Navigation */}
      <Box sx={{ py: 2 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate('/therapies')}
          sx={{ mb: 2 }}
        >
          Back to Therapies
        </Button>
      </Box>

      <Grid container spacing={4}>
        {/* Main Content */}
        <Grid item xs={12} md={8}>
          {/* Hero Section */}
          <Card sx={{ mb: 4 }}>
            <CardMedia
              component="img"
              height="400"
              image={therapy.image}
              alt={therapy.name}
            />
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Chip label={therapy.category} color="primary" />
                <Typography variant="body2" color="text.secondary">
                  <AccessTime sx={{ fontSize: 16, mr: 0.5 }} />
                  {therapy.duration}
                </Typography>
              </Box>
              
              <Typography variant="h3" component="h1" gutterBottom>
                {therapy.name}
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Rating value={therapy.rating} precision={0.1} readOnly />
                <Typography variant="body2" color="text.secondary">
                  ({therapy.rating}) • {therapy.totalReviews} reviews
                </Typography>
              </Box>
              
              <Typography variant="h5" color="primary" gutterBottom>
                {therapy.price}
              </Typography>
              
              <Typography variant="body1" paragraph>
                {therapy.fullDescription}
              </Typography>
            </CardContent>
          </Card>

          {/* Benefits Section */}
          <Accordion defaultExpanded sx={{ mb: 2 }}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography variant="h6">Benefits & Therapeutic Effects</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List>
                {therapy.benefits?.map((benefit, idx) => (
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

          {/* Treatment Process */}
          <Accordion sx={{ mb: 2 }}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography variant="h6">Treatment Process</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {therapy.process?.map((step, idx) => (
                <Paper key={idx} elevation={1} sx={{ p: 2, mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                    <Typography variant="h6" color="primary">
                      {idx + 1}
                    </Typography>
                    <Box>
                      <Typography variant="h6" gutterBottom>
                        {step.phase}
                      </Typography>
                      <Chip label={step.duration} size="small" sx={{ mb: 1 }} />
                      <Typography variant="body2">
                        {step.description}
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              ))}
            </AccordionDetails>
          </Accordion>

          {/* Before & After Care */}
          <Accordion sx={{ mb: 2 }}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography variant="h6">Before & After Care</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom color="primary">
                    Before Treatment
                  </Typography>
                  <List>
                    {therapy.beforeAfterCare?.before.map((item, idx) => (
                      <ListItem key={idx} sx={{ px: 0 }}>
                        <ListItemIcon sx={{ minWidth: 30 }}>
                          <CheckCircle color="info" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary={item} />
                      </ListItem>
                    ))}
                  </List>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom color="primary">
                    After Treatment
                  </Typography>
                  <List>
                    {therapy.beforeAfterCare?.after.map((item, idx) => (
                      <ListItem key={idx} sx={{ px: 0 }}>
                        <ListItemIcon sx={{ minWidth: 30 }}>
                          <CheckCircle color="success" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary={item} />
                      </ListItem>
                    ))}
                  </List>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>

          {/* Contraindications */}
          <Accordion sx={{ mb: 2 }}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography variant="h6">Contraindications & Precautions</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Alert severity="warning" sx={{ mb: 2 }}>
                Please consult with our practitioners before booking this treatment.
              </Alert>
              <List>
                {therapy.contraindications?.map((contra, idx) => (
                  <ListItem key={idx}>
                    <ListItemIcon>
                      <Warning color="error" />
                    </ListItemIcon>
                    <ListItemText primary={contra} />
                  </ListItem>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>

          {/* Patient Reviews */}
          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" gutterBottom>
              Patient Reviews
            </Typography>
            {therapy.testimonials?.map((testimonial, idx) => (
              <Paper key={idx} elevation={1} sx={{ p: 3, mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <Avatar sx={{ bgcolor: 'primary.main' }}>
                    {testimonial.name.charAt(0)}
                  </Avatar>
                  <Box sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {testimonial.name}
                      </Typography>
                      {testimonial.verified && (
                        <Chip label="Verified" color="success" size="small" />
                      )}
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <Rating value={testimonial.rating} size="small" readOnly />
                      <Typography variant="body2" color="text.secondary">
                        • {testimonial.condition} • Age {testimonial.age}
                      </Typography>
                    </Box>
                    <Typography variant="body1" paragraph>
                      "{testimonial.comment}"
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {new Date(testimonial.date).toLocaleDateString()}
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            ))}
          </Box>
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} md={4}>
          {/* Booking Card */}
          <Paper elevation={3} sx={{ p: 3, mb: 3, position: 'sticky', top: 20 }}>
            <Typography variant="h6" gutterBottom>
              Book This Treatment
            </Typography>
            <Typography variant="h4" color="primary" gutterBottom>
              {therapy.price}
            </Typography>
            
            <Button
              variant="contained"
              fullWidth
              size="large"
              startIcon={<BookOnline />}
              onClick={() => setBookingDialog(true)}
              sx={{ mb: 2 }}
            >
              Book Appointment
            </Button>
            
            <Button
              variant="outlined"
              fullWidth
              startIcon={<Phone />}
              href="tel:+911112345678"
            >
              Call Now
            </Button>
          </Paper>

          {/* Practitioner Info */}
          <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Lead Practitioner
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Avatar
                src={therapy.practitioner?.image}
                sx={{ width: 60, height: 60 }}
              />
              <Box>
                <Typography variant="h6">
                  {therapy.practitioner?.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {therapy.practitioner?.qualification}
                </Typography>
                <Typography variant="body2" color="primary">
                  {therapy.practitioner?.experience}
                </Typography>
              </Box>
            </Box>
            <Typography variant="body2">
              {therapy.practitioner?.specialization}
            </Typography>
          </Paper>

          {/* Quick Contact */}
          <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Quick Contact
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Button startIcon={<Phone />} variant="text" href="tel:+911112345678">
                +91 111 234 5678
              </Button>
              <Button startIcon={<Email />} variant="text" href="mailto:info@ayursutra.com">
                info@ayursutra.com
              </Button>
            </Box>
          </Paper>

          {/* Related Therapies */}
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Related Therapies
            </Typography>
            {therapy.relatedTherapies?.map(relatedId => {
              const relatedTherapy = therapyData[relatedId];
              return relatedTherapy ? (
                <Card
                  key={relatedId}
                  component={RouterLink}
                  to={`/therapies/${relatedId}`}
                  sx={{
                    mb: 1,
                    textDecoration: 'none',
                    '&:hover': { boxShadow: 2 }
                  }}
                >
                  <CardContent sx={{ p: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      {relatedTherapy.name}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Rating value={relatedTherapy.rating} size="small" readOnly />
                      <Typography variant="caption">
                        ({relatedTherapy.totalReviews})
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              ) : null;
            })}
          </Paper>
        </Grid>
      </Grid>

      {/* Booking Dialog */}
      <Dialog open={bookingDialog} onClose={() => setBookingDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          Book Appointment for {therapy.name}
        </DialogTitle>
        <form onSubmit={handleBookingSubmit}>
          <DialogContent>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Full Name"
                  name="name"
                  value={bookingData.name}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={bookingData.email}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phone"
                  value={bookingData.phone}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Preferred Date"
                  name="preferredDate"
                  type="date"
                  value={bookingData.preferredDate}
                  onChange={handleInputChange}
                  InputLabelProps={{ shrink: true }}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Preferred Time</InputLabel>
                  <Select
                    name="preferredTime"
                    value={bookingData.preferredTime}
                    onChange={handleInputChange}
                    label="Preferred Time"
                    required
                  >
                    <MenuItem value="9:00 AM">9:00 AM</MenuItem>
                    <MenuItem value="11:00 AM">11:00 AM</MenuItem>
                    <MenuItem value="2:00 PM">2:00 PM</MenuItem>
                    <MenuItem value="4:00 PM">4:00 PM</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Additional Notes"
                  name="notes"
                  value={bookingData.notes}
                  onChange={handleInputChange}
                  multiline
                  rows={3}
                  placeholder="Please mention any specific concerns or requirements..."
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button onClick={() => setBookingDialog(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" size="large">
              Submit Booking Request
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Container>
  );
}

export default TherapyDetail;
