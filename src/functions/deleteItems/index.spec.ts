// tslint:disable:no-any
import { ItemNotFoundError } from '@js-items/foundation';
import testItem from '@js-items/foundation/dist/functions/utils/testItem';
import { config } from '../../utils/testConfig';
import deleteItems from './index';

beforeEach(() => jest.clearAllMocks());

describe('@deleteItems', () => {
  it('deletes items with no filter', async () => {
    const deleteMock = jest.fn(() => ({
      json: () => Promise.resolve({ item: testItem }),
    }));

    await deleteItems({
      ...config,
      ky: () => Promise.resolve({ delete: deleteMock }) as any,
    })({});

    expect(config.createFilter).toBeCalledWith({});

    expect(deleteMock).toBeCalledWith(config.itemUrl, {
      searchParams: { filter: JSON.stringify({}) },
    });
  });

  it('deletes items with filter and custom search params', async () => {
    const deleteMock = jest.fn(() => ({
      json: () => Promise.resolve({ item: testItem }),
    }));

    const filter = {
      id: { $eq: testItem.id },
    };
    const createFilterMock = jest.fn(() => filter);

    await deleteItems({
      ...config,
      createFilter: createFilterMock,
      deleteItemsOptions: () => ({ searchParams: { pretty: 'true' } }),
      ky: () => Promise.resolve({ delete: deleteMock }) as any,
    })({
      filter,
    });

    expect(createFilterMock).toBeCalledWith(filter);

    expect(deleteMock).toBeCalledWith(config.itemUrl, {
      searchParams: { pretty: 'true', filter: JSON.stringify(filter) },
    });
  });

  it('does not delete items', async () => {
    const error = new ItemNotFoundError('TestItem', testItem.id);

    const facadeConfig = {
      ...config,
      ky: jest.fn(() => Promise.reject(error)),
    };

    try {
      await deleteItems(facadeConfig)({});
    } catch (e) {
      expect(e).toEqual(error);
    }
  });
});
