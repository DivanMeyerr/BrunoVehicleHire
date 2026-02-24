export interface Vehicle {
  id: string;
  registrationNumber: string;
  make: string;
  model: string;
  year: number;
  createdDate: string;
  deletedDate?: string;
}
