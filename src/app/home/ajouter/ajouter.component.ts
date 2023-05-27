import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ajouter',
  templateUrl: './ajouter.component.html',
  styleUrls: ['./ajouter.component.scss']
})
export class AjouterComponent implements OnInit {
  types = new Array();
  nom='';niveau='';statut='';datedebut='';datefin='';
  idclient = 0;
  isubmit=0;
  constructor(public dialogRef: MatDialogRef<AjouterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,public toastr:ToastrService,public http:HttpClient) {
      if(data.client){
        this.nom = data.client.nom;
        this.niveau = data.client.niveau;
        this.statut = data.client.statut;
        this.datedebut = data.client.date_debut;
        this.datefin = data.client.date_fin;
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
        if(this.nom && this.niveau && this.statut && this.datedebut && this.datefin){
          const myheader = new HttpHeaders().set('Content-Type', 'application/json; charset=UTF-8');
          if(this.idclient == 0){
            let postData = {
              'nom':this.nom,
              'niveau':this.niveau,
              'statut':this.statut,
              'date_debut':this.datedebut,
              'date_fin':this.datefin,
              'user_id':localStorage.getItem('idetudiant')!
            }

            this.http.post<any>(environment.base_url+'formations', postData,{headers: myheader}).subscribe(data => {
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
              'niveau':this.niveau,
              'statut':this.statut,
              'date_debut':this.datedebut,
              'date_fin':this.datefin,
              'user_id':localStorage.getItem('idetudiant')!
            }

            this.http.post<any>(environment.base_url+'formations/'+this.idclient+'?_method=PUT', postData,{headers: myheader}).subscribe(data => {
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
