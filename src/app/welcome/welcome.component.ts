import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild
} from '@angular/core';
import { ViewportScroller } from "@angular/common";
import { fromEvent } from "rxjs";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WelcomeComponent implements OnInit {
  showChaika = false;
  showBack = false;
  isChaikaAway = false;
  isChaikaFlipped = false;
  @ViewChild('welcome') welcom: ElementRef;
  @ViewChild('audioPlayer') audioPlayer: ElementRef;
  @ViewChild('allContainer') allContainer: ElementRef;

  constructor(public viewportScroller: ViewportScroller, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.showChaika = true;
      this.cdr.detectChanges();
    }, 4000);
    setTimeout(() => {
      this.showBack = true;
      this.cdr.detectChanges();
    }, 2000);

    // fromEvent(document, 'scroll')
    //   .subscribe((event: Event) => {
    //     event.stopPropagation();
    //     event.preventDefault();
    //     debugger;
    //   });
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

  scrollToElement(element: HTMLDivElement) {
    const SCROLL_TIME_MS = 500;
    const initScrollPosition = document.documentElement.scrollTop || document.body.scrollTop;
    const start = Date.now();
    const rect = element.getBoundingClientRect();
    const scrollEndPosition = rect.y;
    let isFirstTime = true;

    function render() {
      setTimeout(() => {
        isFirstTime = false;
        const deltaTime = Date.now() - start;
        const percentage = Math.min(deltaTime / SCROLL_TIME_MS, 1);
        document.body.scrollTop = document.documentElement.scrollTop = initScrollPosition + scrollEndPosition * percentage;
        if (percentage < 1) {
          render();
        }
      }, isFirstTime ? 50 : 0);
    }
    render();
  }

}
