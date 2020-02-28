import {Component, OnInit} from '@angular/core';
import {Admin} from '../../../services/admin.service';
import {Store} from '@ngrx/store';
import {AppAdmin} from '../../../redux/app.state';
import {SetDescription, SetTitle, UpdateDescription, UpdatePhoto, UpdateTitle} from '../../../redux/category.action';
import {AlertService} from '../../../services/alert.service';

// интерфейс для объекта загрузки
export class Upload {
  id: string;
  file: File;
  name: string;
  url: string;
  progress: number;
  constructor(file: File) {
    this.file = file;
  }
}


@Component({
  selector: 'app-edit-start-page',
  templateUrl: './edit-start-page.component.html',
  styleUrls: ['./edit-start-page.component.scss']
})
export class EditStartPageComponent implements OnInit {
  title = '';
  description = '';
  selectedFiles: FileList;
  imageSrc;
  image;
  name = [];
  imgServer = [];
  descriptionNow = [];
  shortInfoServer = [];
  controller = false;
  currentUpload: Upload;
  info;
  descriptionImg: string;

  constructor(
    private adminService: Admin,
    private store: Store<AppAdmin>,
    private alertService: AlertService) {
  }

  ngOnInit() {
    this.store.select('admin').subscribe(name => {
      this.name = name.startPage.nameApplication || [];
      this.descriptionNow = name.startPage.description || [];
      this.imgServer = name.photo || [];
      this.shortInfoServer = name.startPage.shortInfo || [];
      this.info = [{
        name: name.startPage.nameApplication || [],
        description: name.startPage.description || [],
        shortInfoPhoto1: name.startPage.shortInfo || [],
        img1: name.photo || []
      }];
    });
  }

  setTitle() {
    if (!this.name) {
      this.alertService.warning('sssssss');
      this.controller = true;
      return;
    } else {
      this.controller = false;
      const name = {
        nameApplication: this.title
      };
      this.adminService.setTitleServer(name).subscribe(data => {
        const nameApplication = [{
          nameApplication: this.title,
          id: data.name
        }];
        this.store.dispatch(new SetTitle(nameApplication));
        this.title = '';
        this.store.select('admin').subscribe(ee => {
        });
      });
    }
  }

  updateTitle() {
    if (!this.title) {
      this.controller = true;
      this.alertService.warning('Нельзя отправлять пустое поле');
    } else {
      this.controller = false;
      const nameApplications = {
        id: this.name.map(id => id.id).toString(),
        nameApplication: this.title
      };
      console.log(nameApplications);
      this.adminService.updateTitle(nameApplications).subscribe(d => {
        this.store.dispatch(new UpdateTitle(nameApplications));
      });
    }
  }

  setDescription() {
    if (!this.description) {
      this.controller = true;
      this.alertService.warning('Нельзя отправлять пустое поле');
    } else {
      this.controller = false;
      console.log({description: this.description});
      this.adminService.setDescription({description: this.description}).subscribe(data => {
        const newDescription = {
          id: data.name,
          description: this.description
        };
        this.store.dispatch(new SetDescription(newDescription));
      });
    }
  }

  updateDescription() {
    if (!this.description) {
    } else {
      const updateDescription = {
        id: this.descriptionNow.map(id => id.id).toString(),
        description: this.description
      };
      this.adminService.updateDescription(updateDescription).subscribe(data => {
        this.store.dispatch(new UpdateDescription(updateDescription));
      });
    }
  }

  detectFiles(event) {
    this.selectedFiles = event.target.files;
    const fileData = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imageSrc = reader.result;
    };
    reader.readAsDataURL(fileData);
    this.image = fileData;
  }

  addPhoto() {
    if (!this.selectedFiles) {
      this.alertService.warning('Не выбрана фотография для закгузки');
      return;
    } else {
      const file = this.selectedFiles.item(0);
      this.currentUpload = new Upload(file);
      this.adminService.pushUpload(this.currentUpload);
    }
  }


  deleteImg(deletePhoto) {
    this.adminService.deleteFileInfo(deletePhoto);
  }

  setDescriptionImg(img) {
    if (!this.descriptionImg) {
      this.alertService.warning('Поле не должно быть пустым');
    } else {
      const imgUpdate = {
        ...img,
        text: this.descriptionImg
      };
      this.adminService.updatePhotoDescription(imgUpdate).subscribe(data => {
        this.store.dispatch(new UpdatePhoto(imgUpdate));
      });
    }

  }
}
