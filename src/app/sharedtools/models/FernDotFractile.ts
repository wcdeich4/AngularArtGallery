import { MathCanvas2D } from "./MathCanvas2D";
import { Fractile } from "./Fractile";
import { ScreenRangeConverter2D } from "../math/ScreenRangeConverter2D";
import { RealNumberVector } from "../math/RealNumberVector";

/**
 * https://spanishplus.tripod.com/maths/FractalBarnsley.htm
 * https://en.wikipedia.org/wiki/Barnsley_fern
 */
export class FernDotFractile extends Fractile
{

    constructor()
    {
        super();
        this.calculated = true;
        this.range = new ScreenRangeConverter2D(-2.1818 , 3.76, 0, 10  );
       // this.range.log();
    }

    // public disposeOfWorker(): void
    // {
    //   if (this.worker != undefined && this.worker != null)
    //   {
    //     this.worker.terminate();
    //     this.worker = undefined;
    //   }
    // }

    public draw(mathCanvas: MathCanvas2D): void
    {
      if (typeof this.range == 'undefined' || this.range == null ){
        console.log('this.range == undefined || this.range == null ');
      }

      if (typeof mathCanvas == 'undefined' || mathCanvas == null ){
        console.log('mathCanvas == undefined || mathCanvas == null ');
      }

     // mathCanvas.range = this.range; //fails to set aspect ratios

     mathCanvas.setRange(this.range);

    //  if ()

//      console.log(mathCanvas.range.log());

      if (typeof Worker == 'undefined') {
        alert("Sorry, your browser does not support Web Workers...");
      }
      else
      {
        // Create a new web worker
        this.worker = new Worker(new URL('./FernDotFractile.WebWorker', import.meta.url));

//max time to let worker run
        setTimeout(function(){ 
          //this.disposeOfWorker(); //ERROR: TypeError this.disposeOfWorker() is not a function 
          if (this.worker != undefined && this.worker != null)
          {
            console.log('terminating worker');
            // this.worker.terminate();
            // this.worker = undefined;
            this.disposeOfWorker();
          }
         }, 60000);


         this.worker.onmessage = ({ data }) => {

      //    console.log('worker.onmessage = ({ data }) => ' + data);

          let parsedData = JSON.parse(data) as RealNumberVector;
        //  console.log(parsedData);

        //   if (parsedData.range != undefined)
        //   {
        //     this.range = parsedData.range;
        //     //this.range.log(); //error here
        //     console.log('set range: ' );
        //     console.log(this.range);
        //   }

        if (parsedData == undefined)
        {
          console.log('parsedData == undefined')
        }

        else if (parsedData == null)
        {
          console.log('parsedData == null')
        }

        else //if (parsedData.dot != undefined)
        {
          mathCanvas.drawPixelWorld2DCoordinatesFromVector(parsedData, '#00FF00');
        }







          // if (parsedData.finished != undefined)
          // {
          //   console.log('dispsosing of worker');
          //   this.disposeOfWorker();
          // }

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
        this.worker.postMessage('message sent from FernDotFractile.ts to worker');
      }









       // mathCanvas.setRange(this.range);


    }

    public process(): void
    {

    }

    public stop(): boolean
    {

      throw new Error('not implemented');

      return false;
    }


}