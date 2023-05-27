import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
identifiant: any;pwd:any;

  constructor(private toastr: ToastrService,public http:HttpClient,public router:Router) { }

  ngOnInit(): void {
    this.identifiant = '';
    this.pwd='';
  }

  save(){
    if (this.identifiant && this.pwd) {
      let postData = new FormData();
      postData.append('identifiant',this.identifiant);
      postData.append('password',this.pwd);
      this.http.post<any>(environment.base_url+'auth/login', postData).subscribe(data => {
        this.toastr.success('Bienvenue '+data.nom);
        this.router.navigate(['/']);
        localStorage.setItem('nom',data.nom);
        localStorage.setItem('role',data.role);
        localStorage.setItem('idetudiant',data.id);
        localStorage.setItem('etudiant',JSON.stringify(data));
      },
      error =>
      {
        if(error.error.error){
            this.toastr.error(error.error.error.toString());
        }
      });
    }
    else{
      this.toastr.error("Vous devez tout remplir");
    }
  }

}
