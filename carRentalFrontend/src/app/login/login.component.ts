import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  submitted:boolean = false;


  constructor(private formBuilder:FormBuilder)
  {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void
  {

  }

  loginSubmit()
  {
    console.log(this.loginForm.value);

    this.submitted = true;
    if (this.loginForm.invalid)
    {
      return;
    }
    else
    {
      console.log("Ready to go in Service Logic");

    }
  }
}
