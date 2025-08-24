import {
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
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

  useEffect(() => {
    if (data) {
      setFaqData(data.faq);
    }
  }, [data]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f8fafc 0%, #e0e7ef 100%)",
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
            textShadow: "0 2px 8px #e0e7ef",
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
                boxShadow: "0 4px 24px 0 rgba(60,72,100,0.08)",
                background: "rgba(255,255,255,0.95)",
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
                    color: "primary.dark",
                  },
                  px: 3,
                  py: 2,
                  background:
                    "linear-gradient(90deg, #e3f2fd 0%, #f8fafc 100%)",
                }}
              >
                <Typography variant="h6">{faq.question}</Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  background: "#f8fafc",
                  px: 3,
                  py: 2,
                }}
              >
                <Typography
                  variant="body1"
                  color="black"
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
