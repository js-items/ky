// tslint:disable:no-any
import { ConflictingItemError } from '@js-items/foundation';
import testItem from '@js-items/foundation/dist/functions/utils/testItem';
import { config, jsonOptions } from '../../utils/testConfig';
import createItem from './index';

beforeEach(() => jest.clearAllMocks());

describe('@createItem', () => {
  it('creates item', async () => {
    const postMock = jest.fn(() => ({
      json: () => Promise.resolve({ item: testItem }),
    }));

    const createItemOptionsMock = jest.fn(() => ({}));

    const { item } = await createItem({
      ...config,
      createItemOptions: createItemOptionsMock,
      ky: () => Promise.resolve({ post: postMock }) as any,
    })({
      id: testItem.id,
      item: testItem,
    });

    expect(createItemOptionsMock).toBeCalledWith(testItem);

    expect(config.convertDocumentIntoItem).toBeCalledWith(testItem);

    expect(item).toEqual(testItem);

    expect(postMock).toBeCalledWith(config.itemUrl, {
      json: { ...testItem },
    });
  });

  it('creates item with custom json object', async () => {
    const postMock = jest.fn(() => ({
      json: () => Promise.resolve({ item: testItem, otherProp: 'test' }),
    }));

    const createItemOptionsMock = jest.fn(() => ({
      json: { otherProp: 'test' },
    }));

    await createItem({
      ...config,
      createItemOptions: createItemOptionsMock,
      ky: () => Promise.resolve({ post: postMock }) as any,
    })({
      item: testItem,
    });

    expect(postMock).toBeCalledWith(config.itemUrl, {
      json: { ...testItem, otherProp: 'test' },
    });
  });

  it('does not create item', async () => {
    const error = new ConflictingItemError('TestItem');

    const facadeConfig = {
      ...config,
      createItemOptions: jsonOptions,
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
