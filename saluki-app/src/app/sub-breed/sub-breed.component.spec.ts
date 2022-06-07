import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubBreedComponent } from './sub-breed.component';

describe('SubBreedComponent', () => {
  let component: SubBreedComponent;
  let fixture: ComponentFixture<SubBreedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubBreedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubBreedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
