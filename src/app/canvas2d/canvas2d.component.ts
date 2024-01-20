import { Component, OnInit, SecurityContext } from '@angular/core';
import {HashLocationStrategy, Location, LocationStrategy} from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { IMathDrawable } from '../sharedtools/models/IMathDrawable';
import { MathCanvas2D } from '../sharedtools/models/MathCanvas2D'
import { SirpinskiTriangleFractile } from '../sharedtools/models/SirpinskiTriangleFractle';
import { Derivative1 } from '../sharedtools/math/Derivative1';
import { I2DEquation } from '../sharedtools/math/I2DEquation';
import { JavascriptStringEvaluator } from '../sharedtools/math/JavascriptStringEvaluator';
import { RealNumberVector } from '../sharedtools/math/RealNumberVector';
@Component({
  selector: 'app-canvas2d',

  templateUrl: './canvas2d.component.html',
  styleUrls: ['./canvas2d.component.scss'],
  host: {
    '(window:resize)': 'onresize($event)'
  }
})
export class Canvas2DComponent implements OnInit 
{
  private equation: I2DEquation;
  private equationText: string;
  private mathCanvas: MathCanvas2D;
  public inputForm!: FormGroup;
  location: Location;
  constructor(location: Location)
  {
    this.location = location;
  }

  onresize(event)
  {
    console.log('new window width: ' + event.target.innerWidth + ' height: ' + event.target.innerHeight);
    this.mathCanvas.onresize();
  }

  ngOnInit(): void 
  {

    this.inputForm  = new FormGroup({
      equationFormControlName: new FormControl()
    });

    const htmlCanvasElement = document.getElementById('CanvasID') as HTMLCanvasElement;
    
    htmlCanvasElement.width = window.innerWidth;
    htmlCanvasElement.height = window.innerHeight; //height of visible window  !!!!!! <-- do in onresize

    const canvas = htmlCanvasElement.getContext('2d') ;
    this.mathCanvas = new MathCanvas2D(canvas);
    this.mathCanvas.setRangeValues(-10.0, 10.0, -10.0, 10.0);
    this.mathCanvas.onresize();
    
    this.equation = new JavascriptStringEvaluator();
    this.equation.color = 'white';

  }

  public draw(): void
  {

    //TODO:  give MathCanvas2D a list of equations to draw
    //       have fractiles specify their own range
    //       custom validator to make sure equationText does not contain http, xhr, fetch, promise 

    //is try-catch overkill?????????

  let point1IsCalculatable: boolean = false;
  let point2IsCalculatable: boolean = false;
    let x1, y1, x2, y2: number ;
    let xIncrement: number = 0.1;
    x1 = this.mathCanvas.getRange().xMin;
    try
    {
      y1 = this.equation.evaluateAtX(x1);
      point1IsCalculatable = !isNaN(y1);
    }
    catch (error)
    {
      point1IsCalculatable = false;
    }

    console.log("point1IsCalculatable = " + point1IsCalculatable);
    console.log('isNaN(y1) = ' + isNaN(y1));

   // pointQueue.push(new RealNumberVector(x1, y1));
 

 //   const temp = pointQueue.splice(0);




 //console.log("pointQueue.length = " + pointQueue.length);
    while(x1 < this.mathCanvas.getRange().xMax)
    {
      x2 = x1 + xIncrement;
      try
      {
        y2 = this.equation.evaluateAtX(x2);
        point2IsCalculatable = !isNaN(y2);
      }
      catch(error)
      {
        point2IsCalculatable = false;
      }

      if (point1IsCalculatable && point2IsCalculatable)
      {
        this.mathCanvas.drawLineWorld2D(x1, y1, x2, y2, this.equation.color);
      }
      else if (point1IsCalculatable && !point2IsCalculatable)
      {
        //we need to draw this lone point so it is not lost
        this.mathCanvas.drawPixelWorld2DCoordinates(x1, y1, this.equation.color);
      }
      //other cases automatically handled on next loop
      
      //update for next loop
      point1IsCalculatable = point2IsCalculatable;
      x1 = x2;
      y1 = y2;
    }

    //special case for last point
    //at the very end we cannot expect the point to be handled on next loop
    if (!point1IsCalculatable && point2IsCalculatable)
    {
      this.mathCanvas.drawPixelWorld2DCoordinates(x2, y2, this.equation.color);
    }

    //test log Deriv 1
    const d1 = new Derivative1(this.equation, 'red', 0.001);
   // console.log("Derivative 1 = " + d1.evaluateAtX(Math.PI/4));

    x1 = this.mathCanvas.getRange().xMin;
    y1 = d1.evaluateAtX(x1);

    while(x1 < this.mathCanvas.getRange().xMax)
    {
      x2 = x1 + xIncrement;
      y2 = d1.evaluateAtX(x2);
      this.mathCanvas.drawLineWorld2D(x1, y1, x2, y2, d1.color);
      x1 = x2;
      y1 = y2;
    }

  }

  public onInputSubmit(): void
  {
    if (this.inputForm.controls.equationFormControlName.errors != null)
    {
      console.log("error: " + this.inputForm.controls.equationFormControlName.errors);
    }

    if (this.inputForm.controls.equationFormControlName.value != null)
    {
      let JavascriptStringEvaluator: JavascriptStringEvaluator = this.equation as JavascriptStringEvaluator;
      JavascriptStringEvaluator.functionToEvaluate = this.inputForm.controls.equationFormControlName.value;
      this.mathCanvas.Erase();
      this.draw();
    }


  //  console.log(
  ////    this.sanitizer.sanitize(SecurityContext.SCRIPT,
  //    this.inputForm.controls.equationFormControlName.value
  ////  )
   //   );
  }


}
