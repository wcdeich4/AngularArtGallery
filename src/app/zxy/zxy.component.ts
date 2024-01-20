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
  private XLOW: number;
  private XHIGH: number;
  private YLOW: number;
  private YHIGH: number;
  private XNumberOfLines: number;
  private YNumberOfLines: number;
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

  onresize(event)
  {
    console.log('new window width: ' + event.target.innerWidth + ' height: ' + event.target.innerHeight);
    this.mathCanvas.onresize();
  }

  ngOnInit(): void 
  {
//    this.transformMatrix = new RealNumberMatrix();

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

    const canvas = htmlCanvasElement.getContext('2d') ;
    this.mathCanvas = new MathCanvas2D(canvas);
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
    
    this.equation = new JavascriptStringEvaluator();
    this.equation.color = 'red';

  }

  public draw(): void
  {
    //change to set?
//    this.transformMatrix = RealNumberMatrix.getLookAtMatrix()


    //TODO: use derivative to find interesting lines
    //      decide what to do for exceptions

    let Z: number;
    let YNext: number;
    let V0: RealNumberVector = new RealNumberVector([0, 0, 0]);
    let V1: RealNumberVector = new RealNumberVector([0, 0, 0]);
    let V2: RealNumberVector = new RealNumberVector([0, 0, 0]);
    let V3: RealNumberVector = new RealNumberVector([0, 0, 0]);
    let XRES = (this.XHIGH - this.XLOW)/this.XNumberOfLines;
    let YRES = (this.YHIGH - this.YLOW)/this.YNumberOfLines;
    for (let Y = this.YLOW; Y < this.YHIGH; Y += YRES)
    {
      for (let X = this.XLOW; X <  this.XHIGH; X += XRES )
      {
        try 
        {
          Z = this.equation.evaluateAtXY(X, Y);
          V0.set(X, Y, Z);
          X += XRES / 4;

          Z = this.equation.evaluateAtXY(X, Y);
          V1.set(X, Y, Z);
          X += XRES / 4;

          Z = this.equation.evaluateAtXY(X, Y);
          V2.set(X, Y, Z);
          X += XRES / 4;

          Z = this.equation.evaluateAtXY(X, Y);
          V3.set(X, Y, Z);
          X += XRES / 4;

          


        } 
        catch (error)
        {
          
        }


        
      }
      
    }

    this.mathCanvas.emptyDrawableArray();
    this.mathCanvas.drawableArray.push(this.equation); //???????

   // this.equation.draw(this.mathCanvas);

    //test log Deriv 1
    const d1 = new Derivative1(this.equation, 'green', 0.001);
    this.mathCanvas.drawableArray.push(d1);
  // // console.log("Derivative 1 = " + d1.evaluateAtX(Math.PI/4));
  // d1.draw(this.mathCanvas);

  const d2 = new Derivative2(this.equation, 'blue', 0.001);
  this.mathCanvas.drawableArray.push(d2);

    this.mathCanvas.draw();

  }

  public onInputSubmit(): void
  {
    if ((this.inputForm.controls.equation3dTextBox.value != null) && (this.inputForm.controls.equation3dTextBox.errors == null))
    {
      let JavascriptStringEvaluator: JavascriptStringEvaluator = this.equation as JavascriptStringEvaluator;
      JavascriptStringEvaluator.functionToEvaluate = this.inputForm.controls.equation3dTextBox.value;
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
