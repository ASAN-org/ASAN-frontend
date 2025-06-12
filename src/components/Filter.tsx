import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import webShopData from "../../public/data/webshop.json";

type FilterProps = {
  category: string;  // Changed from _category to match usage
  subCategory?: string;
  type: string;
  label: string;
  options?: string[];
  min?: number;
  max?: number;
};

const Filter: React.FC<FilterProps> = ({
  category,  
}) => {
  const filteredCategory = webShopData.categories.find(
    (cat) => cat.name === category
  );

  return (
    <Box width={"20rem"}>
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
            <Box>
              {filteredCategory.children.map((subCat) => (
                <Typography key={subCat}>{subCat}</Typography>
              ))}
            </Box>
          ) : (
            <Typography>No subcategories found</Typography>
          )}
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default Filter;