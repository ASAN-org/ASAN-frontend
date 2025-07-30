import React from 'react';
import { Container, Typography, Box, Card, Grid, Avatar } from '@mui/material';
import { motion } from 'framer-motion';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SecurityIcon from '@mui/icons-material/Security';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import DevicesIcon from '@mui/icons-material/Devices';
import { lighten, alpha } from '@mui/material/styles';


// Define types for stats
interface StatItem {
  icon: React.ReactNode;
  label: string;
  value: string;
  bgColor: string;
}

// Define types for feature cards
interface FeatureCard {
  icon: React.ReactNode;
  title: string;
  description: string;
}



// stat bar data
const stats: StatItem[] = [
  { icon: <DevicesIcon fontSize="large" sx={{ color: 'white' }} />, label: 'Products Sold', value: "2.5M+", bgColor: '#6a11cb' },
  { icon: <SupportAgentIcon fontSize="large" sx={{ color: 'white' }} />, label: 'Support Queries', value: "98% resolved", bgColor: '#2575fc' },
  { icon: <LocalShippingIcon fontSize="large" sx={{ color: 'white' }} />, label: 'On-Time Delivery', value: '99.2%', bgColor: '#fc4a1a' },
  { icon: <SecurityIcon fontSize="large" sx={{ color: 'white' }} />, label: 'Authentic Products', value: '100%', bgColor: '#fbbd61' },
];

const StatBar: React.FC = () => (
  <Grid container spacing={4} justifyContent="center" sx={{ my: 4 }}>
    {stats.map((stat, index) => (
      <Grid  key={stat.label}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.2 }}
          viewport={{ once: true }}
        >
          <Card sx={{ 
            textAlign: 'center', 
            py: 4, 
            px: 2, 
            height: '100%',
            background: `linear-gradient(135deg, ${stat.bgColor} 0%, ${lighten(stat.bgColor, 0.2)} 100%)`,
            color: 'white',
            borderRadius: '12px',
            boxShadow: `0 6px 12px ${alpha(stat.bgColor, 0.3)}`
          }}>
            {stat.icon}
            <Typography variant="h5" fontWeight="bold" mt={2}>
              {stat.value}
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.9)' }}>{stat.label}</Typography>
          </Card>
        </motion.div>
      </Grid>
    ))}
  </Grid>
);

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

      <Box my={4}>
        <StatBar />
      </Box>
      {/* Why Choose Us Section */}
      <Box my={8} sx={{ 
        py: 6, 
        px: 4, 
        borderRadius: 2,
        background: 'linear-gradient(135deg, rgba(249,249,255,1) 0%, rgba(245,245,255,1) 100%)',
        boxShadow: '0 8px 24px rgba(110,72,170,0.1)'
      }}>
        <Typography variant="h4" gutterBottom align="center" sx={{ 
          fontWeight: 'bold',
          background: 'linear-gradient(to right, #fc4a1a, #fbbd61)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Why TechNest Stands Out
        </Typography>
        <Typography   align="center" sx={{ 
          mb: 6, 
          color: '#6e48aa',
          fontWeight: 500
        }}>
          Four pillars of our unmatched service
        </Typography>
        
        <Grid container spacing={4}>
          {[
            { 
              icon: <CheckCircleIcon sx={{ fontSize: 40, color: '#4facfe' }} />,
              title: "Hassle-Free Returns", 
              description: "30-day no-questions-asked return policy with free pickup for all products." 
            },
            { 
              icon: <DevicesIcon sx={{ fontSize: 40, color: '#a6c1ee' }} />,
              title: "Hands-On Experience", 
              description: "Try before you buy at our experience centers in 12 cities nationwide." 
            },
            { 
              icon: <Avatar src="/images/trade-in.png" sx={{ width: 40, height: 40 }} />,
              title: "Smart Trade-In Program", 
              description: "Get instant value for your old devices when upgrading to new tech." 
            },
            { 
              icon: <Avatar src="/images/warranty.png" sx={{ width: 40, height: 40 }} />,
              title: "Extended Protection", 
              description: "Optional extended warranties covering accidental damage and battery replacement." 
            }
          ].map((item: FeatureCard, index) => (
            <Grid key={item.title}>
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <Card sx={{ 
                  height: '100%', 
                  p: 3,
                  textAlign: 'center',
                  borderTop: `4px solid ${['#4facfe', '#a6c1ee', '#ff758c', '#ff7eb3'][index]}`,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  '&:hover': {
                    boxShadow: `0 8px 24px ${alpha(['#4facfe', '#a6c1ee', '#ff758c', '#ff7eb3'][index], 0.2)}`
                  }
                }}>
                  <Box sx={{ 
                    display: 'flex',
                    justifyContent: 'center',
                    mb: 2
                  }}>
                    {item.icon}
                  </Box>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.description}
                  </Typography>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  </Box>
);

export default AboutUs;