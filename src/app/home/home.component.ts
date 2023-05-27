import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { AjouterComponent } from './ajouter/ajouter.component';
import { InscritComponent } from './inscrit/inscrit.component';
import { CoursfComponent } from './coursf/coursf.component';
import * as XLSX from 'xlsx';import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
declare var require: any
declare var $:any;
export interface UsersData {
  nom: string;
  niveau: string;
  date_debut: string;
  date_fin: string;
  statut: string;
  cours: [];
  inscrits: [];
  createdAt: string;
  id: number;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild(MatTable,{static:true}) mytable: MatTable<any> | any;
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  displayedColumns: string[] = [];
  // dataSource = ELEMENT_DATA;
  ELEMENT_DATA: UsersData[] = [];
  dataSource: MatTableDataSource<UsersData> = new MatTableDataSource();
  totalRows = 0;
  pageSize = 10;
  currentPage = 0;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  role = localStorage.getItem('role');
  dtOption: any = {};
  clients = new Array();filtrenom='';filtreniveau='';filtrestatut='';filtredate='';filtredatef='';
  @ViewChild('TABLE') table: ElementRef | any;
  constructor(public http:HttpClient,public toastr:ToastrService,public dialog:MatDialog) { }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
    this.role = localStorage.getItem('role');
    if (this.role == 'admin') {
      this.displayedColumns = ['nom', 'niveau', 'date_debut', 'date_fin','statut','nbcours','nbinscription', 'action'];
    }
    else{
      this.displayedColumns = ['nom', 'niveau', 'date_debut', 'date_fin','nbcours', 'action'];
    }
    this.dtOption = {
      destroy: true,
      "paging":   true,
      "ordering": true,
      "info":     false,
      dom: 'Bfrtip',
      buttons: [
          'copy', 'csv', 'excel', 'pdf', 'print'
      ]
    };
    this.getformation();
  }
  getformation(){
    let data = new FormData();
    if (this.role != 'admin') {
      data.append('statut','1');
    }
    this.http.post<any>(environment.base_url+'searchFormation',data).subscribe((data1:any) => {
      data1.sort((a: any, b: any) => (a.created_at > b.created_at ? -1 : 1));
      this.clients = data1;
      this.dataSource.data = data1;
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
        this.paginator.pageIndex = 0;
        this.paginator.length = data1.count;
      });
    },
    error =>
    {
      this.toastr.error(error.error.error);
    });
  }
  opendelete(elt:any){
    if(confirm("Voulez-vous vraiment supprimer cette formation? ")) { const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
      this.http.delete<any>(environment.base_url+'formations/'+elt.id,options).subscribe(data => {
        this.getformation();
        // location.reload();
      },
      error =>
      {
        this.toastr.error(error.error.error);
      });
    }
  }
  openupdate(elt:any){
    const dialogRef = this.dialog.open(AjouterComponent, {
      width: '800px',
      data: {'client':elt}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.update){
        this.getformation();
      }
    });
  }
  openDialog(){
    const dialogRef = this.dialog.open(AjouterComponent, {
      width: '800px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.update){
        this.getformation();
      }
    });
  }

  openinscriptions(elt:any){
    const dialogRef = this.dialog.open(InscritComponent, {
      width: '800px',
      data: {'inscriptions':elt.inscrits,titre:elt.nom}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getformation();
    });
  }

  opencours(elt:any){
    const dialogRef = this.dialog.open(CoursfComponent, {
      width: '800px',
      data: {'cours':elt.cours,titre:elt.nom}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getformation();
    });
  }

  addinscription(elt:any){
    if (elt.inscrits.filter((item:any) => item.id == localStorage.getItem('idetudiant')).length == 0) {
      let data = new FormData();
      data.append('user_id',localStorage.getItem('idetudiant')!);
      data.append('formation_id',elt.id);
      data.append('cours_id','null');
      data.append('is_valider','0');
      this.http.post<any>(environment.base_url+'inscription',data).subscribe((data1:any) => {
        this.toastr.success("Votre demande d'inscription a cette formation a bien été enregistré");
      },
      error =>
      {
        this.toastr.error(error.error.error);
      });
    }
    else{
      alert('Vous êtes déjà inscrit à cette formation');
    }
  }

  filtre(){
    let data = new FormData();
    data.append('statut',this.filtrestatut);
    data.append('niveau',this.filtreniveau);
    data.append('date',(this.filtredate ? this.filtredate : this.filtredatef));
    data.append('nom',this.filtrenom);
    this.http.post<any>(environment.base_url+'searchFormation',data).subscribe((data1:any) => {
      this.clients = data1;
      this.dataSource.data = data1;
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
        this.paginator.pageIndex = 0;
        this.paginator.length = data1.count;
      });
    },
    error =>
    {
      this.toastr.error(error.error.error);
    });
  }

  exportTable(type:any){
    if (type == 'xlsx') {
      const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.table.nativeElement);//converts a DOM TABLE element to a worksheet
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

      /* save to file */
      XLSX.writeFile(wb, 'Formations.xlsx');
    }
    if (type == 'csv') {
      var FileSaver = require('file-saver');

      let elt : any = this.clients.map((RowData:any) => {
        return this.displayedColumns.map((headerKey:any)=>{
          return RowData[headerKey] === null || RowData[headerKey] === undefined ? '' : RowData[headerKey]
        }).join(',')
      }).join('\n');
      const blob = new Blob([elt],{type: 'text/csv'});
      FileSaver.saveAs(blob,'Formations');
    }
    if (type == 'pdf') {
      let DATA: any = document.getElementById('htmlData');
      html2canvas(DATA).then((canvas) => {
        let fileWidth = 208;
        let fileHeight = (canvas.height * fileWidth) / canvas.width;
        const FILEURI = canvas.toDataURL('image/png');
        let PDF = new jsPDF('p', 'mm', 'a4');
        let position = 0;
        PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
        PDF.save('Formations.pdf');
      });
    }
  }

}
