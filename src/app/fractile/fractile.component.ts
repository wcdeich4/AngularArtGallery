import { Component, OnInit, AfterViewInit } from '@angular/core';
import {HashLocationStrategy, Location, LocationStrategy} from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { Fractile } from '../sharedtools/models/Fractile';
import { MathCanvas2D } from '../sharedtools/models/MathCanvas2D'
import { SirpinskiTriangleFractile } from '../sharedtools/models/SirpinskiTriangleFractle';
import { FernDotFractile } from '../sharedtools/models/FernDotFractile';
import { FernLineFractile } from '../sharedtools/models/FernLineFractile';
import { MandelbrotFractile } from '../sharedtools/models/MandelbrotFractile';

//the "this" keyword means something different in HTML window events like resize and onclick, and binding this was not successful
var globalReferanceToThisComponent = null;

@Component({
  selector: 'app-fractile',
  providers: [Location, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  templateUrl: './fractile.component.html',
  styleUrls: ['./fractile.component.scss']
})
export class FractileComponent implements OnInit, AfterViewInit 
{
  private fractileMap: Map<string, Fractile>;
  private selectedFractileToDisplay: string;
  private mathCanvas: MathCanvas2D = null;
  private htmlCanvasElement: HTMLCanvasElement = null;
  private canvasRenderingContext2D: CanvasRenderingContext2D;
  private overlayImageElement: HTMLImageElement;  //HTMLElement; ////ImageBitmap
  public displayForm!: FormGroup;
  public location: Location;

  constructor(location: Location)
  {
    this.location = location;

    globalReferanceToThisComponent =  this;

    this.overlayImageElement =  document.createElement("img"); //new Image();  //document.getElementById('hiddenImageElementID') as HTMLImageElement;
    this.overlayImageElement.setAttribute("id", "hiddenImageElementID");
    this.overlayImageElement.src = `../../assets/sun.png`;  //Smile.gif`;  //proves texture uv origin is upper lefthand corner like images
 //   document.body.appendChild(this.overlayImageElement); //slows constructor & not needed in Chromium or Firefox
    this.overlayImageElement.style.display = 'none';

    //it may be null here, so set again later
    this.htmlCanvasElement = document.getElementById('CanvasID') as HTMLCanvasElement;

    this.fractileMap = new Map<string, Fractile>();
    this.fractileMap['SirpinskiTriangle'] = new SirpinskiTriangleFractile();
    this.fractileMap['FernDots'] = new FernDotFractile();
    this.fractileMap['FernLines'] = new FernLineFractile();
    this.fractileMap['Mandelbrot'] = new MandelbrotFractile();

  }

  public saveCanvas(): void
  {
    let filename = 'Canvas.png';
    let canvasDataURL = this.htmlCanvasElement.toDataURL('image/png');
    /* Change MIME type to trick the browser to downlaod the file instead of displaying it */
    canvasDataURL = canvasDataURL.replace(/^data:image\/[^;]*/, 'data:application/octet-stream');
  
    /* In addition to <a>'s "download" attribute, you can define HTTP-style headers */
    canvasDataURL = canvasDataURL.replace(/^data:application\/octet-stream/, 'data:application/octet-stream;headers=Content-Disposition%3A%20attachment%3B%20filename=' + filename);
  
//    window.document.href = canvasDataURL; ?????


let a = document.createElement('a'); 
a.href = canvasDataURL;
//a.download = 'Canvas.png';
a.download = filename;
document.body.appendChild(a);
a.click();
URL.revokeObjectURL(canvasDataURL);



  }

  public stop(): void
  {
    globalReferanceToThisComponent.fractileMap[globalReferanceToThisComponent.selectedFractileToDisplay].stop();
  }

  public ngAfterViewInit(): void 
  {
    //use ngAfterViewInit and wait another 50 milliseconds b/c Angular is slow to load
    setTimeout(() => { this.draw(); }, 50);
  }

  public onresize(): void
  {
    if ((typeof globalReferanceToThisComponent.htmlCanvasElement == 'undefined') || (globalReferanceToThisComponent.htmlCanvasElement == null)  )
    {
      globalReferanceToThisComponent.htmlCanvasElement = document.getElementById('CanvasID') as HTMLCanvasElement;
    }
    
    globalReferanceToThisComponent.htmlCanvasElement.width = window.innerWidth;
    globalReferanceToThisComponent.htmlCanvasElement.height = window.innerHeight; //call onRelease in ngOnInit if you want it here

    if ((typeof globalReferanceToThisComponent.mathCanvas != 'undefined') && (globalReferanceToThisComponent.mathCanvas != null))
    {
      globalReferanceToThisComponent.mathCanvas.onresize();
    }
    globalReferanceToThisComponent.fractileMap[globalReferanceToThisComponent.selectedFractileToDisplay].onresize();
  }

  ngOnInit(): void 
  {
    this.selectedFractileToDisplay = 'SirpinskiTriangle';

    this.displayForm  = new FormGroup({
      displaySelect: new FormControl(this.selectedFractileToDisplay)
    });

    this.htmlCanvasElement = document.getElementById('CanvasID') as HTMLCanvasElement;

    //commenting out these 2 lines here greatly messes up the scale
    // this.htmlCanvasElement.width = window.innerWidth;
    // this.htmlCanvasElement.height = window.innerHeight; //height of visible window  !!!!!! <-- do in onresize?? ...

    window.onresize = this.onresize ;

    

    this.canvasRenderingContext2D = this.htmlCanvasElement.getContext('2d') ;
    this.mathCanvas = new MathCanvas2D(this.canvasRenderingContext2D);

    this.onresize();



this.htmlCanvasElement.onclick = function(event: MouseEvent) //.bind(this.mathCanvas)mathCanvas not working :(
    {
      let rect = globalReferanceToThisComponent.htmlCanvasElement.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      console.log("canvas 2d = x: " + x + " y: " + y );

      
     // let world2D = globalReferanceToThisComponent.mathCanvas.getRange().canvasToWorld2D(x,y);
     // console.log("world 2d = x: " + world2D.elements[0] + " y: " + world2D.elements[1])
      // console.log('left: ' +rect.left)
      // console.log('top: ' +rect.top)
      // console.log('clientX: ' + event.clientX)
      // console.log('clientY: ' + event.clientY)
      // console.log('pageX: ' + event.pageX)
      // console.log('pageY: ' + event.pageY)
      
    }
    //.addEventListener('click' (event) => {})



    // this.fractileMap = new Map<string, Fractile>();
    // this.fractileMap['SirpinskiTriangle'] = new SirpinskiTriangleFractile();
    // this.fractileMap['FernDots'] = new FernDotFractile();
    // this.fractileMap['FernLines'] = new FernLineFractile();
    // this.fractileMap['Mandelbrot'] = new MandelbrotFractile();


    

  }

  public draw(): void
  {
    this.mathCanvas.Erase(); 

    this.mathCanvas.setRange(this.fractileMap[this.selectedFractileToDisplay].range);
  //  this.mathCanvas.AutoScaleWidthToMatchHeight(); //kinda worked, but not what was desired


/* // turn off overlay temp

    //texture uv origin is upper lefthand corner like images
    var XTextureCoordinatePercent0 = 0, YTextureCoordinatePercent0 = 0;
    var XTextureCoordinatePercent1 = 1, YTextureCoordinatePercent1 = 0;
    var XTextureCoordinatePercent2 = 1, YTextureCoordinatePercent2 = 1;

    var u0 = XTextureCoordinatePercent0*this.overlayImageElement.width, 
    v0 = YTextureCoordinatePercent0*this.overlayImageElement.height, 
    x0 = 10, 
    y0 = 10;
    var u1 = XTextureCoordinatePercent1*this.overlayImageElement.width, 
    v1 = YTextureCoordinatePercent1*this.overlayImageElement.height, 
    x1 = 310, 
    y1 = 1;
    var u2 = XTextureCoordinatePercent2*this.overlayImageElement.width, 
    v2 = YTextureCoordinatePercent2*this.overlayImageElement.height, 
    x2 = 310, 
    y2 = 310;

    var x3 = 10, 
    y3 = 310;

    this.canvasRenderingContext2D.save();
    this.canvasRenderingContext2D.beginPath();
    this.canvasRenderingContext2D.moveTo(x0, y0);
    this.canvasRenderingContext2D.lineTo(x1, y1);
    this.canvasRenderingContext2D.lineTo(x2, y2);
    this.canvasRenderingContext2D.lineTo(x3, y3);
    this.canvasRenderingContext2D.closePath();
    this.canvasRenderingContext2D.clip();

    var delta = u0*v1 + v0*u2 + u1*v2 - v1*u2 - v0*u1 - u0*v2;
    var delta_a = x0*v1 + v0*x2 + x1*v2 - v1*x2 - v0*x1 - x0*v2;
    var delta_b = u0*x1 + x0*u2 + u1*x2 - x1*u2 - x0*u1 - u0*x2;
    var delta_c = u0*v1*x2 + v0*x1*u2 + x0*u1*v2 - x0*v1*u2 - v0*u1*x2 - u0*x1*v2;
    var delta_d = y0*v1 + v0*y2 + y1*v2 - v1*y2 - v0*y1 - y0*v2;
    var delta_e = u0*y1 + y0*u2 + u1*y2 - y1*u2 - y0*u1 - u0*y2;
    var delta_f = u0*v1*y2 + v0*y1*u2 + y0*u1*v2 - y0*v1*u2 - v0*u1*y2 - u0*y1*v2;

        // a*u0 + b*v0 + c = x0
        // a*u1 + b*v1 + c = x1
        // a*u2 + b*v2 + c = x2
        //
        // d*u0 + e*v0 + f = y0
        // d*u1 + e*v1 + f = y1
        // d*u2 + e*v2 + f = y2

   this.canvasRenderingContext2D.transform(delta_a/delta, delta_d/delta,
                                           delta_b/delta, delta_e/delta,
                                           delta_c/delta, delta_f/delta);
    this.canvasRenderingContext2D.drawImage(this.overlayImageElement , 0, 0);
    this.canvasRenderingContext2D.restore();

//*/

    if (!this.fractileMap[this.selectedFractileToDisplay].calculated)
    {
      this.fractileMap[this.selectedFractileToDisplay].process();
    }
    this.fractileMap[this.selectedFractileToDisplay].draw(this.mathCanvas);

    
  }

  public onDisplayChange(): void
  {
    if (this.displayForm.controls.displaySelect.errors != null)
    {
      console.log("error: " + this.displayForm.controls.displaySelect.errors);
    }

    this.selectedFractileToDisplay = this.displayForm.controls.displaySelect.value;

    this.draw();

    

    console.log(
  //    this.sanitizer.sanitize(SecurityContext.SCRIPT,
      this.displayForm.controls.displaySelect.value
  //  )
      );
  }

}
