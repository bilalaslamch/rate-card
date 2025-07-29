import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.API_BASE_URL,
});

export const ENDPOINTS = {
  Calculators: {
    getCustomResourceRates: "/api/calculators/custom-resource",
  },
};
