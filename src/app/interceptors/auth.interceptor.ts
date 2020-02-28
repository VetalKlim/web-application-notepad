import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {catchError} from 'rxjs/operators';


@Injectable({providedIn: 'root'})
export class AuthInterceptor implements HttpInterceptor {
  constructor(private  auth: AuthService, private router: Router) {
  }

  intercept(req: HttpRequest<any>,
            next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.auth.isAuthenticated()) { // если пользователь авторизован
      // то тогда добавляем токен для каждого запроса
      req = req.clone({ // изменяем объект  req вызвать у него метод req.clone и переопределить его
        setParams: { // задаем параметри через объект setParams
          auth: this.auth.token // указываем ключ auth (firebase понимает этот параметр) а значение токен.
        }
      });
      // console.log(req);
    }
    return next.handle(req)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          // console.log('[Interceptor Error]', error);
          if (error.status === 401) {
            this.auth.logout();
            this.router.navigate(['login'], {
              queryParams: {
                authFailed: 'error auth'
              }
            });
          }
          return throwError(error);
        })
      );
  }

}
