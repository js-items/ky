// tslint:disable:no-any
import { ConflictingItemError } from '@js-items/foundation';
import testItem from '@js-items/foundation/dist/functions/utils/testItem';
import { config } from '../../utils/testConfig';
import createItem from './index';

beforeEach(() => jest.clearAllMocks());

describe('@createItem', () => {
  it('creates item', async () => {
    const kyMock = jest.fn(() => ({
      json: () => Promise.resolve({ item: testItem }),
    }));

    const createItemOptionsMock = jest.fn(() => ({}));

    const { item } = await createItem({
      ...config,
      createItemOptions: createItemOptionsMock,
      ky: () => Promise.resolve(kyMock) as any,
    })({
      id: testItem.id,
      item: testItem,
    });

    expect(createItemOptionsMock).toBeCalledWith(testItem);

    expect(config.convertDocumentIntoItem).toBeCalledWith(testItem);

    expect(item).toEqual(testItem);

    expect(kyMock).toBeCalledWith('', {
      json: { item: testItem },
      method: 'post',
    });
  });

  it('creates item with custom json object', async () => {
    const kyMock = jest.fn(() => ({
      json: () => Promise.resolve({ item: testItem, otherProp: 'test' }),
    }));

    const createItemOptionsMock = jest.fn(() => ({
      json: { otherProp: 'test' },
    }));

    await createItem({
      ...config,
      createItemOptions: createItemOptionsMock,
      ky: () => Promise.resolve(kyMock) as any,
    })({
      item: testItem,
    });

    expect(kyMock).toBeCalledWith('', {
      json: { item: testItem, otherProp: 'test' },
      method: 'post',
    });
  });

  it('does not create item', async () => {
    const error = new ConflictingItemError('TestItem');

    const facadeConfig = {
      ...config,
      createItemOptions: jest.fn(() => ({ json: { item: testItem } })),
      ky: jest.fn(() => Promise.reject(error)),
    };

    try {
      await createItem(facadeConfig)({
        id: testItem.id,
        item: testItem,
      });
    } catch (e) {
      expect(e).toEqual(error);
    }
  });
});
