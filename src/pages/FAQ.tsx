import {
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  useTheme,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useWebshopData } from "../hooks/UseWebshopData";
import type { Faq } from "../types/Faq";
import { useEffect, useState } from "react";

// const faqs = [
//   {
//     question: "What is ASAN WebShop?",
//     answer:
//       "ASAN WebShop is an online platform for purchasing a variety of products easily and securely.",
//   },
//   {
//     question: "How can I create an account?",
//     answer:
//       "Click on the 'Sign Up' button at the top right and fill in the required information.",
//   },
//   {
//     question: "What payment methods are accepted?",
//     answer: "We accept credit cards, debit cards, and online payment gateways.",
//   },
//   {
//     question: "How do I track my order?",
//     answer:
//       "After logging in, go to 'My Orders' to view your order status and tracking information.",
//   },
//   {
//     question: "How can I contact customer support?",
//     answer:
//       "You can reach us via the 'Contact Us' page or email support@asanwebshop.com.",
//   },
// ];

export default function FAQ() {
  const { data } = useWebshopData();
  const [faqData, setFaqData] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    if (data) {
      setFaqData(data.faq);
    }
  }, [data]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: theme.palette.background.default,
        py: 6,
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{
            fontWeight: 700,
            letterSpacing: 1,
            color: "primary.main",
            mb: 4,
            textShadow:
              theme.palette.mode === "dark" ? "none" : "0 2px 8px #e0e7ef",
          }}
        >
          Frequently Asked Questions
        </Typography>
        <Box>
          {faqData.map((faq: Faq) => (
            <Accordion
              key={faq.order}
              sx={{
                mb: 2,
                borderRadius: 3,
                boxShadow:
                  theme.palette.mode === "dark"
                    ? "0 4px 24px 0 rgba(0,0,0,0.3)"
                    : "0 4px 24px 0 rgba(60,72,100,0.08)",
                background: theme.palette.background.paper,
                "&:before": { display: "none" },
                overflow: "hidden",
              }}
              TransitionProps={{ unmountOnExit: true }}
            >
              <AccordionSummary
                expandIcon={
                  <ExpandMoreIcon
                    sx={{
                      transition: "transform 0.3s",
                      color: "primary.main",
                    }}
                  />
                }
                aria-controls={`faq-content-${faq.order}`}
                id={`faq-header-${faq.order}`}
                sx={{
                  "& .MuiTypography-root": {
                    fontWeight: 600,
                    fontSize: "1.1rem",
                    color: theme.palette.text.primary,
                  },
                  px: 3,
                  py: 2,
                  background:
                    theme.palette.mode === "dark"
                      ? `linear-gradient(90deg, ${theme.palette.primary.dark}20 0%, ${theme.palette.background.paper} 100%)`
                      : "linear-gradient(90deg, #e3f2fd 0%, #f8fafc 100%)",
                }}
              >
                <Typography variant="h6">{faq.question}</Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  background:
                    theme.palette.mode === "dark"
                      ? theme.palette.background.default
                      : "#f8fafc",
                  px: 3,
                  py: 2,
                }}
              >
                <Typography
                  variant="body1"
                  color="text.primary"
                  sx={{ fontSize: "1.05rem" }}
                >
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
