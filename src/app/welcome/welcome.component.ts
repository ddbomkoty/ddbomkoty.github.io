import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { ViewportScroller } from "@angular/common";
import { fromEvent } from "rxjs";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class WelcomeComponent implements OnInit {
  showChaika = false;
  showBack = false;
  isChaikaAway = false;
  isChaikaFlipped = false;
  interval: number;
  @ViewChild('welcome') welcom: ElementRef;
  @ViewChild('audioPlayer') audioPlayer: ElementRef;
  @ViewChild('allContainer') allContainer: ElementRef;

  showFlag: boolean = false;
  selectedImageIndex: number = -1;
  portfolioImages: Array<any> = [{
    image: 'assets/portfolio/dota.jpg',
    title: 'Мы решили пойти по другому пути и внедрить осознанное потребление в виртуальный мир'
  }, {
    image: 'assets/portfolio/tabascov.jpg', // Support base64 image
    title: 'А что будет, если Баскова скрестить с Табаско? 🤔🤔🤔', //Optional: You can use this key if want to show image with title
    class: 'tabascov'
  }, {
    video: 'https://youtu.be/i_tu9DFto7I', // Youtube url
    title: 'реальная работа для российских компаний, производящих музыкальное оборудование и инструменты',
    imageForVideo: 'assets/portfolio/you.png'
  }, {
    image: 'assets/portfolio/dyh.jpg',
    title: 'Как же прекрасен тот факт, что в моей квартире остались вещи бывшей и я их не сжег. Благодаря им в моей голове родился инсайт.' // Optional: Show image with description text
  }, {
    image: 'assets/portfolio/austr.png',
    title: 'Креатив на декабрьский бриф от фестиваля Young Glory, который вошел в «short list» среди студенческих работ' // Optional: Show image with description text
  }, {
    image: 'assets/portfolio/sims.png',
  }];

  constructor(public viewportScroller: ViewportScroller, private cdr: ChangeDetectorRef) {
  }

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


  showLightbox(index: number) {
    this.selectedImageIndex = index;
    this.showFlag = true;
  }

  closeEventHandler() {
    this.showFlag = false;
    this.selectedImageIndex = -1;
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

  onChaikaClick() {
    this.audioPlayer.nativeElement.paused ? this.audioPlayer.nativeElement.play() : this.audioPlayer.nativeElement.pause();
    // if (!this.audioPlayer.nativeElement.paused) {
    //   this.interval = setInterval(() => {
    //     this.isChaikaFlipped = !this.isChaikaFlipped;
    //     debugger;
    //     this.cdr.detectChanges();
    //   }, 1000);
    // } else {
    //   this.stopChaikaFlip();
    // }
  }

  // stopChaikaFlip() {
  //   clearInterval(this.interval);
  //   this.isChaikaFlipped = false;
  //   this.cdr.detectChanges();
  // }

}
