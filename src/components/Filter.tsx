import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import webShopData from "../../public/data/webshop.json";

type FilterProps = {
  category: string; // Changed from _category to match usage
  subCategory?: string;
  type: string;
  label: string;
  options?: string[];
  min?: number;
  max?: number;
};

const Filter: React.FC<FilterProps> = ({ category, subCategory }) => {
  const filteredCategory = webShopData.categories.find(
    (cat) => cat.name === category
  );

  return (
    <Box width={"15rem"}>
      {!subCategory && (
        <Accordion>
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
                  <Button key={subCat}>{subCat}</Button>
                ))}
              </Box>
            ) : (
              <Typography>No subcategories found</Typography>
            )}
          </AccordionDetails>
        </Accordion>
      )}
    </Box>
  );
};

export default Filter;
