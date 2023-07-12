
import { AuthUser } from "./AuthUser.model";
import { PaymentType } from "./PaymentType.model";
import { Status } from "./Status.model";
import { Vehicle } from "./Vehicle.model";

export class Booking{
  bookingId?:number;
  travellerName?:string;
  travellerNumber?:number;
  pickUpDate?:string;
  dropDate?:string;
  bookingTime?:string;
  pickUpAddress?:string;
  totalAmount?:number;
  status?:Status;
  vehicle?:Vehicle;
  authUser?:AuthUser;
  paymentTpe?:PaymentType;
}
