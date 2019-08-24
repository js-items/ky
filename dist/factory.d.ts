import { /* DeleteItem, */ Item } from '@js-items/foundation';
import FactoryConfig from './FactoryConfig';
declare const _default: <I extends Item>({ deleteItem, deleteItems, getItem, getItems, updateItem, replaceItem, createItem, convertItemIntoOptions, ...config }: FactoryConfig<I>) => any;
export default _default;
