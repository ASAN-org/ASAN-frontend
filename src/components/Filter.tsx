import { Typography } from "@mui/material";

type FilterProps = {
  filters: {
    category: string;
    subCategory?: string;
    type: string;
    label: string;
    options?: string[];
    min?: number;
    max?: number;
  }[];
};

const Filter: React.FC<FilterProps> = ({ filters }) => {
  return (
    <>
      {filters.map((filter) => (
        <Typography key={filter.label}>{filter.label}</Typography>
      ))}
    </>
  );
};

export default Filter;
