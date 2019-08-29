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

    // TODO: update types for options once this code would be release:
    // https://github.com/sindresorhus/ky/pull/165/files
    const options: any = config.updateItemOptions({ ...patch, id });

    const createFilter = config.createFilter(filter);

    const params = { filter: JSON.stringify(createFilter) };

    const searchParams =
      !_isNil(options) && !_isNil((options).searchParams)
        ? (options).searchParams
        : {};

    const json =
      !_isNil(options) && !_isNil((options).json)
        ? (options).json
        : {};

    const response = await connection
      .patch(`/${id}`, {
        ...options,
        json: {
          ...patch,
          ...json,
        },
        searchParams: { ...searchParams, ...params },
      })
      .json<Result<I>>();

    return Promise.resolve({
      item: config.convertDocumentIntoItem(response.item),
    });
  } catch (error) {
    return Promise.reject(error);
  }
};
