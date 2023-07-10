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

  constructor(private formBuilder: FormBuilder,
    private sharedModule:SharedModule,
    private authService: AuthService) {
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
        .subscribe(res => {
          if (res == "Login Not Success") {
            console.log("Internal Server Error");
          }
          else if (res == "Failed to LoginIn") {
            this.isUserValid = false;
            alert("Invalid Credentials")
          }
          else {
            this.isUserValid = true;
            console.log(res);
            localStorage.setItem('token',res);
            this.sharedModule.showToast("Login Success","Hello","success")
          }
        })
    }
  }
}
