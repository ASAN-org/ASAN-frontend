import {
  Box,
  Typography,
  Slider,
  Checkbox,
  FormControlLabel,
  Switch,
  Button,
} from "@mui/material";
import { useState } from "react";

interface FilterOption {
  category: string;
  label: string;
  type: string;
  min?: number;
  max?: number;
  unit?: string;
  options?: string[];
}

type FilterValue = number[] | string[] | boolean;

interface DynamicFilterProps {
  filters: FilterOption[];
  onFilterChange: (filterLabel: string, value: FilterValue) => void;
  filterStates: { [key: string]: FilterValue };
}

const DynamicFilter: React.FC<DynamicFilterProps> = ({
  filters,
  onFilterChange,
  filterStates,
}) => {
  const [showAllOptions, setShowAllOptions] = useState<{
    [key: string]: boolean;
  }>({});

  const renderFilter = (filter: FilterOption) => {
    const currentValue = filterStates[filter.label];
    const uniqueKey = `${filter.category}-${filter.label}`;

    switch (filter.type) {
      case "range": {
        return (
          <Box key={uniqueKey} mb={3}>
            <Typography gutterBottom fontWeight="bold">
              {filter.label}
            </Typography>
            <Slider
              value={
                (currentValue as number[]) || [
                  filter.min || 0,
                  filter.max || 1000000,
                ]
              }
              onChange={(_, newValue) =>
                onFilterChange(filter.label, newValue as number[])
              }
              valueLabelDisplay="auto"
              min={filter.min || 0}
              max={filter.max || 1000000}
              step={(filter.max || 1000000) / 100}
            />
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="body2">
                {(currentValue as number[])?.[0]?.toLocaleString() ||
                  filter.min?.toLocaleString()}{" "}
                {filter.unit || ""}
              </Typography>
              <Typography variant="body2">
                {(currentValue as number[])?.[1]?.toLocaleString() ||
                  filter.max?.toLocaleString()}{" "}
                {filter.unit || ""}
              </Typography>
            </Box>
          </Box>
        );
      }

      case "checklist": {
        // Get options from filter or use default options based on label
        let options = filter.options || [];

        // If no options provided, use default options based on filter label
        if (options.length === 0) {
          switch (filter.label.toLowerCase()) {
            case "color":
              options = [
                "Black",
                "White",
                "Gold",
                "Silver",
                "Blue",
                "Red",
                "Green",
              ];
              break;
            case "internal memory":
              options = ["64GB", "128GB", "256GB", "512GB", "1TB"];
              break;
            case "processor":
              options = [
                "Intel i3",
                "Intel i5",
                "Intel i7",
                "Intel i9",
                "AMD Ryzen 5",
                "AMD Ryzen 7",
              ];
              break;
            case "connection_type":
              options = ["Wired", "Wireless", "Bluetooth"];
              break;
            default:
              options = [
                "Option 1",
                "Option 2",
                "Option 3",
                "Option 4",
                "Option 5",
              ];
          }
        }

        const showAll = showAllOptions[filter.label] || false;
        const displayedOptions = showAll ? options : options.slice(0, 5);

        return (
          <Box key={uniqueKey} mb={3}>
            <Typography gutterBottom fontWeight="bold">
              {filter.label}
            </Typography>
            <Box display="flex" flexDirection="column">
              {displayedOptions.map((option) => (
                <FormControlLabel
                  key={option}
                  control={
                    <Checkbox
                      checked={
                        (currentValue as string[])?.includes(option) || false
                      }
                      onChange={() => {
                        const newValue = (currentValue as string[])?.includes(
                          option
                        )
                          ? (currentValue as string[]).filter(
                              (item: string) => item !== option
                            )
                          : [...((currentValue as string[]) || []), option];
                        onFilterChange(filter.label, newValue);
                      }}
                    />
                  }
                  label={option}
                />
              ))}
            </Box>
            {options.length > 5 && (
              <Button
                size="small"
                onClick={() =>
                  setShowAllOptions((prev) => ({
                    ...prev,
                    [filter.label]: !showAll,
                  }))
                }
                sx={{ mt: 1, alignSelf: "flex-start" }}
              >
                {showAll ? "Show Less" : "Show More"}
              </Button>
            )}
          </Box>
        );
      }

      case "toggle": {
        return (
          <Box key={uniqueKey} mb={3}>
            <Typography gutterBottom fontWeight="bold">
              {filter.label}
            </Typography>
            <Box display="flex" alignItems="center" gap={1}>
              <Typography
                variant="body2"
                color={
                  !(currentValue as boolean) ? "primary" : "text.secondary"
                }
              >
                No
              </Typography>
              <Switch
                checked={(currentValue as boolean) || false}
                onChange={() =>
                  onFilterChange(filter.label, !(currentValue as boolean))
                }
                color="primary"
              />
              <Typography
                variant="body2"
                color={(currentValue as boolean) ? "primary" : "text.secondary"}
              >
                Yes
              </Typography>
            </Box>
          </Box>
        );
      }

      default:
        return null;
    }
  };

  if (filters.length === 0) {
    return (
      <Box p={2}>
        <Typography variant="body2" color="text.secondary">
          No filters available for this category.
        </Typography>
      </Box>
    );
  }

  return <Box>{filters.map(renderFilter)}</Box>;
};

export default DynamicFilter;
