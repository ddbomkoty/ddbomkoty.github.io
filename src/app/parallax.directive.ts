import { ChangeDetectorRef, Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { fromEvent } from "rxjs";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";


@Directive({
  selector: '[appParallax]'
})
export class ParallaxDirective {

  DEBOUNCE_TIME_MS = 20;
  previousTime: number;

  @Input('appParallax') factor: number;
  @Input('screenBefore') screenBefore?: number = 0;

  constructor(private el: ElementRef,
              private renderer: Renderer2) {
    this.renderer.setStyle(this.el.nativeElement, 'position', 'relative');
    fromEvent(document, 'scroll')
      .subscribe((event: Event) => {
        this.onListenerTriggered(event);
      });
  }

  onListenerTriggered(event: Event): void {
    const currentTime = Date.now();
    if (this.previousTime && (currentTime - this.previousTime) < this.DEBOUNCE_TIME_MS) {
      return;
    }

    const element = this.el.nativeElement;
    const rect = element.getBoundingClientRect();
    const topShown = rect.top >= 0 && rect.top <= window.innerHeight;
    const bottomShown = rect.bottom <= window.innerHeight + 200 && rect.bottom >= 0;
    const isTestDivScrolledIntoView = topShown || bottomShown;

    const spaceFromElementTopToWindowTop = rect.top;
    // const spaceFromElementBottomToWindowBottom = window.innerHeight - (element.offsetTop + element.offsetHeight);
    const spaceFromElementBottomToWindowBottom = window.innerHeight - (rect.top + rect.height);

    // const isPlus = spaceFromElementTopToWindowTop > spaceFromElementBottomToWindowBottom;

    // const parallaxDelta = (isPlus ? 1 : -1) * (window.innerHeight / 2 - rect.height / 2 - (isPlus ? rect.top : spaceFromElementBottomToWindowBottom));



    isTestDivScrolledIntoView && this.renderer.setStyle(this.el.nativeElement, 'top', `${(window.scrollY - (this.screenBefore || 0) * window.innerHeight) / this.factor}px`);
    // isTestDivScrolledIntoView && this.renderer.setStyle(this.el.nativeElement, 'top', `${(spaceFromElementTopToWindowTop - spaceFromElementBottomToWindowBottom) / this.factor}px`);
    this.previousTime = currentTime;
  }
}
