// tslint:disable:no-any
import { GetItems, Item, Pagination, Sort } from '@js-items/foundation';
import { Result } from '@js-items/foundation/dist/functions/GetItems';
import { asc } from '@js-items/foundation/dist/interfaces/SortOrder';
import _isNil from 'ramda/src/isNil';
import FacadeConfig from '../../FacadeConfig';

export default <I extends Item>(config: FacadeConfig<I>): GetItems<I> => {
  const defaultPagination: Pagination = {
    after: undefined,
    before: undefined,
    limit: config.defaultPaginationLimit,
  };

  // tslint:disable-next-line:no-object-literal-type-assertion
  const defaultSort = { id: asc } as Sort<I>;

  return async ({
    filter = {},
    sort = defaultSort,
    pagination = defaultPagination,
  }) => {
    try {
      const connection = await config.ky();

      const options = config.getItemsOptions();

      const createdFilter = config.createFilter(filter);

      const createdSort = config.createSort(sort);

      const params = {
        after: pagination.after,
        before: pagination.before,
        filter: JSON.stringify(createdFilter),
        limit: pagination.limit,
        sort: JSON.stringify(createdSort),
      };

      const searchParams =
        !_isNil(options) && !_isNil((options as any).searchParams)
          ? (options as any).searchParams
          : {};

      const { items: fetchedItems, cursor } = await connection('', {
        ...options,
        method: 'get',
        searchParams: { ...params, ...searchParams },
      }).json<Result<I>>();

      const items = fetchedItems.map(config.convertDocumentIntoItem);

      return Promise.resolve({
        cursor,
        items,
      });
    } catch (error) {
      return Promise.reject(error);
    }
  };
};
