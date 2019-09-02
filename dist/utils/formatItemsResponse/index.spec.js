"use strict";
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
            cursor: pagination,
            items: [testItem_1.default],
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