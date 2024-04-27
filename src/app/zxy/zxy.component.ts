import { Component, OnInit, SecurityContext } from '@angular/core';
import {HashLocationStrategy, Location, LocationStrategy} from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { CrossSiteScriptValidator } from '../sharedtools/models/CrossSiteScriptValidator';
import { IMathDrawable } from '../sharedtools/models/IMathDrawable';
import { MathCanvas2D } from '../sharedtools/models/MathCanvas2D'
import { SirpinskiTriangleFractile } from '../sharedtools/models/SirpinskiTriangleFractle';
import { Derivative1 } from '../sharedtools/math/Derivative1';
import { I2DEquation } from '../sharedtools/math/I2DEquation';
import { JavascriptStringEvaluator } from '../sharedtools/math/JavascriptStringEvaluator';
import { RealNumberVector } from '../sharedtools/math/RealNumberVector';
import { Derivative2 } from '../sharedtools/math/Derivative2';
import { RealNumberMatrix } from '../sharedtools/math/RealNumberMatrix';

@Component({
  selector: 'app-zxy',
  providers: [Location, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  templateUrl: './zxy.component.html',
  styleUrls: ['./zxy.component.scss'],
  host: {
    '(window:resize)': 'onresize($event)'
  }
})
export class ZxyComponent implements OnInit 
{
  private equation: JavascriptStringEvaluator;
  private equation3dTextValidator: CrossSiteScriptValidator;
  private mathCanvas: MathCanvas2D;

  private transformMatrix: RealNumberMatrix;

  //TODO:  user input range
  private XLOW: number = -2*Math.PI; 
  private XHIGH: number = 2*Math.PI;
  private YLOW: number = -2*Math.PI;
  private YHIGH: number = 2*Math.PI;
  private XNumberOfLines: number = 128;
  private YNumberOfLines: number = 128;
  // :Input "#X Lines:",XRES
  // :Input "#Y Lines:",YRES
  // :(XHIGH-XLOW)/XRES->XRES
  // :(YHIGH-YLOW)/YRES->YRES

  public inputForm!: FormGroup;
  location: Location;



  constructor(location: Location)
  {
    this.location = location;

  }

  onresize(event): void
  {
    console.log('new window width: ' + event.target.innerWidth + ' height: ' + event.target.innerHeight);
    this.mathCanvas.onresize();
  }

  ngOnInit(): void 
  {
    this.transformMatrix = new RealNumberMatrix();

    this.equation = new JavascriptStringEvaluator();
    this.equation.color = 'red';

    this.equation3dTextValidator = new CrossSiteScriptValidator();
    this.inputForm  = new FormGroup({
      equation3dTextBox: new FormControl(
        null,
        [Validators.required, this.equation3dTextValidator.containsForbiddenKeyWord /* .bind(this.equation3dTextValidator) not needed if containsForbiddenKeyWord is defined by lambda function */ ],
        this.equation3dTextValidator.validate
      )
    });

    const htmlCanvasElement = document.getElementById('CanvasID') as HTMLCanvasElement;


    htmlCanvasElement.onclick = function(event: MouseEvent) //.bind(this.mathCanvas)
    {
      let rect = htmlCanvasElement.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      let world2D = globalReferanceToThisComponent.mathCanvas.getRange().canvasToWorld2D(x,y);
      console.log("world 2d = x: " + world2D.elements[0] + " y: " + world2D.elements[1])
      // console.log('left: ' +rect.left)
      // console.log('top: ' +rect.top)
      // console.log('clientX: ' + event.clientX)
      // console.log('clientY: ' + event.clientY)
      // console.log('pageX: ' + event.pageX)
      // console.log('pageY: ' + event.pageY)
      
    }
    //.addEventListener('click' (event) => {})
    htmlCanvasElement.width = window.innerWidth;
    htmlCanvasElement.height = window.innerHeight; //height of visible window  !!!!!! <-- do in onresize

    const canvasContext2d = htmlCanvasElement.getContext('2d') ;
    this.mathCanvas = new MathCanvas2D(canvasContext2d);
    this.mathCanvas.setRangeValues(-10.0, 10.0, -10.0, 10.0);
    this.mathCanvas.onresize();

    var globalReferanceToThisComponent = this;


    htmlCanvasElement.onclick = function(event: MouseEvent) //.bind(this.mathCanvas)
    {
      let rect = htmlCanvasElement.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      let world2D = globalReferanceToThisComponent.mathCanvas.getRange().canvasToWorld2D(x,y);
      console.log("world 2d = x: " + world2D.elements[0] + " y: " + world2D.elements[1])
      // console.log('left: ' +rect.left)
      // console.log('top: ' +rect.top)
      // console.log('clientX: ' + event.clientX)
      // console.log('clientY: ' + event.clientY)
      // console.log('pageX: ' + event.pageX)
      // console.log('pageY: ' + event.pageY)
      
    }
    //.addEventListener('click' (event) => {})
    
    
    

  }

  public draw(): void
  {

    //TODO: make setLookAtMatrix inputs class fields
    const cameraPosition = new RealNumberVector([10, 10, 10]);
    const focalPoint = new RealNumberVector([0, 0, 0]);
    const upVector = new RealNumberVector([0, 0, 1]);
    this.transformMatrix.setLookAtMatrix(cameraPosition, focalPoint, upVector);

   // this.transformMatrix.log();

    //TODO: use derivative to find interesting lines
    //      decide what to do for exceptions

    let Z: number;
    let YNext: number;
    let XNext: number;
   let faceVertexArray: Array<RealNumberVector> = new Array<RealNumberVector>(); 
   faceVertexArray.push(new RealNumberVector([0, 0, 0]));
   faceVertexArray.push(new RealNumberVector([0, 0, 0]));
   faceVertexArray.push(new RealNumberVector([0, 0, 0]));
   faceVertexArray.push(new RealNumberVector([0, 0, 0]));

   let isValid: Array<boolean> = new Array<boolean>(4);

   let transformedVertexArray: Array<RealNumberVector> = new Array<RealNumberVector>(); 
   transformedVertexArray.push(new RealNumberVector([0, 0, 0]));
   transformedVertexArray.push(new RealNumberVector([0, 0, 0]));
   transformedVertexArray.push(new RealNumberVector([0, 0, 0]));
   transformedVertexArray.push(new RealNumberVector([0, 0, 0]));

   let vectorDifference1:RealNumberVector = null;
   let vectorDifference2:RealNumberVector = null;
   let normalVector:RealNumberVector = null;

   console.log("transformedVertexArray.length = " + transformedVertexArray.length)

//return;

    // let P0: RealNumberVector = new RealNumberVector([0, 0, 0]);
    // let P0isValid: boolean;
    // let P1: RealNumberVector = new RealNumberVector([0, 0, 0]);
    // let P1isValid: boolean;
    // let P2: RealNumberVector = new RealNumberVector([0, 0, 0]);
    // let P2isValid: boolean;
    // let P3: RealNumberVector = new RealNumberVector([0, 0, 0]);
    // let P3isValid: boolean;
    let XRES = (this.XHIGH - this.XLOW)/this.XNumberOfLines;
    let YRES = (this.YHIGH - this.YLOW)/this.YNumberOfLines;
    let maximumAllowedZ = 1000000;
    let minimumAllowedZ = -1000000;
    
    for (let Y = this.YLOW; Y < this.YHIGH; Y += YRES)
    {
      YNext = Y + YRES;

      let X = this.XLOW;
      while ( X <  this.XHIGH  )
      {
        XNext = X + XRES;

        isValid[0] = false;
        try
        {
          Z = this.equation.evaluateAtXY(X, Y);
          if (Z < maximumAllowedZ && Z > minimumAllowedZ)
          {
            faceVertexArray[0].set(X, Y, Z);
            isValid[0] = true;
            this.transformMatrix.MultiplyByArrayOnRightAndStoreToResultArray(faceVertexArray[0].elements, transformedVertexArray[0].elements);
          //  transformedVertexArray[0].transformWorld2DToCanvas2DCoordinates(this.mathCanvas.range);
          }
        }
        catch (error: any)
        {
          console.log('ZXY error:' + error);
          return;
        }

        isValid[1] = false;
        try
        {
          Z = this.equation.evaluateAtXY(XNext, Y);
          if (Z < maximumAllowedZ && Z > minimumAllowedZ)
          {
            faceVertexArray[1].set(XNext, Y, Z);
            isValid[1] = true;
            this.transformMatrix.MultiplyByArrayOnRightAndStoreToResultArray(faceVertexArray[1].elements, transformedVertexArray[1].elements);
          //  transformedVertexArray[1].transformWorld2DToCanvas2DCoordinates(this.mathCanvas.range);
          }
        }
        catch (error: any)
        {
          console.log('ZXY error:' + error);
          return;
        }

        isValid[2] = false;
        try
        {
          Z = this.equation.evaluateAtXY(XNext, YNext);
          if (Z < maximumAllowedZ && Z > minimumAllowedZ)
          {
            faceVertexArray[2].set(XNext, YNext, Z);
            isValid[2] = true;
            this.transformMatrix.MultiplyByArrayOnRightAndStoreToResultArray(faceVertexArray[2].elements, transformedVertexArray[2].elements);
          //  transformedVertexArray[2].transformWorld2DToCanvas2DCoordinates(this.mathCanvas.range);
          }
        }
        catch (error: any)
        {
          console.log('ZXY error:' + error);
          return;
        }

        isValid[3] = false;
        try
        {
          Z = this.equation.evaluateAtXY(X, YNext);
          if (Z < maximumAllowedZ && Z > minimumAllowedZ)
          {
            faceVertexArray[3].set(X, YNext, Z);
            isValid[3] = true;
            this.transformMatrix.MultiplyByArrayOnRightAndStoreToResultArray(faceVertexArray[3].elements, transformedVertexArray[3].elements);
          //  transformedVertexArray[3].transformWorld2DToCanvas2DCoordinates(this.mathCanvas.range);
          }
        }
        catch (error: any)
        {
          console.log('ZXY error:' + error);
          return;
        }

        if (isValid[0] && isValid[1] && isValid[2] && isValid[3]) 
        {
          //unit length vectors not needed for culling, only for lighting
          vectorDifference1 = faceVertexArray[1].getDifferenceWith(faceVertexArray[0]); //faceVertexArray[1] - faceVertexArray[0]
          vectorDifference2 = faceVertexArray[2].getDifferenceWith(faceVertexArray[1]);
          normalVector = vectorDifference1.crossProduct(vectorDifference2);
          if (normalVector.dotProduct(cameraPosition) >= 0)
          {
            this.mathCanvas.drawLineSegmentVertexArrayWorld2D(this.equation.color, transformedVertexArray[0], transformedVertexArray[1], transformedVertexArray[2], transformedVertexArray[3]);

          }


        }
        else
        {

          //TODO:  partial valid vertex cases

        }


      //   Z = this.equation.evaluateAtXY(X, Y);
      //   P0.set(X, Y, Z);
      //  // console.log('P0 pre transform');
      //   //P0.log();
      //   this.transformMatrix.transformVectorOnRight(P0); //cannot be inside the inner loop if points are reused :(  make transformed P0 variable???
      //    //   P0.transformWorld2DToCanvas2DCoordinates(this.mathCanvas.range);
      //   //console.log('P0 post transform');
      //   //P0.log();


      //   try 
      //   {
      //     X += XRES ;
      //     Z = this.equation.evaluateAtXY(X, Y);
      //     P1.set(X, Y, Z);



      //     this.transformMatrix.transformVectorOnRight(P1);
      //  //   P1.transformWorld2DToCanvas2DCoordinates(this.mathCanvas.range);
      //   this.mathCanvas.drawLineWorld2D(P0.elements[0],P0.elements[1],P1.elements[0],P1.elements[1], '#FF8000');

      //   P0.set(...P1.elements);

      //   //   X += XRES / 4;
      //   //   Z = this.equation.evaluateAtXY(X, Y);
      //   //   P2.set(X, Y, Z);
      //   //   this.transformMatrix.transformVectorOnRight(P2);
      //   //   P2.transformWorld2DToCanvas2DCoordinates(this.mathCanvas.range);

      //   //   X += XRES / 4;
      //   //   Z = this.equation.evaluateAtXY(X, Y);
      //   //   P3.set(X, Y, Z);
      //   //   this.transformMatrix.transformVectorOnRight(P3);
      //   //   P3.transformWorld2DToCanvas2DCoordinates(this.mathCanvas.range);

      //   // //   X += XRES / 4;


      //   // //   this.mathCanvas.drawLineSegmentVertexArrayWorld2D('green', P0,P1,P2,P3);
      //   //   this.mathCanvas.bezierCurveThrough4Points(P0,P1,P2,P3, 'red');




      //   } 
      //   catch (error: any)
      //   {
      //     console.log('ZXY error:' + error);
      //   }


        X += XRES;
      }
      

      //Y += YRES;
    }

  //   this.mathCanvas.emptyDrawableArray();
  //   this.mathCanvas.drawableArray.push(this.equation); //???????

  //  // this.equation.draw(this.mathCanvas);

  //   //test log Deriv 1
  //   const d1 = new Derivative1(this.equation, 'green', 0.001);
  //   this.mathCanvas.drawableArray.push(d1);
  // // // console.log("Derivative 1 = " + d1.evaluateAtX(Math.PI/4));
  // // d1.draw(this.mathCanvas);

  // const d2 = new Derivative2(this.equation, 'blue', 0.001);
  // this.mathCanvas.drawableArray.push(d2);

  //   this.mathCanvas.draw();

  console.log('draw is done');

  }

  public onInputSubmit(): void
  {
    if ((this.inputForm.controls.equation3dTextBox.value != null) && (this.inputForm.controls.equation3dTextBox.errors == null))
    {
      let JavascriptStringEvaluator: JavascriptStringEvaluator = this.equation as JavascriptStringEvaluator;
      JavascriptStringEvaluator.functionToEvaluate = this.inputForm.controls.equation3dTextBox.value;

   //   console.log(this.mathCanvas.getRange().conciseJSON());

      this.mathCanvas.Erase();

      this.draw();
     // console.log("error: " + this.inputForm.controls.equation3dTextBox.errors);
     // console.log;
    }

    else if (this.inputForm.controls.equation3dTextBox.errors?.equation3dTextBoxIsInvalid)
    {
      alert('Do not inject cross site scripts into the equation text box'); 
    }



  }


}
