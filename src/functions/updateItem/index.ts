// tslint:disable:no-any
import { Item, UpdateItem } from '@js-items/foundation';
import { Result } from '@js-items/foundation/dist/functions/UpdateItem';
import _isNil from 'ramda/src/isNil';
import FacadeConfig from '../../FacadeConfig';

export default <I extends Item>(
  config: FacadeConfig<I>
): UpdateItem<I> => async ({ id, patch, filter = {} }) => {
  try {
    const connection = await config.ky();

    const options = config.updateItemOptions({ ...patch, id });

    const createFilter = config.createFilter(filter);

    const params = { filter: JSON.stringify(createFilter) };

    const searchParams =
      !_isNil(options) && !_isNil((options as any).searchParams)
        ? (options as any).searchParams
        : {};

    const json =
      !_isNil(options) && !_isNil((options as any).json)
        ? (options as any).json
        : {};

    const response = await connection(`/${id}`, {
      ...options,
      json: {
        ...patch,
        ...json,
      },
      method: 'patch',
      searchParams: { ...searchParams, ...params },
    }).json<Result<I>>();

    return Promise.resolve({
      item: config.convertDocumentIntoItem(response.item),
    });
  } catch (error) {
    return Promise.reject(error);
  }
};
