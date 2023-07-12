import { AuthUser } from "./AuthUser.model";
import { PaymentType } from "./PaymentType.model";
import { Status } from "./Status.model";
import { Vehicle } from "./Vehicle.model";

export class Booking{
  bookingId?:number;
  travellerName?:string;
  travellerNumber?:number;
  pickUpDate?:Date;
  dropDate?:Date;
  bookingTime?:Date;
  pickUpAddress?:string;
  advanceAmount?:number;
  totalAmount?:number;
  status?:Status;
  vehicle?:Vehicle;
  authUser?:AuthUser;
  paymentTpe?:PaymentType;

}
