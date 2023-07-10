import { SharedModule } from './../shared/shared.module';
import { AuthService } from '../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalConstants } from '../shared/global-constants';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registrationForm: FormGroup;

  ngOnInit(): void {

  }
  constructor(private formBuilder: FormBuilder, private sharedModule:SharedModule
    , private authService: AuthService,
    private route: Router) {
    this.registrationForm = this.formBuilder.group({
      firstname: ['', [Validators.required, Validators.pattern(/^[A-Za-z]+$/)]],
      lastname: ['', [Validators.required, Validators.pattern(/^[A-Za-z]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      mobileNumber: ['', [Validators.required, Validators.pattern(GlobalConstants.contactNumberRegex),]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  //on submit
  submitForm() {
    if (this.registrationForm.invalid) {
      return;
    }
    if (this.registrationForm.valid) {
      this.authService.registerUser(this.registrationForm.value)
        .subscribe(res => {
          if (res == null){
            this.sharedModule.showToast('Something went wrong','Hello','error')
          }
          else if (res != null && res=='register success') {
            this.sharedModule.showToast('Success','Registration','success')
            this.route.navigateByUrl('/login')
          }
          else if(res != null && res=='already present') {
            this.sharedModule.showToast('Email already present','Registration','info')
            this.route.navigateByUrl('/login')
          }else{
            this.sharedModule.showToast('Internal server error','Registration','error')
          }
        })
    }
    else
      alert("Another Problem")
  }

  // for password match
  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    if (password !== confirmPassword) {
      return { 'passwordMismatch': true };
    }
    return null;
  }

}
