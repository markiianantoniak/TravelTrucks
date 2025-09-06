import styles from "./VehicleDetails.module.css";

const VehicleDetails = ({ camper }) => {
  const details = [
    { label: "Form", value: camper.form },
    { label: "Length", value: camper.length },
    { label: "Width", value: camper.width },
    { label: "Height", value: camper.height },
    { label: "Tank", value: camper.tank },
    { label: "Consumption", value: camper.consumption },
  ].filter((detail) => detail.value);

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Vehicle details</h3>
      <ul className={styles.details}>
        {details.map((detail, index) => (
          <li key={index} className={styles.detail}>
            <span className={styles.label}>{detail.label}</span>
            <span className={styles.value}>{detail.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VehicleDetails;
