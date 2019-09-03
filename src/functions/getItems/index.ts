// tslint:disable:no-any
import {
  GetItems,
  Item,
  PaginatedResponse,
  Pagination,
  Sort,
} from '@js-items/foundation';
import { asc } from '@js-items/foundation/dist/interfaces/SortOrder';
import EnvelopedResponse from '@js-items/foundation/src/interfaces/EnvelopedResponse';
import _isNil from 'ramda/src/isNil';
import _mapObjIndexed from 'ramda/src/mapObjIndexed';
import _pickBy from 'ramda/src/pickBy';
import FacadeConfig from '../../FacadeConfig';
import formatItemsResponse from '../../utils/formatItemsResponse';

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
    /* istanbul ignore next */
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

      const params = {
        ...paginationParams,
        filter: JSON.stringify(createdFilter),
        sort: JSON.stringify(createdSort),
      };

      const searchParams =
        !_isNil(options) && !_isNil(options.searchParams)
          ? options.searchParams
          : {};

      const queryParams = _mapObjIndexed(String, {
        envelope: config.envelope,
        ...searchParams,
        ...params,
      });

      const response = await connection
        .get(config.itemUrl, {
          ...options,
          searchParams: queryParams,
        })
        .json<EnvelopedResponse<PaginatedResponse<I>> | PaginatedResponse<I>>();

      return Promise.resolve(
        formatItemsResponse({
          config,
          envelope: queryParams.envelope === 'true',
          response,
        })
      );
    } catch (error) {
      return Promise.reject(error);
    }
  };
};
