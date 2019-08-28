// tslint:disable:no-any
import { GetItem, Item } from '@js-items/foundation';
import { Result } from '@js-items/foundation/dist/functions/GetItem';
import _isNil from 'ramda/src/isNil';
import FacadeConfig from '../../FacadeConfig';

export default <I extends Item>(config: FacadeConfig<I>): GetItem<I> => async ({
  id,
  filter = {},
}) => {
  try {
    const connection = await config.ky();

    const createFilter = config.createFilter(filter);

    const options = config.getItemOptions();

    const params = { filter: JSON.stringify(createFilter) };

    const searchParams =
      !_isNil(options) && !_isNil((options as any).searchParams)
        ? (options as any).searchParams
        : {};

    const response = await connection(`/${id}`, {
      ...options,
      method: 'get',
      searchParams: { ...searchParams, ...params },
    }).json<Result<I>>();

    return Promise.resolve({
      item: config.convertDocumentIntoItem(response.item),
    });
  } catch (error) {
    return Promise.reject(error);
  }
};
