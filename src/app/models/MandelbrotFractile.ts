import { MathCanvas2D } from "./MathCanvas2D";
import { Fractile } from "./Fractile";
import { Range2D } from "../math/Range2D";
import { ComplexNumber } from "../math/ComplexNumber";

export class MandelbrotFractile extends Fractile
{
    public calculated: boolean = true;
    public iterationLimit: number = 80;
    private worker: Worker;

    constructor()
    {
        super();
        this.range = new Range2D(-2.00, 0.47, -1.12, 1.12 );
     //   this.range.log();
        
    }

    public disposeOfWorker(): void
    {
      if (this.worker != undefined && this.worker != null)
      {
        this.worker.terminate();
        this.worker = undefined;
      }
    }


    draw(mathCanvas: MathCanvas2D): void 
    {

        if (typeof Worker == 'undefined') {
            alert("Sorry, your browser does not support Web Workers...");
        }
        else
        {
        // Create a new web worker
        this.worker = new Worker(new URL('./Mandelbrot.WebWorker', import.meta.url));
        console.log('worker created');


        //max time to let worker run
        setTimeout(function(){ 
            if (this.worker != undefined && this.worker != null) { this.disposeOfWorker(); }
            }, 60000);


        this.worker.onmessage = ({ data }) => {

            let parsedData = JSON.parse(data);



            if (parsedData.dot == null)
            {
                console.log('parsedData.dot == null')
            }
            else //if (parsedData.dot != undefined)
            {
            console.log('parsedData.dot = ' + parsedData.dot);
            mathCanvas.drawPixelWorld2D(parsedData.dot);
            }

            if (parsedData.finished != undefined)
            {
            console.log('dispsosing of worker');
            this.disposeOfWorker();
            }


        };
    //       worker.postMessage('message sent from FernDotFractile.ts to worker');
        }

        if (this.worker == null)
        {
            console.log('this.worker == null');
        }
        else
        {
            console.log('this.worker != null');


            const width = mathCanvas.getWidth();
            const height = mathCanvas.getHeight();
            let world2DComplexCoordinates: ComplexNumber = null;
            for (let w = 0; w < width; w++)
            {
                for (let h = 0; h < height; h++) 
                {
                   world2DComplexCoordinates = mathCanvas.canvasToWorld2DComplex(w, h);

    
                this.worker.postMessage( JSON.stringify( { coordinate: world2DComplexCoordinates } )  );
    
                   
    
    
    
                }
    
                
            } 
        }



    }

    process(): void {
        
    }

    
}