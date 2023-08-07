import {HashLocationStrategy, Location, LocationStrategy} from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-email',
  providers: [Location, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent {
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
