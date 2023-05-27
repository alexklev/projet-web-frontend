import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  nom='';prenom='';email='';nationalite='';naissance='';tel='';pwd='';identifiant='';role='invite';
  imgprofile: any;couverture: any='';lastdate='';
  constructor(public http:HttpClient,public toastr:ToastrService) { }

  ngOnInit(): void {
    this.http.get<any>(environment.base_url+'users/'+localStorage.getItem('idetudiant')).subscribe(data => {
      this.nom = data.nom;
      this.prenom = data.prenom;
      this.email = data.email;
      this.nationalite = data.nationalite;
      this.naissance = data.date_naissance;
      this.tel = data.telephone;
      this.identifiant = data.identifiant;
      this.role = data.role;
      this.pwd = data.lastpassword;
      this.imgprofile = (data.photo ? environment.base_img+'users/'+data.photo : '');
      this.lastdate = data.lastconnexion.date_connexion;
    });
  }

  onFileChangecouverture(event:any) {
    let size =event.target.files[0].size  / 1024;
    if ( size>300) {
      alert("Votre fichier est trop lourd (plus de 300Ko).");
      this.imgprofile = '';
      this.couverture='';
    }
    else{
      this.couverture = event.target.files[0];
      let reader = new FileReader();
      let self = this;
      reader.onload = function (e: any) {
        self.imgprofile = e.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  openimg1() {
    let element: HTMLElement = document.getElementById('idimg1') as HTMLElement;
    element.click();
  }

  save(){
    console.log(this.couverture);
    if(this.identifiant && this.nom && this.email && this.tel && this.nationalite && this.naissance && this.pwd){
      const httpOptions = {
        headers: new HttpHeaders({
         "Content-Type": "multipart/form-data" // 👈
        })
      };
      // let postData = {
      //   'nom':this.nom,
      //   'prenom':this.prenom,
      //   'email':this.email,
      //   'telephone':this.tel,
      //   'nationalite':this.nationalite,
      //   'date_naissance':this.naissance,
      //   'identifiant':this.identifiant,
      //   'password':this.pwd,
      //   'role':this.role
      // };

      // this.http.post<any>(environment.base_url+'users/'+localStorage.getItem('idetudiant')+'?_method=PUT', postData,{headers: myheader}).subscribe(data => {
      //   this.toastr.error('Modification éffectué avec succès');
      //   this.ngOnInit();
      // },
      // error =>
      // {
      //   this.toastr.error(error.error.error);
      // });

      let postData1 = new FormData;
      postData1.append('nom',this.nom);
      postData1.append('prenom',this.prenom);
      postData1.append('email',this.email);
      postData1.append('telephone',this.tel);
      postData1.append('nationalite',this.nationalite);
      postData1.append('date_naissance',this.naissance);
      postData1.append('identifiant',this.identifiant);
      postData1.append('password',this.pwd);
      postData1.append('role',this.role);
      postData1.append('photo',this.couverture);

      this.http.post<any>(environment.base_url+'users/'+localStorage.getItem('idetudiant')+'?_method=PUT', postData1).subscribe(data => {
        this.toastr.success('Modification éffectué avec succès');
        localStorage.setItem('etudiant',JSON.stringify(data));
        this.ngOnInit();
      },
      error =>
      {
        this.toastr.error(error.error.error);
      });
    }
    else{
      this.toastr.error("Vous devez remplir tous les éléments avec étoile.");
    }
  }

}
