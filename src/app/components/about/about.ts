import {HashLocationStrategy, Location, LocationStrategy} from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  providers: [Location, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  standalone: true,
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About implements OnInit {

  location: Location;
  constructor(location: Location)
  {
    this.location = location;
  }

  ngOnInit(): void {
  }

}