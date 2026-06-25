import * as React from 'react';
import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Link, useLocation } from 'react-router-dom';
import CartIcon from './cartWidget';
import { NAV_ITEMS } from '../../services/dummyJsonProducts';
import styles from './NavBar.module.css';

export default function NavBar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  const closeDrawer = () => {
    setMobileOpen(false);
  };

  const drawer = (
    <Box className={styles.drawerContent} onClick={closeDrawer}>
      <Box className={styles.drawerHeader}>
        <Typography variant="h6" className={styles.drawerTitle}>
          Cop´r Drop
        </Typography>
        <IconButton onClick={closeDrawer} aria-label="Cerrar menú" sx={{ color: '#ffffff' }}>
          <CloseIcon />
        </IconButton>
      </Box>
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/" selected={location.pathname === '/'}>
            <ListItemText primary="Inicio" />
          </ListItemButton>
        </ListItem>
        {NAV_ITEMS.map(({ label, path }) => (
          <ListItem key={path} disablePadding>
            <ListItemButton
              component={Link}
              to={path}
              selected={location.pathname === path}
            >
              <ListItemText primary={label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
        <Toolbar sx={{ minHeight: { xs: 56, sm: 64 }, px: { xs: 2, sm: 3 } }}>
          <IconButton
            color="inherit"
            aria-label="Abrir menú"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 1, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/" className={styles.brandLink}>Cop´r Drop</Link>
          </Typography>
          <nav className={styles.navLinks}>
            {NAV_ITEMS.map(({ label, path }) => (
              <Link
                key={path}
                to={path}
                className={styles.navLink}
                style={{ color: location.pathname === path ? '#ffffff' : undefined }}
              >
                {label}
              </Link>
            ))}
          </nav>
          <CartIcon />
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={closeDrawer}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            width: 280,
            backgroundColor: '#0a0a0a',
            borderRight: '1px solid #2a2a2a',
            color: '#ffffff',
          },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
}
