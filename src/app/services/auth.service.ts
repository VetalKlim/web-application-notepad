import {Injectable} from '@angular/core';

import {FbAuthResponse, FbUserInfo, InterfaceAuth} from '../interface/interfaceAuth';
import {environment} from '../../environments/environment';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {Observable, Subject, throwError} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '../redux/app.state';
import {AddCategory, DeleteStore} from '../redux/category.action';

@Injectable({providedIn: 'root'})
export class AuthService {
  public error$: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient, private store: Store<AppState>) {
  }

  get token(): string {
    const expDate = new Date(localStorage.getItem('fb-token-exp'));
    if (new Date() > expDate) {
      this.logout();
      return null;
    }
    return localStorage.getItem('fb-token');
  }

  authRegistration(newUser: InterfaceAuth): Observable<any> {
    localStorage.clear();
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.apiKey}`, newUser)
      .pipe(
        tap(this.setToken),
        catchError(this.handelError.bind(this))
      );
  }

  createInfoUser(infoUser: FbUserInfo): Observable<object> {
    const uidUser = localStorage.getItem('uid');
    return this.http.post(`${environment.fbUrl}/user/${uidUser}/info.json`, infoUser);
  }


  login(user: InterfaceAuth): Observable<any> {
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
      .pipe(
        tap(this.setToken),
        catchError(this.handelError.bind(this))
      );
  }

  updateUserPassword(user: InterfaceAuth): Observable<any> {
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${environment.apiKey}`, user)
      .pipe(
        catchError(this.handelError.bind(this))
      );
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  logout() {
    this.setToken(null);
    localStorage.clear();
    this.store.dispatch(new DeleteStore());
  }

  private handelError(error: HttpErrorResponse) {
    const {message} = error.error.error;
    switch (message) {
      case 'EMAIL_EXISTS':
        this.error$.next('Такой Email используется. Пожалуйста укажите другой.');
        break;
      case 'EMAIL_NOT_FOUND':
        this.error$.next('Пользователя с таким Email не существует.');
        break;
      case 'INVALID_PASSWORD':
        this.error$.next('Неверный пароль.');
        break;
      case 'INVALID_EMAIL':
        this.error$.next('Такой Email не зарегестрирован');
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER : Too many unsuccessful login attempts.  Please include reCaptcha verification or try again later':
        this.error$.next('Слишком много раз пытались войти в систему. Попробуйте позже.');
        break;
      case  'CREDENTIAL_TOO_OLD_LOGIN_AGAIN':
        this.error$.next('Обнови приложение, токен устарел');
        break;
      case 'TOKEN_EXPIRED':
        this.error$.next('Токен истек, обнови приложение');
        break;
    }
    return throwError(error);
  }

  private setToken(response: FbAuthResponse | null) {
    if (response) {
      const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000); // Жизнь токена
      // в текущей дате берем время и добавляем то время на которое росчитан токен
      localStorage.setItem('fb-token', response.idToken);
      localStorage.setItem('fb-token-exp', expDate.toString());
      localStorage.setItem('uid', response.localId);
    } else {
      localStorage.clear();
    }
  }
}
