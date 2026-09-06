import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Zxy } from './zxy';

describe('Zxy', () => {
  let component: Zxy;
  let fixture: ComponentFixture<Zxy>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Zxy],
    }).compileComponents();

    fixture = TestBed.createComponent(Zxy);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
