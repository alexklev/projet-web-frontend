import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ajouteru',
  templateUrl: './ajouteru.component.html',
  styleUrls: ['./ajouteru.component.scss']
})
export class AjouteruComponent implements OnInit {
  types = new Array();
  nom='';prenom='';email='';nationalite='';naissance='';tel='';pwd='';identifiant='';
  idclient = 0;role='invité';
  isubmit=0;
  constructor(public dialogRef: MatDialogRef<AjouteruComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,public toastr:ToastrService,public http:HttpClient) {
      if(data.client){
        this.nom = data.client.nom;
        this.prenom = data.client.prenom;
        this.email = data.client.email;
        this.nationalite = data.client.nationalite;
        this.naissance = data.client.date_naissance;
        this.tel = data.client.telephone;
        this.identifiant = data.client.identifiant;
        this.pwd = data.client.lastpassword;
        this.idclient = data.client.id;
      }
    }

  ngOnInit(): void {
    this.isubmit=0;
  }

  onNoClick(): void {
    this.dialogRef.close({});
  }

  saveandclose(){
      if (this.isubmit == 0) {
        this.isubmit = 1;
        if(this.identifiant && this.nom && this.email && this.tel && this.nationalite && this.naissance && this.pwd){
          const myheader = new HttpHeaders().set('Content-Type', 'application/json; charset=UTF-8');
          if(this.idclient == 0){
            let postData = {
              'nom':this.nom,
              'prenom':this.prenom,
              'email':this.email,
              'telephone':this.tel,
              'nationalite':this.nationalite,
              'date_naissance':this.naissance,
              'identifiant':this.identifiant,
              'password':this.pwd,
              'role':this.role,
            }

            this.http.post<any>(environment.base_url+'users', postData,{headers: myheader}).subscribe(data => {
              this.dialogRef.close({'update':'oui'});
            },
            error =>
            {
              this.isubmit = 0;
              this.toastr.error(error.error.error);
            });
          }
          else{
            let error = 0;
            let postData = {
              'nom':this.nom,
              'prenom':this.prenom,
              'email':this.email,
              'telephone':this.tel,
              'nationalite':this.nationalite,
              'date_naissance':this.naissance,
              'identifiant':this.identifiant,
              'password':this.pwd,
              'role':this.role,
            }

            this.http.post<any>(environment.base_url+'users/'+this.idclient+'?_method=PUT', postData,{headers: myheader}).subscribe(data => {
              this.dialogRef.close({'update':'oui'});
            },
            error =>
            {
              this.isubmit = 0;
              this.toastr.error(error.error.error);
            });
          }
        }
        else{
          this.isubmit = 0;
          this.toastr.error("Vous devez remplir tous les éléments avec étoile.")
        }
      }
  }
}
