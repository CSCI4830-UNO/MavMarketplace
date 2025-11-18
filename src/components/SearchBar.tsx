import type { ChangeEvent } from "react";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import { FaFilter } from "react-icons/fa6";

import "../css/SearchBar.css";
import "../css/App.css";

interface SearchBarProps {
  onSearch: (value: string) => void;
}

function SearchBar({ onSearch }: SearchBarProps) {
  const [inputText, setInputText] = useState("");

  const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
    onSearch(lowerCase);
  };

  return (
    <div className="search-component">
      <TextField
        className="text-field"
        label="Search Listings"
        variant="outlined"
        placeholder="Search by name"
        size="medium"
        fullWidth
        value={inputText}
        onChange={inputHandler}
      />
      <button className="filter-button">
        <FaFilter />
      </button>
    </div>
  );
}

export default SearchBar;
