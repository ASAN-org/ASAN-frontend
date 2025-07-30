import React from 'react';
import { Container, Typography, Box, Card, Grid, Avatar } from '@mui/material';
import { motion } from 'framer-motion';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot, TimelineOppositeContent } from '@mui/lab';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SecurityIcon from '@mui/icons-material/Security';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import DevicesIcon from '@mui/icons-material/Devices';
import { lighten, alpha } from '@mui/material/styles';

// Define types for timeline items
interface TimelineItemData {
  title: string;
  cardTitle: string;
  cardSubtitle: string;
}

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

// Timeline data
const timelineItems: TimelineItemData[] = [
  { title: "2014", cardTitle: "TechNest Founded", cardSubtitle: "Started as a specialized online store for premium tech products" },
  { title: "2016", cardTitle: "10K Customers", cardSubtitle: "Became a trusted name for authentic tech with verified reviews" },
  { title: "2018", cardTitle: "Mobile App Launch", cardSubtitle: "Introduced AR preview and real-time stock checking" },
  { title: "2020", cardTitle: "Nationwide Coverage", cardSubtitle: "Same-day delivery in 15 major cities" },
  { title: "2023", cardTitle: "Tech Excellence Award", cardSubtitle: "Recognized for innovation in customer experience" },
];

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
      py: 3,
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
        
        {/* Colorful Feature Highlights */}
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

      {/*Timeline Section */}
      <Box my={6}>
        <Typography variant="h4" gutterBottom align="center" sx={{ 
          fontWeight: 'bold',
          background: 'linear-gradient(to right, #6e48aa, #9d50bb)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          display: 'inline-block',
          mx: 'auto'
        }}>
          Our Tech Journey
        </Typography>
        <Typography   align="center" sx={{ 
          mb: 4, 
          color: '#6e48aa',
          fontWeight: 500
        }}>
          Pioneering excellence in tech retail since 2014
        </Typography>
        
        <Timeline position="alternate" sx={{ 
          '& .MuiTimelineDot-root': {
            boxShadow: '0 0 0 4px rgba(110,72,170,0.1)'
          }
        }}>
          {timelineItems.map((item, index) => (
            <TimelineItem key={index}>
              <TimelineOppositeContent sx={{ flex: 0.2 }}>
                <Typography variant="body2" color="text.secondary">
                  {item.title}
                </Typography>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot sx={{ 
                  backgroundColor: ['#4facfe', '#a6c1ee', '#ff758c', '#ff7eb3', '#6e48aa'][index],
                  width: '16px',
                  height: '16px'
                }} />
                {index !== timelineItems.length - 1 && (
                  <TimelineConnector sx={{ 
                    backgroundColor: ['#4facfe', '#a6c1ee', '#ff758c', '#ff7eb3'][index % 4],
                    width: '2px'
                  }} />
                )}
              </TimelineSeparator>
              <TimelineContent>
                <Card sx={{ 
                  p: 2, 
                  backgroundColor: `${lighten(['#4facfe', '#a6c1ee', '#ff758c', '#ff7eb3', '#6e48aa'][index], 0.9)}`,
                  borderLeft: `4px solid ${['#4facfe', '#a6c1ee', '#ff758c', '#ff7eb3', '#6e48aa'][index]}`,
                  borderRadius: '0 8px 8px 0'
                }}>
                  <Typography variant="subtitle1" fontWeight="bold">{item.cardTitle}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.cardSubtitle}
                  </Typography>
                </Card>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
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
      {/*Commitment Section */}
      <Box my={8} sx={{
        p: 6,
        borderRadius: 2,
        background: 'linear-gradient(135deg, rgba(110,72,170,0.1) 0%, rgba(245,245,255,1) 100%)',
        borderLeft: '6px solid #6e48aa',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <Typography variant="h3" gutterBottom align="center" sx={{ 
          fontWeight: 'bold', 
          mb: 4,
          background: 'linear-gradient(to right, #6e48aa, #9d50bb)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Our Commitment
        </Typography>

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
            The TechNest Difference
          </Typography>
          
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
            At <strong>TechNest</strong>, we measure our success by your satisfaction. Every product in our catalog meets our rigorous standards for quality and performance, backed by manufacturer warranties and our own comprehensive support.
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
            Our team of certified technicians doesn't just sell technology - we <strong>live it</strong>. We're constantly testing new devices, updating our knowledge, and developing services to make your tech experience seamless.
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
            We invite you to experience the <strong>TechNest way</strong> - where cutting-edge technology meets personalized service, and every customer becomes part of our tech family.
          </Typography>
        </motion.div>
      </Box>
    </Container>
  </Box>
);

export default AboutUs;