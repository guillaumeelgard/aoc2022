import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DayData } from 'src/app/days/day-data.interface';
import { DayManager } from 'src/app/days/day-manager';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less']
})
export class MainComponent implements OnInit, OnDestroy {
  current?: number
  dayData: DayData = {
    step1: '',
    step2: '',
  }
  private subscription!: Subscription

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dayManager: DayManager,
  ) {
  }

  async ngOnInit(): Promise<void> {
    this.subscription = this.route.paramMap.subscribe(async (params) => {
      const id = Number(params.get('id'))
      if (this.dayManager.isDayAvailable(id)) {
        this.current = id
        this.dayData = await this.dayManager.getDayData(this.current)
      }
      else if (id !== 1) {
        this.router.navigate([1])
      }
      else {
        throw new Error('Cant navigate')
      }
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
