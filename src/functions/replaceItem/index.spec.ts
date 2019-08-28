// tslint:disable:no-any
import { ItemNotFoundError } from '@js-items/foundation';
import testItem from '@js-items/foundation/dist/functions/utils/testItem';
import { config } from '../../utils/testConfig';
import replaceItem from './index';

beforeEach(() => jest.clearAllMocks());

const filter = {
  id: { $eq: testItem.id },
};

const defaultOptions = {
  id: testItem.id,
  item: testItem,
};

const kyMock = jest.fn(() => ({
  json: () => Promise.resolve({ item: testItem }),
}));

describe('@replaceItem', () => {
  it('replaces item without filter', async () => {
    const createFilterMock = jest.fn(() => ({}));
    const replaceItemOptionsMock = jest.fn(() => ({}));

    const { item } = await replaceItem({
      ...config,
      createFilter: createFilterMock,
      ky: () => Promise.resolve(kyMock) as any,
      replaceItemOptions: replaceItemOptionsMock,
    })(defaultOptions);

    expect(replaceItemOptionsMock).toBeCalledWith(testItem);

    expect(createFilterMock).toBeCalledWith({});

    expect(config.convertDocumentIntoItem).toBeCalledWith(testItem);

    expect(item).toEqual(testItem);

    expect(kyMock).toBeCalledWith(`/${testItem.id}`, {
      json: { ...testItem },
      method: 'put',
      searchParams: { filter: JSON.stringify({}) },
    });
  });

  it('replaces item with custom filter and search params', async () => {
    const createFilterMock = jest.fn(() => filter);

    const replaceItemOptionsMock = jest.fn(() => ({
      searchParams: { pretty: 'false' },
    }));

    await replaceItem({
      ...config,
      createFilter: createFilterMock,
      ky: () => Promise.resolve(kyMock) as any,
      replaceItemOptions: replaceItemOptionsMock,
    })({ ...defaultOptions, filter });

    expect(createFilterMock).toBeCalledWith(filter);

    expect(kyMock).toBeCalledWith(`/${testItem.id}`, {
      json: { ...testItem },
      method: 'put',
      searchParams: { filter: JSON.stringify(filter), pretty: 'false' },
    });
  });

  it('does not replace item', async () => {
    const error = new ItemNotFoundError('TestItem');

    const facadeConfig = {
      ...config,
      ky: jest.fn(() => Promise.reject(error)),
      replaceItemOptions: jest.fn(() => ({ json: { item: testItem } })),
    };

    try {
      await replaceItem(facadeConfig)(defaultOptions);
    } catch (e) {
      expect(e).toEqual(error);
    }
  });
});
