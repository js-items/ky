import { Item } from '@js-items/foundation';
import Facade from '@js-items/foundation/dist/Facade';
import FactoryConfig from './FactoryConfig';
declare const factory: <I extends Item>({ deleteItem, deleteItems, getItem, getItems, updateItem, replaceItem, createItem, convertItemIntoOptions, envelope, ...config }: FactoryConfig<I>) => Facade<I>;
export default factory;
