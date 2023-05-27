import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  nom='';prenom='';email='';nationalite='';naissance='';tel='';pwd='';cpwd='';identifiant='';
  constructor(private toastr: ToastrService,public http:HttpClient,public router:Router) { }

  ngOnInit(): void {
    this.nom='';this.prenom='';this.email='';this.nationalite='';this.naissance='';this.tel='';this.pwd='';this.cpwd='';
  }

  save(){
    if (this.identifiant && this.nom && this.email && this.tel && this.nationalite && this.naissance && this.pwd && this.cpwd) {
      if (this.pwd == this.cpwd) {
        let postData = new FormData();
        postData.append('nom',this.nom);
        postData.append('prenom',this.prenom);
        postData.append('email',this.email);
        postData.append('telephone',this.tel);
        postData.append('nationalite',this.nationalite);
        postData.append('date_naissance',this.naissance);
        postData.append('identifiant',this.identifiant);
        postData.append('password',this.pwd);
        this.http.post<any>(environment.base_url+'auth/register', postData).subscribe(data => {
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
        this.toastr.error("Les mots de passe ne correspondent pas");
      }
    }
    else{
      this.toastr.error("Vous devez remplir tous les éléments avec étoile");
    }
  }

}
