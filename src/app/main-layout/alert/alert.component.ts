import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AlertService} from '../../services/alert.service';
import {Subscription} from 'rxjs';
import {animate, keyframes, query, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  animations: [
    trigger('alertAnimations', [
      state('start', style({})),
      state('end', style({})),
      transition(':enter', [
        query('.alert-success,.alert-warning,.alert-danger', animate(0, style({
          fontSize: '0px',
          height: '1px',
          minWidth: '1px',
          padding: '0',
        }))),
        animate('1s', keyframes([
          style({opacity: 1, maxWidth: '1px', offset: 0.4}),
          style({minWidth: '10px',  offset: 0.5}),
          style({minWidth: '100%',  offset: 1}),
        ])),
      ]),
      transition(':leave', [
        query('.alert-success,.alert-warning,.alert-danger', animate(0, style({
          fontSize: '0',
          height: '1px',
          minWidth: '1px',
          padding: '0',
        }))),
        animate('1s', keyframes([
          style({ minWidth: '100%',  offset: 0.1}),
          style({  minWidth: '1px',  offset: 0.5}),
          style({opacity: 0, maxWidth: '1px', offset: 1}),
        ])),

      ])
    ])
  ]
})
export class AlertComponent implements OnInit, OnDestroy {
  @Input() daley = 3000;
  public text: string;
  public type = 'success';
  aSub: Subscription;

  constructor(private alertService: AlertService) {
  }

  ngOnInit() {
    this.aSub = this.alertService.alert$.subscribe(alert => {
      this.text = alert.text;
      this.type = alert.type;
      const timeOut = setTimeout(() => {
        clearTimeout(timeOut);
        this.text = '';
      }, this.daley);
    });
  }

  ngOnDestroy(): void {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }

}
