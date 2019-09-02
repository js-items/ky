import { EnvelopedResponse, Item, PaginatedResponse } from '@js-items/foundation';
import { Result } from '@js-items/foundation/dist/functions/GetItems';
import FacadeConfig from '../../FacadeConfig';
export interface Options<I extends Item> {
    readonly config: FacadeConfig<I>;
    readonly envelope: boolean;
    readonly response: PaginatedResponse<I> | EnvelopedResponse<PaginatedResponse<I>>;
}
declare const formatItemsResponse: <I extends Item>({ config: { convertDocumentIntoItem }, envelope, response, }: Options<I>) => Result<I>;
export default formatItemsResponse;
