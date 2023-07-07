import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangepasswordComponent implements OnInit {

  changePasswordForm: FormGroup;

  constructor(private formBuilder: FormBuilder,private router:Router,private authService:AuthService)
  {
    this.changePasswordForm = this.formBuilder.group({
      oldPassword: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {
  }

  //on submit
  submitForm()
  {
    console.log(this.changePasswordForm.value);

    if (this.changePasswordForm.invalid) {
      return;
    }
    if(this.changePasswordForm.valid)
    {
      // this.changePasswordForm.value.password=btoa(this.changePasswordForm.value.password);
      // this.changePasswordForm.value.confirmPassword=btoa(this.changePasswordForm.value.confirmPassword);
      this.authService.changePassword(this.changePasswordForm.value)
      .subscribe(res=>{
        console.log(res);
        if(res==="Password changed successfully")
        {
          this.router.navigate(['login'])
        }
        else if(res==="Previous password is incorrect"){
          alert("Previous password is incorrect")
        }
        else{
          console.log("Thulu");

        }
      });
    }
  }

  // for password match
  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null
  {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      return { 'passwordMismatch': true };
    }

    return null;
  }

}
