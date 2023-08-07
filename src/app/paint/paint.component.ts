import { Component, OnInit } from '@angular/core';
import {HashLocationStrategy, Location, LocationStrategy} from '@angular/common';
@Component({
  selector: 'app-paint',
  providers: [Location, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  templateUrl: './paint.component.html',
  styleUrls: ['./paint.component.scss']
})
export class PaintComponent implements OnInit {
  public location: Location;
  constructor(location: Location)
  {
    this.location = location;
  }

  ngOnInit(): void {
  }

}
