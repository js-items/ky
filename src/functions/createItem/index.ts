// tslint:disable:no-any
import { CreateItem, Item } from '@js-items/foundation';
import { Result } from '@js-items/foundation/dist/functions/GetItem';
import _isNil from 'ramda/src/isNil';
import FacadeConfig from '../../FacadeConfig';

export default <I extends Item>(
  config: FacadeConfig<I>
): CreateItem<I> => async ({ item, id }) => {
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
        ...item,
        ...json,
      },
      method: 'post',
    }).json<Result<I>>();

    return Promise.resolve({
      item: config.convertDocumentIntoItem(response.item),
    });
  } catch (error) {
    return Promise.reject(error);
  }
};
