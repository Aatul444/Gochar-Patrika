import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './pages/verify-email/verify-email.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { NewspaperComponent } from './newspaper/newspaper/newspaper.component';
import { NewsComponent } from './components/news/news.component';

const routes: Routes = [
  {path:"", component:LoginComponent},
  {path:"login", component:LoginComponent},
  {path:"signup", component:SignupComponent},
  {path:"dashboard", component:DashboardComponent},//,canActivate: [AuthGuard]
  {path:"forgotpassword", component:ForgotPasswordComponent},
  {path:"verifyEmail", component:VerifyEmailComponent},
  {path:"newspaper", component:NewspaperComponent},
  {path:"news", component:NewspaperComponent},
  {path:"testGrid", component:NewsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
