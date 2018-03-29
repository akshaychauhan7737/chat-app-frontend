import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LoginResolver } from './provider/login-resolver';
import { AuthResolver } from './provider/auth-resolver';
import { HomeComponent } from './pages/home/home.component';
import { SignupComponent } from './pages/signup/signup.component';
export const AppRoutes: Routes = [
    {
        path: 'login', component: LoginComponent, resolve: {
            userDetail: LoginResolver
        }
    },
    {
        path: 'home', component: HomeComponent, resolve: {
            userDetail: AuthResolver
        }
    },
    {
        path: 'signup', component: SignupComponent, resolve: {
            userDetail: LoginResolver
        }
    },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
];