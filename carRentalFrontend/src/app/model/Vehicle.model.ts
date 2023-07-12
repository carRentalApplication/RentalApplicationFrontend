import { Brand } from "./Brand.model";
import { Rent } from "./Rent.model";
import { VehicleImages } from "./VehicleImages.model";

export class Vehicle{
  vehicleId?:number;
  vehicleName?:string;
  vehicleNumber?:string;
  seatingCapacity?:number;
  fuelType?:string;
  brand?:Brand;
  rent?:Rent;
  vehicleImages?:VehicleImages[];
}
