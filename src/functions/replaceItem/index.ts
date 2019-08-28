// tslint:disable:no-any
import { Item, ReplaceItem } from '@js-items/foundation';
import { Result } from '@js-items/foundation/dist/functions/ReplaceItem';
import _isNil from 'ramda/src/isNil';
import FacadeConfig from '../../FacadeConfig';

export default <I extends Item>(
  config: FacadeConfig<I>
): ReplaceItem<I> => async ({ id, item, filter = {} }) => {
  try {
    const connection = await config.ky();

    const options = config.replaceItemOptions({ ...item, id });

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
        ...item,
        ...json,
      },
      method: 'put',
      searchParams: { ...searchParams, ...params },
    }).json<Result<I>>();

    return Promise.resolve({
      item: config.convertDocumentIntoItem(response.item),
    });
  } catch (error) {
    return Promise.reject(error);
  }
};
