import React, { useState } from 'react';
import { 
  Container, Typography, Box, Card, CardContent, 
  Avatar, Grid, Divider, Button, Dialog, DialogTitle, 
  DialogContent, DialogActions, TextField 
} from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import EditIcon from '@mui/icons-material/Edit';

function Profile() {
  const { user } = useAuth();

  // State for dialog
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
    avatar: user?.avatar || ""
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // 🔹 Here you can integrate API call to update user details in backend
    console.log("Updated Profile:", formData);
    handleClose();
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 6 }}>
        <Typography variant="h4" gutterBottom align="center">
          My Profile
        </Typography>

        <Card sx={{ p: 3, boxShadow: 4, borderRadius: 3 }}>
          <Grid container spacing={3} alignItems="center">
            {/* Profile Picture */}
            <Grid item xs={12} sm={4} display="flex" justifyContent="center">
              <Avatar
                alt={formData.name || "User"}
                src={formData.avatar || ""}
                sx={{ width: 120, height: 120, bgcolor: "primary.main", fontSize: 40 }}
              >
                {formData.name?.charAt(0).toUpperCase() || "U"}
              </Avatar>
            </Grid>

            {/* User Info */}
            <Grid item xs={12} sm={8}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  {formData.name || "User Name"}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  📧 {formData.email || "user@example.com"}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  📱 {formData.phone || "+91-9876543210"}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  🏠 {formData.address || "Jabalpur, India"}
                </Typography>

                <Box sx={{ mt: 2 }}>
                  <Button 
                    variant="outlined" 
                    startIcon={<EditIcon />} 
                    color="primary"
                    onClick={handleOpen}
                  >
                    Edit Profile
                  </Button>
                </Box>
              </CardContent>
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          {/* Therapy Stats */}
          <Grid container spacing={3} textAlign="center">
            <Grid item xs={12} sm={4}>
              <Typography variant="h6" color="primary">
                {user?.appointments?.length || 0}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Appointments
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="h6" color="primary">
                {user?.therapies?.length || 0}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Active Therapies
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="h6" color="primary">
                {user?.notifications?.length || 0}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Notifications
              </Typography>
            </Grid>
          </Grid>
        </Card>
      </Box>

      {/* Edit Profile Dialog */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent dividers>
          <TextField
            margin="dense"
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            fullWidth
          />
          <TextField
            margin="dense"
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Avatar URL"
            name="avatar"
            value={formData.avatar}
            onChange={handleChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">Cancel</Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default Profile;
