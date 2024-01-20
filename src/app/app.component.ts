import { Component, HostListener } from '@angular/core';
import {HashLocationStrategy, Location, LocationStrategy} from '@angular/common';
import html2canvas from 'html2canvas';
import { StringHelper } from './sharedtools/helpers/StringHelper';
import { DateTimeHelper } from './sharedtools/helpers/DateTimeHelper';
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
    document.getElementById('myHamburgerIconId').style.display = 'none';
    document.getElementById('mySettingsGearIconId').style.display = 'none';
  }

  public closeNav(): void
  {
    document.getElementById('mySidenav').style.display = 'none';
    document.getElementById('myHamburgerIconId').style.display = 'block';
    document.getElementById('mySettingsGearIconId').style.display = 'block';
    document.getElementById('mySettingsNavID').style.display = 'none';
  }

  public openSettings(): void
  {
    document.getElementById('mySidenav').style.display = 'none';
    document.getElementById('mySettingsGearIconId').style.display = 'none';
    document.getElementById('myHamburgerIconId').style.display = 'none';
    document.getElementById('mySettingsNavID').style.display = 'block';

  }

  // public closeSettings(): void
  // {
  //   document.getElementById('mySidenav').style.display = 'none';
  //   document.getElementById('myHamburgerIconId').style.display = 'block';
  //   document.getElementById('mySettingsGearIconId').style.display = 'block';
  // }



  /**
   * resizeElements
   */
  public resizeElements()
  {
   // alert('???????????');
   const paragraphElements: HTMLCollectionOf<HTMLParagraphElement> = document.getElementsByTagName("p");
//   const paragraphElements = document.querySelectorAll("p, h1, h2, h3, h4, h5, h6");
   for (let index = 0; index < paragraphElements.length; index++)
    {

      let style = window.getComputedStyle(paragraphElements[index], null).getPropertyValue('font-size');
      //console.log(paragraphElements[index].style.fontSize );
      paragraphElements[index].style.fontSize = paragraphElements[index].style.fontSize + 1;
      let fontSize = parseFloat(style); 
// now you have a proper float for the font size (yes, it can be a float, not just an integer)
paragraphElements[index].style.fontSize = (fontSize + 1) + 'px';
      //console.log(paragraphElements[index].style.fontSize );

      
    }
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
    if (document.getElementById('myHamburgerIconId').style.display == 'none')
    {
      document.getElementById('myHamburgerIconId').style.display = 'block';
    }
    else
    {
      document.getElementById('myHamburgerIconId').style.display = 'none';
    }
  }
}
