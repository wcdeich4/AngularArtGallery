import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Art2D } from './art2-d';

describe('Art2D', () => {
  let component: Art2D;
  let fixture: ComponentFixture<Art2D>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Art2D],
    }).compileComponents();

    fixture = TestBed.createComponent(Art2D);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
