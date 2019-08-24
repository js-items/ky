import { Item } from '@js-items/foundation';
import FacadeConfig from '../../FacadeConfig';

export type Handler<I extends Item, T> = (config: FacadeConfig<I>) => T;
