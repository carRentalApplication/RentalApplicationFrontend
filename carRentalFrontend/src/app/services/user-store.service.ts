import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {

  private fullName$=new BehaviorSubject<string>("");
  private role$=new BehaviorSubject<string>("");


  constructor() { }

  public getRoleFromStore(){
    return this.role$.asObservable();
  }

  public setRoleForStore(role:string){
    this.role$.next(role)
  }
  public getFirstNameFromStore(){
    return this.fullName$.asObservable();
  }

  public setFirstNameForStore(firstname:string){
    this.fullName$.next(firstname)
  }
}
