import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { element } from 'protractor';



@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit, AfterViewInit {

isJumping = false;
isGameOver = false;
position = 110;
SCORE_PARCIAL: any = 0
highScore: any = 0;
totalScore = 0;
actualScore: any = 0;
score: any;
goku: any;
floor: any;
record: any;
soundToggle: any;
audio1: any;
somHit = new Audio();
somPulo = new Audio();



  constructor(public router: Router) {
    this.somHit.src = '../assets/hit.wav';
    this.somPulo.src = '../assets/pulo.wav';

    window.addEventListener('keyup', (e) => {
     const codigo = e.keyCode;
     if (codigo === 32) {
       this.jump();
     }
     if (codigo === 38) {
       this.jump();
     }
   })
   }


  ngAfterViewInit(): void {
    this.goku = document.querySelector('.goku');
    this.floor = document.querySelector('.floor');
    this.soundToggle = document.querySelector('#soundToggle');
    this.audio1 = document.querySelector('#intro');
    document.addEventListener('keyup', this.handleKeyUp);
    this.playGame();
    this.updateScreen();
  }

  ngOnInit(): void {
  }

  sound(){
    
      let activateSound = false;
  
      let action = !activateSound;
  
      if (!action) {
        this.soundToggle.innerHTML = '<i class="fas fa-volume-mute"></i>'
        this.audio1.pause();
        return activateSound = false;
      } else {
        this.soundToggle.innerHTML = '<i class="fas fa-volume-up"></i>'
        this.audio1.play();
        return activateSound = true;
      }
  }

  playGame() {
    if (this.isGameOver === false) {
      this.scoreParcial();
      this.createMagic();
    }
  }

  scoreParcial() {
    this.SCORE_PARCIAL = setInterval(() => {
      this.totalScore++;
      this.score = this.totalScore;
      this.actualScore = this.totalScore;
      return this.actualScore;
    }, 200);
  }

  stopScore() {
    localStorage.setItem('actualScore', this.actualScore);
    clearInterval(this.SCORE_PARCIAL)
    this.isRecord();
  }

  createMagic() {
    const magic = document.createElement('div');
    let magicPosition = 1200;
    let randomTime = Math.random() * 2000 + Math.random() * 2000;
  
    if (this.isGameOver) return;
  
    magic['classList'].add('magic');
    this.floor.appendChild(magic);
    magic['style'].left = magicPosition + 'px';
    if(magic) {
      this.audio1.play();
    }
  
    let leftTimer = setInterval(() => {
      if (magicPosition < -120) {
        // Final Screen
        clearInterval(leftTimer);
        this.floor.removeChild(magic);
      } else if (magicPosition > 110 && magicPosition < 240 && this.position < 120) {
  
        // Game over
        this.isGameOver = true;
        this.stopScore();
        this.somHit.play();
        
        clearInterval(leftTimer);
      } else {
        magicPosition -= 15;
        magic['style'].left = magicPosition + 'px';
      }
    }, 20);
    setTimeout(this.createMagic, randomTime);
  }

  thereIsData = () => {
    if (this.highScore > 0) {
      return true;
    } else {
      return false;
    }
  }

  isRecord() {
    if (!this.thereIsData) {
      localStorage.setItem('recordScore', this.actualScore);
      return this.highScore = localStorage.getItem('recordScore');
    }
    else {
      let scoreData = localStorage.getItem('recordScore');
      if (this.actualScore >= scoreData) {
        return localStorage.setItem('recordScore', this.actualScore);
      }
    }
  }

  updateScreen() {
    this.record = localStorage.getItem('recordScore');
  }

  jump() {
    this.isJumping = true;
    this.somPulo.play();
  
    let upInterval = setInterval(() => {
      if (this.position >= 360) {
        // Descendo
        clearInterval(upInterval);
        let downInterval = setInterval(() => {
          if (this.position <= 110) {
            clearInterval(downInterval);
            this.isJumping = false;
          } else {
            this.position -= 20;
            this.goku['style'].bottom = this.position + 'px';
          }
        }, 18);
      } else {
        // Subindo
        this.position += 20;
        this.goku['style'].bottom = this.position + 'px';
      }
    }, 25);
  }

  handleKeyUp(event) {
    if (event.keyCode === 32) {
      if (!this.isJumping) {
        this.jump();
      }
    }
    else if (event.keyCode === 38) {
      if (!this.isJumping) {
        this.jump();
      }
    }
  }

  restart() {
    this.isGameOver = false;
    this.score = 0;
    this.totalScore = 0;
    this.playGame();
    this.router.navigateByUrl('/play')
  }

  start() {
    this.router.navigateByUrl('/home')
  }

}
