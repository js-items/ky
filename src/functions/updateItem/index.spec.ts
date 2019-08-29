// tslint:disable:no-any
import { ItemNotFoundError } from '@js-items/foundation';
import testItem from '@js-items/foundation/dist/functions/utils/testItem';
import { config, jsonOptions } from '../../utils/testConfig';
import updateItem from './index';

beforeEach(() => jest.clearAllMocks());

const filter = {
  id: { $eq: testItem.id },
};

const defaultOptions = {
  id: testItem.id,
  patch: testItem,
};

const updateMock = jest.fn(() => ({
  json: () => Promise.resolve({ item: testItem }),
}));

describe('@updateItem', () => {
  it('updates item without filter', async () => {
    const createFilterMock = jest.fn(() => ({}));
    const updateItemOptionsMock = jest.fn(() => ({}));

    const { item } = await updateItem({
      ...config,
      createFilter: createFilterMock,
      ky: () => Promise.resolve({patch: updateMock}) as any,
      updateItemOptions: updateItemOptionsMock,
    })(defaultOptions);

    expect(updateItemOptionsMock).toBeCalledWith(testItem);

    expect(createFilterMock).toBeCalledWith({});

    expect(config.convertDocumentIntoItem).toBeCalledWith(testItem);

    expect(item).toEqual(testItem);

    expect(updateMock).toBeCalledWith(`/${testItem.id}`, {
      json: { ...testItem },
      searchParams: { filter: JSON.stringify({}) },
    });
  });

  it('updates item with custom filter and search params', async () => {
    const createFilterMock = jest.fn(() => filter);

    const updateItemOptionsMock = jest.fn(() => ({
      searchParams: { pretty: 'false' },
    }));

    await updateItem({
      ...config,
      createFilter: createFilterMock,
      ky: () => Promise.resolve({patch: updateMock}) as any,
      updateItemOptions: updateItemOptionsMock,
    })({ ...defaultOptions, filter });

    expect(createFilterMock).toBeCalledWith(filter);

    expect(updateMock).toBeCalledWith(`/${testItem.id}`, {
      json: { ...testItem },
      searchParams: { filter: JSON.stringify(filter), pretty: 'false' },
    });
  });

  it('does not update item', async () => {
    const error = new ItemNotFoundError('TestItem');

    const facadeConfig = {
      ...config,
      ky: jest.fn(() => Promise.reject(error)),
      updateItemOptions: jsonOptions,
    };

    try {
      await updateItem(facadeConfig)(defaultOptions);
    } catch (e) {
      expect(e).toEqual(error);
    }
  });
});
