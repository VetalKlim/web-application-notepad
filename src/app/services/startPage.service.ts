import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({providedIn: 'root'})

export class StartPage {
  constructor(private http: HttpClient) {
  }

  startPage(): Observable<any> {
    return this.http.get(`${environment.fbUrl}/infoSite.json`);
  }

}


