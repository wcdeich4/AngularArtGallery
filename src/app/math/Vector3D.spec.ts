//import { async, ComponentFixture, TestBed } from '@angular/core/testing';
//import { StringHelper } from '../helpers/StringHelper';
import { Vector3D } from './Vector3D';

describe('Vector3D', () => {

  it('Vector3D Cross Product test1', () => {
    const a = new Vector3D(1, 0, 0);
    const b = new Vector3D(0, 1, 0);
    const expected = new Vector3D(0, 0, 1);
    const actual = a.crossProduct(b);
    expect(expected.equals(actual)).toEqual(true);
  });

  it('Vector3D Cross Product test2', () => {
    const a = new Vector3D(0, 1, 0);
    const b = new Vector3D(0, 0, 1);
    const expected = new Vector3D(1, 0, 0);
    const actual = a.crossProduct(b);
    expect(expected.equals(actual)).toEqual(true);
  });

  it('Vector3D Cross Product test3', () => {
    const a = new Vector3D(1, 0, 0);
    const b = new Vector3D(0, 0, 1);
    const expected = new Vector3D(0, -1, 0);
    const actual = a.crossProduct(b);
    expect(expected.equals(actual)).toEqual(true);
  });

  it('Vector3D Add Test1', () => {
    const x1 = 99;
    const y1 = -77;
    const z1 = -55;
    const u = new Vector3D(x1, y1, z1);
    const v = new Vector3D(4, 5, 6);
    u.add(v);
    expect(u.elements[0]).toEqual(x1 + v.elements[0]);
    expect(u.elements[1]).toEqual(y1 + v.elements[1]);
    expect(u.elements[2]).toEqual(z1 + v.elements[2]);
  });

  it('Vector3D Subtract Test1', () => {
    const x1 = 22;
    const y1 = -77;
    const z1 = -55;
    const u = new Vector3D(x1, y1, z1);
    const v = new Vector3D(4, 5, 6);
    u.subtract(v);
    expect(u.elements[0]).toEqual(x1 - v.elements[0]);
    expect(u.elements[1]).toEqual(y1 - v.elements[1]);
    expect(u.elements[2]).toEqual(z1 - v.elements[2]);
  });

  it('Vector3D multiply Test1', () => {
    const x1 = 13;
    const y1 = -57;
    const z1 = -66;
    const scalar = 9;
    const u = new Vector3D(x1, y1, z1);
    u.multiplyByScalar(scalar);
    expect(u.elements[0]).toEqual(x1 * scalar);
    expect(u.elements[1]).toEqual(y1 * scalar);
    expect(u.elements[2]).toEqual(z1 * scalar);
  });

  it('Vector3D divide Test1', () => {
    const x1 = 13;
    const y1 = -57;
    const z1 = -66;
    const scalar = 3;
    const u = new Vector3D(x1, y1, z1);
    u.divideByScalar(scalar);
    expect(u.elements[0]).toEqual(x1 / scalar);
    expect(u.elements[1]).toEqual(y1 / scalar);
    expect(u.elements[2]).toEqual(z1 / scalar);
  });

  it('Vector3D UnitVector test1', () => {
    const x = 1;
    const y = 2;
    const z = 3;
    const v1 = new Vector3D(x, y, z);
    const mag = v1.magnitude();
    v1.normalize();
    const expected = new Vector3D(x / mag, y / mag, z / mag);
    expect(v1.equals(expected)).toEqual(true);
  });

  it('Vector3D Magnitude test1', () => {
    const v1 = new Vector3D(1, 2, 3);
    const mag = v1.magnitude();
    const expected = Math.sqrt(v1.elements[0] * v1.elements[0] + v1.elements[1] * v1.elements[1] + v1.elements[2] * v1.elements[2]);
    expect(mag).toEqual(expected);
  });

  // it('Vector3D Load data string', () =>
  // {
  //   const inputDataLine: string = 'vn 0.5 0 0.866025 ';
  //   const vector: Vector3D = new Vector3D();
  //   const actualOutput = vector.setFromDelimetedString(inputDataLine);
  //   expect(StringHelper.isUndefinedOrNullOrEmptyOrWhitespace(actualOutput)).toEqual(true);
  //   expect(vector.elements[0]).toEqual(0.5);
  //   expect(vector.elements[1]).toEqual(0);
  //   expect(vector.elements[2]).toEqual(0.866025);
  // });

});
