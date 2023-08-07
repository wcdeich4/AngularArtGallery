import { Component, OnInit, AfterViewInit } from '@angular/core';
import {HashLocationStrategy, Location, LocationStrategy} from '@angular/common';
//import { ajax } from 'rxjs/ajax';


@Component({
  selector: 'app-home',
  providers: [Location, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit
{
  public location: Location;
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
