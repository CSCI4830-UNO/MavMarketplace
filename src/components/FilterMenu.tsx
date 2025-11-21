import {
  Button,
  Checkbox,
  Drawer,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import PriceSlider from "./PriceSlider";
import type { FC } from "react";
import "../css/FilterMenu.css";
import "../css/App.css";

interface FilterMenuProps {
  open: boolean;
  toggleDrawer: (open: boolean) => () => void;
  selectedPriceRange: number[];
  selectedLocations: string[];
  selectedPayments: string[];
  setSelectedPriceRange: (v: number[]) => void;
  setSelectedLocations: (v: string[]) => void;
  setSelectedPayments: (v: string[]) => void;
  applyFilters: () => void;
}

const FilterMenu: FC<FilterMenuProps> = (props) => {
  const {
    open,
    toggleDrawer,
    selectedPriceRange,
    selectedLocations,
    selectedPayments,
    setSelectedPriceRange,
    setSelectedLocations,
    setSelectedPayments,
    applyFilters,
  } = props;

  const togglePriceRange = (_event: Event, newRange: number[]) => {
    if (Array.isArray(newRange)) {
      setSelectedPriceRange(newRange);
    }
  };

  const toggleLocation = (loc: string) => {
    if (selectedLocations.includes(loc)) {
      setSelectedLocations(selectedLocations.filter((l) => l !== loc));
    } else {
      setSelectedLocations([...selectedLocations, loc]);
    }
  };

  const togglePayment = (pay: string) => {
    if (selectedPayments.includes(pay)) {
      setSelectedPayments(selectedPayments.filter((p) => p !== pay));
    } else {
      setSelectedPayments([...selectedPayments, pay]);
    }
  };

  return (
    <Drawer
      className="filter-drawer"
      anchor="left"
      open={open}
      onClose={toggleDrawer(false)}
    >
      <div className="filter-container">
        <h2 className="title">Filter Listings</h2>
        <div className="condition-box">
          <div className="price-box">
            <h3 className="secondary-title">Price Range</h3>
            <p>
              ${selectedPriceRange[0]} - ${selectedPriceRange[1]}
            </p>
            <PriceSlider
              min={0}
              max={1000}
              step={10}
              value={selectedPriceRange.length ? selectedPriceRange : [0, 1000]}
              onChange={togglePriceRange}
              getAriaLabel={() => "Price range"}
              valueLabelDisplay="auto"
              className="price-slider"
            />
          </div>
          <FormGroup>
            <div className="location-box">
              <h3 className="secondary-title">Locations</h3>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedLocations.includes("Scott Village")}
                    onChange={() => toggleLocation("Scott Village")}
                  />
                }
                label="Scott Village"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedLocations.includes("Criss Library")}
                    onChange={() => toggleLocation("Criss Library")}
                  />
                }
                label="Criss Library"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedLocations.includes(
                      "Milo Bail Student Center"
                    )}
                    onChange={() => toggleLocation("Milo Bail Student Center")}
                  />
                }
                label="Milo Bail Student Center"
              />
            </div>
            <div className="payment-box">
              <h3 className="secondary-title">Payment Methods</h3>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedPayments.includes("Venmo")}
                    onChange={() => togglePayment("Venmo")}
                  />
                }
                label="Venmo"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedPayments.includes("Cashapp")}
                    onChange={() => togglePayment("Cashapp")}
                  />
                }
                label="Cashapp"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedPayments.includes("Cash")}
                    onChange={() => togglePayment("Cash")}
                  />
                }
                label="Cash"
              />
            </div>
          </FormGroup>
        </div>
        <Button
          className="submit-button"
          variant="contained"
          onClick={() => {
            applyFilters();
            toggleDrawer(false)();
          }}
        >
          Submit
        </Button>
      </div>
    </Drawer>
  );
};
export default FilterMenu;
