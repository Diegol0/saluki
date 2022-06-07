import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDto } from '../models/service.dto';
import { SalukiService } from '../services/saluki.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  user: UserDto | null = null;
  constructor(private salukiService: SalukiService, private router: Router) {
    this.salukiService.getLoggedUser.subscribe((user: any) => {
      this.user = user;
    });
  }

  ngOnInit(): void {}
}
