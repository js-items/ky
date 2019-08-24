import { Item } from '@js-items/foundation';
import FacadeConfig from '../../FacadeConfig';
export declare type Handler<I extends Item, T> = (config: FacadeConfig<I>) => T;
