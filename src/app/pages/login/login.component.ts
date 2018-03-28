import { Component, OnInit, Inject } from '@angular/core';
import { CommonMethodService } from '../../provider/common-method.service';
import { AppConfig } from '../../app.config';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private loginForm: FormGroup;
  constructor(private commonMehod: CommonMethodService, private router: Router, private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([
        Validators.required, Validators.pattern(AppConfig.VALIDATION_REGEX.EMAIL_REGEX)
      ])],
      password: ['', Validators.compose([
        Validators.required, Validators.minLength(6)
      ])]
    });
  }

  ngOnInit() {

  }

  login() {
    console.log('login')
    this.commonMehod.serverRequest(AppConfig.SERVER_URLS.LOGIN, 'post', this.loginForm.value)
      .map((response: any) => response.json()).subscribe(
        (success: any) => {
          console.log(success)
          this.router.navigate(['./home']);
        },
        (error: any) => {
          this.commonMehod.webApiError(error);
        })
  }
}
