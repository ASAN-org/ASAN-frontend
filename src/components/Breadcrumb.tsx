import React from "react";
import { Breadcrumbs, Link, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { formatUrlSegment, normalizeCategoryName } from "../utils/urlUtils";

interface BreadcrumbProps {
  category?: string;
  subCategory?: string;
  productName?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  category,
  subCategory,
  productName,
}) => {
  const breadcrumbItems = [
    {
      label: "Home",
      href: "/",
      current: false,
    },
  ];

  if (category) {
    breadcrumbItems.push({
      label: category.charAt(0).toUpperCase() + category.slice(1),
      href: `/${formatUrlSegment(normalizeCategoryName(category))}`,
      current: !subCategory && !productName,
    });
  }

  if (subCategory) {
    breadcrumbItems.push({
      label: subCategory,
      href: `/${formatUrlSegment(
        normalizeCategoryName(category!)
      )}/${formatUrlSegment(subCategory)}`,
      current: !productName,
    });
  }

  if (productName) {
    breadcrumbItems.push({
      label: productName,
      href: "#",
      current: true,
    });
  }

  return (
    <Breadcrumbs
      aria-label="breadcrumb"
      sx={{
        mb: 3,
        mt: 2,
        "& .MuiBreadcrumbs-ol": {
          flexWrap: "wrap",
        },
      }}
    >
      {breadcrumbItems.map((item, index) => (
        <div key={index}>
          {item.current ? (
            <Typography
              color="text.primary"
              sx={{
                fontFamily: "'Anjoman-FaNum-Medium'",
                fontSize: "0.9rem",
                maxWidth: "200px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {item.label}
            </Typography>
          ) : (
            <Link
              component={RouterLink}
              to={item.href}
              color="inherit"
              sx={{
                fontFamily: "'Anjoman-FaNum-Medium'",
                fontSize: "0.9rem",
                textDecoration: "none",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              {item.label}
            </Link>
          )}
        </div>
      ))}
    </Breadcrumbs>
  );
};

export default Breadcrumb;
