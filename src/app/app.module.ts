import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule, MatRadioModule } from '@angular/material';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { SignupComponent } from './pages/signup/signup.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { AppRoutes } from './app.routes';
import { LoginResolver } from './provider/login-resolver';
import { AuthResolver } from './provider/auth-resolver';
import { SignupResolver } from './provider/signup-resolver';
import { CommonMethodService } from './provider/common-method.service';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes),
    MatButtonModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatInputModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule
  ],
  providers: [
    CommonMethodService,
    LoginResolver,
    AuthResolver,
    SignupResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
