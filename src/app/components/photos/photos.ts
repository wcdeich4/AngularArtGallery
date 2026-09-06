import { Component } from '@angular/core';
import {HashLocationStrategy, Location, LocationStrategy} from '@angular/common';

@Component({
  selector: 'app-photos',
  standalone: true,
  imports: [],
  providers: [Location, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  templateUrl: './photos.html',
  styleUrl: './photos.scss',
})
export class Photos
{
  public location: Location;
  constructor(location: Location)
  {
    this.location = location;
  }
}