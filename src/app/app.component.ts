import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { animate, style, transition, trigger } from "@angular/animations";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({opacity: 0}),
          animate('300ms', style({opacity: 1}))
        ]),
        transition(':leave', [
          style({opacity: 1}),
          animate('300ms', style({opacity: 0}))
        ])
      ]
    )
  ]
})
export class AppComponent implements OnInit {
  title = 'ddbo';
  // activeLink = '';

  constructor(private router: Router) {
    // debugger;
    // this.activeLink = router.url.replace('/', '');
  }

  ngOnInit(): void {
  }

}
