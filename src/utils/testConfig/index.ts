/* istanbul ignore next */
import testItem, {
  TestItem,
} from '@js-items/foundation/dist/functions/utils/testItem';
import FacadeConfig from '../../FacadeConfig';
import { emptyOptions } from '../emptyOptions';

export const defaultDocumentConverter = jest.fn(() => ({}));

export const jsonOptions = jest.fn(() => ({ json: { item: testItem } }));

export const config: FacadeConfig<TestItem> = {
  convertDocumentIntoItem: jest.fn(() => testItem),
  convertItemIntoOptions: defaultDocumentConverter,
  createFilter: jest.fn(emptyOptions),
  createItemOptions: defaultDocumentConverter,
  createSort: jest.fn(emptyOptions),
  defaultPaginationLimit: 10,
  deleteItemOptions: defaultDocumentConverter,
  deleteItemsOptions: defaultDocumentConverter,
  getItemOptions: defaultDocumentConverter,
  getItemsOptions: defaultDocumentConverter,
  itemName: 'TestItem',
  ky: jest.fn(
    () => Promise.resolve({})
    // tslint:disable-next-line:no-any
  ) as any,
  replaceItemOptions: jsonOptions,
  updateItemOptions: jsonOptions,
};
