import { Component, OnInit } from '@angular/core';
import { forkJoin, map, Observable, take } from 'rxjs';
import { BreedService } from '../breed.service';

@Component({
  selector: 'app-breed',
  templateUrl: './breed.component.html',
  styleUrls: ['./breed.component.scss'],
})
export class BreedComponent implements OnInit {
  filteredBreeds: any[] = [];
  breeds: any[] = [];
  value: string = '';
  showImages: boolean = false;

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
            img: null,
          });
        }
        this.filteredBreeds = this.breeds;
      });
  }

  filter() {
    if (this.value) {
      this.filteredBreeds = this.breeds.filter((breed) =>
        String(breed.breed).toLowerCase().includes(this.value.toLowerCase())
      );
    } else {
      this.filteredBreeds = this.breeds;
    }
  }

  showAsImages() {
    if (this.showImages) {
      let obs: Observable<any>[] = new Array();
      this.breeds.forEach((breed) => {
        obs.push(
          this.breedService
            .getSingleBreedImage(String(breed.breed).toLowerCase())
            .pipe(map((value) => ({ type: breed.breed, value: value })))
        );
      });
      forkJoin(obs).subscribe((data: any) => {
        this.breeds = [];
        data.forEach((d: any) => {
          this.breeds.push({
            breed: d.type,
            img: d.value.message,
          });
        });
        this.filteredBreeds = this.breeds;
      });
      this.value = '';
    }
  }
}
