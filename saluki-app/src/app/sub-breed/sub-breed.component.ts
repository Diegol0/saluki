import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
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
  subBreeds: any[] = [];

  constructor(
    private breedService: BreedService,
    private route: ActivatedRoute,
    private router: Router,
    private salukiService: SalukiService
  ) {}

  ngOnInit(): void {
    this.salukiService.getLoggedUser.subscribe((user: any) => {
      this.user = user;
      this.route.params.subscribe((params) => {
        if (params['breed']) {
          this.breed = params['breed'];
          this.breedService
            .listSubBreed(String(params['breed']).toLowerCase())
            .pipe(take(1))
            .subscribe((data: any) => {
              data.message.forEach((e: any) => {
                this.subBreeds.push({
                  name: e,
                  displayName:
                    e.charAt(0).toUpperCase() +
                    e.slice(1) +
                    ' ' +
                    params['breed'],
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
}
