import {Component, Input, OnInit} from '@angular/core';
import {Output} from '@angular/core';
import {EventEmitter} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Store} from '@ngrx/store';
import {AppState} from '../../redux/app.state';

import {StartPage} from '../../services/startPage.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  openMenuFlag = false;
  userName;
  nameApplication;
  @Output() activeMenu: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() closeSideBarMenu: boolean;


  constructor(private auth: AuthService, private store: Store<AppState>) {
  }

  ngOnInit() {

    this.store.select('category', 'info').subscribe(info => {
      this.userName = info;
      this.userName = this.userName.map(i => i.name);
    });

  }

  openMenu() {
    this.openMenuFlag = this.closeSideBarMenu === true ? true : false;
    this.openMenuFlag = this.openMenuFlag === true ? false : true;
    this.activeMenu.emit(this.openMenuFlag);
  }

  closeMenu() {
    this.openMenuFlag = false;
    this.activeMenu.emit(this.openMenuFlag);
  }

  exitApplication() {
    this.auth.logout();
  }
}
