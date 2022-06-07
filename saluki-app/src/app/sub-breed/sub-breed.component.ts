import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { BreedPopupComponent } from '../breed-popup/breed-popup.component';
import { BreedService } from '../breed.service';
import { UserDto } from '../models/service.dto';
import { SalukiService } from '../services/saluki.service';

@Component({
  selector: 'app-sub-breed',
  templateUrl: './sub-breed.component.html',
  styleUrls: ['./sub-breed.component.scss'],
})
export class SubBreedComponent implements OnInit {
  user: UserDto | null = null;
  breed: string = '';
  img: string = '';
  subBreeds: any[] = [];

  constructor(
    public dialog: MatDialog,
    private breedService: BreedService,
    private route: ActivatedRoute,
    private router: Router,
    private salukiService: SalukiService
  ) {}

  ngOnInit(): void {
    this.salukiService.getLoggedUser.subscribe((user: any) => {
      this.user = user;
      this.route.params.subscribe((params) => {
        this.breed = params['breed'];
        if (params['breed']) {
          this.breedService
            .getBreedImage(this.breed.toLowerCase())
            .pipe(take(1))
            .subscribe((data: any) => {
              this.img = data.message;
            });
          this.breedService
            .listSubBreed(String(params['breed']).toLowerCase())
            .pipe(take(1))
            .subscribe((data: any) => {
              data.message.forEach((e: any) => {
                this.breedService
                  .getSubBreedImage(this.breed.toLowerCase(), e)
                  .pipe(take(1))
                  .subscribe((data: any) => {
                    this.subBreeds.push({
                      name: e,
                      displayName:
                        e.charAt(0).toUpperCase() +
                        e.slice(1) +
                        ' ' +
                        params['breed'],
                      img: data.message,
                      fullBreed: this.breed.toLowerCase() + '/' + e,
                    });
                  });
              });
            });
        } else {
          this.router.navigate(['home']);
        }
      });
    });

    console.log(this.subBreeds);
  }

  openParentBreedDialog(breed: string) {
    this.openDialog({ displayName: breed, fullBreed: breed.toLowerCase() });
  }

  openDialog(breed: any) {
    this.breedService
      .getAllBreedImage(breed.fullBreed)
      .pipe(take(1))
      .subscribe((data: any) => {
        this.dialog.open(BreedPopupComponent, {
          data: {
            breed: breed,
            images: data.message,
          },
        });
      });
  }
}
