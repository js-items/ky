// tslint:disable:no-any
import { DeleteItem, Item } from '@js-items/foundation';
import _isNil from 'ramda/src/isNil';
import FacadeConfig from '../../FacadeConfig';

export default <I extends Item>(
  config: FacadeConfig<I>
): DeleteItem<I> => async ({ filter = {}, id }) => {
  try {
    const connection = await config.ky();

    // TODO: update types for options once this code would be release:
    // https://github.com/sindresorhus/ky/pull/165/files
    const options: any = config.deleteItemOptions();

    const createdFilter = config.createFilter(filter);

    const params = { filter: JSON.stringify(createdFilter) };

    const searchParams =
      !_isNil(options) && !_isNil((options).searchParams)
        ? (options).searchParams
        : {};

    await connection.delete(`${config.itemUrl}/${id}`, {
      ...options,
      searchParams: { ...searchParams, ...params },
    });
  } catch (error) {
    return Promise.reject(error);
  }
};
