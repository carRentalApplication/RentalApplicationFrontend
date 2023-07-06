import { Brand } from "./Brand.model";
import { Rent } from "./Rent.model";
import { VehicleImages } from "./VehicleImages.model";

export interface Vehicle{
  vehicleId:number;
  vehicleName:string;
  vehicleNumber:string;
  seatingCapacity:number;
  fuelType:string;
  brandId:Brand;
  rent_Id:Rent;
  image_Id:VehicleImages;

}
