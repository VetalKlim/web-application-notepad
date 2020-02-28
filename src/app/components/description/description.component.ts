import {Component, OnInit} from '@angular/core';
import {StartPage} from '../../services/startPage.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss']
})
export class DescriptionComponent implements OnInit {
  info;

  constructor(private server: StartPage, private spinner: NgxSpinnerService) {
  }

  ngOnInit() {
    this.spinner.show();
    this.server.startPage().subscribe(data => {
      const description = Object.keys(data.startPage).map(key => ({
        ...data.startPage[key],
        id: key
      }));
      const photo = Object.keys(data.photo).map(key => ({
        ...data.photo[key],
        id: key
      }));;
      this.info = [{
        description,
        photoInfo: photo,
      }];
      this.spinner.hide();
    });
  }

}
