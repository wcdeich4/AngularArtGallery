import { Component } from '@angular/core';
import {HashLocationStrategy, Location, LocationStrategy} from '@angular/common';

@Component({
  selector: 'app-photos',
  providers: [Location, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent
{
  public location: Location;
  constructor(location: Location)
  {
    this.location = location;
  }
}