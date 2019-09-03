// tslint:disable:no-any
import { GetItem, Item } from '@js-items/foundation';
import { Result } from '@js-items/foundation/dist/functions/GetItem';
import _isNil from 'ramda/src/isNil';
import FacadeConfig from '../../FacadeConfig';

export default <I extends Item>(config: FacadeConfig<I>): GetItem<I> => async ({
  id,
  filter = {},
}) => {
  try {
    const connection = await config.ky();

    const createFilter = config.createFilter(filter);

    // TODO: update types for options once this code would be release:
    // https://github.com/sindresorhus/ky/pull/165/files
    const options: any = config.getItemOptions();

    const params = { filter: JSON.stringify(createFilter) };

    const searchParams =
      !_isNil(options) && !_isNil(options.searchParams)
        ? options.searchParams
        : {};

    const queryParams = { ...searchParams, ...params };

    const response = await connection
      .get(`${config.itemUrl}/${id}`, {
        ...options,
        searchParams: queryParams,
      })
      .json<Result<I>>();

    return Promise.resolve({
      item: config.convertDocumentIntoItem(response.item),
    });
  } catch (error) {
    return Promise.reject(error);
  }
};
