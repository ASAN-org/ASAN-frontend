import React from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  Link, 
  Typography, 
  Divider,
  IconButton,
  useTheme,
  useMediaQuery,
  Stack,
  Button
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import HelpIcon from '@mui/icons-material/Help';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
interface SocialMediaColors {
    facebook: string;
    twitter: string;
    instagram: string;
    linkedin: string;
  }
const Footer: React.FC = () => {

    const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Social media colors 
  const socialMediaColors: SocialMediaColors = {
    facebook: '#1877F2',
    twitter: '#1DA1F2',
    instagram: '#E4405F',
    linkedin: '#0A66C2'
  };

  return (
    <Box
      component="footer"
      sx={{
        color: theme.palette.text.secondary,
        py: 6,
        borderTop: `1px solid ${theme.palette.divider}`,
        backgroundColor: 'rgba(249,249,255,1)',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Branding and navigation */}
          <Grid >
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" color="text.primary" gutterBottom>
                Your Brand
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, maxWidth: 400 }}>
                A simple, clean solution for your needs. Get started today!
              </Typography>
            </Box>
            
            <Stack direction={isMobile ? 'column' : 'row'} spacing={2}>
              <Button 
                variant="outlined" 
                startIcon={<HomeIcon />}
                component={Link}
                href="/"
                sx={{ textTransform: 'none' }}
              >
                Home
              </Button>
              <Button 
                variant="outlined" 
                startIcon={<InfoIcon />}
                component={Link}
                href="/about-us"
                sx={{ textTransform: 'none' }}
              >
                About Us
              </Button>
              <Button 
                variant="outlined" 
                startIcon={<HelpIcon />}
                component={Link}
                href="/faq"
                sx={{ textTransform: 'none' }}
              >
                FAQ
              </Button>
            </Stack>
          </Grid>

          {/* Contact information with social media */}
          <Grid >
            <Box sx={{ 
              borderLeft: isMobile ? 'none' : `1px solid ${theme.palette.divider}`,
              pl: isMobile ? 0 : 4,
              height: '100%'
            }}>
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" color="text.primary" gutterBottom>
                  Contact Us
                </Typography>
                <Stack spacing={2} sx={{ mb: 3 }}>
                  <Typography variant="body1">
                    <Link href="mailto:contact@yourbrand.com" color="inherit" underline="hover">
                      <EmailIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                      contact@yourbrand.com
                    </Link>
                  </Typography>
                </Stack>

                {/* Social Media Section */}
                <Box>
                <Stack direction="row" spacing={1}>
                    <IconButton 
                      aria-label="Facebook" 
                      href="https://facebook.com" 
                      target="_blank"
                      sx={{ color: socialMediaColors.facebook }}
                    >
                      <FacebookIcon />
                    </IconButton>
                    <IconButton 
                      aria-label="Twitter" 
                      href="https://twitter.com" 
                      target="_blank"
                      sx={{ color: socialMediaColors.twitter }}
                    >
                      <TwitterIcon />
                    </IconButton>
                    <IconButton 
                      aria-label="Instagram" 
                      href="https://instagram.com" 
                      target="_blank"
                      sx={{ color: socialMediaColors.instagram }}
                    >
                      <InstagramIcon />
                    </IconButton>
                    <IconButton 
                      aria-label="LinkedIn" 
                      href="https://linkedin.com" 
                      target="_blank"
                      sx={{ color: socialMediaColors.linkedin }}
                    >
                      <LinkedInIcon />
                    </IconButton>
                  </Stack>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />
        <Box sx={{ 
          display: 'flex', 
          flexDirection: isMobile ? 'column' : 'row', 
          justifyContent: 'space-between',
          alignItems: isMobile ? 'flex-start' : 'center',
          gap: isMobile ? 2 : 0
        }}>
          <Typography variant="body2">
            © {new Date().getFullYear()} Your Brand. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;