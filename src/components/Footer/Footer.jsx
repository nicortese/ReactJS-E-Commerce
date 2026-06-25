import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';


export default function Footer() {

    const handleClick = (url) => {
        window.open(url , "_blank");
     }

  const sectionTitleSx = {
    borderBottom: '1px solid #2a2a2a',
    pb: 1,
    mb: 2,
    fontSize: '0.8rem',
    fontWeight: 700,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: '#ffffff',
  };


  return (
    <footer>
      <Box
        px={{ xs: 3, sm: 6 }}
        py={{ xs: 5, sm: 8 }}
        sx={{
          backgroundColor: '#000000',
          borderTop: '1px solid #2a2a2a',
          color: '#a3a3a3',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={5}>
            <Grid item xs={12} sm={8}>
              <Typography sx={sectionTitleSx}>Cop´r Drop</Typography>
              <Typography sx={{ fontSize: '0.875rem', lineHeight: 1.7, maxWidth: 480 }}>
                E-commerce de streetwear desarrollado con React. Catálogo desde DummyJSON,
                carrito con Context API y órdenes persistidas en Firebase Firestore.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography sx={sectionTitleSx}>Seguinos</Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <IconButton
                  aria-label="GitHub"
                  onClick={() => handleClick("https://github.com/nicortese/ReactJS-E-Commerce")}
                  sx={{ color: '#737373', '&:hover': { color: '#ffffff' } }}
                >
                  <GitHubIcon />
                </IconButton>
                <IconButton
                  aria-label="Instagram"
                  onClick={() => handleClick("https://www.instagram.com/")}
                  sx={{ color: '#737373', '&:hover': { color: '#ffffff' } }}
                >
                  <InstagramIcon />
                </IconButton>
              </Box>
            </Grid>
          </Grid>
          <Box textAlign="center" pt={{ xs: 5, sm: 8 }}>
            <Typography sx={{ fontSize: '0.8rem', color: '#404040', letterSpacing: '0.06em' }}>
              Cop´r Drop &reg; {new Date().getFullYear()}
            </Typography>
          </Box>
        </Container>
      </Box>
    </footer>
  );
}
