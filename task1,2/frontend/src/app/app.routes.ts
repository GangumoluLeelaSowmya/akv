import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component'; // Import RegisterComponent
import { AddCourseComponent } from './add-course/add-course.component';
import { DisplayComponent } from './display/display.component';
import { AuthGuard } from './auth.guard';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'register',
    component: RegisterComponent // Add Register route
  },
  {
    path: 'add-course',
    component: AddCourseComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'display',
    component: DisplayComponent,
    canActivate:[AuthGuard]
  },

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

