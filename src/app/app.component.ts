import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Evaluation Web';
  isconnect = localStorage.getItem('idetudiant');

  constructor(public router:Router){
    if (localStorage.getItem("etudiant")) {
      this.router.navigate(['/']);
    }
    else {
      this.router.navigate(['/login']);
    }
    setInterval(() => {
        this.isconnect = localStorage.getItem('idetudiant');
    }, 1000);
  }
}
