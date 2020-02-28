import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {StartPage} from '../services/startPage.service';

@Component({
  selector: 'app-empty-layout',
  templateUrl: './empty-layout.component.html',
  styleUrls: ['./empty-layout.component.scss']
})
export class EmptyLayoutComponent implements OnInit {
  nameApplication;
  description;

  constructor(private router: Router, private server: StartPage) {
  }

  ngOnInit() {
    this.server.startPage().subscribe(data => {
      this.nameApplication = Object.keys(data.startPage).map(key => ({
        ...data.startPage[key],
      }));
      console.log(data);
    });
  }

  comeIn() {
    this.router.navigate(['login']);
  }

  registration() {
    this.router.navigate(['registration']);
  }
}
