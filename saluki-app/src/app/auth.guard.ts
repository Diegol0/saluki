import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable, take } from 'rxjs';
import { SalukiService } from './services/saluki.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private salukiService: SalukiService) {}

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this.salukiService
      .verifyToken()
      .pipe(take(1))
      .subscribe((data: any) => {
        debugger
        return data == null;
      });
    return false;
  }
}
