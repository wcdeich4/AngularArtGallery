import { Component, OnInit, SecurityContext } from '@angular/core';
import {HashLocationStrategy, Location, LocationStrategy} from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { CrossSiteScriptValidator } from '../models/CrossSiteScriptValidator';
import { IMathDrawable } from '../models/IMathDrawable';
import { MathCanvas2D } from '../models/MathCanvas2D'
import { SirpinskiTriangleFractile } from '../models/SirpinskiTriangleFractle';
import { Derivative1 } from '../math/Derivative1';
import { I2DEquation } from '../math/I2DEquation';
import { Javascript2DStringEvaluator } from '../math/Javascript2DStringEvaluator';
import { Vector2D } from '../math/Vector2D';
import { Derivative2 } from '../math/Derivative2';
@Component({
  selector: 'app-calculus',
  providers: [Location, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  templateUrl: './calculus.component.html',
  styleUrls: ['./calculus.component.scss'],
  host: {
    '(window:resize)': 'onResize($event)'
  }
})
export class CalculusComponent implements OnInit 
{
  private equation: Javascript2DStringEvaluator;
  private equationTextValidator: CrossSiteScriptValidator;
 // private equationText: string;
  private mathCanvas: MathCanvas2D;
  public inputForm!: FormGroup;
  location: Location;
  constructor(location: Location)
  {
    this.location = location;
  }

  onResize(event)
  {
    console.log('new window width: ' + event.target.innerWidth + ' height: ' + event.target.innerHeight);
    this.mathCanvas.onReize();
  }

  ngOnInit(): void 
  {
    this.equationTextValidator = new CrossSiteScriptValidator();
    this.inputForm  = new FormGroup({
      equationTextBox: new FormControl(
        null,
        [Validators.required, this.equationTextValidator.containsForbiddenKeyWord /* .bind(this.equationTextValidator) not needed if containsForbiddenKeyWord is defined by lambda function */ ],
        this.equationTextValidator.validate
      )
    });

    const htmlCanvasElement = document.getElementById('CanvasID') as HTMLCanvasElement;


    htmlCanvasElement.onclick = function(event: MouseEvent) //.bind(this.mathCanvas)
    {
      let rect = htmlCanvasElement.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      let world2D = globalReferanceToThisComponent.mathCanvas.canvasToWorld2D(x,y);
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
    htmlCanvasElement.height = window.innerHeight; //height of visible window  !!!!!! <-- do in OnResize

    const canvas = htmlCanvasElement.getContext('2d') ;
    this.mathCanvas = new MathCanvas2D(canvas);
    this.mathCanvas.setRangeValues(-10.0, 10.0, -10.0, 10.0);
    this.mathCanvas.onReize();

    var globalReferanceToThisComponent = this;


    htmlCanvasElement.onclick = function(event: MouseEvent) //.bind(this.mathCanvas)
    {
      let rect = htmlCanvasElement.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      let world2D = globalReferanceToThisComponent.mathCanvas.canvasToWorld2D(x,y);
      console.log("world 2d = x: " + world2D.elements[0] + " y: " + world2D.elements[1])
      // console.log('left: ' +rect.left)
      // console.log('top: ' +rect.top)
      // console.log('clientX: ' + event.clientX)
      // console.log('clientY: ' + event.clientY)
      // console.log('pageX: ' + event.pageX)
      // console.log('pageY: ' + event.pageY)
      
    }
    //.addEventListener('click' (event) => {})
    
    this.equation = new Javascript2DStringEvaluator();
    this.equation.color = 'red';
/*
    this.equationText = 'x';

    let javascript2DStringEvaluator: Javascript2DStringEvaluator = this.equation as Javascript2DStringEvaluator;

    javascript2DStringEvaluator.functionOfx = this.equationText;

    this.draw();
*/
  }

  public draw(): void
  {

    this.mathCanvas.emptyDrawableArray();
    this.mathCanvas.drawableArray.push(this.equation);

   // this.equation.draw(this.mathCanvas);

    //test log Deriv 1
    const d1 = new Derivative1(this.equation, 'green', 0.001);
    this.mathCanvas.drawableArray.push(d1);
  // // console.log("Derivative 1 = " + d1.evaluateAt(Math.PI/4));
  // d1.draw(this.mathCanvas);

  const d2 = new Derivative2(this.equation, 'blue', 0.001);
  this.mathCanvas.drawableArray.push(d2);

    this.mathCanvas.draw();

  }

  public onInputSubmit(): void
  {
    if ((this.inputForm.controls.equationTextBox.value != null) && (this.inputForm.controls.equationTextBox.errors == null))
    {
      let javascript2DStringEvaluator: Javascript2DStringEvaluator = this.equation as Javascript2DStringEvaluator;
      javascript2DStringEvaluator.functionOfx = this.inputForm.controls.equationTextBox.value;
      this.mathCanvas.Erase();

      this.draw();
     // console.log("error: " + this.inputForm.controls.equationTextBox.errors);
      console.log;
    }

    else if (this.inputForm.controls.equationTextBox.errors?.equationTextBoxIsInvalid)
    {
      alert('Do not inject cross site scripts into the equation text box');
   //   
    }


  //  console.log(
  ////    this.sanitizer.sanitize(SecurityContext.SCRIPT,
  //    this.inputForm.controls.equationTextBox.value
  ////  )
   //   );
  }


}
