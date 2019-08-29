"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* istanbul ignore next */
var testItem_1 = __importDefault(require("@js-items/foundation/dist/functions/utils/testItem"));
var emptyOptions_1 = require("../emptyOptions");
exports.defaultDocumentConverter = jest.fn(function () { return ({}); });
exports.jsonOptions = jest.fn(function () { return ({ json: { item: testItem_1.default } }); });
exports.config = {
    convertDocumentIntoItem: jest.fn(function () { return testItem_1.default; }),
    convertItemIntoOptions: exports.defaultDocumentConverter,
    createFilter: jest.fn(emptyOptions_1.emptyOptions),
    createItemOptions: exports.defaultDocumentConverter,
    createSort: jest.fn(emptyOptions_1.emptyOptions),
    defaultPaginationLimit: 10,
    deleteItemOptions: exports.defaultDocumentConverter,
    deleteItemsOptions: exports.defaultDocumentConverter,
    getItemOptions: exports.defaultDocumentConverter,
    getItemsOptions: exports.defaultDocumentConverter,
    itemName: 'TestItem',
    ky: jest.fn(function () { return Promise.resolve({}); }
    // tslint:disable-next-line:no-any
    ),
    replaceItemOptions: exports.jsonOptions,
    updateItemOptions: exports.jsonOptions,
};
//# sourceMappingURL=index.js.map