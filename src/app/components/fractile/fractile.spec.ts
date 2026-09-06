import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Fractile } from './fractile';

describe('Fractile', () => {
  let component: Fractile;
  let fixture: ComponentFixture<Fractile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Fractile],
    }).compileComponents();

    fixture = TestBed.createComponent(Fractile);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
