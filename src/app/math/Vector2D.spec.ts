//import { StringHelper } from '../helpers/StringHelper';
import { Vector2D } from './Vector2D';

describe('Vector2D', () => {

  it('Perpendicular Clockwise', () => {
    const a = new Vector2D(5, -10);
    const actualPerpendicularClockwise = a.getPerpendicularClockwise();
    const expectedPerpendicularClockwise = new Vector2D(-10, -5);
    expect(expectedPerpendicularClockwise.equals(actualPerpendicularClockwise)).toEqual(true);
  });

  it('Perpendicular Counter Clockwise', () => {
    const a = new Vector2D(5, -10);
    const actualPerpendicularCounterClockwise = a.getPerpendicularCounterClockwise();
    const expectedPerpendicularCounterClockwise = new Vector2D(10, 5);
    expect(expectedPerpendicularCounterClockwise.equals(actualPerpendicularCounterClockwise)).toEqual(true);
  });

  it('Vector2D Add Test1', () => {
    const x1 = 99;
    const y1 = -76;
    const u = new Vector2D(x1, y1);
    const v = new Vector2D(4, 5);
    u.add(v);
    expect(u.elements[0]).toEqual(x1 + v.elements[0]);
    expect(u.elements[1]).toEqual(y1 + v.elements[1]);
  });

  it('Vector2D Subtract Test1', () => {
    const x1 = 23;
    const y1 = -78;
    const u = new Vector2D(x1, y1);
    const v = new Vector2D(4, 5);
    u.subtract(v);
    expect(u.elements[0]).toEqual(x1 - v.elements[0]);
    expect(u.elements[1]).toEqual(y1 - v.elements[1]);
  });

  it('Vector2D multiply Test1', () => {
    const x1 = 14;
    const y1 = -58;
    const scalar = 4;
    const u = new Vector2D(x1, y1);
    u.multiplyByScalar(scalar);
    expect(u.elements[0]).toEqual(x1 * scalar);
    expect(u.elements[1]).toEqual(y1 * scalar);
  });

  it('Vector2D divide Test1', () => {
    const x1 = 13;
    const y1 = -57;
    const scalar = 7;
    const u = new Vector2D(x1, y1);
    u.divideByScalar(scalar);
    expect(u.elements[0]).toEqual(x1 / scalar);
    expect(u.elements[1]).toEqual(y1 / scalar);
  });


  it('Vector2D UnitVector test1', () => { 
    const x = 1;
    const y = 2;
    const v1 = new Vector2D(x, y);
    const mag = v1.magnitude();
    v1.normalize();
    const expected = new Vector2D(x / mag, y / mag);
    expect(v1.equals(expected)).toEqual(true);
  });

  it('Vector2D Magnitude test1', () => {
    const v1 = new Vector2D(1, 2);
    const mag = v1.magnitude();
    const expected = Math.sqrt(v1.elements[0] * v1.elements[0] + v1.elements[1] * v1.elements[1] );
    expect(mag).toEqual(expected);
  });

  // it('Vector2D Load data string', () =>
  // {
  //   const inputDataLine: string = 'vt 0.5 0 ';
  //   const vector: Vector2D = new Vector2D(0,0);
  //   const actualOutput = vector.setFromDelimetedString(inputDataLine);
  //   expect(StringHelper.isUndefinedOrNullOrEmptyOrWhitespace(actualOutput)).toEqual(true);
  //   expect(vector.elements[0]).toEqual(0.5);
  //   expect(vector.elements[1]).toEqual(0);
  // });

  it('Vector2D MidPoint', () =>
  {
    const vector1: Vector2D = new Vector2D(-2, -3);
    const vector2: Vector2D = new Vector2D(2, 3);
    const midPoint = vector2.getMidPointWith(vector1);
    const expected: Vector2D = new Vector2D(0, 0);
    expect(midPoint.equals(expected)).toEqual(true);
  });

  it('Vector2D Weighted Average', () =>
  {
    const vector1: Vector2D = new Vector2D(-2, -3);
    const percent1: number = 0.5;
    const vector2: Vector2D = new Vector2D(2, 3);
    const percent2: number = 0.5;
    const midPoint = vector1.getWeightedAverageWithAnotherVector(percent1, vector2, percent2);
    const expected: Vector2D = new Vector2D(0, 0);
    expect(midPoint.equals(expected)).toEqual(true);
  });

});
