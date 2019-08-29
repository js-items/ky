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

    // TODO: update types for options once this code would be release:
    // https://github.com/sindresorhus/ky/pull/165/files
    const options: any = config.replaceItemOptions({ ...item, id });

    const createFilter = config.createFilter(filter);

    const params = { filter: JSON.stringify(createFilter) };

    const searchParams =
      !_isNil(options) && !_isNil(options.searchParams)
        ? options.searchParams
        : {};

    const json =
      /* istanbul ignore next */ !_isNil(options) && !_isNil(options.json)
        ? options.json
        : {};

    const response = await connection
      .put(`/${id}`, {
        ...options,
        json: {
          ...item,
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
