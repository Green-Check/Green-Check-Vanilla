import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
  Button,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md')); // small and medium screens

  const navLinks = [
    { title: 'Home', path: '/' },
    { title: 'About', path: '/' },
    { title: 'Contact Us', path: '/' },
  ];

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleContactUsClick = () => {
    navigate('/contact');
    setDrawerOpen(false);
  };

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: '#065f46' /* Green */ }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" fontWeight="bold" sx={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
            Green-Check-Vanilla
          </Typography>

          {isSmallScreen ? (
            // Show hamburger menu on small/medium screens
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerToggle}
              size="large"
            >
              <MenuIcon />
            </IconButton>
          ) : (
            // Show nav links on large screens
            <Box sx={{ display: 'flex', gap: 3 }}>
              {navLinks.map(({ title, path }) => (
                <Button
                  key={title}
                  color="inherit"
                  onClick={() => navigate(path)}
                  sx={{ textTransform: 'none', fontWeight: 'bold' }}
                >
                  {title}
                </Button>
              ))}
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Drawer for small/medium screens */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: isSmallScreen ? '80%' : 320,
            padding: 2,
            backgroundColor: '#2e7d32', // darker green
            color: 'white',
          },
        }}
      >
        <Box>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Menu
          </Typography>

          <Divider sx={{ bgcolor: 'rgba(255,255,255,0.3)', mb: 2 }} />

          <List>
            {navLinks.map(({ title, path }) => (
              <ListItem
                button
                key={title}
                onClick={() => {
                  navigate(path);
                  setDrawerOpen(false);
                }}
              >
                <ListItemText primary={title} />
              </ListItem>
            ))}
          </List>

          <Divider sx={{ bgcolor: 'rgba(255,255,255,0.3)', mt: 3, mb: 2 }} />

          <Button
            fullWidth
            variant="outlined"
            color="inherit"
            onClick={handleContactUsClick}
            sx={{
              textTransform: 'none',
              fontWeight: 'bold',
              borderColor: 'white',
              '&:hover': {
                backgroundColor: 'white',
                color: '#2e7d32',
              },
            }}
          >
            Contact Us
          </Button>

          <IconButton
            onClick={() => setDrawerOpen(false)}
            sx={{
              position: 'absolute',
              bottom: 16,
              left: 16,
              backgroundColor: 'rgba(0,0,0,0.3)',
              color: 'white',
              '&:hover': {
                backgroundColor: 'rgba(0,0,0,0.5)',
              },
              borderRadius: '50%',
              boxShadow: '0 2px 5px rgba(0,0,0,0.5)',
            }}
            aria-label="close drawer"
          >
            <ArrowForwardIcon />
          </IconButton>
        </Box>
      </Drawer>
    </>
  );
}
