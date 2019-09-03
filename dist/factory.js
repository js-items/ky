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
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var defaultTo_1 = __importDefault(require("ramda/src/defaultTo"));
var createItem_1 = __importDefault(require("./functions/createItem"));
var deleteItem_1 = __importDefault(require("./functions/deleteItem"));
var deleteItems_1 = __importDefault(require("./functions/deleteItems"));
var getItem_1 = __importDefault(require("./functions/getItem"));
var getItems_1 = __importDefault(require("./functions/getItems"));
var replaceItem_1 = __importDefault(require("./functions/replaceItem"));
var updateItem_1 = __importDefault(require("./functions/updateItem"));
var defaultConvertItemToOptions_1 = __importDefault(require("./utils/defaultConvertItemToOptions"));
var emptyOptions_1 = require("./utils/emptyOptions");
var factory = function (_a) {
    var deleteItem = _a.deleteItem, deleteItems = _a.deleteItems, getItem = _a.getItem, getItems = _a.getItems, updateItem = _a.updateItem, replaceItem = _a.replaceItem, createItem = _a.createItem, convertItemIntoOptions = _a.convertItemIntoOptions, envelope = _a.envelope, config = __rest(_a, ["deleteItem", "deleteItems", "getItem", "getItems", "updateItem", "replaceItem", "createItem", "convertItemIntoOptions", "envelope"]);
    var itemIntoOptions = defaultTo_1.default(defaultConvertItemToOptions_1.default)(convertItemIntoOptions);
    var envelopeOptions = defaultTo_1.default(false)(envelope);
    var facadeConfig = __assign({ convertDocumentIntoItem: function (document) { return document; }, convertItemIntoOptions: itemIntoOptions, createFilter: emptyOptions_1.emptyOptions, createItemOptions: defaultConvertItemToOptions_1.default, createSort: function (sort) { return sort; }, defaultPaginationLimit: 10, deleteItemOptions: emptyOptions_1.emptyOptions, deleteItemsOptions: emptyOptions_1.emptyOptions, envelope: envelopeOptions, getItemOptions: emptyOptions_1.emptyOptions, getItemsOptions: emptyOptions_1.emptyOptions, replaceItemOptions: defaultConvertItemToOptions_1.default, updateItemOptions: defaultConvertItemToOptions_1.default }, config);
    var createItemFactory = defaultTo_1.default(createItem_1.default)(createItem);
    var deleteItemFactory = defaultTo_1.default(deleteItem_1.default)(deleteItem);
    var getItemFactory = defaultTo_1.default(getItem_1.default)(getItem);
    var updateItemFactory = defaultTo_1.default(updateItem_1.default)(updateItem);
    var replaceItemFactory = defaultTo_1.default(replaceItem_1.default)(replaceItem);
    var deleteItemsFactory = defaultTo_1.default(deleteItems_1.default)(deleteItems);
    var getItemsFactory = defaultTo_1.default(getItems_1.default)(getItems);
    return {
        createItem: createItemFactory(facadeConfig),
        deleteItem: deleteItemFactory(facadeConfig),
        deleteItems: deleteItemsFactory(facadeConfig),
        getItem: getItemFactory(facadeConfig),
        getItems: getItemsFactory(facadeConfig),
        replaceItem: replaceItemFactory(facadeConfig),
        updateItem: updateItemFactory(facadeConfig),
    };
};
exports.default = factory;
//# sourceMappingURL=factory.js.map