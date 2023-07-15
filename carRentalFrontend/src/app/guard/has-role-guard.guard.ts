import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserStoreService } from '../services/user-store.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HasRoleGuard implements CanActivate {

  constructor(private userStore: UserStoreService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // Checking the role from jwt and authorization
    const userRole = this.userStore.getRoleFromJwtToken(); //role admin


    console.log(userRole);

    if (this.userStore.getRoleFromJwtToken().includes(route.data['role'])) {
      return true;
    }else if(route.data['role1'] == "admin"){
      //admin can also acess the customer routers
      return true;
    }
    else if(route.data['role3'] == ""){
      //admin can also acess the customer routers
      return true;
    }
    else {
      if (this.userStore.getRoleFromJwtToken() === 'admin') {
        // Redirect to the admin home page
        return this.router.navigate(['admin/dashboard']);
      } else if (this.userStore.getRoleFromJwtToken() === 'user') {
        // Redirect to the customer home page
        return this.router.navigate(['home']);
      } else {
        // Redirect to a default page for other roles or unauthorized access
        return this.router.navigate(['login']);
      }
    }

  }
}
