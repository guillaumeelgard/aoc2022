import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DayManager } from 'src/app/days/day-manager';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.less']
})
export class NavComponent {
  @Input() current?: number
  days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]

  constructor(
    private router: Router,
    private dayManager: DayManager,
  ) {
  }

  goto(n: number): void {
    if (this.dayManager.isDayAvailable(n)) {
      this.router.navigate([n])
    }
  }
}
