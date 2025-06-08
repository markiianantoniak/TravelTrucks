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

  const vehicleEquipment = [
    { key: "AC", label: "AC", icon: "❄️" },
    { key: "automatic", label: "Automatic", icon: "⚙️" },
    { key: "kitchen", label: "Kitchen", icon: "🍳" },
    { key: "TV", label: "TV", icon: "📺" },
    { key: "bathroom", label: "Bathroom", icon: "🚿" },
  ];

  const vehicleTypes = [
    { key: "panelTruck", label: "Van", icon: "🚐" },
    { key: "fullyIntegrated", label: "Fully Integrated", icon: "🏠" },
    { key: "alcove", label: "Alcove", icon: "🏕️" },
  ];

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
          <span className={styles.locationIcon}>📍</span>
        </div>
      </div>

      <div className={styles.divider}></div>

      <div className={styles.filterSection}>
        <h3 className={styles.filterTitle}>Filters</h3>

        <div className={styles.filterGroup}>
          <h4 className={styles.groupTitle}>Vehicle equipment</h4>
          <div className={styles.checkboxGrid}>
            {vehicleEquipment.map(({ key, label, icon }) => (
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
                <span className={styles.icon}>{icon}</span>
                <span className={styles.checkboxLabel}>{label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className={styles.filterGroup}>
          <h4 className={styles.groupTitle}>Vehicle type</h4>
          <div className={styles.radioGrid}>
            {vehicleTypes.map(({ key, label, icon }) => (
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
                <span className={styles.icon}>{icon}</span>
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
