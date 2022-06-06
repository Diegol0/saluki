import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginUserDto, UserDto } from '../models/service.dto';
import { ErrorHandlerService } from './error-handler/error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class SalukiService {
  constructor(
    private readonly errorHandlerService: ErrorHandlerService,
    private http: HttpClient
  ) {}

  login(user: LoginUserDto) {
    return this.http
      .post<UserDto>(environment.salukiURL + 'auth/login', user)
      .pipe(
        catchError((error: HttpErrorResponse) =>
          this.errorHandlerService.handleError(error)
        )
      );
  }

  logout() {
    localStorage.removeItem('token');
  }
}
