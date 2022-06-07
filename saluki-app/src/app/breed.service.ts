import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ErrorHandlerService } from './services/error-handler/error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class BreedService {
  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
  ) {}

  listAll() {
    return this.http
      .get<any>(environment.breedURL + 'breeds/list/all')
      .pipe(
        catchError((error: HttpErrorResponse) =>
          this.errorHandlerService.handleError(error)
        )
      );
  }

  listSubBreed(breed: string) {
    return this.http
      .get<any>(environment.breedURL + `breeds/${breed}/list`)
      .pipe(
        catchError((error: HttpErrorResponse) =>
          this.errorHandlerService.handleError(error)
        )
      );
  }

  listSubBreedImage(breed: string, subBreed: string) {
    return this.http
      .get<any>(environment.breedURL + `breeds/${breed}/${subBreed}/images`)
      .pipe(
        catchError((error: HttpErrorResponse) =>
          this.errorHandlerService.handleError(error)
        )
      );
  }
}
