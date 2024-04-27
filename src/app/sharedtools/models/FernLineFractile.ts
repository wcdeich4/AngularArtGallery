import { MathCanvas2D } from "./MathCanvas2D";
import { Fractile } from "./Fractile";
import { RealNumberVector } from "../math/RealNumberVector";
import { ScreenRangeConverter2D } from "../math/ScreenRangeConverter2D";

export class FernLineFractile extends Fractile
{
    public branchPointPercentage: number = 0.4;
    public scalePercentage: number = 0.6;
    public recursionDepthLimit = 5;
    private seedPoint1: RealNumberVector;
    private seedPoint2: RealNumberVector;

    constructor(range?: ScreenRangeConverter2D)
    {
        super();
        if (range == null)
        {
          range = ScreenRangeConverter2D.Standard();
        }
        this.range = range;
        this.seedPoint1 = new RealNumberVector([0, -10]);
        this.seedPoint2 = new RealNumberVector([0, 10]);
        this.calculated = true;
      }

    public draw(mathCanvas: MathCanvas2D): void
    {
      this.processLines(mathCanvas, this.seedPoint1, this.seedPoint2,  0);
    }

    public process(): void
    {

    }

    public processLines(mathCanvas: MathCanvas2D, vertex1: RealNumberVector, vertex2: RealNumberVector,  depth: number = 0): void
    {

      mathCanvas.drawLineWorld2D(vertex1.elements[0], vertex1.elements[1], vertex2.elements[0], vertex2.elements[1], 'green');

      if (this.recursionDepthLimit > depth)
      {
         // let newInbetweenPoint = vertex1.getWeightedAverageWithAnotherVector(this.branchPointPercentage, vertex2, 1 - this.branchPointPercentage) as RealNumberVector;
         // newInbetweenPoint.add(vertex1);
          let sizeOfCurrentLineSegment = vertex2.getDistanceTo(vertex1);
          let directionVector = vertex2.getDifferenceWith(vertex1) as RealNumberVector;
          directionVector.normalize();

          let newInbetweenPoint = directionVector.clone();
          newInbetweenPoint.multiplyByScalar(this.branchPointPercentage * sizeOfCurrentLineSegment);
          newInbetweenPoint.add(vertex1);

          

          //the line segment from newInbetweenPoint to vertex2 will not change the fractile, but it makes processing easier
          // let newIndex1 = this.vertexArray.push(newInbetweenPoint) - 1;

          // let cloneOfVertex2: RealNumberVector = vertex2.clone() as RealNumberVector;
          // let newIndex2 = this.vertexArray.push(cloneOfVertex2) - 1;
          // let firstNewLineSegmentIndex = this.LineSegments.push(new LineSegmentIndices(new IndexTriplet(newIndex1), new IndexTriplet(newIndex2))) - 1;
  
          // let directionVector = newInbetweenPoint.getDifferenceWith(vertex1) as RealNumberVector; //how do we know it should be vertex1 in general.................?
          // directionVector.normalize();
          // sizeOfCurrentLineSegment = vertex2.getDistanceTo(vertex1);
          // let newIndex3: number = this.vertexArray.push(newInbetweenPoint) - 1;
  
          let prevendicularVector1: RealNumberVector = directionVector.getPerpendicularClockwise();
          prevendicularVector1.normalize();
          prevendicularVector1.multiplyByScalar(sizeOfCurrentLineSegment * this.scalePercentage * 0.5);
          let newEndPoint1 = newInbetweenPoint.getSumWith(prevendicularVector1)  as RealNumberVector;
        //  let newIndex4: number = this.vertexArray.push(newEndPoint1) - 1;
  
         // this.LineSegments.push(new LineSegmentIndices(new IndexTriplet(newIndex3), new IndexTriplet(newIndex4)));
 
          let prevendicularVector2: RealNumberVector = directionVector.getPerpendicularCounterClockwise();
          prevendicularVector2.normalize();
          prevendicularVector2.multiplyByScalar(sizeOfCurrentLineSegment * this.scalePercentage * 0.5);
          let newEndPoint2 = newInbetweenPoint.getSumWith(prevendicularVector2) as RealNumberVector;
       //   let newIndex5: number = this.vertexArray.push(newEndPoint2) - 1;
       //   this.LineSegments.push(new LineSegmentIndices(new IndexTriplet(newIndex3), new IndexTriplet(newIndex5)));

       if (depth == 1){


        console.log('vertex1 x = ' + vertex1.elements[0] + ' y= ' + vertex1.elements[1] );
        console.log('vertex2 x = ' + vertex2.elements[0] + ' y= ' + vertex2.elements[1] );

        console.log('newInbetweenPoint x = ' + newInbetweenPoint.elements[0] + ' y= ' + newInbetweenPoint.elements[1] );
        console.log('newEndPoint1 x = ' + newEndPoint1.elements[0] + ' y= ' + newEndPoint1.elements[1] );
        console.log('newEndPoint2 x = ' + newEndPoint2.elements[0] + ' y= ' + newEndPoint2.elements[1] );
       }



       this.processLines(mathCanvas, newInbetweenPoint, newEndPoint1,  depth + 1);
       this.processLines(mathCanvas, newInbetweenPoint, newEndPoint2,  depth + 1);
       this.processLines(mathCanvas, newInbetweenPoint, vertex2,  depth + 1);
        
       

  
      }
    //  this.calculated = true;
    }

    public stop(): boolean
    {
      return false; //no worker to stop
    }
}