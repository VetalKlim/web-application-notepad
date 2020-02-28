import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subscription} from 'rxjs';
import {environment} from '../../environments/environment';
import * as firebase from 'firebase';
import {AngularFireDatabase} from '@angular/fire/database';
import {Upload} from '../admin/admin-main-layout/edit-start-page/edit-start-page.component';
import {FirebaseApp} from '@angular/fire';
import {FirebaseListObservable} from '@angular/fire/database-deprecated';
import {AppAdmin} from '../redux/app.state';
import {Store} from '@ngrx/store';
import {DefaultPhoto, DeletePhoto} from '../redux/category.action';


@Injectable({providedIn: 'root'})

export class Admin {
  constructor(
    private store: Store<AppAdmin>,
    private http: HttpClient,
    public db: AngularFireDatabase,
    @Inject(FirebaseApp) public firebaseApp: any
  ) {
  }

  id;


  private basePath = '/photo';
  private uploadTask: firebase.storage.UploadTask;

  uploads: FirebaseListObservable<any>;
  cacheMetadata: any = {
    cacheControl: 'public,max-age=2592000'
  };

// Метод загрузки файла в бинарном виде
  pushUpload(upload: Upload): firebase.storage.UploadTask {
    const namePhoto = {
      name: upload.file.name
    };
    this.http.post(`${environment.fbUrl}/infoSite/photo.json`, namePhoto).subscribe(data => {
      this.id = data;
      const imageExt = upload.file.name.slice(upload.file.name.lastIndexOf('.'));
      const storageRef = this.firebaseApp.storage().ref();
      this.uploadTask = storageRef.child(`${this.basePath}/${this.id.name}${imageExt}`).put(upload.file, this.cacheMetadata);
      this.uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => {
          // загрузка в процессе
          upload.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          // ошибка при загрузке
          console.warn(error);
        },
        () => {

          // загрузка успешна
          const name = {
            name: upload.file.name
          };
          this.uploadTask.then(ret => {
            ret.ref.getDownloadURL().then(url => {
              const updatePhotoObject = {
                name: upload.file.name,
                id: this.id.name,
                url
              };
              this.store.dispatch(new DefaultPhoto(updatePhotoObject));
              this.addPhoto(updatePhotoObject);
            });
          });
        }
      );
    });
    return this.uploadTask;
  }

  // Метод записи данных о загрузке в базу firebase
  private addPhoto(updatePhotoObject) {
    const update = {
      name: updatePhotoObject.name,
      url: updatePhotoObject.url
    };
    this.http.patch(`${environment.fbUrl}/infoSite/photo/${updatePhotoObject.id}.json`, update).subscribe((data) => {
      console.log(data);
    });
  }

// Метод удаления загруженного файла
  deleteFileInfo(deletePhoto): Subscription {
    console.log(deletePhoto);
    return this.http.delete(`${environment.fbUrl}/infoSite/photo/${deletePhoto.id}.json`).subscribe((r) => {
      this.deleteFileData(deletePhoto);
      const deleteStorePhoto = {
        id: deletePhoto.id
      };
      console.log(deleteStorePhoto);
      this.store.dispatch(new DeletePhoto(deleteStorePhoto));
    });
  }

  private deleteFileData(file) {
    const storageRef = this.firebaseApp.storage().ref();
    const imageExt = file.name.slice(file.name.lastIndexOf('.'));
    storageRef.child(`${this.basePath}/${file.id}${imageExt}`).delete().then(r => {
      console.log('ghgfghfg');
    });
  }


  // обновление данных, добавляем описание фото
  updatePhotoDescription(updatePhotoObject): Observable<any> {
    const update = {
      name: updatePhotoObject.name,
      text: updatePhotoObject.text,
      url: updatePhotoObject.url
    };
    return this.http.patch(`${environment.fbUrl}/infoSite/photo/${updatePhotoObject.id}.json`, update);
  }


  dataInfoAdmin(): Observable<any> {
    return this.http.get(`${environment.fbUrl}/infoSite.json`);
  }

  setTitleServer(title): Observable<any> {
    return this.http.post(`${environment.fbUrl}/infoSite/startPage.json`, title);
  }

  updateTitle(title): Observable<any> {
    const name = {
      nameApplication: title.nameApplication
    };
    return this.http.patch(`${environment.fbUrl}/infoSite/startPage/${title.id}.json`, name);
  }

  setDescription(description): Observable<any> {
    return this.http.post(`${environment.fbUrl}/infoSite/startPage.json`, description);
  }

  updateDescription(description): Observable<any> {
    const name = {
      description: description.description
    };
    return this.http.patch(`${environment.fbUrl}/infoSite/startPage/${description.id}.json`, name);
  }

}
