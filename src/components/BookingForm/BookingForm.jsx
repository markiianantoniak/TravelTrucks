import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { submitBooking, selectIsSubmitting } from "../../redux/bookingSlice";
import {
  addTimedSuccessNotification,
  addTimedErrorNotification,
} from "../../redux/notificationSlice";
import styles from "./BookingForm.module.css";

const BookingForm = ({ camperId, camperName }) => {
  const dispatch = useDispatch();
  const isSubmitting = useSelector(selectIsSubmitting);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bookingDate: "",
    comment: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.bookingDate) {
      newErrors.bookingDate = "Booking date is required";
    } else {
      const selectedDate = new Date(formData.bookingDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        newErrors.bookingDate = "Booking date cannot be in the past";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const bookingData = {
        ...formData,
        camperId,
        camperName,
        submittedAt: new Date().toISOString(),
      };

      await dispatch(submitBooking(bookingData)).unwrap();

      dispatch(
        addTimedSuccessNotification(
          `Booking confirmed! We'll contact you soon about "${camperName}".`
        )
      );

      setFormData({
        name: "",
        email: "",
        bookingDate: "",
        comment: "",
      });
      setErrors({});
    } catch (error) {
      console.error("Booking submission error:", error);

      dispatch(
        addTimedErrorNotification("Failed to submit booking. Please try again.")
      );
    }
  };

  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Book your campervan now</h3>
      <p className={styles.subtitle}>
        Stay connected! We are always ready to help you.
      </p>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name*"
            className={`${styles.input} ${errors.name ? styles.error : ""}`}
            disabled={isSubmitting}
          />
          {errors.name && (
            <span className={styles.errorText}>{errors.name}</span>
          )}
        </div>

        <div className={styles.inputGroup}>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email*"
            className={`${styles.input} ${errors.email ? styles.error : ""}`}
            disabled={isSubmitting}
          />
          {errors.email && (
            <span className={styles.errorText}>{errors.email}</span>
          )}
        </div>

        <div className={styles.inputGroup}>
          <input
            type="date"
            name="bookingDate"
            value={formData.bookingDate}
            onChange={handleChange}
            min={getMinDate()}
            className={`${styles.input} ${
              errors.bookingDate ? styles.error : ""
            }`}
            disabled={isSubmitting}
          />
          {errors.bookingDate && (
            <span className={styles.errorText}>{errors.bookingDate}</span>
          )}
        </div>

        <div className={styles.inputGroup}>
          <textarea
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            placeholder="Comment"
            rows={4}
            className={styles.textarea}
            disabled={isSubmitting}
          />
        </div>

        <button
          type="submit"
          className={styles.submitButton}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
