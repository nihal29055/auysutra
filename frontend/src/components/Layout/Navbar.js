import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Badge,
  Box,
  Container
} from '@mui/material';
import {
  AccountCircle,
  Notifications,
  LocalHospital
} from '@mui/icons-material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

function Navbar() {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationAnchor, setNotificationAnchor] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNotifications = (event) => {
    setNotificationAnchor(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setNotificationAnchor(null);
  };

  const handleLogout = () => {
    logout();
    handleClose();
    navigate('/');
  };

  const handleProfile = () => {
    navigate('/profile');
    handleClose();
  };

  return (
    <AppBar position="sticky">
      <Container maxWidth="lg">
        <Toolbar>
          {/* Logo and Title */}
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <LocalHospital sx={{ mr: 1, fontSize: 28 }} />
            <Typography
              variant="h6"
              component={RouterLink}
              to="/"
              sx={{
                textDecoration: 'none',
                color: 'inherit',
                fontWeight: 'bold',
                fontSize: '1.5rem'
              }}
            >
              AyurSutra
            </Typography>
          </Box>

          {/* Navigation Links */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button 
              color="inherit" 
              component={RouterLink} 
              to="/therapies"
            >
              Therapies
            </Button>
            
            {isAuthenticated && (
              <>
                <Button 
                  color="inherit" 
                  component={RouterLink} 
                  to="/appointments"
                >
                  Appointments
                </Button>
                <Button 
                  color="inherit" 
                  component={RouterLink} 
                  to="/dashboard"
                >
                  Dashboard
                </Button>
                
                {/* Notifications */}
                <IconButton color="inherit" onClick={handleNotifications}>
                  <Badge badgeContent={0} color="error">
                    <Notifications />
                  </Badge>
                </IconButton>

                {/* User Menu */}
                <IconButton color="inherit" onClick={handleMenu}>
                  <AccountCircle />
                </IconButton>
                <Typography variant="body2" sx={{ ml: 1 }}>
                  {user?.name}
                </Typography>
              </>
            )}

            {!isAuthenticated && (
              <>
                <Button color="inherit" component={RouterLink} to="/login">
                  Login
                </Button>
                <Button 
                  variant="outlined" 
                  color="inherit" 
                  component={RouterLink} 
                  to="/register"
                >
                  Register
                </Button>
              </>
            )}
          </Box>

          {/* Notification Menu */}
          <Menu
            anchorEl={notificationAnchor}
            open={Boolean(notificationAnchor)}
            onClose={handleNotificationClose}
          >
            <MenuItem onClick={handleNotificationClose}>
              No new notifications
            </MenuItem>
          </Menu>

          {/* User Menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleProfile}>
              Profile
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
