import React from "react";
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
  Button,
  Chip,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import HelpIcon from "@mui/icons-material/Help";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TelegramIcon from "@mui/icons-material/Telegram";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

interface WebShopData {
  title: string;
  footer: {
    faq_enabled: boolean;
    shop_info: {
      address: string;
      email: string;
      phone: string;
      working_hours: string;
    };
    social_media: {
      instagram: string;
      linkedin: string;
      telegram: string;
    };
  };
  about_us: {
    content: string;
    title: string;
  };
  faq: Array<{
    question: string;
    answer: string;
    order: number;
  }>;
}

interface FooterProps {
  webshopData: WebShopData;
}

const Footer: React.FC<FooterProps> = ({ webshopData }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Social media colors
  const socialMediaColors = {
    instagram: "#E4405F",
    linkedin: "#0A66C2",
    telegram: "#0088CC",
  };

  // Get the about us content for the footer (remove line breaks but keep full content)
  const getAboutContent = () => {
    const content = webshopData.about_us.content;
    // Remove line breaks but keep the full content
    return content.replace(/\r?\n/g, " ").trim();
  };

  return (
    <Box
      component="footer"
      sx={{
        color: theme.palette.text.secondary,
        py: 6,
        mt: { xs: 4, md: 6 }, // Add top margin for proper spacing
        borderTop: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          {/* Company Information */}
          <Grid item xs={12} md={4}>
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" color="text.primary" gutterBottom>
                {webshopData.title}
              </Typography>
              <Typography variant="body2" sx={{ mb: 3, lineHeight: 1.6 }}>
                {getAboutContent()}
              </Typography>

              {/* Quick Navigation */}
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<HomeIcon />}
                  component={Link}
                  href="/"
                  sx={{ textTransform: "none", mb: 1 }}
                >
                  Home
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<InfoIcon />}
                  component={Link}
                  href="/about-us"
                  sx={{ textTransform: "none", mb: 1 }}
                >
                  About Us
                </Button>
                {webshopData.footer.faq_enabled && (
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<HelpIcon />}
                    component={Link}
                    href="/faq"
                    sx={{ textTransform: "none", mb: 1 }}
                  >
                    FAQ
                  </Button>
                )}
              </Stack>
            </Box>
          </Grid>

          {/* Contact Information */}
          <Grid item xs={12} md={4}>
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" color="text.primary" gutterBottom>
                Contact Information
              </Typography>

              <Stack spacing={2}>
                {/* Address */}
                <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                  <LocationOnIcon
                    sx={{
                      color: "primary.main",
                      mr: 1,
                      mt: 0.2,
                      fontSize: "1.2rem",
                    }}
                  />
                  <Typography variant="body2" sx={{ lineHeight: 1.4 }}>
                    {webshopData.footer.shop_info.address}
                  </Typography>
                </Box>

                {/* Phone */}
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <PhoneIcon
                    sx={{
                      color: "primary.main",
                      mr: 1,
                      fontSize: "1.2rem",
                    }}
                  />
                  <Link
                    href={`tel:${webshopData.footer.shop_info.phone}`}
                    color="inherit"
                    underline="hover"
                    sx={{ textDecoration: "none" }}
                  >
                    {webshopData.footer.shop_info.phone}
                  </Link>
                </Box>

                {/* Email */}
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <EmailIcon
                    sx={{
                      color: "primary.main",
                      mr: 1,
                      fontSize: "1.2rem",
                    }}
                  />
                  <Link
                    href={`mailto:${webshopData.footer.shop_info.email}`}
                    color="inherit"
                    underline="hover"
                    sx={{ textDecoration: "none" }}
                  >
                    {webshopData.footer.shop_info.email}
                  </Link>
                </Box>

                {/* Working Hours */}
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <AccessTimeIcon
                    sx={{
                      color: "primary.main",
                      mr: 1,
                      fontSize: "1.2rem",
                    }}
                  />
                  <Typography variant="body2">
                    {webshopData.footer.shop_info.working_hours}
                  </Typography>
                </Box>
              </Stack>
            </Box>
          </Grid>

          {/* Social Media & Quick Links */}
          <Grid item xs={12} md={4}>
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" color="text.primary" gutterBottom>
                Follow Us
              </Typography>

              {/* Social Media Icons */}
              <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
                {webshopData.footer.social_media.instagram && (
                  <IconButton
                    aria-label="Instagram"
                    href={webshopData.footer.social_media.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      color: socialMediaColors.instagram,
                      "&:hover": {
                        backgroundColor: `${socialMediaColors.instagram}15`,
                        transform: "scale(1.1)",
                      },
                      transition: "all 0.2s ease",
                    }}
                  >
                    <InstagramIcon />
                  </IconButton>
                )}

                {webshopData.footer.social_media.linkedin && (
                  <IconButton
                    aria-label="LinkedIn"
                    href={webshopData.footer.social_media.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      color: socialMediaColors.linkedin,
                      "&:hover": {
                        backgroundColor: `${socialMediaColors.linkedin}15`,
                        transform: "scale(1.1)",
                      },
                      transition: "all 0.2s ease",
                    }}
                  >
                    <LinkedInIcon />
                  </IconButton>
                )}

                {webshopData.footer.social_media.telegram && (
                  <IconButton
                    aria-label="Telegram"
                    href={webshopData.footer.social_media.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      color: socialMediaColors.telegram,
                      "&:hover": {
                        backgroundColor: `${socialMediaColors.telegram}15`,
                        transform: "scale(1.1)",
                      },
                      transition: "all 0.2s ease",
                    }}
                  >
                    <TelegramIcon />
                  </IconButton>
                )}
              </Stack>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        {/* Bottom Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "space-between",
            alignItems: isMobile ? "flex-start" : "center",
            gap: isMobile ? 2 : 0,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} {webshopData.title}. All rights
            reserved.
          </Typography>

          {/* Additional Info */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {webshopData.footer.faq_enabled && (
              <Chip
                label="FAQ Available"
                size="small"
                color="primary"
                variant="outlined"
              />
            )}
            <Typography variant="caption" color="text.secondary">
              Powered by {webshopData.title}
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
