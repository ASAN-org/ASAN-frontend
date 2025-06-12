import { Typography } from "@mui/material";

type FilterProps = {
  type: "range" | "checklist" | "toggle";
  label: string;
  options?: string[];
  min?: number;
  max?: number;
};

const Filter = (filters: FilterProps[]) => {
  return (
    <>
      <Typography>{filters.map((filter) => filter.label)}</Typography>
    </>
  );
};

export default Filter;
