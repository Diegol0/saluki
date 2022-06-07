import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { BreedService } from '../breed.service';
import { UserDto } from '../models/service.dto';
import { SalukiService } from '../services/saluki.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  user: UserDto | null = null;
  displayNameBreed: string | null = null;
  img: string | null = null;
  constructor(
    private salukiService: SalukiService,
    private breedService: BreedService
  ) {
    this.salukiService.getLoggedUser.pipe(take(1)).subscribe((user: any) => {
      this.user = user;
      if (user && user.favoriteBreed) {
        if (String(user.favoriteBreed).includes('/')) {
          let breedName = String(user.favoriteBreed).split('/');
          this.displayNameBreed =
            breedName[1].charAt(0).toUpperCase() +
            breedName[1].slice(1) +
            breedName[0].charAt(0).toUpperCase() +
            breedName[0].slice(1);
        } else {
          this.displayNameBreed =
            String(user.favoriteBreed).charAt(0).toUpperCase() +
            String(user.favoriteBreed).slice(1);
        }
        this.breedService
          .getSingleBreedImage(user.favoriteBreed)
          .pipe(take(1))
          .subscribe((data: any) => {
            this.img = data.message;
          });
      }
    });
  }

  ngOnInit(): void {}
}
