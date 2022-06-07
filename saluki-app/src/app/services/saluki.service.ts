import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateUserDto, LoginUserDto, UserDto } from '../models/service.dto';
import { ErrorHandlerService } from './error-handler/error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class SalukiService {
  private readonly loggedIn = new BehaviorSubject<boolean>(false);

  constructor(
    private readonly errorHandlerService: ErrorHandlerService,
    private http: HttpClient
  ) {}

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  setLoggedIn(value: boolean) {
    this.loggedIn.next(value);
  }

  login(user: LoginUserDto) {
    return this.http
      .post<UserDto>(environment.salukiURL + 'auth/login', user)
      .pipe(
        catchError((error: HttpErrorResponse) =>
          this.errorHandlerService.handleError(error)
        )
      );
  }

  signup(user: CreateUserDto) {
    return this.http
      .post<UserDto>(environment.salukiURL + 'users', user)
      .pipe(
        catchError((error: HttpErrorResponse) =>
          this.errorHandlerService.handleError(error)
        )
      );
  }

  logout() {
    localStorage.removeItem('token');
    this.setLoggedIn(false);
  }

  verifyToken() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http
      .get(environment.salukiURL + 'auth/verifyToken', { headers: headers })
      .pipe(
        catchError((error: HttpErrorResponse) =>
          this.errorHandlerService.handleError(error)
        )
      );
  }
}
