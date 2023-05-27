
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ajouterc',
  templateUrl: './ajouterc.component.html',
  styleUrls: ['./ajouterc.component.scss']
})
export class AjoutercComponent implements OnInit {
  types = new Array();
  nom='';statut='';formations:any=[];
  idclient = 0;idformation:any;
  isubmit=0;
  constructor(public dialogRef: MatDialogRef<AjoutercComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,public toastr:ToastrService,public http:HttpClient) {
      if(data.client){
        this.nom = data.client.nom;
        this.statut = data.client.actif;
        this.idclient = data.client.id;
        this.idformation = [];
        data.client.formation.forEach((element:any) => {
          this.idformation.push(element.id)
        });
      }
    }

  ngOnInit(): void {
    this.isubmit=0;
    this.http.get<any>(environment.base_url+'formations').subscribe(data => {
      this.formations = data;
    });
  }

  onNoClick(): void {
    this.dialogRef.close({});
  }

  saveandclose(){
      if (this.isubmit == 0) {
        this.isubmit = 1;
        if(this.nom && this.statut){
          const myheader = new HttpHeaders().set('Content-Type', 'application/json; charset=UTF-8');
          if(this.idclient == 0){
            let postData = {
              'nom':this.nom,
              'actif':this.statut,
              'idformation':this.idformation,
              'user_id':localStorage.getItem('idetudiant')!
            }

            this.http.post<any>(environment.base_url+'cours', postData,{headers: myheader}).subscribe(data => {
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
              'actif':this.statut,
              'idformation':this.idformation,
              'user_id':localStorage.getItem('idetudiant')!
            }

            this.http.post<any>(environment.base_url+'cours/'+this.idclient+'?_method=PUT', postData,{headers: myheader}).subscribe(data => {
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
