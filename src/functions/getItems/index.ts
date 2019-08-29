// tslint:disable:no-any
import { GetItems, Item, Pagination, Sort } from '@js-items/foundation';
import { Result } from '@js-items/foundation/dist/functions/GetItems';
import { asc } from '@js-items/foundation/dist/interfaces/SortOrder';
import _isNil from 'ramda/src/isNil';
import _mapObjIndexed from 'ramda/src/mapObjIndexed';
import _pickBy from 'ramda/src/pickBy';
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

      // TODO: update types for options once this code would be release:
      // https://github.com/sindresorhus/ky/pull/165/files
      const options: any = config.getItemsOptions();

      const createdFilter = config.createFilter(filter);

      const createdSort = config.createSort(sort);

      const paginationParams = _pickBy<
        Pagination,
        Partial<Pagination> | Pagination
      >((val: keyof Pagination) => !_isNil(val), pagination);

      const stringifiedPaginationParams = _mapObjIndexed(
        String,
        paginationParams
      );

      const params = {
        ...stringifiedPaginationParams,
        filter: JSON.stringify(createdFilter),
        sort: JSON.stringify(createdSort),
      };

      const searchParams =
        !_isNil(options) && !_isNil(options.searchParams)
          ? options.searchParams
          : {};

      const { items: fetchedItems, cursor } = await connection
        .get('', {
          ...options,
          searchParams: { ...params, ...searchParams },
        })
        .json<Result<I>>();

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
