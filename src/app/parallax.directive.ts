import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { fromEvent } from "rxjs";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";


@Directive({
  selector: '[appParallax]'
})
export class ParallaxDirective {

  @Input('appParallax') factor: number;

  constructor(private el: ElementRef,
              private renderer: Renderer2) {
    this.renderer.setStyle(this.el.nativeElement, 'position', 'relative');
    fromEvent(document, 'scroll')
      .subscribe((event: Event) => {
        this.onListenerTriggered(event);
      });
  }

  onListenerTriggered(event: Event): void {

    const rect = this.el.nativeElement.getBoundingClientRect();
    const topShown = rect.top >= 0;
    const bottomShown = rect.bottom <= window.innerHeight;
    const isTestDivScrolledIntoView = topShown || bottomShown;

    isTestDivScrolledIntoView && this.renderer.setStyle(this.el.nativeElement, 'top', `${window.scrollY / this.factor}px`);
  }
}
