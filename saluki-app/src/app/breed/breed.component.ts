import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { BreedService } from '../breed.service';

@Component({
  selector: 'app-breed',
  templateUrl: './breed.component.html',
  styleUrls: ['./breed.component.scss'],
})
export class BreedComponent implements OnInit {
  breeds: any[] = [];

  constructor(private breedService: BreedService) {}

  ngOnInit(): void {
    this.breeds = [];
    this.breedService
      .listAll()
      .pipe(take(1))
      .subscribe((data: any) => {
        for (var key of Object.keys(data.message)) {
          this.breeds.push({
            breed: key.charAt(0).toUpperCase() + key.slice(1),
            subBreeds: data.message[key],
          });
        }
      });
  }
}
