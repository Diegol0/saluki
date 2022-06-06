import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs';
import { LoginUserDto } from '../models/service.dto';
import { SalukiService } from '../services/saluki.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  constructor(private salukiService: SalukiService) {}

  ngOnInit(): void {}

  login() {
    let user: LoginUserDto = this.loginForm.getRawValue()!;
    this.salukiService
      .login(user)
      .pipe(take(1))
      .subscribe((data: any) => {
        if (data) {
          localStorage.setItem('token', data.access_token);
        }
      });
  }
}
