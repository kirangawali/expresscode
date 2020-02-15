import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { MyHomeComponent } from './my-home/my-home.component';
import { NotFoundComponent } from './not-found/not-found.component'; 

import { GmailComponent } from './gmail/gmail.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatrialModule } from './matrial/matrial.module';
import { MainDataService } from './main-data.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './auth.service';
import { AuthInterceptor } from './auth-interceptor';
import { HeaderComponent } from './header/header.component';
import { AdminComponent } from './admin/admin.component';
import { TrainerComponent } from './trainer/trainer.component';
import { MyDataComponent } from './my-data/my-data.component';
import { ErrorComponent } from './error/error.component';

import {
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule,
  MatProgressSpinnerModule,
  MatPaginatorModule,
  MatDialogModule
} from "@angular/material";
import { ErrorInterceptor } from './error-interceptor';
import { AddNoteComponent } from './add-note/add-note.component';



@NgModule({
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatrialModule,
    HttpClientModule,

    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatDialogModule
   // MatFormFieldModule,
    //MatInputModule,
  //  MatButtonModule,

  ],

  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    MyHomeComponent,
    NotFoundComponent,
    GmailComponent,
    HeaderComponent,
    AdminComponent,
    TrainerComponent,
    MyDataComponent,
    ErrorComponent,
    AddNoteComponent
  ],
  providers: [
                {provide : HTTP_INTERCEPTORS, useClass : AuthInterceptor, multi : true},
               {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
                MainDataService, AuthService],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent]
 
})
export class AppModule { }
