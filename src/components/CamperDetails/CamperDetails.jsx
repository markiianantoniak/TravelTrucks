import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCamperById } from "../../redux/campersSlice";
import { toggleFavorite } from "../../redux/favoritesSlice";
import VehicleDetails from "../../components/VehicleDetails/VehicleDetails";
import ReviewsList from "../../components/ReviewsList/ReviewsList";
import BookingForm from "../../components/BookingForm/BookingForm";
import Loader from "../Loader/Loader";
import styles from "./CamperDetails.module.css";

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

  const getFeaturesList = (camper) => {
    const features = [];
    if (camper.transmission) features.push({ name: "Automatic", icon: "🚗" });
    if (camper.engine) features.push({ name: camper.engine, icon: "⛽" });
    if (camper.AC) features.push({ name: "AC", icon: "❄️" });
    if (camper.bathroom) features.push({ name: "Bathroom", icon: "🚿" });
    if (camper.kitchen) features.push({ name: "Kitchen", icon: "🍳" });
    if (camper.TV) features.push({ name: "TV", icon: "📺" });
    if (camper.radio) features.push({ name: "Radio", icon: "📻" });
    if (camper.refrigerator)
      features.push({ name: "Refrigerator", icon: "🧊" });
    if (camper.microwave) features.push({ name: "Microwave", icon: "📱" });
    if (camper.gas) features.push({ name: "Gas", icon: "🔥" });
    if (camper.water) features.push({ name: "Water", icon: "💧" });
    return features;
  };

  if (isLoading) return <Loader />;
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
            ⭐ {currentCamper.rating}({currentCamper.reviews?.length || 0}{" "}
            Reviews)
          </span>
          <span className={styles.location}>📍 {currentCamper.location}</span>
        </div>
        <div className={styles.priceContainer}>
          <span className={styles.price}>€{currentCamper.price}</span>
          <button
            className={`${styles.favoriteBtn} ${
              isFavorite ? styles.favorite : ""
            }`}
            onClick={handleToggleFavorite}
          >
            {isFavorite ? "❤️" : "🤍"}
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
          {activeTab === "features" && (
            <div className={styles.features}>
              <div className={styles.featuresList}>
                {features.map((feature, index) => (
                  <div key={index} className={styles.feature}>
                    <span className={styles.featureIcon}>{feature.icon}</span>
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
        </div>

        <div className={styles.rightPanel}>
          <BookingForm camperId={id} camperName={currentCamper.name} />
        </div>
      </div>
    </div>
  );
};

export default CamperDetails;
