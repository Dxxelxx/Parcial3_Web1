import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api", // cambia si usas otro puerto
});

// RESERVAS
export const getReservas = () => api.get("/reservas");
export const createReserva = (data) => api.post("/reservas", data);
export const updateReserva = (id, data) => api.put(`/reservas/${id}`, data);
export const deleteReserva = (id) => api.delete(`/reservas/${id}`);

// CLIENTES
export const getClientes = () => api.get("/clientes");
export const createCliente = (data) => api.post("/clientes", data);
export const updateCliente = (id, data) => api.put(`/clientes/${id}`, data);
export const deleteCliente = (id) => api.delete(`/clientes/${id}`);

// SERVICIOS
export const getServicios = () => api.get("/servicios");
export const createServicio = (data) => api.post("/servicios", data);
export const updateServicio = (id, data) => api.put(`/servicios/${id}`, data);
export const deleteServicio = (id) => api.delete(`/servicios/${id}`);

export default api;

