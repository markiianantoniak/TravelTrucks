import styles from "./ReviewsList.module.css";

const ReviewsList = ({ reviews }) => {
  const icons = import.meta.glob("../../icons/*.svg", {
    eager: true,
    import: "default",
  });
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={index < rating ? styles.starFilled : styles.starEmpty}
      >
        ⭐
      </span>
    ));
  };

  if (!reviews || reviews.length === 0) {
    return (
      <div className={styles.container}>
        <p className={styles.noReviews}>No reviews yet</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {reviews.map((review, index) => (
        <div key={index} className={styles.review}>
          <div className={styles.reviewHeader}>
            <div className={styles.avatar}>
              {review.reviewer_name?.charAt(0) || "A"}
            </div>
            <div className={styles.reviewerInfo}>
              <h4 className={styles.reviewerName}>{review.reviewer_name}</h4>
              <div className={styles.rating}>
                {renderStars(review.reviewer_rating)}
              </div>
            </div>
          </div>
          <p className={styles.comment}>{review.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default ReviewsList;
