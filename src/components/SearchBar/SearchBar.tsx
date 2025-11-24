import type { ChangeEvent, FC } from "react";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import { FaFilter } from "react-icons/fa6";
import FilterMenu from "./FilterMenu/FilterMenu";

import "../../css/SearchBar.css";
import "../../css/App.css";

interface SearchBarProps {
  onSearch: (value: string) => void;
  onFilterChange: (
    priceRange: number[],
    locations: string[],
    payments: string[]
  ) => void;
}

const SearchBar: FC<SearchBarProps> = ({ onSearch, onFilterChange }) => {
  const [inputText, setInputText] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [selectedPriceRange, setSelectedPriceRange] = useState<number[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedPayments, setSelectedPayments] = useState<string[]>([]);

  const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
    onSearch(lowerCase);
  };

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  return (
    <div className="search-component">
      <TextField
        className="text-field"
        label="Search Listings"
        variant="outlined"
        fullWidth
        value={inputText}
        onChange={inputHandler}
      />

      <button
        className="filter-button"
        onClick={toggleDrawer(true)}
        aria-label="Open Filters"
      >
        <FaFilter />
      </button>

      <FilterMenu
        open={drawerOpen}
        toggleDrawer={toggleDrawer}
        selectedPriceRange={selectedPriceRange}
        selectedLocations={selectedLocations}
        selectedPayments={selectedPayments}
        setSelectedPriceRange={setSelectedPriceRange}
        setSelectedLocations={setSelectedLocations}
        setSelectedPayments={setSelectedPayments}
        applyFilters={() =>
          onFilterChange(
            selectedPriceRange,
            selectedLocations,
            selectedPayments
          )
        }
      />
    </div>
  );
};

export default SearchBar;
