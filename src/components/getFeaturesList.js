const icons = import.meta.glob("../icons/*.svg", {
  eager: true,
  import: "default",
});

const FEATURES_CONFIG = [
  { key: "transmission", name: "Automatic", icon: "automatic.svg" },
  { key: "engine", name: (value) => value, icon: "petrol.svg" },
  { key: "AC", name: "AC", icon: "ac.svg" },
  { key: "bathroom", name: "Bathroom", icon: "shower.svg" },
  { key: "kitchen", name: "Kitchen", icon: "kitchen.svg" },
  { key: "TV", name: "TV", icon: "tv.svg" },
  { key: "radio", name: "Radio", icon: "radio.svg" },
  { key: "refrigerator", name: "Refrigerator", icon: "refrigerator.svg" },
  { key: "microwave", name: "Microwave", icon: "microwave.svg" },
  { key: "gas", name: "Gas", icon: "gas.svg" },
  { key: "water", name: "Water", icon: "water.svg" },
];

export const getFeaturesList = (camper) =>
  FEATURES_CONFIG.filter((feature) => camper[feature.key]).map((feature) => ({
    name:
      typeof feature.name === "function"
        ? feature.name(camper[feature.key])
        : feature.name,
    icon: icons[`../icons/${feature.icon}`],
  }));
