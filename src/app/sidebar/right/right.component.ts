import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-right',
  templateUrl: './right.component.html',
  styleUrls: ['./right.component.scss']
})
export class RightComponent implements OnInit {

  nom : any='';role : any='';imgprofile='';
  constructor(public router:Router) { }

  ngOnInit(): void {
    this.nom = localStorage.getItem('nom');
    this.role = localStorage.getItem('role');
    let user = JSON.parse(localStorage.getItem('etudiant')!);
    this.imgprofile = (user.photo ? environment.base_img+'users/'+user.photo : 'assets/images/profile.jpg');
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
