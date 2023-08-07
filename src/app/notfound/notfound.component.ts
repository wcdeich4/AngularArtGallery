import { Component, OnInit } from '@angular/core';
import {HashLocationStrategy, Location, LocationStrategy} from '@angular/common';
@Component({
  selector: 'app-notfound',
  providers: [Location, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.scss']
})
export class NotFoundComponent implements OnInit {

  public location: Location;
  constructor(location: Location)
  {
    this.location = location;
  }

  ngOnInit(): void {
  }

}
