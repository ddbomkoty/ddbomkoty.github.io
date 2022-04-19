import { Component, HostListener, OnInit } from '@angular/core';
import { ViewportScroller } from "@angular/common";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  showChaika = false;
  showBack = false;
  isChaikaAway = false;
  isChaikaFlipped = false;

  constructor(public viewportScroller: ViewportScroller) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.showChaika = true;
    }, 4000);
    setTimeout(() => {
      this.showBack = true;
    }, 2000);
  }

  @HostListener('window:scroll', ['$event']) // for window scroll events
  onScroll() {
    if (window.scrollY > 100) {
      this.isChaikaAway = true;
    } else {
      this.isChaikaAway = false;
    }
  }

  onChaikaGone() {
    if (this.isChaikaAway) {
      this.isChaikaFlipped = true;
    } else {
      this.isChaikaFlipped = false;
    }
  }

}
