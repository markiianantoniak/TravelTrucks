import axios from "axios";

const BASE_URL = "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io";

const api = axios.create({
  baseURL: BASE_URL,
});

export const getCampers = async (params = {}) => {
  const { page = 1, limit = 4, ...filters } = params;

  try {
    const response = await api.get("/campers", {
      params: {
        page,
        limit,
        ...filters,
      },
    });

    console.log("API response.data:", response.data);
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw new Error(error.response?.data?.message || "Failed to fetch campers");
  }
};

export const getCamperById = async (id) => {
  try {
    const response = await api.get(`/campers/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch camper details"
    );
  }
};

export default api;
