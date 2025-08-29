import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import {
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
  Chip,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Search as SearchIcon,
  Category as CategoryIcon,
  Store as BrandIcon,
  Inventory as ProductIcon,
} from "@mui/icons-material";
import { searchAll, type SearchSuggestion } from "../utils/searchUtils";
import LoadingSpinner from "./LoadingSpinner";

interface SearchAutocompleteProps {
  query: string;
  isOpen: boolean;
  onSelect: (suggestion: SearchSuggestion) => void;
  anchorEl?: HTMLElement | null;
}

const SearchAutocomplete: React.FC<SearchAutocompleteProps> = ({
  query,
  isOpen,
  onSelect,
  anchorEl,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  );

  useEffect(() => {
    if (!query.trim() || !isOpen) {
      setSuggestions([]);
      return;
    }

    // Debounce search
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setLoading(true);
    timeoutRef.current = setTimeout(() => {
      const results = searchAll(query);
      setSuggestions(results);
      setLoading(false);
    }, 300);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [query, isOpen]);

  const getIcon = (type: string) => {
    switch (type) {
      case "product":
        return <ProductIcon fontSize="small" />;
      case "category":
      case "subcategory":
        return <CategoryIcon fontSize="small" />;
      case "brand":
        return <BrandIcon fontSize="small" />;
      default:
        return <SearchIcon fontSize="small" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "product":
        return "Product";
      case "category":
        return "Category";
      case "subcategory":
        return "Subcategory";
      case "brand":
        return "Brand";
      default:
        return "Result";
    }
  };

  const getTypeColor = (
    type: string
  ): "primary" | "secondary" | "info" | "success" | "default" => {
    switch (type) {
      case "product":
        return "primary";
      case "category":
        return "secondary";
      case "subcategory":
        return "info";
      case "brand":
        return "success";
      default:
        return "default";
    }
  };

  if (!isOpen) {
    return null;
  }

  const autocompleteContent = (
    <Paper
      elevation={8}
      onClick={(e) => e.stopPropagation()}
      data-autocomplete-dropdown
      sx={{
        position: isMobile ? "static" : "fixed",
        top: isMobile
          ? "auto"
          : anchorEl
          ? anchorEl.getBoundingClientRect().bottom + 4
          : "100%",
        left: isMobile
          ? "auto"
          : anchorEl
          ? anchorEl.getBoundingClientRect().left
          : 0,
        width: isMobile
          ? "auto"
          : anchorEl
          ? anchorEl.getBoundingClientRect().width
          : "auto",
        zIndex: isMobile ? 1 : 999999,
        maxHeight: isMobile ? "100%" : "400px",
        overflow: "auto",
        mt: isMobile ? 0 : 1,
        border: `2px solid ${
          isMobile ? theme.palette.divider : theme.palette.primary.main
        }`,
        backgroundColor: theme.palette.background.paper,
        borderRadius: isMobile ? 0 : 1,
        boxShadow: isMobile ? "none" : "0 8px 32px rgba(0,0,0,0.12)",
      }}
    >
      <List sx={{ p: 0 }}>
        {loading ? (
          <ListItem>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                width: "100%",
              }}
            >
              <LoadingSpinner size="small" message="Searching..." />
            </Box>
          </ListItem>
        ) : suggestions.length === 0 ? (
          <ListItem>
            <ListItemText
              primary={
                <Typography variant="body2" color="text.secondary">
                  No results found
                </Typography>
              }
            />
          </ListItem>
        ) : (
          suggestions.map((suggestion) => (
            <ListItem
              key={suggestion.id}
              onClick={() => onSelect(suggestion)}
              sx={{
                "&:hover": {
                  backgroundColor: theme.palette.action.hover,
                },
                py: isMobile ? 2 : 1.5,
                cursor: "pointer",
                borderBottom: isMobile
                  ? `1px solid ${theme.palette.divider}`
                  : "none",
              }}
            >
              <ListItemIcon sx={{ minWidth: isMobile ? 48 : 40 }}>
                {getIcon(suggestion.type)}
              </ListItemIcon>
              <ListItemText
                primary={
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography
                      variant={isMobile ? "h6" : "body1"}
                      sx={{
                        fontWeight: 500,
                        flex: 1,
                      }}
                    >
                      {suggestion.name}
                    </Typography>
                    <Chip
                      label={getTypeLabel(suggestion.type)}
                      size="small"
                      color={getTypeColor(suggestion.type)}
                      variant="outlined"
                    />
                  </Box>
                }
                secondary={
                  suggestion.type === "product" && suggestion.data ? (
                    <Typography
                      variant={isMobile ? "body1" : "body2"}
                      color="text.secondary"
                    >
                      {suggestion.data.brand} • Rp{" "}
                      {suggestion.data.price?.toLocaleString()}
                    </Typography>
                  ) : (
                    <Typography
                      variant={isMobile ? "body1" : "body2"}
                      color="text.secondary"
                    >
                      {suggestion.type === "brand"
                        ? "View all products from this brand"
                        : "Browse products"}
                    </Typography>
                  )
                }
              />
            </ListItem>
          ))
        )}
      </List>
    </Paper>
  );

  // For mobile, render normally
  if (isMobile) {
    return autocompleteContent;
  }

  // For desktop, render in portal to ensure it appears above everything
  return createPortal(autocompleteContent, document.body);
};

export default SearchAutocomplete;
