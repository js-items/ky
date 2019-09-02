import {
  createCursorFromItem,
  EnvelopedResponse,
  PaginatedResponse,
} from '@js-items/foundation';
import testItem from '@js-items/foundation/dist/functions/utils/testItem';
import { asc } from '@js-items/foundation/dist/interfaces/SortOrder';
import { config } from '../testConfig';
import { TestItem } from '../testData';
import formatItemResponse from './index';

describe('@formatItemsResponse', () => {
  const cursor = createCursorFromItem(testItem, { id: asc });

  const pagination = {
    after: cursor as string,
    before: cursor as string,
    hasAfter: false,
    hasBefore: false,
    totalCount: 1,
  };
  it('gets response when envelope is set to false', () => {
    const response: PaginatedResponse<TestItem> = {
      data: [testItem],
      pagination,
    };

    const result = formatItemResponse<TestItem>({
      config,
      envelope: false,
      response,
    });

    const expectedResult = {
      cursor: pagination,
      items: [testItem],
    };

    expect(result).toEqual(expectedResult);
  });

  it('gets response when envelope is set to true', () => {
    const envelopedResponse: EnvelopedResponse<PaginatedResponse<TestItem>> = {
      body: {
        data: [testItem],
        pagination,
      },
      headers: {},
      status: 200,
    };

    const result = formatItemResponse<TestItem>({
      config,
      envelope: true,
      response: envelopedResponse,
    });

    const expectedResult = {
      cursor: pagination,
      items: [testItem],
    };

    expect(result).toEqual(expectedResult);
  });
});
