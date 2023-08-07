import { MathCanvas2D } from "./MathCanvas2D";
import { Fractile } from "./Fractile";
import { Range2D } from "../math/Range2D";

/**
 * https://spanishplus.tripod.com/maths/FractalBarnsley.htm
 * https://en.wikipedia.org/wiki/Barnsley_fern
 */
export class FernDotFractile extends Fractile
{
    public calculated: boolean = true;
    private worker: Worker;

    constructor()
    {
        super();
        this.range = new Range2D(-2.1818 , 3.76, 0, 10 );
        this.range.log();
    }

    public disposeOfWorker(): void
    {
      if (this.worker != undefined && this.worker != null)
      {
        this.worker.terminate();
        this.worker = undefined;
      }
    }

    public draw(mathCanvas: MathCanvas2D): void
    {

      if (typeof Worker == 'undefined') {
        alert("Sorry, your browser does not support Web Workers...");
      }
      else
      {
        // Create a new web worker
        let worker = new Worker(new URL('./FernDotFractile.WebWorker', import.meta.url));

//max time to let worker run
        setTimeout(function(){ 
          //this.disposeOfWorker(); //ERROR: TypeError this.disposeOfWorker() is not a function 
          if (this.worker != undefined && this.worker != null)
          {
            console.log('terminating worker');
            this.worker.terminate();
            this.worker = undefined;
          }
         }, 60000);


        worker.onmessage = ({ data }) => {

          let parsedData = JSON.parse(data);
       //   console.log(parsedData);

          if (parsedData.range != undefined)
          {
            this.range = parsedData.range;
            //this.range.log(); //error here
            console.log('set range: ' );
            console.log(this.range);
          }

          if (parsedData.dot == null)
          {
            console.log('parsedData.dot == null')
          }

          else //if (parsedData.dot != undefined)
          {
            console.log('parsedData.dot = ' + parsedData.dot);
            mathCanvas.drawPixelWorld2DCoordinatesFromVector2D(parsedData.dot, '#00FF00');
          }







          if (parsedData.finished != undefined)
          {
            console.log('dispsosing of worker');
            this.disposeOfWorker();
          }

/*
let displayMessage = null;
let typeString: string = typeof data;
console.log("message type = " + typeString)
          if (typeString == 'object') 
          {
            try {
              let vectorData = data as  RealNumberVector;
              if (vectorData == null)
              {
                displayMessage = 'data as  RealNumberVector was null';
              }
              else
              {
                displayMessage = 'RealNumberVector.y = ' + parsedData.y;
                //worked!!!!!!!!!!!
                //how can we test if it is line or triangle??????????........
              }
            } catch (error) {
              displayMessage = 'error casting to RealNumberVector : ' + error;
            }
            
          }
          else{
            displayMessage = `page got message: ${data}`;
          }



          console.log(displayMessage);
*/


        };
        worker.postMessage('message sent from FernDotFractile.ts to worker');
      }









       // mathCanvas.setRange(this.range);


    }

    public process(): void
    {

    }


}