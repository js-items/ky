import { Item } from "@js-items/foundation";
import { Options } from "ky";
export declare type ConvertItemIntoOptions<I extends Item> = (item?: Partial<I>) => Options | undefined;
