import React from 'react';
import { Container, Typography, Box, Card, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import { lighten, alpha } from '@mui/material/styles';


const AboutUs: React.FC = () => (
  <Box
    sx={{
      width: '99vw',
      backgroundColor: 'rgba(249,249,255,1)',
      py: 8,
      overflowX: 'hidden',
    }}
  >
    <Container sx={{ 
      backgroundColor: 'rgba(249,249,255,1)',
      overflow: 'hidden',
    }}>
      {/* Title with Gradient Underline */}
      <Box sx={{ 
        position: 'relative',
        mb: 6,
        '&:after': {
          content: '""',
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80px',
          height: '4px',
          background: 'linear-gradient(to right, #4facfe 0%, #00f2fe 100%)',
          borderRadius: '2px'
        }
      }}>
        <Typography variant="h3" gutterBottom align="center" sx={{ 
          fontWeight: 'bold', 
          mb: 4, 
          background: 'linear-gradient(to right, #6e48aa, #9d50bb)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          display: 'inline-block'
        }}>
          About TechNest
        </Typography>
      </Box>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <Typography   variant="h6" align="center" sx={{ 
          mb: 4, 
          color: '#6e48aa',
          fontWeight: 600
        }}>
          Where Technology Meets Trust
        </Typography>
        
        {/*Feature Highlights */}
        <Grid container spacing={2} sx={{ mb: 4 }}>
          {['Genuine Products', 'Expert Advice', 'Fast Delivery', '24/7 Support'].map((text, index) => (
            <Grid  key={index}>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Card sx={{ 
                  p: 1, 
                  textAlign: 'center',
                  background: `linear-gradient(135deg, ${['#4facfe', '#a6c1ee', '#ff758c', '#ff7eb3'][index]} 0%, ${lighten(['#4facfe', '#a6c1ee', '#ff758c', '#ff7eb3'][index], 0.2)} 100%)`,
                  color: 'white',
                  borderRadius: '8px',
                  boxShadow: `0 4px 8px ${alpha(['#4facfe', '#a6c1ee', '#ff758c', '#ff7eb3'][index], 0.2)}`
                }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    {text}
                  </Typography>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
        
        <Typography   sx={{ 
          fontSize: '1.1rem', 
          lineHeight: 1.8,
          '& strong': {
            background: 'linear-gradient(to right, #4facfe, #00f2fe)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 600
          }
        }}>
          At <strong>TechNest</strong>, we're more than just an online store - we're your <strong>tech partners</strong>. Founded in 2014 by a team of engineers and tech enthusiasts, we set out to create a shopping experience that combines cutting-edge technology with old-fashioned customer service.
        </Typography>
        
        <Typography   sx={{ 
          fontSize: '1.1rem', 
          lineHeight: 1.8,
          '& strong': {
            background: 'linear-gradient(to right, #ff758c, #ff7eb3)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 600
          }
        }}>
          We meticulously select every <strong>laptop</strong>, <strong>smartphone</strong>, and <strong>accessory</strong> in our inventory, working directly with manufacturers to ensure authenticity. Our product experts personally test and review each item, providing honest recommendations to help you make the perfect choice for your needs and budget.
        </Typography>
        
        <Typography   sx={{ 
          fontSize: '1.1rem', 
          lineHeight: 1.8, 
          mb: 4,
          '& strong': {
            background: 'linear-gradient(to right, #6e48aa, #9d50bb)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 600
          }
        }}>
          What truly sets us apart is our commitment to your complete <strong>tech journey</strong>. From the moment you start browsing to years after your purchase, our team is here to provide expert advice, setup assistance, and ongoing support.
        </Typography>
      </motion.div>
    </Container>
  </Box>
);

export default AboutUs;