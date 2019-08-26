// tslint:disable:no-any
import { DeleteItem, Item } from '@js-items/foundation';
import _isNil from 'ramda/src/isNil';
import FacadeConfig from '../../FacadeConfig';

export default <I extends Item>(
  config: FacadeConfig<I>
): DeleteItem<I> => async ({ filter = {}, id }) => {
  try {
    const connection = await config.ky();

    const options = config.deleteItemOptions();

    const createdFilter = config.createFilter(filter);

    const params = { filter: JSON.stringify(createdFilter) };

    const searchParams =
      !_isNil(options) && !_isNil((options as any).searchParams)
        ? (options as any).searchParams
        : {};

    await connection(`/${id}`, {
      ...options,
      method: 'delete',
      searchParams: { ...searchParams, ...params },
    });
  } catch (error) {
    return Promise.reject(error);
  }
};
