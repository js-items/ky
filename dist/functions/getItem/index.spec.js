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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable:no-any
var foundation_1 = require("@js-items/foundation");
var testItem_1 = __importDefault(require("@js-items/foundation/dist/functions/utils/testItem"));
var testConfig_1 = require("../../utils/testConfig");
var index_1 = __importDefault(require("./index"));
beforeEach(function () { return jest.clearAllMocks(); });
describe('@getItem', function () {
    it('gets item', function () { return __awaiter(void 0, void 0, void 0, function () {
        var getMock, getItemOptionsMock, createFilterMock, item;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    getMock = jest.fn(function () { return ({
                        json: function () { return Promise.resolve({ item: testItem_1.default }); },
                    }); });
                    getItemOptionsMock = jest.fn(function () { return ({}); });
                    createFilterMock = jest.fn(function () { return ({}); });
                    return [4 /*yield*/, index_1.default(__assign(__assign({}, testConfig_1.config), { createFilter: createFilterMock, getItemOptions: getItemOptionsMock, ky: function () { return Promise.resolve({ get: getMock }); } }))({
                            id: testItem_1.default.id,
                        })];
                case 1:
                    item = (_a.sent()).item;
                    expect(createFilterMock).toBeCalledWith({});
                    expect(getItemOptionsMock).toBeCalledTimes(1);
                    expect(testConfig_1.config.convertDocumentIntoItem).toBeCalledWith(testItem_1.default);
                    expect(item).toEqual(testItem_1.default);
                    expect(getMock).toBeCalledWith(testConfig_1.config.itemUrl + "/" + testItem_1.default.id, {
                        searchParams: { filter: JSON.stringify({}) },
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    it('gets item with custom filter object', function () { return __awaiter(void 0, void 0, void 0, function () {
        var getMock, filter, getItemOptionsMock, createFilterMock;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    getMock = jest.fn(function () { return ({
                        json: function () { return Promise.resolve({ item: testItem_1.default, otherProp: 'test' }); },
                    }); });
                    filter = {
                        id: { $eq: testItem_1.default.id },
                    };
                    getItemOptionsMock = jest.fn(function () { return ({
                        searchParams: { pretty: 'true' },
                    }); });
                    createFilterMock = jest.fn(function () { return filter; });
                    return [4 /*yield*/, index_1.default(__assign(__assign({}, testConfig_1.config), { createFilter: createFilterMock, getItemOptions: getItemOptionsMock, ky: function () { return Promise.resolve({ get: getMock }); } }))({
                            filter: filter,
                            id: testItem_1.default.id,
                        })];
                case 1:
                    _a.sent();
                    expect(createFilterMock).toBeCalledWith(filter);
                    expect(getMock).toBeCalledWith(testConfig_1.config.itemUrl + "/" + testItem_1.default.id, {
                        searchParams: { pretty: 'true', filter: JSON.stringify(filter) },
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    it('does not get item', function () { return __awaiter(void 0, void 0, void 0, function () {
        var error, facadeConfig, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    error = new foundation_1.ItemNotFoundError('TestItem', testItem_1.default.id);
                    facadeConfig = __assign(__assign({}, testConfig_1.config), { getItemOptions: testConfig_1.jsonOptions, ky: jest.fn(function () { return Promise.reject(error); }) });
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, index_1.default(facadeConfig)({
                            id: testItem_1.default.id,
                        })];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _a.sent();
                    expect(e_1).toEqual(error);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=index.spec.js.map