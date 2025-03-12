import axios from "axios";

// Creamos una instancia de axios para hacer las solicitudes
export const api = axios.create({
  baseURL: "http://localhost:1234",
});

// Interceptor para agregar el token a las cabeceras antes de cada solicitud
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    // Si el token está presente, lo agregamos a las cabeceras de la solicitud
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
