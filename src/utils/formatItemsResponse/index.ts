// tslint:disable:jsdoc-format
// tslint:disable:no-any
import {
  EnvelopedResponse,
  Item,
  PaginatedResponse,
} from '@js-items/foundation';
import { Result } from '@js-items/foundation/dist/functions/GetItems';
import _defaultTo from 'ramda/src/defaultTo';
import FacadeConfig from '../../FacadeConfig';

export interface Options<I extends Item> {
  readonly config: FacadeConfig<I>;
  readonly envelope: boolean;
  readonly response:
    | PaginatedResponse<I>
    | EnvelopedResponse<PaginatedResponse<I>>;
}

const formatItemsResponse = <I extends Item>({
  config: { convertDocumentIntoItem },
  envelope,
  response,
}: Options<I>): Result<I> => {
  const { data, pagination } = envelope
    ? (response as EnvelopedResponse<PaginatedResponse<I>>).body
    : (response as PaginatedResponse<I>);

  return {
    cursor: {
      ...pagination,
      after: _defaultTo(undefined)(pagination.after),
      before: _defaultTo(undefined)(pagination.before),
    },
    items: data.map(convertDocumentIntoItem),
  };
};

export default formatItemsResponse;
