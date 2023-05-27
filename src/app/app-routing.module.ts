import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { CoursComponent } from './cours/cours.component';
import { RegisterComponent } from './register/register.component';
import { UtilisateursComponent } from './utilisateurs/utilisateurs.component';
import { DemandesComponent } from './demandes/demandes.component';
import { InscriptionsComponent } from './inscriptions/inscriptions.component';

const routes: Routes = [
  {
    path:"",component:HomeComponent
  },
  {
    path:"register",component:RegisterComponent
  },
  {
    path:"login",component:LoginComponent
  },
  {
    path:"profile",component:ProfileComponent
  },
  {
    path:"cours",component:CoursComponent
  },
  {
    path:"utilisateurs",component:UtilisateursComponent
  },
  {
    path:"demande",component:DemandesComponent
  },
  {
    path:"inscriptions",component:InscriptionsComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
