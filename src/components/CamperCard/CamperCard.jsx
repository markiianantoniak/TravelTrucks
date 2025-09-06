import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../../redux/favoritesSlice";
import styles from "./CamperCard.module.css";
import ratingIcon from "../../icons/rating.svg";
const icons = import.meta.glob("../../icons/*.svg", {
  eager: true,
  import: "default",
});

const FEATURES_CONFIG = [
  {
    key: "transmission",
    match: "automatic",
    label: "Automatic",
    icon: "automatic.svg",
  },
  { key: "AC", label: "AC", icon: "ac.svg" },
  { key: "kitchen", label: "Kitchen", icon: "kitchen.svg" },
  { key: "TV", label: "TV", icon: "tv.svg" },
  { key: "bathroom", label: "Bathroom", icon: "shower.svg" },
  { key: "radio", label: "radio", icon: "radio.svg" },
];

const CamperCard = ({ camper }) => {
  const dispatch = useDispatch();
  const favoriteIds = useSelector((state) => state.favorites.items);
  const isFavorite = favoriteIds.includes(camper.id);

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(camper.id));
  };

  const features = FEATURES_CONFIG.filter(({ key, match }) => {
    if (match) return camper[key] === match;
    return camper[key];
  })
    .slice(0, 6)
    .map((feature) => ({
      ...feature,
      icon: icons[`../../icons/${feature.icon}`],
    }));

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
                <img
                  src={
                    isFavorite
                      ? icons["../../icons/heart-liked.svg"]
                      : icons["../../icons/heart.svg"]
                  }
                  alt={
                    isFavorite ? "Remove from favorites" : "Add to favorites"
                  }
                  className={styles.favoriteIcon}
                />
              </button>
            </div>
          </div>

          <div className={styles.rating}>
            <img src={ratingIcon} alt="rating" />

            <span className={styles.ratingValue}>
              {camper.rating} ({camper.reviews?.length || 0} Reviews)
            </span>
            <span className={styles.location}>
              <img
                src={icons["../../icons/location.svg"]}
                alt="location"
                className={styles.icon}
              />{" "}
              {camper.location}
            </span>
          </div>
        </div>

        <p className={styles.description}>{camper.description}</p>

        <div className={styles.features}>
          {features.map(({ key, label, icon }) => (
            <span key={key} className={styles.feature}>
              <img src={icon} alt={label} className={styles.featureIcon} />
              {label}
            </span>
          ))}
        </div>

        <Link
          to={`/campers/${camper.id}`}
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
