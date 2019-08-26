import testItem, {
  TestItem,
} from '@js-items/foundation/dist/functions/utils/testItem';
import FacadeConfig from '../../FacadeConfig';
import { emptyOptions } from '../emptyOptions';

export const defaultKyOptions = {};

export const defaultDocumentConverter = jest.fn(() => ({}));

export const config: FacadeConfig<TestItem> = {
  convertDocumentIntoItem: jest.fn(() => testItem),
  convertItemIntoOptions: defaultDocumentConverter,
  createFilter: jest.fn(emptyOptions),
  createItemOptions: defaultDocumentConverter,
  createSort: jest.fn(),
  defaultPaginationLimit: 10,
  deleteItemOptions: defaultDocumentConverter,
  deleteItemsOptions: defaultDocumentConverter,
  getItemOptions: defaultDocumentConverter,
  getItemsOptions: defaultDocumentConverter,
  itemName: 'TestItem',
  ky: jest.fn(
    () =>
      Promise.resolve(
        jest.fn(() => ({ json: () => ({ item: testItem }) }))
      )
    // tslint:disable-next-line:no-any
  ) as any,
  replaceItemOptions: jest.fn(),
  updateItemOptions: jest.fn(),
};
