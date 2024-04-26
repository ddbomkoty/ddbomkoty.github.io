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
  selector: 'app-welcome2',
  templateUrl: './welcome2.component.html',
  styleUrls: ['./welcome2.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class Welcome2Component implements OnInit {
  showChaika = false;
  showBack = false;
  showScrollToTopButton = false;
  isChaikaAway = false;
  isChaikaFlipped = false;
  interval: number;
  maxGalleryHeight: number;
  @ViewChild('audioPlayer') audioPlayer: ElementRef;

  showFlag: boolean = false;
  selectedImageIndex: number = -1;

  showFlag2: boolean = false;
  selectedImageIndex2: number = -1;

  timeout: number | undefined;
  isScrolling = false;
  isScrollingUp = false;
  lastScrollTop = 0;

  portfolioImages: Array<any> = [{
    video: 'https://youtu.be/-y4IV-Jcl74',
    title: 'Дипломный кейс для теле2.',
    imageForVideo: 'assets/portfolio/tele3.jpg'
  }, {
    image: 'assets/portfolio/tabascov.jpg',
    title: 'А что будет, если Баскова скрестить с Табаско? 🤔🤔🤔.',
    class: 'tabascov'
  }, {
    image: 'assets/portfolio/gil.jpg',
    title: 'Текстовый принт для Gillette.',
    class: 'gil'
  }, {
    imageForVideo: 'assets/portfolio/volk3.jpg',
    video: 'https://www.youtube.com/watch?v=a6d8EOc_LQE',
    title: 'Дипломный кейс для бренда одежды Волчок.',
    class: 'volk'
  }];

  myVideos: Array<any> = [{
    video: 'https://www.youtube.com/embed/5E1_lpRtUkU',
    title: 'Видео бренда дождевиков Дождит.',
    imageForVideo: 'assets/rej/doj.jpg',
    class: 'doj'
  }, {
    imageForVideo: 'assets/portfolio/kung.jpg',
    video: 'https://www.youtube.com/embed/2vRRgi7vgm4',
    title: 'Тизер для УМЛАУТ.',
    class: 'umlaut'
  }, {
    video: 'https://www.youtube.com/embed/Zp7vsmlibc0',
    title: 'Видосик для инсты.',
    imageForVideo: 'assets/rej/alina.jpg',
    class: 'alina'
  }, {
    imageForVideo: 'assets/rej/wake.jpg',
    video: 'https://www.youtube.com/embed/6tPACeA5z9g',
    title: 'Вейк станция в Питере.'
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
  }

  @HostListener('window:scroll', ['$event']) // for window scroll events
  onScroll() {
    if (window.scrollY > 100) {
      this.isChaikaAway = true;
    } else {
      this.isChaikaAway = false;
    }

    if (window.scrollY > 700) {
      this.showScrollToTopButton = true;
    } else {
      this.showScrollToTopButton = false;
    }

    clearTimeout(this.timeout);

    if (!this.isScrolling) {
      this.isScrolling = true;
    }

    this.timeout = setTimeout(() => {
      this.isScrolling = false;
      this.cdr.detectChanges();
    }, 200);

    const st = window.pageYOffset || document.documentElement.scrollTop;
    if (st > this.lastScrollTop) {
      this.isScrollingUp = false;
    } else if (st < this.lastScrollTop) {
      this.isScrollingUp = true;
    } // else was horizontal scroll
    this.lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
  }


  showLightbox(index: number) {
    this.selectedImageIndex = index;
    this.showFlag = true;
  }

  closeEventHandler() {
    this.showFlag = false;
    this.selectedImageIndex = -1;
  }

  showLightbox2(index: number) {
    this.selectedImageIndex2 = index;
    this.showFlag2 = true;
  }

  closeEventHandler2() {
    this.showFlag2 = false;
    this.selectedImageIndex2 = -1;
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
  }

  onGalleryHover(event: MouseEvent) {
    if (this.maxGalleryHeight) {
      return;
    }
    // debugger;
    // @ts-ignore
    const a = event.currentTarget.getBoundingClientRect();
    (event.currentTarget as HTMLDivElement).style.maxHeight = a.height + 'px';
    (event.currentTarget as HTMLDivElement).style.transform = 'translateX(-10px)';
    // debugger;
  }
}
