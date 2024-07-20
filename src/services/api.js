import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refreshToken");
      const { data } = await axiosInstance.post("token/refresh/", {
        refresh: refreshToken,
      });
      localStorage.setItem("token", data.access);
      axiosInstance.defaults.headers.common["Authorization"] =
        "Bearer " + data.access;
      return axiosInstance(originalRequest);
    }
    return Promise.reject(error);
  }
);

const getCanchas = async () => {
  return await axiosInstance.get("canchas/");
};

const getCanchaById = async (id) => {
  return await axiosInstance.get(`canchas/${id}/`);
};

const registerUser = async (userData) => {
  return await axiosInstance.post("registrar/", userData);
};

const loginUser = async (credentials) => {
  const response = await axiosInstance.post("token/", credentials);
  localStorage.setItem("token", response.data.access);
  localStorage.setItem("refreshToken", response.data.refresh);
  return response;
};

const refreshToken = async (refreshToken) => {
  return await axiosInstance.post("token/refresh/", { refresh: refreshToken });
};

const reservarCancha = async (id_horario) => {
  return await axiosInstance.post(`reservas/${id_horario}/`);
};

const registrarPago = async (pagoData) => {
  return await axiosInstance.post("pagos/registrar/", pagoData);
};

const obtenerHistorialPagos = async () => {
  return await axiosInstance.get("pagos/historial/");
};

const getUserReservations = async () => {
  return await axiosInstance.get("reservas/mis-reservas/");
};

export {
  axiosInstance,
  getCanchas,
  getCanchaById,
  registerUser,
  loginUser,
  refreshToken,
  reservarCancha,
  registrarPago,
  obtenerHistorialPagos,
  getUserReservations,
};
