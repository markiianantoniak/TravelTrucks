import React, { useEffect, useCallback, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCampers,
  clearCampers,
  incrementPage,
} from "../../redux/campersSlice";
import styles from "./Catalog.module.css";
const FilterSidebar = lazy(() =>
  import("../../components/FilterSidebar/FilterSidebar")
);
const CamperCard = lazy(() => import("../../components/CamperCard/CamperCard"));
const Loader = lazy(() => import("../../components/Loader/Loader"));

const Catalog = () => {
  const dispatch = useDispatch();

  const campersState = useSelector((state) => state.campers);
  const { items = [], loading, hasMore, page } = campersState;
  const filters = useSelector((state) => state.filters);

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
          <Suspense fallback={<div>Loading filters...</div>}>
            <FilterSidebar onSearch={handleSearch} />
          </Suspense>

          <div className={styles.campersSection}>
            {loading && safeItems.length === 0 ? (
              <Suspense fallback={<div>Loading...</div>}>
                <Loader />
              </Suspense>
            ) : (
              <>
                <div className={styles.campersGrid}>
                  <Suspense fallback={<div>Loading campers...</div>}>
                    {safeItems.map((camper) => (
                      <CamperCard key={camper.id} camper={camper} />
                    ))}
                  </Suspense>
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
