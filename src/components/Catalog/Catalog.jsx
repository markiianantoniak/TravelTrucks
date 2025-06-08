import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import CamperCard from "../../components/CamperCard/CamperCard";
import FilterSidebar from "../../components/FilterSidebar/FilterSidebar";
import Loader from "../../components/Loader/Loader";
import {
  fetchCampers,
  clearCampers,
  incrementPage,
} from "../../redux/campersSlice";
import styles from "./Catalog.module.css";

const Catalog = () => {
  const dispatch = useDispatch();

  const campersState = useSelector((state) => {
    console.log("Full Redux state:", state);
    console.log("Campers state:", state.campers);
    return state.campers;
  });

  const { items = [], loading, hasMore, page } = campersState;
  const filters = useSelector((state) => state.filters);

  console.log(
    "Items type:",
    typeof items,
    "Is array:",
    Array.isArray(items),
    "Items:",
    items
  );

  const buildSearchParams = useCallback(() => {
    const searchParams = {};

    if (filters.location) {
      searchParams.location = filters.location;
    }

    if (filters.form) {
      searchParams.form = filters.form;
    }

    if (filters.features) {
      Object.entries(filters.features).forEach(([key, value]) => {
        if (value) {
          if (key === "automatic") {
            searchParams.transmission = "automatic";
          } else {
            searchParams[key] = true;
          }
        }
      });
    }

    return searchParams;
  }, [filters]);

  const handleSearch = useCallback(() => {
    const searchParams = buildSearchParams();
    console.log("Search params:", searchParams);

    dispatch(
      fetchCampers({
        ...searchParams,
        page: 1,
        limit: 4,
      })
    );
  }, [dispatch, buildSearchParams]);

  useEffect(() => {
    dispatch(clearCampers());
    handleSearch();
  }, [dispatch, handleSearch]);

  const handleLoadMore = () => {
    const searchParams = buildSearchParams();

    dispatch(incrementPage());
    dispatch(
      fetchCampers({
        ...searchParams,
        page: page + 1,
        limit: 4,
      })
    );
  };

  const safeItems = Array.isArray(items) ? items : [];

  return (
    <div className={styles.catalog}>
      <div className="container">
        <div className={styles.catalogContent}>
          <FilterSidebar onSearch={handleSearch} />

          <div className={styles.campersSection}>
            {loading && safeItems.length === 0 ? (
              <Loader />
            ) : (
              <>
                <div className={styles.campersGrid}>
                  {safeItems.map((camper) => (
                    <CamperCard key={camper.id} camper={camper} />
                  ))}
                </div>

                {safeItems.length === 0 && !loading && (
                  <div className={styles.noResults}>
                    <p>No campers found matching your criteria.</p>
                  </div>
                )}

                {hasMore && safeItems.length > 0 && (
                  <div className={styles.loadMoreSection}>
                    <button
                      className={styles.loadMoreButton}
                      onClick={handleLoadMore}
                      disabled={loading}
                    >
                      {loading ? "Loading..." : "Load more"}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Catalog;
