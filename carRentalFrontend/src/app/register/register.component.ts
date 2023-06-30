import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registrationForm: FormGroup;

  ngOnInit(): void {

  }

  constructor(private formBuilder: FormBuilder)
  {
    this.registrationForm = this.formBuilder.group({
      first_name: ['', [Validators.required, Validators.pattern(/^[A-Za-z]+$/)]],
      last_name: ['', [Validators.required, Validators.pattern(/^[A-Za-z]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

//on submit
  submitForm()
  {
    if (this.registrationForm.invalid) {
      return;
    }
    if(this.registrationForm.valid)
    {
      //encode the password and confrimpassword
      console.log(this.registrationForm.value);

    }
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
