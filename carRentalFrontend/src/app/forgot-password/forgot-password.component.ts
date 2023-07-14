import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  public fogotPasswordForm:FormGroup;

  submitted: boolean = false;
  constructor(private formBuilder: FormBuilder,
    private authService:AuthService) {
    this.fogotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
  }

  fogotPassword(){
    console.log(this.fogotPasswordForm.value);
    this.authService.forgotPassword(this.fogotPasswordForm.value.email).subscribe(res=>{
      console.log(res);

    })
  }
}
