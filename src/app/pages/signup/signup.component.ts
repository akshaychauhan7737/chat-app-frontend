import { Component, OnInit, Inject } from '@angular/core';
import { CommonMethodService } from '../../provider/common-method.service';
import { AppConfig } from '../../app.config';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  /* Signup form instance */
  public signupForm: FormGroup;
  /* Error message variable  */
  public errorMsg: any = AppConfig.ERROR_MESSAGE;
  constructor(public commonMehod: CommonMethodService, private router: Router, private formBuilder: FormBuilder) {
    this.signupForm = this.formBuilder.group({
      name: ['', Validators.compose([
        Validators.required
      ])],
      email: ['', Validators.compose([
        Validators.required, Validators.pattern(AppConfig.VALIDATION_REGEX.EMAIL_REGEX)
      ])],
      password: ['', Validators.compose([
        Validators.required, Validators.minLength(AppConfig.VALIDATION_REGEX.PASSWORD_MIN_LENGTH)
      ])],
      confirmPassword: ['', Validators.compose([
        Validators.required, Validators.minLength(AppConfig.VALIDATION_REGEX.PASSWORD_MIN_LENGTH)
      ])],
      user_role: ['user']
    });
  }

  ngOnInit() {

  }
  /* Sign up event */
  signup() {
    this.commonMehod.serverRequest(AppConfig.SERVER_URLS.SIGN_UP, 'post', this.signupForm.value)
      .map((response: any) => response.json()).subscribe(
        (success: any) => {
          this.router.navigate(['./home']);
        },
        (error: any) => {
          this.commonMehod.webApiError(error);
        })
  }
}
