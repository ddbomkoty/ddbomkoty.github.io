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
  showScrollToTopButton = false;
  isChaikaAway = false;
  isChaikaFlipped = false;
  interval: number;
  maxGalleryHeight: number;
  @ViewChild('audioPlayer') audioPlayer: ElementRef;

  showFlag: boolean = false;
  selectedImageIndex: number = -1;
  portfolioImages: Array<any> = [{
    image: 'assets/portfolio/tabascov.jpg',
    title: 'А что будет, если Баскова скрестить с Табаско? 🤔🤔🤔.',
    class: 'tabascov'
  }, {
    image: 'assets/portfolio/dyh.jpg',
    title: 'Как прекрасен тот факт, что в моей квартире остались вещи бывшей и я их не сжег. Благодаря им у меня родился инсайт.'
  }, {
    image: 'assets/portfolio/dota.jpg',
    title: 'Мы решили пойти по другому пути и внедрить осознанное потребление в виртуальный мир.'
  }, {
    image: 'assets/portfolio/durex.jpg',
    title: 'Имиджевый принт для кондомов дюрекс.',
    class: 'durex'
  }, {
    imageForVideo: 'assets/portfolio/booster.jpg',
    video: 'https://youtu.be/17L8vYwvZ24',
    title: 'Пример коммуникации. Коллабы Второго дыхания и стримера Booster\`а для кейса c DOTA2.'
  }, {
    video: 'https://youtu.be/i_tu9DFto7I',
    title: 'реальная работа для российских компаний, производящих музыкальное оборудование и инструменты.',
    imageForVideo: 'assets/portfolio/you.jpg'
  }, {
    image: 'assets/portfolio/austr.jpg',
    title: 'Креатив на декабрьский бриф от фестиваля Young Glory, который вошел в «short list» среди студенческих работ'
  }, {
    image: 'assets/portfolio/sims.jpg',
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
  }

  onGalleryHover(event: MouseEvent) {
    if (this.maxGalleryHeight) {
      return;
    }
    // debugger;
    // @ts-ignore
    const a = event.currentTarget.getBoundingClientRect();
    (event.currentTarget as HTMLDivElement).style.maxHeight = a.height + 'px';
    // debugger;
  }
}
