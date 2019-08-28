// tslint:disable:no-any
import { createCursorFromItem, ItemNotFoundError } from '@js-items/foundation';
import testItem from '@js-items/foundation/dist/functions/utils/testItem';
import { asc } from '@js-items/foundation/dist/interfaces/SortOrder';
import { config } from '../../utils/testConfig';
import getItems from './index';

beforeEach(() => jest.clearAllMocks());

const testItemCursor = createCursorFromItem(testItem, { id: asc });

const kyMock = jest.fn(() => ({
  json: jest.fn(() => ({
    cursor: {
      after: testItemCursor,
      before: testItemCursor,
      hasAfter: false,
      hasBefore: false,
    },
    items: [testItem],
  })),
}));

const filter = {
  id: { $eq: testItem.id },
};

const expectedSearchParams = {
  after: undefined,
  before: undefined,
  filter: JSON.stringify(filter),
  limit: 10,
  sort: JSON.stringify({}),
};

describe('@getItems', () => {
  it('gets items with no filter', async () => {
    await getItems({
      ...config,
      ky: () => Promise.resolve(kyMock) as any,
    })({});

    expect(config.getItemsOptions).toBeCalledTimes(1);

    expect(config.createFilter).toBeCalledWith({});

    expect(config.createSort).toBeCalledWith({ id: 'asc' });

    expect(kyMock).toBeCalledWith('', {
      method: 'get',
      searchParams: { ...expectedSearchParams, filter: JSON.stringify({}) },
    });
  });

  it('gets items with filter and custom search params', async () => {
    const createFilterMock = jest.fn(() => filter);

    const { cursor, items } = await getItems({
      ...config,
      createFilter: createFilterMock,
      getItemsOptions: () => ({ searchParams: { pretty: 'true' } }),
      ky: () => Promise.resolve(kyMock) as any,
    })({
      filter,
      sort: { booleanProperty: 'desc' },
    });

    expect(createFilterMock).toBeCalledWith(filter);

    expect(config.createSort).toBeCalledWith({ booleanProperty: 'desc' });

    expect(kyMock).toBeCalledWith('', {
      method: 'get',
      searchParams: { ...expectedSearchParams, pretty: 'true' },
    });

    expect(items).toEqual([testItem]);
    expect(cursor).toEqual({
      after: testItemCursor,
      before: testItemCursor,
      hasAfter: false,
      hasBefore: false,
    });
  });

  it('does not get items', async () => {
    const error = new ItemNotFoundError('TestItem');

    const facadeConfig = {
      ...config,
      ky: jest.fn(() => Promise.reject(error)),
    };

    try {
      await getItems(facadeConfig)({});
    } catch (e) {
      expect(e).toEqual(error);
    }
  });
// tslint:disable-next-line:max-file-line-count
});
