import {HashLocationStrategy, Location, LocationStrategy} from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-email',
  standalone: true,
  providers: [Location, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  imports: [],
  templateUrl: './email.html',
  styleUrl: './email.scss',
})
export class Email {
  location: Location;
  constructor(location: Location)
  {
    this.location = location;
  }

  public ngOnInit(): void 
  {

  }  

  public ngAfterViewInit(): void 
  {

  }
}
