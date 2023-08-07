import { StringHelper } from "./StringHelper";

export abstract class ColorHelper
{
    /**
     * convert MTL file line to HTML hexadecimal color string for Canvas
     * @param mtlFileLine {string} mtl file line like Ks 0.2 0.2 0.2 
     * @returns HTML hexadecimal color string
     */
    public static MTLFileLineToHTMLHexadecimalColorString(mtlFileLine: string)
    {
        if (StringHelper.isUndefinedOrNullOrEmptyOrWhitespace(mtlFileLine))
        {
            throw new Error('mtlFileLine is undefined/null/empty/whitespace in ColorHelper.MTLFileLineToHTMLHexadecimalColorString(mtlFileLine: string)');
        }

        var lineTokens: Array<string> = mtlFileLine.split(/\s+/);

        if ((lineTokens == null) || (lineTokens.length == 0))
        {
            throw new Error('mtlFileLine.split(/\s+/); is null / empty');
        }

        lineTokens = lineTokens.filter( a => !StringHelper.isUndefinedOrNullOrEmptyOrWhitespace(a));

        return ColorHelper.stringArrayToHTMLHexadecimalColorString(lineTokens, 1);
    }

    /**
     * produce HTML color string from string array
     * @param array array of strings representing numbers for color
     * @param startIndex {number} index to start processing the array
     * @returns HTML hexadecimal color string
     */
    public static stringArrayToHTMLHexadecimalColorString(array: Array<string>, startIndex: number): string
    {
        if ((typeof array == "undefined") || (array == null) || (array.length == 0))
        {
            const errorMessage: string = 'error in ColorHelper.stringArrayToHexadecimalColorString(array: Array<string>, startIndex: number) - array is null';
            console.error(errorMessage);
            throw new Error(errorMessage);
        }
        else if ((array.length - startIndex) < 3)
        {
            const errorMessage: string = 'error in ColorHelper.stringArrayToHexadecimalColorString(array: Array<string>, startIndex: number) - array not long enough to form HTML color string';
            console.error(errorMessage);
            throw new Error(errorMessage);
        }
        else
        {
            console.log(array);
            let result: string = '#';
            for(let i: number = startIndex; i < array.length; i++)
            {
                result = result + ColorHelper.decimalNumberStringToHexString(array[i]);
            }
            return result;
        }
    }

    /**
     * convert a string of a number to the hex string for the number
     * @param s {string} string for a number
     * @throws exception if string cannot be converted to number
     * @returns hex string for number
     */
    public static decimalNumberStringToHexString(s: string): string
    {
        if (StringHelper.isUndefinedOrNullOrEmptyOrWhitespace(s))
        {
            const errorMessage: string = 'error 000 in ColorHelper.decimalNumberStringToHexString(s: string) - s null / undefined / whitespace';
            console.error(errorMessage);
            throw new Error(errorMessage);
        }

        if (!StringHelper.isNumeric(s))
        {
            const errorMessage: string = 'error 001 in ColorHelper.decimalNumberStringToHexString(s: string) - s is a non-numeric string';
            console.error(errorMessage);
            throw new Error(errorMessage);
        }

        let n: number = parseFloat(s);

        if (isNaN(n) || ((n == 0) && (s != '0') && (s != '0.0') && (s != '0x0') && (s.toLowerCase() != 'zero' )))
        {
            const errorMessage: string = 'error 002 in ColorHelper.decimalNumberStringToHexString(s: string) - s is a non-numeric string';
            console.error(errorMessage);
            throw new Error(errorMessage);
        }

        return ColorHelper.numberToHexString(n);
    }

    /**
     * convert number to base hex string.  Treats fractions between 0 and 1 as a fraction of 255.
     * @param n {number} number to convert to hex string
     * @returns base 16 string for n
     */
    public static numberToHexString(n: number): string
    {
        let hexString: string = null;
        if (n == 0)
        {
            hexString = '00';
        }
        else 
        {
            if ((0 < n) && (n <= 1))
            {
                n = n * 255;
            }

            hexString = n.toString(16);

            if (hexString.length == 1)
            {
                hexString = '0' + hexString;
            }
        }
        return hexString;
    }
}