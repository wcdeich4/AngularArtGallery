import { StringHelper } from '../helpers/StringHelper';
import {EquatableWithTolerance} from '../math/EquatableWithTolerance'
/**
 * Float32Array is used by Three.JS and other graphics packages. It represents a 32 bit floating pointing point array in the operating system.  And like C arrays it has no .push() method. This class enhances the Float32Array by providing a .push() method with size check, but provides direct asccess to the internal float32Array without having to copy the array which would double the memory requirements.
 */
export class EnhancedFloat32Array extends EquatableWithTolerance
{
    private float32Array: Float32Array;
    private size: number;
    private pushIndex: number = 0;

    /**
     * constructor requires size
     * @param {number} arraySize 
     */
    constructor(arraySize: number)
    {
        super();
        this.float32Array = new Float32Array(arraySize);
        this.size = arraySize;
        this.pushIndex = 0;
    }

    /**
     * test if equal to another array
     * @param obj 
     */
    equals(obj: any): boolean 
    {
        let result: boolean = false;
        if (typeof obj === 'undefined')
        {
            result = false;
        }
        else if (obj == null)
        {
            result = false;
        }
        //TODO : parse json?
        else if (obj instanceof EnhancedFloat32Array)
        {
            const otherEnhancedFloat32Array = obj as EnhancedFloat32Array;
            if (this.size == otherEnhancedFloat32Array.size)
            {
                result = true;
                for(let i:number = 0; i < this.size; i++)
                {
                    if (this.float32Array[i] != otherEnhancedFloat32Array.float32Array[i] )
                    {
                        result = false;
                        break;
                    }
                }
            }
            else
            {
                result = false;
            }
        }
        else if (obj instanceof Float32Array)
        {
            const otherFloat32Array = obj as Float32Array;
            result = true;
            try
            {
                otherFloat32Array.forEach(
                    (value, index) => 
                    {
                        if (index >= this.size)
                        {
                            result = false;
                        }
                        else
                        {
                            if (value != this.float32Array[index])
                            {
                                result = false;
                            }
                        }
                     }
                );
            }
            catch (error)
            {
                result = false;
            }
        }
        else if (Array.isArray(obj))
        {
            try
            {
                const otherArray = obj as Array<number>;

                if (this.size == otherArray.length)
                {
                    result = true;
                    otherArray.forEach(
                        (value, index) => 
                        {
                            if (value != this.float32Array[index])
                            {
                                result = false;
                            }
                         }
                    );
                }
            }
            catch (error)
            {
                result = false;
            }
        }
        else
        {
            result = false;
        }
        return result;
    }

    /**
     * keep track of aray size
     */
    public getSize(): number
    {
        return this.size;
    }

    /**
     * The EnhancedFloat32Array was created primarily for this push method
     * @param {number} newElement 
     * @returns {number} index next element will be pushed to
     */
    public push(newElement: number): number
    {
        if (this.pushIndex >= this.size)
        {
            throw new Error('Error in EnhancedFloat32Array.push(newElement: number) - this.pushIndex >= this.size');
        }
console.log("this.pushIndex = " + this.pushIndex);
        this.float32Array[this.pushIndex] = newElement;
        this.pushIndex++;
        return this.pushIndex;
    }

    /**
     * take a string array, convert some elements and push them into this EnhancedFloat32Array
     * @param {Array} stringArray array of strings that represent numbers
     * @param {number} startIndex index to start copying from stringArray
     * @param {number} numberOfElementsToPush limit for when to stop copying
     * @returns {number} index to which next element will be pushed after this
     */
    public pushStringArray(stringArray: Array<string>, startIndex: number, numberOfElementsToPush: number): number
    {
        let nextIndex: number = 0;
        for (let t = startIndex; t < numberOfElementsToPush; t++) 
        {
          if (StringHelper.isNumeric(stringArray[t]))
          {
            nextIndex = this.push(parseFloat(stringArray[t]));
          }
          else
          {
            if (StringHelper.isUndefinedOrNullOrEmptyOrWhitespace(stringArray[t]))
            {
              throw new Error('element ' + t + ' is null / empty string / whitespace in EnhancedFloat32Array.pushStringArray(stringArray: Array<string>, startIndex: number, numberOfElementsToPush: number)');
            }
            else
            {
              throw new Error('element ' + t + ' is ' + stringArray[t] + ' which cannot be converted to a number by parseFloat()  in EnhancedFloat32Array.pushStringArray(stringArray: Array<string>, startIndex: number, numberOfElementsToPush: number)');
            }
          }
        }
        return nextIndex;
    }

    /**
     * we need to get a reference to the existing array in memory so we do not have to copy the array which would double the memory requirements
     */
    public getFloat32ArrayReference(): Float32Array
    {
        return this.float32Array;
    }

}