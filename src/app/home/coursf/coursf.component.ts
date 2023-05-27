import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cours',
  templateUrl: './coursf.component.html',
  styleUrls: ['./coursf.component.scss']
})
export class CoursfComponent implements OnInit {
  types = new Array();
  role = localStorage.getItem('role');
  titre ='';
  constructor(public dialogRef: MatDialogRef<CoursfComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,public toastr:ToastrService,public http:HttpClient) {
      console.log(data.cours);
      if(data.cours){
        this.types = data.cours;
        this.titre = data.titre;
      }
    }

  ngOnInit(): void {

  }

  onNoClick(): void {
    this.dialogRef.close({});
  }
  opendelete(elt:any){
    if(confirm("Voulez-vous vraiment supprimer cette ligne? ")) { const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
      this.http.delete<any>(environment.base_url+'lier/'+elt.idcoursformation,options).subscribe(data => {
        this.onNoClick();
      },
      error =>
      {
        this.toastr.error(error.error.error);
      });
    }
  }

}
