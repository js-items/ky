// tslint:disable:no-any
import { ConflictingItemError, CreateItem, Item } from '@js-items/foundation';
import { Result } from '@js-items/foundation/dist/functions/GetItem';
import { CONFLICT } from 'http-status-codes';
import _isNil from 'ramda/src/isNil';
import FacadeConfig from '../../FacadeConfig';

export default <I extends Item>(
  config: FacadeConfig<I>
): CreateItem<I> => async ({ id, item }) => {
  try {
    const connection = await config.ky();

    const options = config.createItemOptions({ ...item, id });

    const json =
      !_isNil(options) && !_isNil((options as any).json)
        ? (options as any).json
        : {};

    const response = await connection('', {
      ...options,
      json: {
        item,
        ...json,
      },
      method: 'post',
    }).json<Result<I>>();

    return Promise.resolve({
      item: config.convertDocumentIntoItem(response.item),
    });
  } catch (error) {
    if (error.response.status === CONFLICT) {
      return Promise.reject(new ConflictingItemError(config.itemName, id));
    }

    return Promise.reject(error);
  }
};
