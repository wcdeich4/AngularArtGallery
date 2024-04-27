import { GenericVector } from "./GenericVector";

export interface IPerspectiveTransform
{
    tranform(input: GenericVector<number> ): GenericVector<number> ;
}