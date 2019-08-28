// tslint:disable:no-any
import { ItemNotFoundError } from '@js-items/foundation';
import testItem from '@js-items/foundation/dist/functions/utils/testItem';
import { config } from '../../utils/testConfig';
import getItem from './index';

beforeEach(() => jest.clearAllMocks());

describe('@getItem', () => {
  it('gets item', async () => {
    const kyMock = jest.fn(() => ({
      json: () => Promise.resolve({ item: testItem }),
    }));

    const getItemOptionsMock = jest.fn(() => ({}));
    const createFilterMock = jest.fn(() => ({}));

    const { item } = await getItem({
      ...config,
      createFilter: createFilterMock,
      getItemOptions: getItemOptionsMock,
      ky: () => Promise.resolve(kyMock) as any,
    })({
      id: testItem.id,
    });

    expect(createFilterMock).toBeCalledWith({});

    expect(getItemOptionsMock).toBeCalledTimes(1);

    expect(config.convertDocumentIntoItem).toBeCalledWith(testItem);

    expect(item).toEqual(testItem);

    expect(kyMock).toBeCalledWith(`/${testItem.id}`, {
      method: 'get',
      searchParams: { filter: JSON.stringify({}) },
    });
  });

  it('gets item with custom filter object', async () => {
    const kyMock = jest.fn(() => ({
      json: () => Promise.resolve({ item: testItem, otherProp: 'test' }),
    }));

    const filter = {
      id: { $eq: testItem.id },
    };

    const getItemOptionsMock = jest.fn(() => ({
      searchParams: { pretty: 'true' },
    }));

    const createFilterMock = jest.fn(() => filter);

    await getItem({
      ...config,
      createFilter: createFilterMock,
      getItemOptions: getItemOptionsMock,
      ky: () => Promise.resolve(kyMock) as any,
    })({
      filter,
      id: testItem.id,
    });

    expect(createFilterMock).toBeCalledWith(filter);

    expect(kyMock).toBeCalledWith(`/${testItem.id}`, {
      method: 'get',
      searchParams: { pretty: 'true', filter: JSON.stringify(filter) },
    });
  });

  it('does not get item', async () => {
    const error = new ItemNotFoundError('TestItem', testItem.id);

    const facadeConfig = {
      ...config,
      getItemOptions: jest.fn(() => ({ json: { item: testItem } })),
      ky: jest.fn(() => Promise.reject(error)),
    };

    try {
      await getItem(facadeConfig)({
        id: testItem.id,
      });
    } catch (e) {
      expect(e).toEqual(error);
    }
  });
});
