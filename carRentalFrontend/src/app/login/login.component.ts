import { Router } from '@angular/router';
import { UserStoreService } from './../services/user-store.service';
import { SharedModule } from './../shared/shared.module';
import { AuthService } from '../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isUserValid: boolean = false;
  loginForm: FormGroup;
  submitted: boolean = false;
  showPassword: boolean = false;


  constructor(private formBuilder: FormBuilder,
    private sharedModule:SharedModule,
    private authService: AuthService,
    private userStoreService:UserStoreService,
    private router:Router) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  ngOnInit(): void {}

  loginSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }
    else {
      console.log("Ready to go in Service Logic");
      this.authService.loginUser(this.loginForm.value)
        .subscribe(
          res => {
          if (res == "Login Not Success") {
            console.log();
            this.sharedModule.showToast("Internal Server Error","","info")
          }
          else if (res == "Failed to LoginIn") {
            this.isUserValid = false;
            this.sharedModule.showToast("Invalid Credentials","","error")
          }
          else {
            this.isUserValid = true;
            console.log(res);
            localStorage.setItem('token',res);
            const tokenPayload = this.authService.decodedToken();
            this.userStoreService.setFirstNameForStore(tokenPayload.firstname);
            this.userStoreService.setRoleForStore(tokenPayload.role);
            this.sharedModule.showToast("Login Success","","success")
            if(tokenPayload.role==='admin')
            {
              this.router.navigate(['admin/dashboard'])
            }
            else{
              this.router.navigate(['customer'])
            }
          }
        })
    }

  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }


}


