import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../../redux/favoritesSlice";
import styles from "./CamperCard.module.css";

const CamperCard = ({ camper }) => {
  const dispatch = useDispatch();
  const favoriteIds = useSelector((state) => state.favorites.items);
  const isFavorite = favoriteIds.includes(camper.id);

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(camper.id));
  };

  const getFeatures = () => {
    const features = [];

    if (camper.transmission === "automatic")
      features.push({ key: "automatic", label: "Automatic", icon: "⚙️" });
    if (camper.AC) features.push({ key: "AC", label: "AC", icon: "❄️" });
    if (camper.kitchen)
      features.push({ key: "kitchen", label: "Kitchen", icon: "🍳" });
    if (camper.TV) features.push({ key: "TV", label: "TV", icon: "📺" });
    if (camper.bathroom)
      features.push({ key: "bathroom", label: "Bathroom", icon: "🚿" });
    if (camper.radio)
      features.push({ key: "radio", label: "Radio", icon: "📻" });

    return features.slice(0, 6);
  };

  const features = getFeatures();

  return (
    <div className={styles.card}>
      <div className={styles.imageSection}>
        <img
          src={camper.gallery?.[0]?.thumb || "/placeholder-camper.jpg"}
          alt={camper.name}
          className={styles.image}
          onError={(e) => {
            e.target.src =
              "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjkyIiBoZWlnaHQ9IjIyMCIgdmlld0JveD0iMCAwIDI5MiAyMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyOTIiIGhlaWdodD0iMjIwIiBmaWxsPSIjRjdGN0Y3Ii8+CjxwYXRoIGQ9Ik0xNDYgODBDMTU0LjI4NCA4MDE2MC4yODQgMTAwIDE0NiAxMDBTMTMxLjcxNiAxMDAgMTQ2IDgwWiIgZmlsbD0iI0RBRERFMSIvPgo8dGV4dCB4PSIxNDYiIHk9IjEzNSIgZm9udC1mYW1pbHk9IkludGVyIiBmb250LXNpemU9IjE0IiBmaWxsPSIjNkI3MjgwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5ObyBpbWFnZTwvdGV4dD4KPC9zdmc+";
          }}
        />
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.titleSection}>
            <h3 className={styles.title}>{camper.name}</h3>
            <div className={styles.priceAndFavorite}>
              <span className={styles.price}>€{camper.price}</span>
              <button
                className={`${styles.favoriteButton} ${
                  isFavorite ? styles.favorite : ""
                }`}
                onClick={handleToggleFavorite}
                aria-label={
                  isFavorite ? "Remove from favorites" : "Add to favorites"
                }
              >
                {isFavorite ? "❤️" : "🤍"}
              </button>
            </div>
          </div>

          <div className={styles.rating}>
            <span className={styles.ratingValue}>
              ⭐ {camper.rating} ({camper.reviews?.length || 0} Reviews)
            </span>
            <span className={styles.location}>📍 {camper.location}</span>
          </div>
        </div>

        <p className={styles.description}>{camper.description}</p>

        <div className={styles.features}>
          {features.map(({ key, label, icon }) => (
            <span key={key} className={styles.feature}>
              <span className={styles.featureIcon}>{icon}</span>
              {label}
            </span>
          ))}
        </div>

        <Link
          to={`/catalog/${camper.id}`}
          className={styles.showMoreButton}
          target="_blank"
          rel="noopener noreferrer"
        >
          Show more
        </Link>
      </div>
    </div>
  );
};

export default CamperCard;
