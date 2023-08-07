import {HashLocationStrategy, Location, LocationStrategy} from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-art2-d',
  providers: [Location, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  templateUrl: './art2-d.component.html',
  styleUrls: ['./art2-d.component.scss']
})
export class Art2DComponent {
  location: Location;
  constructor(location: Location)
  {
    this.location = location;
  }
}
