// tslint:disable:no-any
import { DeleteItems, Item } from '@js-items/foundation';
import _isNil from 'ramda/src/isNil';
import FacadeConfig from '../../FacadeConfig';

export default <I extends Item>(
  config: FacadeConfig<I>
): DeleteItems<I> => async ({ filter = {} }) => {
  try {
    const connection = await config.ky();

    const options = config.deleteItemsOptions();

    const createdFilter = config.createFilter(filter);

    const params = { filter: JSON.stringify(createdFilter) };

    const searchParams =
      !_isNil(options) && !_isNil((options as any).searchParams)
        ? (options as any).searchParams
        : {};

    await connection('', {
      ...options,
      method: 'delete',
      searchParams: { ...searchParams, ...params },
    });
  } catch (error) {
    return Promise.reject(error);
  }
};
