import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  constructor(private router: Router) {}

  handleError(error: Response | any): any {
    if (error.status === 401 || error.status === 403)
      this.router.navigate(['login']);
    alert(error.message);
  }
}
