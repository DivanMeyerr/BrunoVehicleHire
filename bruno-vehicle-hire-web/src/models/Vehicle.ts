export interface Vehicle {
  id: string;
  registrationNumber: string;
  make: string;
  model: string;
  year: number;
  createdDate: string;
  deletedDate?: string;
}

export interface VehicleRequest {
  registrationNumber: string;
  make: string;
  model: string;
  year: number;
}
