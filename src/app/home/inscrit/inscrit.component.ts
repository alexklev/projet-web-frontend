import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-inscrit',
  templateUrl: './inscrit.component.html',
  styleUrls: ['./inscrit.component.scss']
})
export class InscritComponent implements OnInit {
  types = new Array();
  titre ='';
  constructor(public dialogRef: MatDialogRef<InscritComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,public toastr:ToastrService,public http:HttpClient) {
      if(data.inscriptions){
        this.types = data.inscriptions;
        this.titre = data.titre;
      }
    }

  ngOnInit(): void {

  }

  onNoClick(): void {
    this.dialogRef.close({});
  }

}
