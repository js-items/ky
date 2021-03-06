// tslint:disable:no-any
import { Filter, Item, Sort } from '@js-items/foundation';
import ky from 'ky';
import { ConvertItemIntoOptions } from './types/convertItemIntoOptions';

export type Document = any;

export default interface FacadeConfig<I extends Item> {
  readonly ky: () => Promise<typeof ky>;
  readonly createFilter: (filter?: Filter<I>) => any;
  readonly convertDocumentIntoItem: (document: Document) => I;
  readonly convertItemIntoOptions: ConvertItemIntoOptions<I>;
  readonly createSort: (sort: Sort<I>) => any;
  readonly updateItemOptions: ConvertItemIntoOptions<I>;
  readonly replaceItemOptions: ConvertItemIntoOptions<I>;
  readonly deleteItemOptions: ConvertItemIntoOptions<I>;
  readonly deleteItemsOptions: ConvertItemIntoOptions<I>;
  readonly getItemOptions: ConvertItemIntoOptions<I>;
  readonly getItemsOptions: ConvertItemIntoOptions<I>;
  readonly createItemOptions: ConvertItemIntoOptions<I>;
  readonly defaultPaginationLimit: number;
  readonly envelope: boolean;
  readonly itemName: string;
  readonly itemUrl: string; // as of: https://github.com/sindresorhus/ky/blob/master/index.js#L223
}
