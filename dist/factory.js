"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import Facade from '@js-items/foundation/dist/Facade';
// import Facade from '@js-items/foundation/dist/Facade';
var defaultTo_1 = __importDefault(require("ramda/src/defaultTo"));
var createItem_1 = __importDefault(require("./functions/createItem"));
// import defaultDeleteItem from './functions/deleteItem';
// import defaultDeleteItems from './functions/deleteItems';
// import defaultGetItem from './functions/getItem';
// import defaultGetItems from './functions/getItems';
// import defaultReplaceItem from './functions/replaceItem';
// import defaultUpdateItem from './functions/updateItem';
// import { Handler } from './types/handler';
var defaultConvertItemToOptions_1 = __importDefault(require("./utils/defaultConvertItemToOptions"));
var emptyOptions_1 = require("./utils/emptyOptions");
exports.default = (function (_a) {
    var deleteItem = _a.deleteItem, deleteItems = _a.deleteItems, getItem = _a.getItem, getItems = _a.getItems, updateItem = _a.updateItem, replaceItem = _a.replaceItem, createItem = _a.createItem, convertItemIntoOptions = _a.convertItemIntoOptions, config = __rest(_a, ["deleteItem", "deleteItems", "getItem", "getItems", "updateItem", "replaceItem", "createItem", "convertItemIntoOptions"]);
    var itemIntoOptions = defaultTo_1.default(defaultConvertItemToOptions_1.default)(convertItemIntoOptions);
    var facadeConfig = __assign({ convertDocumentIntoItem: function (document) { return document; }, convertItemIntoOptions: itemIntoOptions, createFilter: emptyOptions_1.emptyOptions, createItemOptions: defaultConvertItemToOptions_1.default, createSort: function (sort) { return sort; }, defaultPaginationLimit: 10, deleteItemOptions: emptyOptions_1.emptyOptions, deleteItemsOptions: itemIntoOptions, getItemOptions: itemIntoOptions, getItemsOptions: itemIntoOptions, replaceItemOptions: itemIntoOptions, updateItemOptions: itemIntoOptions }, config);
    var createItemFactory = defaultTo_1.default(createItem_1.default)(createItem);
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
    };
});
//# sourceMappingURL=factory.js.map