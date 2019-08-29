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

    // TODO: update types for options once this code would be release:
    // https://github.com/sindresorhus/ky/pull/165/files
    const options: any = config.createItemOptions({ ...item, id });

    const json =
      !_isNil(options) && !_isNil(options.json) ? (options).json : {};

    const response = await connection
      .post('', {
        ...options,
        json: {
          ...item,
          ...json,
        },
      })
      .json<Result<I>>();

    return Promise.resolve({
      item: config.convertDocumentIntoItem(response.item),
    });
  } catch (error) {
    return Promise.reject(error);
  }
};
