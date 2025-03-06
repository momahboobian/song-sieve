import Image from "next/image";
import { useEffect, useState } from "react";
import { useFilterOptionsStore } from "@/app/lib/filterOptionsStore";

import "./FilterOptions.css";

export interface FilterOptions {
  selectedDuration: string | null;
  explicit: string | null;
}

const FilterOptions = () => {
  const {
    selectedDuration,
    explicit,
    isMobileFilterOptionsOpen,
    setIsMobileFilterOptionsOpen,
    setFilterOptions,
    clearAllFilters,
  } = useFilterOptionsStore();

  const [isAnyOptionSelected, setIsAnyOptionSelected] =
    useState<boolean>(false);
  const [tracksArr, setTracksArr] = useState<any[]>([]); // Assuming tracksArr is managed elsewhere

  const durations = [
    "less than 2 minutes",
    "2-5 minutes",
    "5-10 minutes",
    "more than 10 minutes",
  ];
  const explicitOptions = ["Yes", "No"];

  const handleCheckboxChange = (
    type: keyof { selectedDuration: string | null; explicit: string | null },
    value: string
  ) => {
    setFilterOptions({
      ...useFilterOptionsStore.getState(),
      [type]: selectedDuration === value || explicit === value ? null : value,
    });
  };

  //check if any of checkboxes is checked for displaying clear button
  useEffect(() => {
    const isSelected = selectedDuration !== null || explicit !== null;
    setIsAnyOptionSelected(isSelected);
  }, [selectedDuration, explicit]);

  return (
    <div
      className={`filter-options ${
        isMobileFilterOptionsOpen ? "mobile-filter-options" : ""
      }`}
    >
      <div className="filter-close">
        <div className="filter-icon-title">
          <Image
            src="/icons/filter-icon.svg"
            width={25}
            height={25}
            alt="Filter icon"
          />
          <p>Filter</p>
        </div>
        {isMobileFilterOptionsOpen && (
          <Image
            src="/icons/x-icon.svg"
            width={17}
            height={17}
            alt="Close icon"
            className="close-filters-icons"
            onClick={() =>
              setIsMobileFilterOptionsOpen(!isMobileFilterOptionsOpen)
            }
          />
        )}
      </div>

      <fieldset className="checkbox-container">
        <legend>Duration</legend>
        {durations.map((duration) => (
          <div key={duration}>
            <input
              type="checkbox"
              id={duration}
              name="duration"
              checked={selectedDuration === duration}
              onChange={() =>
                handleCheckboxChange("selectedDuration", duration)
              }
              aria-labelledby={duration}
            />
            <label htmlFor={duration} id={duration}>
              {duration}
            </label>
          </div>
        ))}
      </fieldset>

      <fieldset className="checkbox-container">
        <legend>Explicit</legend>
        {explicitOptions.map((option) => (
          <div key={option}>
            <input
              type="checkbox"
              id={option}
              name="explicit"
              checked={explicit === option}
              onChange={() => handleCheckboxChange("explicit", option)}
              aria-labelledby={option}
            />
            <label htmlFor={option} id={option}>
              {option}
            </label>
          </div>
        ))}
      </fieldset>

      {isAnyOptionSelected && (
        <button className="clear-filter-button" onClick={clearAllFilters}>
          Clear all filters
        </button>
      )}
      <p className="filter-result">Found {tracksArr?.length} tracks</p>
    </div>
  );
};

export default FilterOptions;
