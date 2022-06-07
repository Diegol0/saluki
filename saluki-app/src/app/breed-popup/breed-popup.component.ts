import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { take } from 'rxjs';
import { AlertService } from '../alert.service';
import { UpdateUserBreedDto, UserDto } from '../models/service.dto';
import { SalukiService } from '../services/saluki.service';

@Component({
  selector: 'app-breed-popup',
  templateUrl: './breed-popup.component.html',
  styleUrls: ['./breed-popup.component.scss'],
})
export class BreedPopupComponent implements OnInit {
  userLogged: UserDto | null = null;
  constructor(
    @Inject(MAT_DIALOG_DATA) public breed: any,
    private salukiService: SalukiService,
    private alertService: AlertService
  ) {
    debugger;
    this.salukiService.getLoggedUser.pipe(take(1)).subscribe((user: any) => {
      this.userLogged = user;
    });
  }

  ngOnInit(): void {}

  setAsFavorite() {
    let user: UpdateUserBreedDto = {
      _id: this.userLogged?._id,
      favoriteBreed: this.breed.breed.fullBreed,
    };

    this.salukiService
      .saveFavorite(user)
      .pipe(take(1))
      .subscribe((data: any) => {
        console.log(data);
        this.userLogged!.favoriteBreed = this.breed.breed.fullBreed;
        this.salukiService.setLoggedUser(this.userLogged);
        this.alertService.showAlert('Succesfully selected as favorite');
      });
  }
}
