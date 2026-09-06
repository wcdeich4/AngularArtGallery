import {HashLocationStrategy, Location, LocationStrategy} from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-art2-d',
  imports: [],
  standalone: true,
  templateUrl: './art2-d.html',
  styleUrl: './art2-d.scss',
})
export class Art2D {
  location: Location;
  constructor(location: Location)
  {
    this.location = location;
  }
}