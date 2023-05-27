import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import * as XLSX from 'xlsx';import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
declare var require: any
declare var $:any;
export interface UsersData {
  nom: string;
  prenom: string;
  identifiant: string;
  email: string;
  nationalite: string;
  date_naissance: string;
  telephone: string;
  photo: string;
  role: string;
  createdAt: string;
  id: number;
}
@Component({
  selector: 'app-demandes',
  templateUrl: './demandes.component.html',
  styleUrls: ['./demandes.component.scss']
})
export class DemandesComponent implements OnInit {

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
  dtOption: any = {};formations:any=[];
  clients = new Array();filtrenom='';filtreformation='';filtrestatut='';
  @ViewChild('TABLE') table: ElementRef | any;
  constructor(public http:HttpClient,public toastr:ToastrService,public dialog:MatDialog) { }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
    this.role = localStorage.getItem('role');
    this.displayedColumns = ['nom', 'prenom','email','nationalite','date_naissance','telephone','is_valider', 'action'];
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
    this.http.get<any>(environment.base_url+'formations').subscribe(data => {
      this.formations = data;
      this.getformation();
    });
  }
  getformation(){
    let data = new FormData();
    if (this.role != 'admin') {
      data.append('actif','1');
    }
    this.http.post<any>(environment.base_url+'searchInscription',data).subscribe((data1:any) => {
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
  changestate(elt:any,etat:any){
    const myheader = new HttpHeaders().set('Content-Type', 'application/json; charset=UTF-8');
    let postData = {
      'user_id':elt.idetudiant,
      'formation_id':elt.idformation,
      'cours_id':'null',
      'is_valider':etat
    }

    this.http.post<any>(environment.base_url+'inscription/'+elt.idinscription+'?_method=PUT', postData,{headers: myheader}).subscribe(data => {
      this.getformation();
    },
    error =>
    {
      this.toastr.error(error.error.error);
    });
  }

  filtre(){
    let data = new FormData();
    data.append('statut',this.filtrestatut);
    data.append('nom',this.filtrenom);
    data.append('idformation',this.filtreformation);
    this.http.post<any>(environment.base_url+'searchInscription',data).subscribe((data1:any) => {
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
      XLSX.writeFile(wb, 'Demande_inscription.xlsx');
    }
    if (type == 'csv') {
      var FileSaver = require('file-saver');

      let elt : any = this.clients.map((RowData:any) => {
        return this.displayedColumns.map((headerKey:any)=>{
          return RowData[headerKey] === null || RowData[headerKey] === undefined ? '' : RowData[headerKey]
        }).join(',')
      }).join('\n');
      const blob = new Blob([elt],{type: 'text/csv'});
      FileSaver.saveAs(blob,'Demande_inscription');
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
        PDF.save('Demande_inscription.pdf');
      });
    }
  }

}
