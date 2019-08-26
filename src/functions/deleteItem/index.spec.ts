// tslint:disable:no-any
import { ItemNotFoundError } from '@js-items/foundation';
import testItem from '@js-items/foundation/dist/functions/utils/testItem';
import { config } from '../../utils/testConfig';
import deleteItem from './index';

beforeEach(() => jest.clearAllMocks());

describe('@deleteItem', () => {
  it('deletes item with no filter', async () => {
    const kyMock = jest.fn();

    await deleteItem({
      ...config,
      ky: () => Promise.resolve(kyMock) as any,
    })({
      id: testItem.id,
    });

    expect(config.createFilter).toBeCalledWith({});

    expect(kyMock).toBeCalledWith(`/${testItem.id}`, {
      method: 'delete',
      searchParams: { filter: JSON.stringify({}) },
    });
  });

  it('deletes item with filter and custom search params', async () => {
    const kyMock = jest.fn();
    const filter = {
      id: { $eq: testItem.id },
    };
    const createFilterMock = jest.fn(() => filter);

    await deleteItem({
      ...config,
      createFilter: createFilterMock,
      deleteItemOptions: () => ({ searchParams: { pretty: 'true' } }),
      ky: () => Promise.resolve(kyMock) as any,
    })({
      filter,
      id: testItem.id,
    });

    expect(createFilterMock).toBeCalledWith(filter);

    expect(kyMock).toBeCalledWith(`/${testItem.id}`, {
      method: 'delete',
      searchParams: { pretty: 'true', filter: JSON.stringify(filter) },
    });
  });

  it('does not delete item', async () => {
    const error = new ItemNotFoundError('TestItem', testItem.id);

    const facadeConfig = {
      ...config,
      ky: jest.fn(() => Promise.reject(error)),
    };

    try {
      await deleteItem(facadeConfig)({
        id: testItem.id,
      });
    } catch (e) {
      expect(e).toEqual(error);
    }
  });
});
