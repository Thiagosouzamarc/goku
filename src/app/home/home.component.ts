import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public route: Router) { }

  ngOnInit(): void {
  }
  
  sound() {
    const soundToggle = document.querySelector('#soundToggle');
    const audio1 = document.querySelector('#intro');
    let activateSound = false;

    let action = !activateSound;

    if (!action) {
      soundToggle.innerHTML = '<i class="fas fa-volume-mute"></i>'
      // audio1.pause();
      return activateSound = false;
    } else {
      soundToggle.innerHTML = '<i class="fas fa-volume-up"></i>'
      // audio1.play();
      return activateSound = true;
    }
  }

  restart() {
    this.route.navigateByUrl('/play');
  }
}
