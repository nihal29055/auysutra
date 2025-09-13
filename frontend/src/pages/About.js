import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';
import {
  ExpandMore,
  CheckCircle,
  School,
  LocalHospital,
  Spa,
  Timeline,
  Security,
  Support
} from '@mui/icons-material';

function About() {
  const teamMembers = [
    {
      name: "Dr. Priya Sharma",
      role: "Chief Ayurveda Practitioner",
      experience: "15+ years",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&q=80",
      specialization: "Panchakarma & Chronic Disease Management"
    },
    {
      name: "Dr. Rajesh Kumar",
      role: "Senior Ayurveda Consultant", 
      experience: "12+ years",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&q=80",
      specialization: "Neurological Disorders & Pain Management"
    },
    {
      name: "Anita Verma",
      role: "Therapy Coordinator",
      experience: "8+ years",
      image: "https://images.unsplash.com/photo-1594824721512-ee2da38f8c8e?w=300&q=80",
      specialization: "Patient Care & Therapy Scheduling"
    }
  ];

  const principles = [
    {
      title: "Traditional Wisdom",
      description: "Based on 5000+ years of Ayurvedic knowledge and practice",
      icon: <School color="primary" />
    },
    {
      title: "Modern Technology",
      description: "Enhanced with cutting-edge digital health management",
      icon: <LocalHospital color="primary" />
    },
    {
      title: "Holistic Approach",
      description: "Treating the root cause, not just symptoms",
      icon: <Spa color="primary" />
    },
    {
      title: "Personalized Care",
      description: "Customized treatment plans for individual constitutions",
      icon: <Timeline color="primary" />
    }
  ];

  const faqs = [
    {
      question: "What is Panchakarma therapy?",
      answer: "Panchakarma is a comprehensive Ayurvedic detoxification and rejuvenation therapy consisting of five main procedures: Vamana (therapeutic vomiting), Virechana (purgation), Basti (medicated enemas), Nasya (nasal administration), and Raktamokshana (bloodletting). These therapies help eliminate toxins, restore balance, and promote optimal health."
    },
    {
      question: "How long does a typical Panchakarma treatment take?",
      answer: "A complete Panchakarma treatment typically ranges from 7 to 21 days, depending on individual health conditions and treatment goals. The duration includes preparation phase, main treatment procedures, and recovery phase. Our practitioners will create a personalized timeline based on your specific needs."
    },
    {
      question: "Is Panchakarma safe for everyone?",
      answer: "While Panchakarma is generally safe when administered by qualified practitioners, it's not suitable for everyone. Pregnant women, children under 7, elderly above 70 (depending on health), and people with certain medical conditions may need modified approaches or alternative treatments. A thorough consultation is conducted before starting any therapy."
    },
    {
      question: "What should I expect during the treatment?",
      answer: "Treatment involves several phases: consultation and assessment, preparation with diet and lifestyle modifications, main therapy procedures, and post-treatment care. You'll experience various therapeutic procedures, dietary restrictions, and lifestyle guidelines. Our team provides continuous support and monitoring throughout the process."
    },
    {
      question: "How do I prepare for Panchakarma?",
      answer: "Preparation typically begins 3-7 days before treatment with dietary modifications, herbal medicines, and lifestyle adjustments. Avoid heavy foods, alcohol, and strenuous activities. Follow the specific pre-treatment guidelines provided by your practitioner. Mental preparation and understanding of the process are equally important."
    }
  ];

  const benefits = [
    "Complete detoxification and cleansing",
    "Enhanced immunity and vitality",
    "Stress reduction and mental clarity",
    "Improved digestive function",
    "Better sleep quality",
    "Weight management",
    "Skin health and complexion",
    "Joint mobility and pain relief"
  ];

  return (
    <Container maxWidth="lg">
      {/* Header Section */}
      <Box sx={{ py: 6, textAlign: 'center' }}>
        <Typography variant="h3" component="h1" gutterBottom color="primary">
          About AyurSutra
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto' }}>
          Bridging ancient Ayurvedic wisdom with modern healthcare management 
          for comprehensive wellness solutions
        </Typography>
      </Box>

      {/* Mission & Vision Section */}
      <Box sx={{ py: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 4, height: '100%' }}>
              <Typography variant="h5" gutterBottom color="primary">
                Our Mission
              </Typography>
              <Typography variant="body1">
                To make authentic Ayurvedic Panchakarma therapy accessible, manageable, and effective 
                through innovative digital health solutions while preserving traditional healing wisdom 
                for modern wellness needs.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 4, height: '100%' }}>
              <Typography variant="h5" gutterBottom color="primary">
                Our Vision
              </Typography>
              <Typography variant="body1">
                To become the leading platform for Ayurvedic therapy management globally, 
                empowering practitioners and patients with technology-driven solutions that 
                honor traditional practices while ensuring optimal health outcomes.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {/* Core Principles */}
      <Box sx={{ py: 6 }}>
        <Typography variant="h4" component="h2" gutterBottom textAlign="center" sx={{ mb: 4 }}>
          Our Core Principles
        </Typography>
        <Grid container spacing={3}>
          {principles.map((principle, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{ 
                height: '100%', 
                textAlign: 'center', 
                p: 2,
                transition: 'transform 0.3s ease',
                '&:hover': { transform: 'translateY(-4px)' }
              }}>
                <CardContent>
                  <Box sx={{ mb: 2 }}>
                    {principle.icon}
                  </Box>
                  <Typography variant="h6" gutterBottom>
                    {principle.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {principle.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Team Section */}
      <Box sx={{ py: 6 }}>
        <Typography variant="h4" component="h2" gutterBottom textAlign="center" sx={{ mb: 4 }}>
          Meet Our Expert Team
        </Typography>
        <Grid container spacing={4}>
          {teamMembers.map((member, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card sx={{ 
                height: '100%',
                transition: 'transform 0.3s ease',
                '&:hover': { transform: 'translateY(-4px)' }
              }}>
                <CardMedia
                  component="img"
                  height="250"
                  image={member.image}
                  alt={member.name}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {member.name}
                  </Typography>
                  <Typography variant="subtitle2" color="primary" gutterBottom>
                    {member.role}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Experience: {member.experience}
                  </Typography>
                  <Typography variant="body2">
                    {member.specialization}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Benefits Section */}
      <Box sx={{ py: 6 }}>
        <Paper elevation={2} sx={{ p: 4 }}>
          <Typography variant="h4" component="h2" gutterBottom textAlign="center">
            Benefits of Panchakarma
          </Typography>
          <Grid container spacing={2}>
            {benefits.map((benefit, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <ListItem sx={{ px: 0 }}>
                  <ListItemIcon>
                    <CheckCircle color="success" />
                  </ListItemIcon>
                  <ListItemText primary={benefit} />
                </ListItem>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Box>

      {/* FAQ Section */}
      <Box sx={{ py: 6 }}>
        <Typography variant="h4" component="h2" gutterBottom textAlign="center" sx={{ mb: 4 }}>
          Frequently Asked Questions
        </Typography>
        {faqs.map((faq, index) => (
          <Accordion key={index} sx={{ mb: 1 }}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography variant="h6">{faq.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1">{faq.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>

      {/* Why Choose Us */}
      <Box sx={{ py: 6 }}>
        <Paper elevation={2} sx={{ p: 4, backgroundColor: 'primary.main', color: 'white' }}>
          <Typography variant="h4" component="h2" gutterBottom textAlign="center">
            Why Choose AyurSutra?
          </Typography>
          <Grid container spacing={3} sx={{ mt: 2 }}>
            <Grid item xs={12} md={4} textAlign="center">
              <Security sx={{ fontSize: 40, mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Certified Practitioners
              </Typography>
              <Typography variant="body2">
                All our practitioners are certified and experienced in traditional Ayurvedic methods
              </Typography>
            </Grid>
            <Grid item xs={12} md={4} textAlign="center">
              <LocalHospital sx={{ fontSize: 40, mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Modern Facilities
              </Typography>
              <Typography variant="body2">
                State-of-the-art facilities combined with traditional therapy environments
              </Typography>
            </Grid>
            <Grid item xs={12} md={4} textAlign="center">
              <Support sx={{ fontSize: 40, mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                24/7 Support
              </Typography>
              <Typography variant="body2">
                Continuous support and monitoring throughout your therapy journey
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
}

export default About;