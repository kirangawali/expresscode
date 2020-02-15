import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MyHomeComponent } from './my-home/my-home.component';
import { GmailComponent } from './gmail/gmail.component';
import { AuthGuard } from './auth.guard';
import { AdminComponent } from './admin/admin.component';
import { TrainerComponent } from './trainer/trainer.component';
import { MyDataComponent } from './my-data/my-data.component';


const routes: Routes = [

  { path : '', redirectTo :'/home' , pathMatch: 'full' },
  { path : 'home', component : MyHomeComponent },
  { path : 'gmail', component : GmailComponent },
  { path : 'admin', component : AdminComponent  },
  { path : 'trainer', component : TrainerComponent },
  { path : 'myData', component : MyDataComponent },
  { path : 'login', component : LoginComponent },
  { path : 'signUp', component : SignupComponent },
  { path : '**', component : NotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers : [AuthGuard]
})
export class AppRoutingModule { }
