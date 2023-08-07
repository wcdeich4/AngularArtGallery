import { Component, HostListener } from '@angular/core';
import {HashLocationStrategy, Location, LocationStrategy} from '@angular/common';
import html2canvas from 'html2canvas';
import { StringHelper } from './helpers/StringHelper';
import { DateTimeHelper } from './helpers/DateTimeHelper';
@Component({
  selector: 'app-root',
  providers: [Location, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'AngularArtGallery';
  public location: Location;
  constructor(location: Location)
  {
    this.location = location;
  }

  public openNav(): void
  {
    document.getElementById('mySidenav').style.display = 'block';
    document.getElementById('myHamburgerIcon').style.display = 'none';
  }

  public closeNav(): void
  {
    document.getElementById('mySidenav').style.display = 'none';
    document.getElementById('myHamburgerIcon').style.display = 'block';
  }

  public html2canvasScreenshot(filename?: string): void
  {
   try
   {
      const screenshotTarget = document.body;
      html2canvas(screenshotTarget).then((canvas) => {
          let url = canvas.toDataURL("image/png");
          //window.location.href = url;
    
          /* Change MIME type to trick the browser to download the file instead of displaying it */
          url = url.replace(/^data:image\/[^;]*/, 'data:application/octet-stream');

          if (StringHelper.isUndefinedOrNullOrEmptyOrWhitespace(filename))
          {
            filename = DateTimeHelper.getFilenameSafeStringForCurrentDatetime('_') + '.png';
          }

          /* In addition to <a>'s "download" attribute, you can define HTTP-style headers */
          url = url.replace(/^data:application\/octet-stream/, 'data:application/octet-stream;headers=Content-Disposition%3A%20attachment%3B%20filename=' + filename);
        
          let a = document.createElement('a'); 
          a.href = url;


          a.download = filename;

          document.body.appendChild(a);
          a.click();
        //  URL.revokeObjectURL(url);
      });
    }
    catch (err) {
      alert("html2canvas Error: " + err);
    }
  }

  @HostListener('window:keyup', ['$event'])
  public keyEvent(event: KeyboardEvent): void
  {
    
    if (event.key === 'Delete' || event.key === 'Escape' )
    {
      this.toggleHamberIconVisibility();
    }
    else if (event.key === 'p')
    {
      this.html2canvasScreenshot();
    }

    console.log(event);

  }

  private toggleHamberIconVisibility(): void
  {
    if (document.getElementById('myHamburgerIcon').style.display == 'none')
    {
      document.getElementById('myHamburgerIcon').style.display = 'block';
    }
    else
    {
      document.getElementById('myHamburgerIcon').style.display = 'none';
    }
  }
}
