import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Paper,
  InputBase,
  IconButton,
  useTheme,
  useMediaQuery,
  Typography,
  Drawer,
  AppBar,
  Toolbar,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import SearchAutocomplete from "./SearchAutocomplete";
import { useNavigate } from "react-router-dom";

const SearchBox: React.FC = () => {
  const [query, setQuery] = useState("");
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  // Close autocomplete when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const searchBox = searchRef.current;
      
      // Check if click is outside the search box
      if (searchBox && !searchBox.contains(target)) {
        // Check if click is on the autocomplete dropdown
        const autocompleteDropdown = document.querySelector('[data-autocomplete-dropdown]');
        if (!autocompleteDropdown || !autocompleteDropdown.contains(target)) {
          setShowAutocomplete(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);
    const shouldShow = value.length > 0;
    setShowAutocomplete(shouldShow);
  };

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setShowAutocomplete(false);
      setQuery("");
      if (isMobile) {
        setMobileOpen(false);
      }
    }
  };

  const handleSuggestionSelect = (suggestion: any) => {
    if (suggestion.type === "product") {
      navigate(`/product/${suggestion.id}`);
    } else if (suggestion.type === "category") {
      // Use the URL that's already constructed in searchUtils
      navigate(suggestion.url);
    } else if (suggestion.type === "subcategory") {
      // Use the URL that's already constructed in searchUtils
      navigate(suggestion.url);
    } else if (suggestion.type === "brand") {
      navigate(`/search?brand=${encodeURIComponent(suggestion.name)}`);
    }
    setShowAutocomplete(false);
    setQuery("");
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const handleMobileSearchOpen = () => {
    setMobileOpen(true);
    // Focus on input after modal opens
    setTimeout(() => {
      const input = document.querySelector(
        "[data-search-input]"
      ) as HTMLInputElement;
      if (input) {
        input.focus();
      }
    }, 100);
  };

  const handleMobileSearchClose = () => {
    setMobileOpen(false);
    setShowAutocomplete(false);
    setQuery("");
  };

  // Mobile Search Modal
  const MobileSearchModal = (
    <Drawer
      anchor="top"
      open={mobileOpen}
      onClose={handleMobileSearchClose}
      sx={{
        "& .MuiDrawer-paper": {
          height: "100vh",
          backgroundColor: "background.paper",
        },
      }}
    >
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleMobileSearchClose}
            aria-label="close search"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1, ml: 1 }}>
            Search
          </Typography>
        </Toolbar>
      </AppBar>

      <Box
        sx={{ p: 2, height: "100%", display: "flex", flexDirection: "column" }}
      >
        {/* Search Input */}
        <Paper
          component="form"
          onSubmit={handleSearchSubmit}
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: "100%",
            mb: 2,
          }}
        >
          <InputBase
            data-search-input
            value={query}
            onChange={handleInputChange}
            onFocus={() => setShowAutocomplete(query.length > 0)}
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search products, categories, or brands..."
            inputProps={{ "aria-label": "search" }}
          />
          <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>

        {/* Autocomplete Results */}
        {showAutocomplete && (
          <Box sx={{ flex: 1, overflow: "auto" }}>
            <SearchAutocomplete
              query={query}
              isOpen={showAutocomplete}
              onSelect={handleSuggestionSelect}
            />
          </Box>
        )}

        {/* Recent Searches or Popular Searches */}
        {!showAutocomplete && (
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" sx={{ mb: 2, color: "text.secondary" }}>
              Popular Searches
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
              {["Electronics", "Clothing", "Books", "Home & Garden"].map(
                (term) => (
                  <Button
                    key={term}
                    variant="outlined"
                    size="small"
                    onClick={() => {
                      setQuery(term);
                      setShowAutocomplete(true);
                    }}
                    sx={{ borderRadius: 2 }}
                  >
                    {term}
                  </Button>
                )
              )}
            </Box>
            
            <Typography variant="h6" sx={{ mb: 2, color: "text.secondary" }}>
              Quick Categories
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {["Smartphones", "Laptops", "Headphones", "Cameras"].map((category) => (
                <Button
                  key={category}
                  variant="text"
                  size="large"
                  onClick={() => {
                    setQuery(category);
                    setShowAutocomplete(true);
                  }}
                  sx={{ 
                    justifyContent: "flex-start",
                    textTransform: "none",
                    py: 1.5,
                    px: 2,
                    borderRadius: 1,
                    "&:hover": {
                      backgroundColor: "rgba(0, 0, 0, 0.04)",
                    }
                  }}
                >
                  {category}
                </Button>
              ))}
            </Box>
          </Box>
        )}
      </Box>
    </Drawer>
  );

  // Desktop Search
  const DesktopSearch = (
    <Box ref={searchRef} sx={{ position: "relative", zIndex: 9999 }}>
      <Paper
        component="form"
        onSubmit={handleSearchSubmit}
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: { xs: "100%", sm: 400 },
          minWidth: 100,
          maxWidth: 300,
        }}
      >
        <InputBase
          value={query}
          onChange={handleInputChange}
          onFocus={() => setShowAutocomplete(query.length > 0)}
          sx={{ ml: 1, flex: 1 }}
          placeholder="search the product name or brand"
          inputProps={{ "aria-label": "search the product name or brand" }}
        />
        <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>

              {showAutocomplete && (
          <SearchAutocomplete
            query={query}
            isOpen={showAutocomplete}
            onSelect={handleSuggestionSelect}
            anchorEl={searchRef.current}
          />
        )}
    </Box>
  );

  return (
    <>
      {isMobile ? (
        <>
          <IconButton
            color="inherit"
            onClick={handleMobileSearchOpen}
            aria-label="open search"
            sx={{ p: 1 }}
          >
            <SearchIcon />
          </IconButton>
          {MobileSearchModal}
        </>
      ) : (
        DesktopSearch
      )}
    </>
  );
};

export default SearchBox;
