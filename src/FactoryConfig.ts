// tslint:disable:no-any
import {
  CreateItem,
  DeleteItems,
  Filter,
  GetItem,
  GetItems,
  Item,
  ReplaceItem,
  Sort,
  UpdateItem,
} from '@js-items/foundation';
import Facade from '@js-items/foundation/dist/Facade';
import ky from 'ky';
import { ConvertItemIntoOptions } from './types/convertItemIntoOptions';
import { Handler } from './types/handler';

export default interface FactoryConfig<I extends Item> {
  readonly ky: () => Promise<typeof ky>;
  readonly defaultSort?: Sort<I>;
  readonly totalHeaderName?: string;
  readonly hasAfterHeaderName?: string;
  readonly afterHeaderName?: string;
  readonly hasBeforeHeaderName?: string;
  readonly beforeHeaderName?: string;
  readonly afterKey?: string;
  readonly beforeKey?: string;
  readonly hasBeforeKey?: string;
  readonly hasAfterKey?: string;
  readonly totalKey?: string;
  readonly paginationKey?: string;
  readonly envelopParamName?: string;
  readonly prettyParamName?: string;
  readonly createFilter: (filter?: Filter<I>) => any;
  readonly convertDocumentIntoItem: (document: Document) => I;
  readonly convertItemIntoOptions: ConvertItemIntoOptions<I>;
  readonly createSort: (sort: Sort<I>) => any;
  readonly updateItem?: Handler<I, UpdateItem<I>>;
  readonly updateItemOptions?: ConvertItemIntoOptions<I>;
  readonly replaceItem?: Handler<I, ReplaceItem<I>>;
  readonly replaceItemOptions?: ConvertItemIntoOptions<I>;
  readonly deleteItem?: Handler<I, DeleteItems<I>>;
  readonly deleteItemOptions?: ConvertItemIntoOptions<I>;
  readonly deleteItems?: Handler<I, CreateItem<I>>;
  readonly deleteItemsOptions?: ConvertItemIntoOptions<I>;
  readonly getItem?: Handler<I, GetItem<I>>;
  readonly getItemOptions?: ConvertItemIntoOptions<I>;
  readonly getItems?: Handler<I, GetItems<I>>;
  readonly getItemsOptions?: ConvertItemIntoOptions<I>;
  readonly createItem?: Handler<I, ReplaceItem<I>>;
  readonly createItemOptions?: ConvertItemIntoOptions<I>;
  readonly defaultPaginationLimit?: number;
  readonly itemName: string;
  readonly service: Facade<I>;
}
