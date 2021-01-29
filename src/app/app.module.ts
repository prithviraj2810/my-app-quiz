import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireFunctionsModule, ORIGIN } from '@angular/fire/functions';

import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { FirebaseService } from './firebase.service';
import { Guard } from './guard.service';
import { ExamGuardService } from './exam-guard.service';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { NavbarComponent } from './navbar/navbar.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { TestComponent } from './test/test.component';
import { ProfileComponent } from './profile/profile.component';
import { InstructionsComponent } from './instructions/instructions.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    RegisterComponent,
    HomeComponent,
    FooterComponent,
    TestComponent,
    ProfileComponent,
    InstructionsComponent,
  ],
  imports: [
    BrowserModule,
    AngularFireFunctionsModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  providers: [
    FirebaseService,
    Guard,
    ExamGuardService,
    //{ provide: ORIGIN, useValue: 'https://assistme-39d97.web.app' }
    { provide: ORIGIN, useValue: 'http://localhost:5001' }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
