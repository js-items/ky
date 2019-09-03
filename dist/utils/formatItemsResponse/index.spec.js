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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var foundation_1 = require("@js-items/foundation");
var testItem_1 = __importDefault(require("@js-items/foundation/dist/functions/utils/testItem"));
var SortOrder_1 = require("@js-items/foundation/dist/interfaces/SortOrder");
var testConfig_1 = require("../testConfig");
var index_1 = __importDefault(require("./index"));
describe('@formatItemsResponse', function () {
    var cursor = foundation_1.createCursorFromItem(testItem_1.default, { id: SortOrder_1.asc });
    var pagination = {
        after: cursor,
        before: cursor,
        hasAfter: false,
        hasBefore: false,
        totalCount: 1,
    };
    it('gets response when envelope is set to false', function () {
        var response = {
            data: [testItem_1.default],
            pagination: pagination,
        };
        var result = index_1.default({
            config: testConfig_1.config,
            envelope: false,
            response: response,
        });
        var expectedResult = {
            cursor: __assign({}, pagination),
            items: [testItem_1.default],
        };
        expect(result).toEqual(expectedResult);
    });
    it('gets response when envelope is set to false and there is not data', function () {
        var paginationData = {
            after: null,
            before: null,
            hasAfter: false,
            hasBefore: false,
            totalCount: 0,
        };
        var response = {
            data: [],
            pagination: paginationData,
        };
        var result = index_1.default({
            config: testConfig_1.config,
            envelope: false,
            response: response,
        });
        var expectedResult = {
            cursor: __assign({}, pagination, { before: undefined, after: undefined }),
            items: [],
        };
        expect(result).toEqual(expectedResult);
    });
    it('gets response when envelope is set to true', function () {
        var envelopedResponse = {
            body: {
                data: [testItem_1.default],
                pagination: pagination,
            },
            headers: {},
            status: 200,
        };
        var result = index_1.default({
            config: testConfig_1.config,
            envelope: true,
            response: envelopedResponse,
        });
        var expectedResult = {
            cursor: pagination,
            items: [testItem_1.default],
        };
        expect(result).toEqual(expectedResult);
    });
});
//# sourceMappingURL=index.spec.js.map