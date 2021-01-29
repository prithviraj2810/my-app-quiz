import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { TestComponent } from './test/test.component';
import { ProfileComponent } from './profile/profile.component';
import {InstructionsComponent} from './instructions/instructions.component'
import { Guard } from './guard.service';
const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'test', canActivate : [ Guard ], component: TestComponent},
  {path: 'profile', canActivate : [ Guard ], component: ProfileComponent},
  {path: 'instructions', canActivate : [ Guard ],component: InstructionsComponent}
  
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
