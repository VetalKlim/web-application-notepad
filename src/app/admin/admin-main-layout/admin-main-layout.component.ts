import {Component, OnInit} from '@angular/core';
import {Admin} from '../../services/admin.service';
import {AppAdmin} from '../../redux/app.state';
import {Store} from '@ngrx/store';
import {DefaultDescription, DefaultPhoto, DefaultShortInfo, DefaultTitle, DeleteStoreAdmin} from '../../redux/category.action';


@Component({
  selector: 'app-admin-main-layout',
  templateUrl: './admin-main-layout.component.html',
  styleUrls: ['./admin-main-layout.component.scss']
})
export class AdminMainLayoutComponent implements OnInit {
  name;

  constructor(private admin: Admin, private store: Store<AppAdmin>) {
  }

  ngOnInit() {
    this.admin.dataInfoAdmin().subscribe((data) => {
      let startPage = [];
      let photo = [];
      if (data.startPage) {
        startPage = Object.keys(data.startPage).map(key => ({
          ...data.startPage[key],
          id: key
        }));
        const title = [];
        const description = [];
        const shortInfo = [];
        title.push(startPage[0]);
        description.push(startPage[1]);
        shortInfo.push(startPage[2]);
        this.store.dispatch(new DefaultTitle(title));
        this.store.dispatch(new DefaultDescription(description));
        this.store.dispatch(new DefaultShortInfo(shortInfo));
      }
      if (data.photo) {
        photo = Object.keys(data.photo).map((key => ({
          ...data.photo[key],
          id: key
        })));
        for (let i = 0; i < photo.length; i++) {
          this.store.dispatch(new DefaultPhoto(photo[i]));
        }
      }

    });

    this.store.select('admin').subscribe(name => {
      this.name = name.startPage.nameApplication;
    });
  }

  exitAdmin() {
    this.store.dispatch(new DeleteStoreAdmin());
  }
}
