import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setLocation,
  setForm,
  toggleFeature,
  clearFilters,
} from "../../redux/filtersSlice";
import { clearCampers } from "../../redux/campersSlice";
import styles from "./FilterSidebar.module.css";

const icons = import.meta.glob("../../icons/*.svg", {
  eager: true,
  import: "default",
});

const VEHICLE_EQUIPMENT = [
  { key: "AC", label: "AC", icon: "ac.svg" },
  { key: "automatic", label: "Automatic", icon: "automatic.svg" },
  { key: "kitchen", label: "Kitchen", icon: "kitchen.svg" },
  { key: "TV", label: "TV", icon: "tv.svg" },
  { key: "bathroom", label: "Bathroom", icon: "shower.svg" },
  { key: "refrigerator", label: "Refrigerator", icon: "refrigerator.svg" },
];

const VEHICLE_TYPES = [
  { key: "panelTruck", label: "Van", icon: "van.svg" },
  { key: "fullyIntegrated", label: "Fully Integrated", icon: "integrated.svg" },
  { key: "alcove", label: "Alcove", icon: "alcove.svg" },
];

const FilterSidebar = ({ onSearch }) => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);

  const handleLocationChange = (e) => {
    dispatch(setLocation(e.target.value));
  };

  const handleFormChange = (form) => {
    dispatch(setForm(filters.form === form ? "" : form));
  };

  const handleFeatureToggle = (feature) => {
    dispatch(toggleFeature(feature));
  };

  const handleSearch = () => {
    dispatch(clearCampers());
    onSearch();
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
    dispatch(clearCampers());
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.filterSection}>
        <label className={styles.label}>Location</label>
        <div className={styles.locationInput}>
          <input
            type="text"
            placeholder="City"
            value={filters.location}
            onChange={handleLocationChange}
            className={styles.input}
          />
          <img
            src={icons["../../icons/location.svg"]}
            alt="Location"
            className={styles.locationIcon}
          />
        </div>
      </div>

      <div className={styles.divider}></div>

      <div className={styles.filterSection}>
        <h3 className={styles.filterTitle}>Filters</h3>
        <div className={styles.filterGroup}>
          <h4 className={styles.groupTitle}>Vehicle equipment</h4>
          <div className={styles.checkboxGrid}>
            {VEHICLE_EQUIPMENT.map(({ key, label, icon }) => (
              <label
                key={key}
                className={`${styles.checkboxItem} ${
                  filters.features[key] ? styles.checked : ""
                }`}
              >
                <input
                  type="checkbox"
                  checked={filters.features[key]}
                  onChange={() => handleFeatureToggle(key)}
                  className={styles.hiddenCheckbox}
                />
                <img
                  src={icons[`../../icons/${icon}`]}
                  alt={label}
                  className={styles.icon}
                />
                <span className={styles.checkboxLabel}>{label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className={styles.filterGroup}>
          <h4 className={styles.groupTitle}>Vehicle type</h4>
          <div className={styles.radioGrid}>
            {VEHICLE_TYPES.map(({ key, label, icon }) => (
              <label
                key={key}
                className={`${styles.radioItem} ${
                  filters.form === key ? styles.checked : ""
                }`}
              >
                <input
                  type="radio"
                  name="vehicleType"
                  checked={filters.form === key}
                  onChange={() => handleFormChange(key)}
                  className={styles.hiddenRadio}
                />
                <img
                  src={icons[`../../icons/${icon}`]}
                  alt={label}
                  className={styles.icon}
                />
                <span className={styles.radioLabel}>{label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.actionButtons}>
        <button className={styles.searchButton} onClick={handleSearch}>
          Search
        </button>
        <button className={styles.clearButton} onClick={handleClearFilters}>
          Clear filters
        </button>
      </div>
    </div>
  );
};

export default FilterSidebar;
