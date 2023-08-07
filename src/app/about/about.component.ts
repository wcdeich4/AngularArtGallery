import {HashLocationStrategy, Location, LocationStrategy} from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  providers: [Location, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  location: Location;
  constructor(location: Location)
  {
    this.location = location;
  }

  ngOnInit(): void {
  }

}
