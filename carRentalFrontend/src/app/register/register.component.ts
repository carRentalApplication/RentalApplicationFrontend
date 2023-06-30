import { AuthService } from '../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registrationForm: FormGroup;

  ngOnInit(): void {

  }
  constructor(private formBuilder: FormBuilder
    , private authService: AuthService,
    private route: Router) {
    this.registrationForm = this.formBuilder.group({
      firstname: ['', [Validators.required, Validators.pattern(/^[A-Za-z]+$/)]],
      lastname: ['', [Validators.required, Validators.pattern(/^[A-Za-z]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      mobileNumber: ['', [Validators.required, Validators.minLength(10),]],
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
          if (res == null)
            alert("Something went wrong")
          else if (res != null) {
            alert("Registerd SuccessFully");
            this.route.navigateByUrl('/login')
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
