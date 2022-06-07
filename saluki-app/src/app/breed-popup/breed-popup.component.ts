import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-breed-popup',
  templateUrl: './breed-popup.component.html',
  styleUrls: ['./breed-popup.component.scss'],
})
export class BreedPopupComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public breed: any) {}

  ngOnInit(): void {}

  setAsFavorite(){
    
  }
}
