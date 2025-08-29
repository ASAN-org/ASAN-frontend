import React from "react";
import {
  Container,
  Typography,
  Box,
  Card,
  Grid,
  Avatar,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
} from "@mui/lab";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SecurityIcon from "@mui/icons-material/Security";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import DevicesIcon from "@mui/icons-material/Devices";
import { lighten, alpha } from "@mui/material/styles";

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

// Define webshop data interface
interface WebShopData {
  title: string;
  about_us: {
    content: string;
    title: string;
  };
}

interface AboutUsProps {
  webshopData: WebShopData;
}

const AboutUs: React.FC<AboutUsProps> = ({ webshopData }) => {
  const theme = useTheme();

  // Replace all instances of "TechNest" with the webshop title
  const replaceTechNest = (text: string) => {
    return text.replace(/TechNest/g, webshopData.title);
  };

  // Process the about_us content to replace TechNest references
  const processedAboutContent = replaceTechNest(webshopData.about_us.content);

  // Timeline data - now dynamic based on webshop title
  const timelineItems: TimelineItemData[] = [
    {
      title: "2014",
      cardTitle: `${webshopData.title} Founded`,
      cardSubtitle:
        "Started as a specialized online store for premium tech products",
    },
    {
      title: "2016",
      cardTitle: "10K Customers",
      cardSubtitle:
        "Became a trusted name for authentic tech with verified reviews",
    },
    {
      title: "2018",
      cardTitle: "Mobile App Launch",
      cardSubtitle: "Introduced AR preview and real-time stock checking",
    },
    {
      title: "2020",
      cardTitle: "Nationwide Coverage",
      cardSubtitle: "Same-day delivery in 15 major cities",
    },
    {
      title: "2023",
      cardTitle: "Tech Excellence Award",
      cardSubtitle: "Recognized for innovation in customer experience",
    },
  ];

  // stat bar data
  const stats: StatItem[] = [
    {
      icon: <DevicesIcon fontSize="large" sx={{ color: "white" }} />,
      label: "Products Sold",
      value: "2.5M+",
      bgColor:
        theme.palette.mode === "dark" ? theme.palette.primary.dark : "#6a11cb",
    },
    {
      icon: <SupportAgentIcon fontSize="large" sx={{ color: "white" }} />,
      label: "Support Queries",
      value: "98% resolved",
      bgColor:
        theme.palette.mode === "dark" ? theme.palette.primary.main : "#2575fc",
    },
    {
      icon: <LocalShippingIcon fontSize="large" sx={{ color: "white" }} />,
      label: "On-Time Delivery",
      value: "99.2%",
      bgColor:
        theme.palette.mode === "dark" ? theme.palette.error.main : "#fc4a1a",
    },
    {
      icon: <SecurityIcon fontSize="large" sx={{ color: "white" }} />,
      label: "Authentic Products",
      value: "100%",
      bgColor:
        theme.palette.mode === "dark" ? theme.palette.warning.main : "#fbbd61",
    },
  ];

  const StatBar: React.FC = () => (
    <Grid container spacing={4} justifyContent="center" sx={{ my: 4 }}>
      {stats.map((stat, index) => (
        <Grid key={stat.label}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <Card
              sx={{
                textAlign: "center",
                py: 4,
                px: 2,
                height: "100%",
                background: `linear-gradient(135deg, ${
                  stat.bgColor
                } 0%, ${lighten(stat.bgColor, 0.2)} 100%)`,
                color: "white",
                borderRadius: "12px",
                boxShadow: `0 6px 12px ${alpha(stat.bgColor, 0.3)}`,
              }}
            >
              {stat.icon}
              <Typography variant="h5" fontWeight="bold" mt={2}>
                {stat.value}
              </Typography>
              <Typography sx={{ color: "rgba(255,255,255,0.9)" }}>
                {stat.label}
              </Typography>
            </Card>
          </motion.div>
        </Grid>
      ))}
    </Grid>
  );

  return (
    <Box
      sx={{
        width: "99vw",
        backgroundColor: theme.palette.background.default,
        py: 3,
        overflowX: "hidden",
      }}
    >
      <Container
        sx={{
          backgroundColor: theme.palette.background.default,
          overflow: "hidden",
        }}
      >
        {/* Title with Gradient Underline */}
        <Box
          sx={{
            position: "relative",
            mb: 6,
            "&:after": {
              content: '""',
              position: "absolute",
              bottom: 0,
              left: "50%",
              transform: "translateX(-50%)",
              width: "80px",
              height: "4px",
              background:
                theme.palette.mode === "dark"
                  ? `linear-gradient(to right, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`
                  : "linear-gradient(to right, #4facfe 0%, #00f2fe 100%)",
              borderRadius: "2px",
            },
          }}
        >
          <Typography
            variant="h3"
            gutterBottom
            align="center"
            sx={{
              fontWeight: "bold",
              mb: 4,
              background:
                theme.palette.mode === "dark"
                  ? `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.primary.light})`
                  : "linear-gradient(to right, #6e48aa, #9d50bb)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              display: "inline-block",
            }}
          >
            About {webshopData.title}
          </Typography>
        </Box>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Typography
            variant="h6"
            align="center"
            sx={{
              mb: 4,
              color:
                theme.palette.mode === "dark" ? "primary.light" : "#6e48aa",
              fontWeight: 600,
            }}
          >
            Where Technology Meets Trust
          </Typography>

          {/* Colorful Feature Highlights */}
          <Grid container spacing={2} sx={{ mb: 4 }}>
            {[
              "Genuine Products",
              "Expert Advice",
              "Fast Delivery",
              "24/7 Support",
            ].map((text, index) => (
              <Grid key={index}>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Card
                    sx={{
                      p: 1,
                      textAlign: "center",
                      background:
                        theme.palette.mode === "dark"
                          ? `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`
                          : `linear-gradient(135deg, ${
                              ["#4facfe", "#a6c1ee", "#ff758c", "#ff7eb3"][
                                index
                              ]
                            } 0%, ${lighten(
                              ["#4facfe", "#a6c1ee", "#ff758c", "#ff7eb3"][
                                index
                              ],
                              0.2
                            )} 100%)`,
                      color: "white",
                      borderRadius: "8px",
                      boxShadow:
                        theme.palette.mode === "dark"
                          ? `0 4px 8px ${alpha(
                              theme.palette.primary.main,
                              0.2
                            )}`
                          : `0 4px 8px ${alpha(
                              ["#4facfe", "#a6c1ee", "#ff758c", "#ff7eb3"][
                                index
                              ],
                              0.2
                            )}`,
                    }}
                  >
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      {text}
                    </Typography>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>

          {/* Dynamic About Us Content from Backend */}
          <Box
            sx={{
              fontSize: "1.1rem",
              lineHeight: 1.8,
              mb: 4,
              whiteSpace: "pre-line", // Preserve line breaks from backend
              color: theme.palette.text.primary,
              "& strong": {
                background:
                  theme.palette.mode === "dark"
                    ? `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.primary.light})`
                    : "linear-gradient(to right, #4facfe, #00f2fe)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontWeight: 600,
              },
            }}
          >
            {processedAboutContent}
          </Box>
        </motion.div>

        <Box my={4}>
          <StatBar />
        </Box>

        {/*Timeline Section */}
        <Box my={6}>
          <Typography
            variant="h4"
            gutterBottom
            align="center"
            sx={{
              fontWeight: "bold",
              background:
                theme.palette.mode === "dark"
                  ? `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.primary.light})`
                  : "linear-gradient(to right, #6e48aa, #9d50bb)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              display: "inline-block",
              mx: "auto",
            }}
          >
            Our Tech Journey
          </Typography>
          <Typography
            align="center"
            sx={{
              mb: 4,
              color:
                theme.palette.mode === "dark" ? "primary.light" : "#6e48aa",
              fontWeight: 500,
            }}
          >
            Pioneering excellence in tech retail since 2014
          </Typography>

          <Timeline
            position="alternate"
            sx={{
              "& .MuiTimelineDot-root": {
                boxShadow:
                  theme.palette.mode === "dark"
                    ? "0 0 0 4px rgba(144,202,249,0.2)"
                    : "0 0 0 4px rgba(110,72,170,0.1)",
              },
            }}
          >
            {timelineItems.map((item, index) => (
              <TimelineItem key={index}>
                <TimelineOppositeContent sx={{ flex: 0.2 }}>
                  <Typography variant="body2" color="text.secondary">
                    {item.title}
                  </Typography>
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot
                    sx={{
                      backgroundColor:
                        theme.palette.mode === "dark"
                          ? theme.palette.primary.main
                          : [
                              "#4facfe",
                              "#a6c1ee",
                              "#ff758c",
                              "#ff7eb3",
                              "#6e48aa",
                            ][index],
                      width: "16px",
                      height: "16px",
                    }}
                  />
                  {index !== timelineItems.length - 1 && (
                    <TimelineConnector
                      sx={{
                        backgroundColor:
                          theme.palette.mode === "dark"
                            ? theme.palette.primary.light
                            : ["#4facfe", "#a6c1ee", "#ff758c", "#ff7eb3"][
                                index % 4
                              ],
                        width: "2px",
                      }}
                    />
                  )}
                </TimelineSeparator>
                <TimelineContent>
                  <Card
                    sx={{
                      p: 2,
                      backgroundColor:
                        theme.palette.mode === "dark"
                          ? theme.palette.background.paper
                          : `${lighten(
                              [
                                "#4facfe",
                                "#a6c1ee",
                                "#ff758c",
                                "#ff7eb3",
                                "#6e48aa",
                              ][index],
                              0.9
                            )}`,
                      borderLeft: `4px solid ${
                        theme.palette.mode === "dark"
                          ? theme.palette.primary.main
                          : [
                              "#4facfe",
                              "#a6c1ee",
                              "#ff758c",
                              "#ff7eb3",
                              "#6e48aa",
                            ][index]
                      }`,
                      borderRadius: "0 8px 8px 0",
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      fontWeight="bold"
                      color="text.primary"
                    >
                      {item.cardTitle}
                    </Typography>
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
        <Box
          my={8}
          sx={{
            py: 6,
            px: 4,
            borderRadius: 2,
            background:
              theme.palette.mode === "dark"
                ? `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`
                : "linear-gradient(135deg, rgba(249,249,255,1) 0%, rgba(245,245,255,1) 100%)",
            boxShadow:
              theme.palette.mode === "dark"
                ? "0 8px 24px rgba(0,0,0,0.3)"
                : "0 8px 24px rgba(110,72,170,0.1)",
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            align="center"
            sx={{
              fontWeight: "bold",
              background:
                theme.palette.mode === "dark"
                  ? `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.primary.light})`
                  : "linear-gradient(to right, #fc4a1a, #fbbd61)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Why {webshopData.title} Stands Out
          </Typography>
          <Typography
            align="center"
            sx={{
              mb: 6,
              color:
                theme.palette.mode === "dark" ? "primary.light" : "#6e48aa",
              fontWeight: 500,
            }}
          >
            Four pillars of our unmatched service
          </Typography>

          <Grid container spacing={4}>
            {[
              {
                icon: (
                  <CheckCircleIcon
                    sx={{
                      fontSize: 40,
                      color:
                        theme.palette.mode === "dark"
                          ? theme.palette.primary.main
                          : "#4facfe",
                    }}
                  />
                ),
                title: "Hassle-Free Returns",
                description:
                  "30-day no-questions-asked return policy with free pickup for all products.",
              },
              {
                icon: (
                  <DevicesIcon
                    sx={{
                      fontSize: 40,
                      color:
                        theme.palette.mode === "dark"
                          ? theme.palette.primary.light
                          : "#a6c1ee",
                    }}
                  />
                ),
                title: "Hands-On Experience",
                description:
                  "Try before you buy at our experience centers in 12 cities nationwide.",
              },
              {
                icon: (
                  <Avatar
                    src="/images/trade-in.png"
                    sx={{ width: 40, height: 40 }}
                  />
                ),
                title: "Smart Trade-In Program",
                description:
                  "Get instant value for your old devices when upgrading to new tech.",
              },
              {
                icon: (
                  <Avatar
                    src="/images/warranty.png"
                    sx={{ width: 40, height: 40 }}
                  />
                ),
                title: "Extended Protection",
                description:
                  "Optional extended warranties covering accidental damage and battery replacement.",
              },
            ].map((item: FeatureCard, index) => (
              <Grid key={item.title}>
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card
                    sx={{
                      height: "100%",
                      p: 3,
                      textAlign: "center",
                      borderTop: `4px solid ${
                        theme.palette.mode === "dark"
                          ? theme.palette.primary.main
                          : ["#4facfe", "#a6c1ee", "#ff758c", "#ff7eb3"][index]
                      }`,
                      boxShadow:
                        theme.palette.mode === "dark"
                          ? "0 4px 20px rgba(0,0,0,0.3)"
                          : "0 4px 20px rgba(0,0,0,0.08)",
                      "&:hover": {
                        boxShadow:
                          theme.palette.mode === "dark"
                            ? `0 8px 24px ${alpha(
                                theme.palette.primary.main,
                                0.2
                              )}`
                            : `0 8px 24px ${alpha(
                                ["#4facfe", "#a6c1ee", "#ff758c", "#ff7eb3"][
                                  index
                                ],
                                0.2
                              )}`,
                      },
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        mb: 2,
                      }}
                    >
                      {item.icon}
                    </Box>
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{ fontWeight: "bold", color: "text.primary" }}
                    >
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
        <Box
          my={8}
          sx={{
            p: 6,
            borderRadius: 2,
            background:
              theme.palette.mode === "dark"
                ? `linear-gradient(135deg, ${theme.palette.primary.dark}10 0%, ${theme.palette.background.paper} 100%)`
                : "linear-gradient(135deg, rgba(110,72,170,0.1) 0%, rgba(245,245,255,1) 100%)",
            borderLeft: `6px solid ${
              theme.palette.mode === "dark"
                ? theme.palette.primary.main
                : "#6e48aa"
            }`,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Typography
            variant="h3"
            gutterBottom
            align="center"
            sx={{
              fontWeight: "bold",
              mb: 4,
              background:
                theme.palette.mode === "dark"
                  ? `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.primary.light})`
                  : "linear-gradient(to right, #6e48aa, #9d50bb)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Our Commitment
          </Typography>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Typography
              variant="h6"
              align="center"
              sx={{
                mb: 4,
                color:
                  theme.palette.mode === "dark" ? "primary.light" : "#6e48aa",
                fontWeight: 600,
              }}
            >
              The {webshopData.title} Difference
            </Typography>

            <Typography
              sx={{
                fontSize: "1.1rem",
                lineHeight: 1.8,
                color: theme.palette.text.primary,
                "& strong": {
                  background:
                    theme.palette.mode === "dark"
                      ? `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.primary.light})`
                      : "linear-gradient(to right, #4facfe, #00f2fe)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontWeight: 600,
                },
              }}
            >
              At <strong>{webshopData.title}</strong>, we measure our success by
              your satisfaction. Every product in our catalog meets our rigorous
              standards for quality and performance, backed by manufacturer
              warranties and our own comprehensive support.
            </Typography>

            <Typography
              sx={{
                fontSize: "1.1rem",
                lineHeight: 1.8,
                color: theme.palette.text.primary,
                "& strong": {
                  background:
                    theme.palette.mode === "dark"
                      ? `linear-gradient(to right, ${theme.palette.secondary.main}, ${theme.palette.secondary.light})`
                      : "linear-gradient(to right, #ff758c, #ff7eb3)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontWeight: 600,
                },
              }}
            >
              Our team of certified technicians doesn't just sell technology -
              we <strong>live it</strong>. We're constantly testing new devices,
              updating our knowledge, and developing services to make your tech
              experience seamless.
            </Typography>

            <Typography
              sx={{
                fontSize: "1.1rem",
                lineHeight: 1.8,
                mb: 4,
                color: theme.palette.text.primary,
                "& strong": {
                  background:
                    theme.palette.mode === "dark"
                      ? `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.primary.light})`
                      : "linear-gradient(to right, #6e48aa, #9d50bb)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontWeight: 600,
                },
              }}
            >
              We invite you to experience the{" "}
              <strong>{webshopData.title} way</strong> - where cutting-edge
              technology meets personalized service, and every customer becomes
              part of our tech family.
            </Typography>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
};

export default AboutUs;
