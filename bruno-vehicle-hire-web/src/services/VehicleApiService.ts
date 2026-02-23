import apiClient from "./ApiClient";
import type { Vehicle } from "../models/Vehicle";
import type { PaginatedResult } from "../models/PaginatedResult";

export interface CreateVehicleRequest {
  registrationNumber: string;
  make: string;
  model: string;
  year: number;
}

export interface UpdateVehicleRequest {
  registrationNumber: string;
  make: string;
  model: string;
  year: number;
}

const vehicleService = {
  getAll: (pageNumber: number, pageSize: number, searchTerm: string = "") =>
    apiClient.get<PaginatedResult<Vehicle>>(
      `/vehicles?pageNumber=${pageNumber}&pageSize=${pageSize}&searchTerm=${searchTerm}`,
    ),

  getByRegistration: (registrationNumber: string) =>
    apiClient.get<Vehicle>(`/vehicles/${registrationNumber}`),

  create: (vehicle: CreateVehicleRequest) =>
    apiClient.post<Vehicle>("/vehicles", vehicle),

  update: (id: string, vehicle: UpdateVehicleRequest) =>
    apiClient.put<Vehicle>(`/vehicles/${id}`, vehicle),

  delete: (id: string) => apiClient.delete(`/vehicles/${id}`),
};

export default vehicleService;
