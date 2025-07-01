import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Typography,
  Slider,
  Divider,
  Checkbox,
  FormControlLabel,
  Switch,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import webShopData from "../../public/data/webshop.json";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type FilterProps = {
  category: string; // Changed from _category to match usage
  subCategory?: string;
  type: string;
  label: string;
  options?: string[];
  min?: number;
  max?: number;
};

const Filter: React.FC<FilterProps> = ({ category, subCategory, options }) => {
  const filteredCategory = webShopData.categories.find(
    (cat) => cat.name === category
  );
  const navigate = useNavigate();

  // Range slider state (example min/max)
  const [priceRange, setPriceRange] = useState<[number, number]>([
    100000, 10000000,
  ]);
  const min = 100000;
  const max = 10000000;
  const unit = "Toman";

  // Checklist state
  const checklistOptions = options || [
    "Option 1",
    "Option 2",
    "Option 3",
    "Option 4",
    "Option 5",
    "Option 6",
    "Option 7",
    "Option 8",
    "Option 9",
    "Option 10",
    "Option 11",
    "Option 12",
  ];
  const [checked, setChecked] = useState<string[]>([]);
  const [showAll, setShowAll] = useState(false);

  // Toggle filter state
  const [toggle, setToggle] = useState(false);

  const handleCheck = (option: string) => {
    setChecked((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  return (
    <Box
      width={"15rem"}
      padding={"1rem"}
      borderRadius={"0.2rem"}
      sx={{ border: "solid #f0f0f0 1px" }}
    >
      {!subCategory && (
        <Accordion sx={{ boxShadow: "none" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography component="span">Sub Categories</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {filteredCategory ? (
              <Box display={"flex"} flexDirection={"column"}>
                {filteredCategory.children.map((subCat) => (
                  <Button
                    key={subCat}
                    onClick={() => navigate(`/${category}/${subCat}`)}
                    sx={{ justifyContent: "flex-start" }}
                  >
                    {subCat}
                  </Button>
                ))}
              </Box>
            ) : (
              <Typography>No subcategories found</Typography>
            )}
          </AccordionDetails>
        </Accordion>
      )}

      <Divider sx={{ color: "#f0f0f0", margin: "0.5rem" }} />

      {/* Range Slider */}
      <Box>
        <Typography gutterBottom fontWeight="bold">
          Price Range
        </Typography>
        <Slider
          value={priceRange}
          onChange={(_, newValue) =>
            setPriceRange(newValue as [number, number])
          }
          valueLabelDisplay="auto"
          min={min}
          max={max}
          step={10000}
        />
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="body2">
            {priceRange[0].toLocaleString()} {unit}
          </Typography>
          <Typography variant="body2">
            {priceRange[1].toLocaleString()} {unit}
          </Typography>
        </Box>
      </Box>

      {/* Checklist Filter */}
      <Divider sx={{ color: "#f0f0f0", margin: "0.5rem" }} />
      <Box mt={2}>
        <Typography gutterBottom fontWeight="bold">
          Options
        </Typography>
        <Box display="flex" flexDirection="column">
          {(showAll ? checklistOptions : checklistOptions.slice(0, 5)).map(
            (option) => (
              <FormControlLabel
                key={option}
                control={
                  <Checkbox
                    checked={checked.includes(option)}
                    onChange={() => handleCheck(option)}
                  />
                }
                label={option}
              />
            )
          )}
        </Box>
        {checklistOptions.length > 8 && (
          <Button
            size="small"
            onClick={() => setShowAll((prev) => !prev)}
            sx={{ mt: 1, alignSelf: "flex-start" }}
          >
            {showAll ? "Show Less" : "Show More"}
          </Button>
        )}
      </Box>

      {/* Toggle Filter */}
      <Divider sx={{ color: "#f0f0f0", margin: "0.5rem" }} />
      <Box mt={2}>
        <Typography gutterBottom fontWeight="bold">
          supports usb?
        </Typography>
        <Box display="flex" alignItems="center" gap={1}>
          <Typography
            variant="body2"
            color={!toggle ? "primary" : "text.secondary"}
          >
            no
          </Typography>
          <Switch
            checked={toggle}
            onChange={() => setToggle((v) => !v)}
            color="primary"
          />
          <Typography
            variant="body2"
            color={toggle ? "primary" : "text.secondary"}
          >
            yes
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Filter;
