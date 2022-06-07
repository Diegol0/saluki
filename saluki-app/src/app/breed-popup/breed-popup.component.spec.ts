import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreedPopupComponent } from './breed-popup.component';

describe('BreedPopupComponent', () => {
  let component: BreedPopupComponent;
  let fixture: ComponentFixture<BreedPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BreedPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BreedPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
