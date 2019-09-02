// tslint:disable:no-any
import { DeleteItems, Item } from '@js-items/foundation';
import _isNil from 'ramda/src/isNil';
import FacadeConfig from '../../FacadeConfig';

export default <I extends Item>(
  config: FacadeConfig<I>
): DeleteItems<I> => async ({ filter = {} }) => {
  try {
    const connection = await config.ky();

    // TODO: update types for options once this code would be release:
    // https://github.com/sindresorhus/ky/pull/165/files
    const options: any = config.deleteItemsOptions();

    const createdFilter = config.createFilter(filter);

    const params = { filter: JSON.stringify(createdFilter) };

    const searchParams =
      !_isNil(options) && !_isNil((options).searchParams)
        ? (options).searchParams
        : {};

    await connection.delete(config.itemUrl, {
      ...options,
      searchParams: { ...searchParams, ...params },
    });
  } catch (error) {
    return Promise.reject(error);
  }
};
