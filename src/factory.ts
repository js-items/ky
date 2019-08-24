// tslint:disable:no-any
// TODO: uncomment all commented lines
import { /* DeleteItem, */ Item } from '@js-items/foundation';
// import Facade from '@js-items/foundation/dist/Facade';
import _defaultTo from 'ramda/src/defaultTo';
import FacadeConfig from './FacadeConfig';
import FactoryConfig from './FactoryConfig';
import defaultCreateItem from './functions/createItem';
// import defaultDeleteItem from './functions/deleteItem';
// import defaultDeleteItems from './functions/deleteItems';
// import defaultGetItem from './functions/getItem';
// import defaultGetItems from './functions/getItems';
// import defaultReplaceItem from './functions/replaceItem';
// import defaultUpdateItem from './functions/updateItem';
// import { Handler } from './types/handler';
import defaultConvertItemToOptions from './utils/defaultConvertItemToOptions';

export default <I extends Item>({
  deleteItem,
  deleteItems,
  getItem,
  getItems,
  updateItem,
  replaceItem,
  createItem,
  convertItemIntoOptions,
  ...config
}: // TODO: implement the missing method on @js-items/express and @js-items/ky
FactoryConfig<
  I
>): any /* TODO: removed any and uncomment when implemented: Omit<Facade<I> , 'countItems'>*/ => {
  const itemIntoOptions = _defaultTo(defaultConvertItemToOptions)(
    convertItemIntoOptions
  );

  const facadeConfig: FacadeConfig<I> = {
    convertDocumentIntoItem: (document: any) => document,
    convertItemIntoOptions: itemIntoOptions,
    createFilter: (filter: any) => filter,
    createItemOptions: defaultConvertItemToOptions,
    createSort: (sort: any) => sort,
    defaultPaginationLimit: 10,
    deleteItemOptions: itemIntoOptions,
    deleteItemsOptions: itemIntoOptions,
    getItemOptions: itemIntoOptions,
    getItemsOptions: itemIntoOptions,
    replaceItemOptions: itemIntoOptions,
    updateItemOptions: itemIntoOptions,
    ...config,
  };

  const createItemFactory = _defaultTo(defaultCreateItem)(createItem);
  // const deleteItemFactory = _defaultTo(
  //   defaultDeleteItem
  // )(deleteItem);
  // const getItemFactory = _defaultTo(defaultGetItem)(getItem);
  // const updateItemFactory = _defaultTo(defaultUpdateItem)(updateItem);
  // const replaceItemFactory = _defaultTo(defaultReplaceItem)(replaceItem);
  // const deleteItemsFactory = _defaultTo(defaultDeleteItems)(deleteItems);
  // const getItemsFactory = _defaultTo(defaultGetItems)(getItems);

  return {
    createItem: createItemFactory(facadeConfig),
    // deleteItem: deleteItemFactory(facadeConfig),
    // deleteItems: deleteItemsFactory(facadeConfig),
    // getItem: getItemFactory(facadeConfig),
    // getItems: getItemsFactory(facadeConfig),
    // replaceItem: replaceItemFactory(facadeConfig),
    // updateItem: updateItemFactory(facadeConfig),
  };
};
