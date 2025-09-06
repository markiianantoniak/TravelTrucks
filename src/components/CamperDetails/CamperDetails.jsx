import { useEffect, useState, lazy, Suspense } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCamperById } from "../../redux/campersSlice";
import { toggleFavorite } from "../../redux/favoritesSlice";
import { getFeaturesList } from "../getFeaturesList";
import styles from "./CamperDetails.module.css";

const icons = import.meta.glob("../../icons/*.svg", {
  eager: true,
  import: "default",
});

const VehicleDetails = lazy(() =>
  import("../../components/VehicleDetails/VehicleDetails")
);
const ReviewsList = lazy(() =>
  import("../../components/ReviewsList/ReviewsList")
);
const BookingForm = lazy(() =>
  import("../../components/BookingForm/BookingForm")
);
const Loader = lazy(() => import("../Loader/Loader"));

const CamperDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("features");

  const { currentCamper, isLoading, error } = useSelector(
    (state) => state.campers
  );
  const favorites = useSelector((state) => state.favorites.items);

  const isFavorite = favorites.includes(id);

  useEffect(() => {
    if (id) {
      dispatch(fetchCamperById(id));
    }
  }, [dispatch, id]);

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(id));
  };

  if (isLoading)
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <Loader />
      </Suspense>
    );

  if (error) return <div className={styles.error}>Error: {error}</div>;
  if (!currentCamper)
    return <div className={styles.error}>Camper not found</div>;

  const features = getFeaturesList(currentCamper);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>{currentCamper.name}</h1>
        <div className={styles.rating}>
          <span className={styles.stars}>
            <img
              src={icons["../../icons/rating.svg"]}
              alt="rating"
              className={styles.icon}
            />{" "}
            {currentCamper.rating} ({currentCamper.reviews?.length || 0}{" "}
            Reviews)
          </span>
          <span className={styles.location}>
            <img
              src={icons["../../icons/location.svg"]}
              alt="location"
              className={styles.icon}
            />{" "}
            {currentCamper.location}
          </span>
        </div>
        <div className={styles.priceContainer}>
          <span className={styles.price}>€{currentCamper.price}</span>
          <button
            className={`${styles.favoriteButton} ${
              isFavorite ? styles.favorite : ""
            }`}
            onClick={handleToggleFavorite}
            aria-label={
              isFavorite ? "Remove from favorites" : "Add to favorites"
            }
          >
            <img
              src={
                isFavorite
                  ? icons["../../icons/heart-liked.svg"]
                  : icons["../../icons/heart.svg"]
              }
              alt={isFavorite ? "Remove from favorites" : "Add to favorites"}
              className={styles.favoriteIcon}
            />
          </button>
        </div>
      </div>

      <div className={styles.gallery}>
        {currentCamper.gallery?.map((image, index) => (
          <img
            key={index}
            src={image.thumb}
            alt={`${currentCamper.name} ${index + 1}`}
            className={styles.galleryImage}
          />
        ))}
      </div>

      <p className={styles.description}>{currentCamper.description}</p>

      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${
            activeTab === "features" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("features")}
        >
          Features
        </button>
        <button
          className={`${styles.tab} ${
            activeTab === "reviews" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("reviews")}
        >
          Reviews
        </button>
      </div>

      <div className={styles.content}>
        <div className={styles.leftPanel}>
          <Suspense fallback={<div>Loading...</div>}>
            {activeTab === "features" && (
              <div className={styles.features}>
                <div className={styles.featuresList}>
                  {features.map((feature, index) => (
                    <div key={index} className={styles.feature}>
                      <img
                        src={feature.icon}
                        alt={feature.name}
                        className={styles.featureIcon}
                      />
                      <span className={styles.featureName}>{feature.name}</span>
                    </div>
                  ))}
                </div>
                <VehicleDetails camper={currentCamper} />
              </div>
            )}

            {activeTab === "reviews" && (
              <ReviewsList reviews={currentCamper.reviews || []} />
            )}
          </Suspense>
        </div>

        <div className={styles.rightPanel}>
          <Suspense fallback={<div>Loading form...</div>}>
            <BookingForm camperId={id} camperName={currentCamper.name} />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default CamperDetails;
