import { Component, OnInit, AfterViewInit } from '@angular/core';
import {HashLocationStrategy, Location, LocationStrategy} from '@angular/common';
import { RouterLink } from '@angular/router';
//import { ajax } from 'rxjs/ajax';

@Component({
  selector: 'app-home',
  providers: [Location, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit, AfterViewInit
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

