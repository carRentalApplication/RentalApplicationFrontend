import { ResetPassword } from './../model/reset-password-model';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  resetPasswordForm: FormGroup;
  emailToRest!: string;
  emailToken!: string;
  resetPasswordObj = new ResetPassword();

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute) {
    this.resetPasswordForm = this.formBuilder.group({
      newPassword: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });


    this.activatedRoute.queryParams.subscribe(res => {
      this.emailToRest=res['email'];
      let uriToken=res['code']

      this.emailToken=uriToken.replace(/ /g,'+');
      console.log( this.emailToRest);
      console.log(this.emailToken);

    })

  }
  ngOnInit(): void {

  }
  //on submit
  submitForm() {
    console.log(this.resetPasswordForm.value);
    if (this.resetPasswordForm.invalid) {
      return;
    }
    if (this.resetPasswordForm.valid) {
      // this.resetPasswordForm.value.password=btoa(this.resetPasswordForm.value.password);
      // this.resetPasswordForm.value.confirmPassword=btoa(this.resetPasswordForm.value.confirmPassword);
      this.resetPasswordObj.email=this.emailToRest;
      this.resetPasswordObj.newPassword=this.resetPasswordForm.value.newPassword;
      this.resetPasswordObj.confirmPassword=this.resetPasswordForm.value.confirmPassword;
      this.resetPasswordObj.emailToken=this.emailToken;
      console.log(this.resetPasswordForm.value);
      console.log(this.resetPasswordObj);

      this.authService.resetPassword(this.resetPasswordObj)
      .subscribe(res=>{
        console.log(res);
        if(res==="Reset Password successfully")
        {
          this.router.navigate(['login'])
        }
        else if(res==="Previous password is incorrect"){
          alert("Previous password is incorrect")
        }
        else{
          console.log("Thulu");
          this.router.navigate(['login'])
        }
      });
    }
  }

  // for password match
  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const newPassword = control.get('newPassword')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (newPassword !== confirmPassword) {
      return { 'passwordMismatch': true };
    }
    return null;
  }

}
