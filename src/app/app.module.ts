import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { CoursComponent } from './cours/cours.component';
import { RegisterComponent } from './register/register.component';
import { ToastrModule } from 'ngx-toastr/';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TopComponent } from './sidebar/top/top.component';
import { RightComponent } from './sidebar/right/right.component';
import { MatDialogModule} from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AjouterComponent } from './home/ajouter/ajouter.component';
import { InscritComponent } from './home/inscrit/inscrit.component';
import { CoursfComponent } from './home/coursf/coursf.component';
import { UtilisateursComponent } from './utilisateurs/utilisateurs.component';
import { DemandesComponent } from './demandes/demandes.component';
import { InscriptionsComponent } from './inscriptions/inscriptions.component';
import { AjoutercComponent } from './cours/ajouterc/ajouterc.component';
import { FormationComponent } from './cours/formation/formation.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { AjouteruComponent } from './utilisateurs/ajouteru/ajouteru.component';
import { CdkTableExporterModule } from 'cdk-table-exporter';
import { MatTableExporterModule } from 'mat-table-exporter';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ProfileComponent,
    CoursComponent,
    RegisterComponent,
    TopComponent,
    RightComponent,
    AjouterComponent,
    InscritComponent,
    CoursfComponent,
    UtilisateursComponent,
    DemandesComponent,
    InscriptionsComponent,
    AjoutercComponent,
    FormationComponent,
    AjouteruComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    NgSelectModule,
    CdkTableExporterModule,
    MatTableExporterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
