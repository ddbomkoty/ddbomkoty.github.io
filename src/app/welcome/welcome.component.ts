import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  showChaika = false;
  showBack = false;

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.showChaika = true;
    }, 4000);
    setTimeout(() => {
      this.showBack = true;
    }, 2000);
  }

}
